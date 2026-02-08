import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../models/userModel.js";
import twilio from "twilio";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import { paymentHelper } from "../payment.js";
import Joi from "joi";
import { Message } from "../models/messageModel.js";
import { Subscribers } from "../models/subscribers.js";
import { sendNewsletter } from "../newsletter.js";
import { Order } from "../models/orderModel.js";
import { ensureDbConnection } from "../database/dbConnection.js";

let twilioClient;
const getTwilioClient = () => {
  if (twilioClient) return twilioClient;
  const sid = process.env.TWILIO_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) {
    return null;
  }
  twilioClient = twilio(sid, token);
  return twilioClient;
};

export const register = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body;
    if (!name || !email || !phone || !verificationMethod) {
      return next(new ErrorHandler("All fields are required.", 400));
    }
    function validatePhoneNumber(phone) {
      const phoneRegex = /^\+91\d{10}$/;
      return phoneRegex.test(phone);
    }
    if (!validatePhoneNumber(phone)) {
      return next(new ErrorHandler("Invalid phone number.", 400));
    }

    const existingUser = await User.findOne({
      $or: [
        {
          email,
          accountVerified: true,
        },
        {
          phone,
          accountVerified: true,
        },
      ],
    });

    if (existingUser) {
      return next(new ErrorHandler("Phone or Email is already used.", 400));
    }

    const registerationAttemptsByUser = await User.find({
      $or: [
        { phone, accountVerified: false },
        { email, accountVerified: false },
      ],
    });

    if (registerationAttemptsByUser.length > 3) {
      return next(
        new ErrorHandler(
          "You have exceeded the maximum number of attempts (3). Please try again after an hour.",
          400,
        ),
      );
    }

    const userData = {
      name,
      email,
      phone,
      password,
    };

    const user = await User.create(userData);
    const verificationCode = await user.generateVerificationCode();
    await user.save();
    await sendVerificationCode(
      verificationMethod,
      verificationCode,
      name,
      email,
      phone,
      res,
    );
    // res.status(200).json({
    //     success: true,
    // });
  } catch (error) {
    next(error);
  }
});

// async function sendVerificationCode(verificationMethod, verificationCode, name, email, phone, res){

//     try{
//         if(verificationMethod === "email"){
//             const message = generateEmailTemplate(verificationCode);
//             await sendEmail({ email, subject: "Your verification code", message });
//             res.status(200).json({
//                 success: true,
//                 message: `Verification email successfuly sent to ${name}`,
//             });
//         }
//         else if(verificationMethod === "phone") {
//             const verificationCodeWithSpace = verificationCode
//                 .toString()
//                 .split("")
//                 .join("");
//                 await client.calls.create({
//                     twiml: `<Response><Say>Your verification code is ${verificationCodeWithSpace}</Say></Response>`,
//                     from: process.env.TWILIO_PHONE,
//                     to: phone,
//                 });
//             res.status(200).json({
//                 success: true,
//                 message: `OTP sent to ${name}`,
//             });
//         }
//         else{
//             return res.status(500).json({
//                 success: false,
//                 message: "Invalid verification method"
//             })
//         }
//     }
//     catch (error){
//         return next(new ErrorHandler("Verification code failed to send", 500));
//     }

// }

async function sendVerificationCode(
  verificationMethod,
  verificationCode,
  name,
  email,
  phone,
  res,
) {
  try {
    if (verificationMethod === "email") {
      const message = generateEmailTemplate(verificationCode);
      await sendEmail({ email, subject: "Your verification code", message });
      res.status(200).json({
        success: true,
        message: `Verification email successfully sent to ${name}`,
      });
    } else if (verificationMethod === "phone") {
      const client = getTwilioClient();
      if (!client || !process.env.TWILIO_PHONE) {
        return res.status(500).json({
          success: false,
          message: "SMS verification is not configured on the server",
        });
      }
      // ✅ send OTP as SMS instead of voice call
      await client.messages.create({
        body: `Your verification code is ${verificationCode}`,
        from: process.env.TWILIO_PHONE,
        to: phone,
      });
      res.status(200).json({
        success: true,
        message: `OTP SMS sent to ${name}`,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Invalid verification method",
      });
    }
  } catch (error) {
    return next(new ErrorHandler("Verification code failed to send", 500));
  }
}

function generateEmailTemplate(verificationCode) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
      <p style="font-size: 16px; color: #333;">Dear User,</p>
      <p style="font-size: 16px; color: #333;">Your verification code is:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
          ${verificationCode}
        </span>
      </div>
      <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
      <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
      <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
        <p>Thank you,<br>Your Company Team</p>
        <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
      </footer>
    </div>
  `;
}

export const verifyOTP = catchAsyncError(async (req, res, next) => {
  const { email, otp, phone } = req.body;

  function validatePhoneNumber(phone) {
    const phoneRegex = /^\+91\d{10}$/;
    return phoneRegex.test(phone);
  }

  if (!validatePhoneNumber(phone)) {
    return next(new ErrorHandler("Invalid phone number.", 400));
  }
  try {
    const userAllEntries = await User.find({
      $or: [
        {
          email,
          accountVerified: false,
        },
        {
          phone,
          accountVerified: false,
        },
      ],
    }).sort({ createdAt: -1 });

    if (userAllEntries.length === 0) {
      return next(new ErrorHandler("User not found!", 404));
    }

    let user;
    if (userAllEntries.length > 1) {
      user = userAllEntries[0];

      await User.deleteMany({
        _id: { $ne: user._id },
        $or: [
          { phone, accountVerified: false },
          { email, accountVerified: false },
        ],
      });
    } else {
      user = userAllEntries[0];
    }
    console.log("Stored OTP:", user.verificationCode);
    console.log("Entered OTP:", otp);
    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler("Invalid Otp", 400));
    }

    const currentTime = Date.now();

    const verificationCodeExpire = new Date(
      user.verificationCodeExpire,
    ).getTime();
    console.log(currentTime);
    console.log(verificationCodeExpire);
    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler("OTP Expired", 400));
    }

    ((user.accountVerified = true),
      (user.verificationCode = null),
      (user.verificationCodeExpire = null));
    await user.save({ validateModifiedOnly: true });

    try {
      sendToken(user, 200, "Account Verified", res);
    } catch (error) {
      console.error("sendToken error:", error);
      return next(new ErrorHandler("Token generation failed", 500));
    }
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const login = catchAsyncError(async (req, res, next) => {
  try {
    await ensureDbConnection();
  } catch (err) {
    return next(
      new ErrorHandler(
        "Database is not connected. Please try again later.",
        503,
      ),
    );
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required.", 400));
  }

  // Admin access check
  const normalizedEmail = String(email).trim().toLowerCase();
  const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (
    ADMIN_PASSWORD &&
    ADMIN_EMAILS.includes(normalizedEmail) &&
    password === ADMIN_PASSWORD
  ) {
    // Allow admin quick access with env password
    let user =
      (await User.findOne({ email: normalizedEmail })) ||
      (await User.findOne({ email }));
    if (user) {
      // Set admin role if not already set
      if (user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }
      sendToken(user, 200, "Admin logged in successfully!", res);
      return;
    }
    return next(new ErrorHandler("Admin user not found.", 404));
  }

  const user = await User.findOne({
    email: normalizedEmail,
    accountVerified: true,
  }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  sendToken(user, 200, "User logged in successfully!", res);
});

export const logout = catchAsyncError(async (req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
      path: "/",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }
  const resetToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your reset password token is: \n\n ${resetPasswordUrl} \n\n If you have not requested this email, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "PINEWRAP PASSWORD RESET MAIL",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ErrorHandler(
        error.message ? error.message : "Cannot send rest password token.",
        500,
      ),
    );
  }
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400,
      ),
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password & confirm password do not match.", 400),
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, "Reset Password Successfully.", res);
});

export const payment = catchAsyncError(async (req, res, next) => {
  const { paymentMethodId, amount, orderDetails, customerEmail, customerName } =
    req.body;
  const { error: validationError } = validatePaymentInput(req.body);

  if (validationError) {
    return next(new ErrorHandler(validationError.details[0].message, 400));
  }

  try {
    const paymentResult = await paymentHelper(paymentMethodId, amount);

    // Send order confirmation email after successful payment
    if (paymentResult && customerEmail) {
      const emailMessage = generateOrderConfirmationEmail({
        customerName: customerName || "Valued Customer",
        orderId: paymentResult.id,
        amount: amount,
        orderDetails: orderDetails || [],
        paymentStatus: paymentResult.status,
      });

      try {
        await sendEmail({
          email: customerEmail,
          subject: "Order Confirmation - Pinewrap",
          message: emailMessage,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the payment if email fails
      }
    }

    res.status(200).json({
      success: true,
      message: "Payment successful",
      payment: paymentResult,
    });
  } catch (error) {
    return next(new ErrorHandler("Payment failed", 500));
  }
});

function generateOrderConfirmationEmail({
  customerName,
  orderId,
  amount,
  orderDetails,
  paymentStatus,
}) {
  const itemsHtml = orderDetails
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
        <strong>${item.name || item.product}</strong><br/>
        <span style="color: #666; font-size: 14px;">Quantity: ${item.quantity}</span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `,
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #FFC400; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; color: #000; font-size: 28px;">PINEWRAP</h1>
        <p style="margin: 10px 0 0; color: #000; font-size: 16px;">Order Confirmation</p>
      </div>
      
      <div style="background-color: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #0B2D5C; margin-top: 0;">Thank you for your order, ${customerName}!</h2>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          We're excited to get your eco-friendly products to you. Your order has been confirmed and will be processed shortly.
        </p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px; color: #0B2D5C;">Order Details</h3>
          <p style="margin: 5px 0; color: #666;">
            <strong>Order ID:</strong> ${orderId}<br/>
            <strong>Payment Status:</strong> <span style="color: #4CAF50; font-weight: bold;">${paymentStatus === "succeeded" ? "Paid" : paymentStatus}</span>
          </p>
        </div>
        
        ${
          orderDetails && orderDetails.length > 0
            ? `
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 16px 12px; text-align: right; font-size: 18px; font-weight: bold; border-top: 2px solid #0B2D5C;">
                Total:
              </td>
              <td style="padding: 16px 12px; text-align: right; font-size: 18px; font-weight: bold; color: #FFC400; border-top: 2px solid #0B2D5C;">
                $${amount.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
        `
            : `
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px; font-weight: bold; text-align: center;">
            Total Amount: <span style="color: #FFC400;">$${amount.toFixed(2)}</span>
          </p>
        </div>
        `
        }
        
        <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #2e7d32; font-size: 14px;">
            ✓ Your order will be shipped within 2-3 business days<br/>
            ✓ You'll receive a tracking number once your order ships<br/>
            ✓ Free shipping on orders over $50
          </p>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          If you have any questions about your order, please contact us at 
          <a href="mailto:${process.env.SMTP_MAIL}" style="color: #FFC400;">${process.env.SMTP_MAIL}</a>
        </p>
      </div>
      
      <footer style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
        <p>Thank you for choosing Pinewrap - Making the world cleaner, one bag at a time.</p>
        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Pinewrap. All rights reserved.</p>
      </footer>
    </div>
  `;
}

function validatePaymentInput(data) {
  const schema = Joi.object({
    paymentMethodId: Joi.string().required(),
    amount: Joi.number().min(1).required(),
    orderDetails: Joi.array().optional(),
    customerEmail: Joi.string().email().optional(),
    customerName: Joi.string().optional(),
  });

  return schema.validate(data);
}

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = await Message.create({ name, email, message });

    return res.status(201).json({
      success: true,
      message: "Message received successfully.",
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// export const createSubscribers = async (req, res, next) => {
//     // console.log(req.body);
//     const email = req.body.email;

//     try {
//         // Check if the email already exists in the database
//         const existingSubscriber = await Subscribers.findOne({ email });

//         if (existingSubscriber) {
//             // Email already exists, send a message
//             return res.send('Email already subscribed. Check your email for the welcome newsletter.');
//         }

//         // Email doesn't exist, save to the database
//         const newSubscriber = new Subscribers({ email });
//         const savedSubscriber = await newSubscriber.save();
//         // console.log('Subscription saved to the database:', savedSubscriber);

//         // For simplicity, let's just print it to the console
//         console.log(`New subscription: ${email}`);

//         // Send a welcome newsletter
//         const welcomeSubject = 'Welcome to Our Newsletter!';
//         const welcomeContent = '<p>Thank you for subscribing to our newsletter!</p>';
//         sendNewsletter(email, welcomeSubject, welcomeContent);

//         res.send('Subscription successful! Check your email for a welcome newsletter.');
//     } catch (error) {
//         // Handle database or other errors
//         console.error('Error creating subscription:', error);
//         next(error);
//     }
// };

function generateWelcomeEmailHTML(email) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Pinewrap Newsletter</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;">
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8f9fa;padding:20px;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#10b981,#059669);padding:40px 30px;text-align:center;border-radius:12px 12px 0 0;">
      <h1 style="color:#fff;font-size:28px;font-weight:bold;margin:0;text-shadow:0 2px 4px rgba(0,0,0,0.1);">
        Welcome to Pinewrap!
      </h1>
      <div style="width:80px;height:3px;background-color:#fff;margin:15px auto;border-radius:2px;"></div>
    </div>

    <!-- Main Content -->
    <div style="background-color:#fff;padding:40px 30px;border-radius:0 0 12px 12px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
      <h2 style="color:#1f2937;font-size:24px;font-weight:600;margin:0 0 20px 0;text-align:center;">
        Thank you for joining our newsletter! 🌿
      </h2>
      <p style="color:#4b5563;font-size:16px;line-height:1.6;margin:0 0 25px 0;">
        Hi there!
      </p>
      <p style="color:#4b5563;font-size:16px;line-height:1.6;margin:0 0 25px 0;">
        We're thrilled to welcome you to the Pinewrap family! You've taken the first step towards 
        staying updated with our latest eco-friendly packaging solutions, exclusive offers, and 
        sustainability tips.
      </p>
      <div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:25px 0;">
        <h3 style="color:#15803d;font-size:18px;font-weight:600;margin:0 0 15px 0;">
          What to expect:
        </h3>
        <ul style="color:#166534;font-size:14px;line-height:1.6;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">Monthly updates on new sustainable packaging products</li>
          <li style="margin-bottom:8px;">Exclusive discounts and early access to sales</li>
          <li style="margin-bottom:8px;">Eco-friendly tips and industry insights</li>
          <li style="margin-bottom:0;">Behind-the-scenes content from our sustainability journey</li>
        </ul>
      </div>
      <p style="color:#4b5563;font-size:16px;line-height:1.6;margin:0 0 25px 0;">
        As a welcome gift, here's a <strong style="color:#10b981;">10% discount code</strong> for your first order:
      </p>
      <div style="background-color:#10b981;color:#fff;padding:15px 20px;border-radius:8px;text-align:center;margin:25px 0;border:2px dashed #fff;">
        <span style="font-size:24px;font-weight:bold;letter-spacing:2px;">WELCOME10</span>
      </div>
      <div style="text-align:center;margin:30px 0;">
        <a href="https://primewrap.ca/shop" style="background-color:#10b981;color:#fff;padding:15px 30px;border-radius:8px;text-decoration:none;font-size:16px;font-weight:600;display:inline-block;box-shadow:0 4px 6px rgba(16,185,129,0.3);">
          Start Shopping Now →
        </a>
      </div>
      <p style="color:#6b7280;font-size:14px;line-height:1.5;margin:30px 0 0 0;text-align:center;">
        Questions? Simply reply to this email – we'd love to hear from you!
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color:#f9fafb;padding:30px;text-align:center;border-top:1px solid #e5e7eb;margin-top:20px;border-radius:8px;">
      <div style="color:#10b981;font-size:20px;font-weight:bold;margin:0 0 15px 0;">Pinewrap</div>
      <p style="color:#6b7280;font-size:14px;margin:0 0 15px 0;">
        Sustainable Packaging Solutions for a Better Tomorrow
      </p>
      <div style="color:#9ca3af;font-size:12px;line-height:1.4;">
        <p style="margin:0 0 5px 0;">📧 ${email} | 📞 1-800-PRIMEWRAP</p>
        <p style="margin:0 0 15px 0;">🏢 123 Eco Street, Green City, GC 12345</p>
        <a href="https://primewrap.ca/unsubscribe" style="color:#6b7280;font-size:12px;text-decoration:underline;">
          Unsubscribe from this newsletter
        </a>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

/**
 * POST /api/v1/user/subscribe
 * Saves a new subscriber and sends the styled welcome email.
 */
export const createSubscribers = catchAsyncError(async (req, res, next) => {
  const email = req.body.email;

  // 1) Check for existing
  const existing = await Subscribers.findOne({ email });
  if (existing) {
    return res
      .status(200)
      .send(
        "Email already subscribed. Check your email for the welcome newsletter.",
      );
  }

  // 2) Save new subscriber
  const newSub = new Subscribers({ email });
  await newSub.save();
  console.log(`New subscription: ${email}`);

  // 3) Send styled welcome email
  const subject = "Welcome to Our Newsletter!";
  const htmlContent = generateWelcomeEmailHTML(email);
  await sendNewsletter(email, subject, htmlContent);

  // 4) Respond
  res
    .status(201)
    .send(
      "Subscription successful! Check your email for your welcome newsletter.",
    );
});

export const getCart = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new ErrorHandler("User not found", 404));
  res.status(200).json({ success: true, cart: user.cart });
});

// backend/controllers/cartController.js
export const saveCart = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  // Map the full client‐side array into your schema fields:
  const items = (req.body.cartItems || []).map((c) => ({
    product: c.id ?? c.product, // or c.product if your client uses that
    name: c.name,
    price: c.price,
    quantity: c.quantity,
    image: c.image,
  }));

  // ⚠️ Overwrite instead of merge:
  user.cart = items;
  await user.save();

  res.status(200).json({ success: true, cart: user.cart });
});

export const getAllMessages = catchAsyncError(async (req, res, next) => {
  // Admin-only: customer contact messages are global
  const CONFIGURED_ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const FALLBACK_ADMIN_EMAILS = [
    "hargunkaur2863@gmail.com",
    "gursahib@pinewrap.ca",
    "workmailsahib1997@gmail.com",
  ];

  const ADMIN_EMAILS = CONFIGURED_ADMIN_EMAILS.length
    ? CONFIGURED_ADMIN_EMAILS
    : FALLBACK_ADMIN_EMAILS;

  const isAdmin =
    req.user?.role === "admin" ||
    ADMIN_EMAILS.includes((req.user?.email || "").toLowerCase());

  if (!isAdmin) {
    return next(new ErrorHandler("Not authorized to view contact messages.", 403));
  }

  const messages = await Message.find().sort({ createdAt: -1 });
  if (!messages) {
    return next(new ErrorHandler("No messages found", 404));
  }
  res.status(200).json({
    success: true,
    data: messages,
  });
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  // Fetch every user, omit the password field
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  if (!users) {
    return next(new ErrorHandler("No users found", 404));
  }

  res.status(200).json({
    success: true,
    data: users,
  });
});

export const getAllSubscribers = catchAsyncError(async (req, res, next) => {
  const subs = await Subscribers.find().sort({ _id: -1 });
  if (!subs) {
    return next(new ErrorHandler("No subscribers found", 404));
  }
  res.status(200).json({
    success: true,
    data: subs,
  });
});

export const getAllOrders = catchAsyncError(async (req, res, next) => {
  console.log("📋 Getting orders - User role:", req.user?.role, "User ID:", req.user?._id, "Email:", req.user?.email);
  
  // Check if user is admin by role OR by email
  const CONFIGURED_ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  // Fallback so local/dev still works if env var isn't set
  const FALLBACK_ADMIN_EMAILS = [
    "hargunkaur2863@gmail.com",
    "gursahib@pinewrap.ca",
    "workmailsahib1997@gmail.com",
  ];

  const ADMIN_EMAILS = CONFIGURED_ADMIN_EMAILS.length
    ? CONFIGURED_ADMIN_EMAILS
    : FALLBACK_ADMIN_EMAILS;
  
  const isAdmin = req.user?.role === "admin" || ADMIN_EMAILS.includes((req.user?.email || "").toLowerCase());
  console.log("✅ Is admin?", isAdmin, "Admin emails:", ADMIN_EMAILS);
  
  let orders;
  if (isAdmin) {
    console.log("✅ Admin accessing all orders");
    orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
  } else {
    console.log("👤 Regular user accessing their own orders");
    orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  }

  console.log("📦 Found", orders.length, "orders");
  res.status(200).json({
    success: true,
    orders,
  });
});

// export const createOrder = catchAsyncError(async (req, res, next) => {
//   const { items, total, deliveryAddress, paymentMethod, trackingNumber } = req.body;
//   if (!items || !items.length) {
//     return next(new ErrorHandler('No order items provided.', 400));
//   }

//   const order = await Order.create({
//     user: req.user._id,
//     items: items.map(i => ({
//       product: i.id,
//       name:    i.name,
//       price:   i.price,
//       quantity:i.quantity
//     })),
//     total,
//     deliveryAddress,
//     paymentMethod,
//     trackingNumber
//   });

//   res.status(201).json({
//     success: true,
//     order
//   });
// });

export const createOrder = catchAsyncError(async (req, res, next) => {
  const {
    items,
    total,
    deliveryAddress,
    paymentMethod,
    trackingNumber,
    guestEmail,
    guestName,
    // tolerate other common field names
    customerEmail,
    customerName,
    email,
    name,
  } = req.body;
  
  console.log('📦 Creating order with data:', { items, total, deliveryAddress, paymentMethod, guestEmail, guestName });
  
  if (!items || !items.length) {
    return next(new ErrorHandler("No order items provided.", 400));
  }

  const humanizeProduct = (value) => {
    const base = String(value || "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!base) return "Item";
    return base
      .split(" ")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
      .join(" ");
  };

  // Normalize each line-item so `product` is always set and `name` is readable
  const normalizedItems = items.map((i) => {
    const product = i.product ?? i.id;
    return {
      product,
      name: i.name || humanizeProduct(product),
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    };
  });

  console.log('✅ Normalized items:', normalizedItems);

  // verify everything has a product
  const itemsWithoutProduct = normalizedItems.filter(li => !li.product);
  if (itemsWithoutProduct.length > 0) {
    console.log('❌ Items missing product ID:', itemsWithoutProduct);
    return next(
      new ErrorHandler("Each order item must have a product ID.", 400),
    );
  }

  // Prepare order data - support both authenticated and guest users
  const orderData = {
    items: normalizedItems,
    total,
    deliveryAddress,
    paymentMethod,
    trackingNumber,
  };

  // Always store provided checkout contact info (even for logged-in orders)
  const resolvedGuestEmail = guestEmail || customerEmail || email;
  const resolvedGuestName = guestName || customerName || name;
  if (resolvedGuestEmail) orderData.guestEmail = resolvedGuestEmail;
  if (resolvedGuestName) orderData.guestName = resolvedGuestName;

  // If user is authenticated, add user ID
  if (req.user && req.user._id) {
    orderData.user = req.user._id;
    console.log('👤 Authenticated user order');
  } else {
    // Guest checkout - require email at minimum
    if (!orderData.guestEmail) {
      console.log('❌ Missing guest email');
      return next(new ErrorHandler("Email is required for guest orders.", 400));
    }
    console.log('🎭 Guest order');
  }

  console.log('💾 Attempting to create order:', orderData);

  try {
    const order = await Order.create(orderData);
    console.log('✅ Order created successfully:', order._id);
    
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('❌ Order creation error:', error);
    return next(new ErrorHandler(error.message || "Failed to create order.", 400));
  }
});

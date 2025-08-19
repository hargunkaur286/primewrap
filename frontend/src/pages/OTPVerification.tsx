// // src/pages/OTPVerification.tsx
// import React, { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import axios from "axios";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import {
//   Loader2,
//   ArrowLeft,
//   CheckCircle2,
//   Timer,
//   RefreshCw,
// } from "lucide-react";
// import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { Context } from "../main";

// /* ------------------------------------------------------------------ */
// /*  The backend expects a 5-digit code → update here if it’s 6        */
// /* ------------------------------------------------------------------ */
// const otpSchema = z.object({
//   otp: z
//     .string()
//     .min(5, "Enter the full 5-digit code")
//     .max(5, "OTP is 5 digits"),
// });
// type OTPFormData = z.infer<typeof otpSchema>;

// /* ------------------------------------------------------------------ */
// /* component                                                          */
// /* ------------------------------------------------------------------ */
// const OTPVerification: React.FC = () => {
//   const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

//   const { email, phone } = useParams<{ email: string; phone: string }>();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   /* ------------ local state ------------- */
//   const [isLoading, setIsLoading] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(300); // 5 min
//   const [canResend, setCanResend] = useState(false);

//   /* ------------ timer countdown ---------- */
//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setCanResend(true);
//       return;
//     }
//     const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(id);
//   }, [timeLeft]);

//   /* ------------ RHF setup ---------------- */
//   const form = useForm<OTPFormData>({
//     resolver: zodResolver(otpSchema),
//     defaultValues: { otp: "" },
//   });

//   /* ------------ utils -------------------- */
//   const fmt = (s: number) =>
//     `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

//   /* ------------------------------------------------------------------ */
//   /* submit to backend                                                  */
//   /* ------------------------------------------------------------------ */
//   const onSubmit = async (data: OTPFormData) => {
//     setIsLoading(true);
//     try {
//       const payload = { email, phone, otp: data.otp };

//       const res = await axios.post(
//         "http://localhost:4000/api/v1/user/otp-verification",
//         payload,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       /* success – update global auth */
//       toast({
//         title: "Verification successful!",
//         description: res.data.message,
//       });
//       setIsAuthenticated(true);
//       setUser(res.data.user);
//       setIsVerified(true);

//       /* auto-redirect to home after 2 s */
//       setTimeout(() => navigate("/"), 2000);
//     } catch (err: unknown) {
//       const msg =
//         axios.isAxiosError(err) && err.response?.data?.message
//           ? err.response.data.message
//           : "Invalid verification code. Please try again.";
//       toast({
//         title: "Verification failed",
//         description: msg,
//         variant: "destructive",
//       });
//       form.reset();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* ------------------------------------------------------------------ */
//   /* resend OTP                                                         */
//   /* ------------------------------------------------------------------ */
//   const handleResendOTP = async () => {
//     setIsLoading(true);
//     try {
//       await axios.post(
//         "http://localhost:4000/api/v1/user/resend-otp",
//         { email, phone },
//         { withCredentials: true }
//       );

//       toast({
//         title: "Code resent!",
//         description: "A new verification code has been sent.",
//       });
//       setTimeLeft(300);
//       setCanResend(false);
//       form.reset();
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Could not resend code. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* If already logged in, bounce */
//   if (isAuthenticated) return <Navigate to="/" />;

//   /* ------------------------------------------------------------------ */
//   /* success screen                                                     */
//   /* ------------------------------------------------------------------ */
//   if (isVerified) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 p-4">
//         <div className="w-full max-w-md">
//           <Card className="shadow-xl border-0">
//             <CardHeader className="text-center pb-6">
//               <div className="mx-auto mb-4">
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
//                   PrimeWrap
//                 </h1>
//               </div>
//               <div className="mx-auto mb-4 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
//                 <CheckCircle2 className="h-8 w-8 text-emerald-600" />
//               </div>
//               <CardTitle className="text-2xl font-bold text-gray-900">
//                 Verification Complete!
//               </CardTitle>
//               <CardDescription className="text-gray-600">
//                 Your account is now verified — welcome aboard.
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-6">
//               <Button
//                 onClick={() => navigate("/")}
//                 className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium"
//               >
//                 Go to Dashboard
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   /* ------------------------------------------------------------------ */
//   /* main verification form                                             */
//   /* ------------------------------------------------------------------ */
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 p-4">
//       <div className="w-full max-w-md">
//         <Card className="shadow-xl border-0">
//           <CardHeader className="text-center pb-6">
//             <div className="mx-auto mb-4">
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
//                 PrimeWrap
//               </h1>
//             </div>
//             <CardTitle className="text-2xl font-bold text-gray-900">
//               Verify Your Account
//             </CardTitle>
//             <CardDescription className="text-gray-600">
//               We’ve sent a 5-digit code to your registered e-mail / phone.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-6"
//               >
//                 <FormField
//                   control={form.control}
//                   name="otp"
//                   render={({ field }) => (
//                     <FormItem className="space-y-4">
//                       <FormLabel className="text-gray-700 font-medium text-center block">
//                         Enter Verification Code
//                       </FormLabel>
//                       <FormControl>
//                         <div className="flex justify-center">
//                           <InputOTP
//                             maxLength={5}
//                             value={field.value}
//                             onChange={field.onChange}
//                           >
//                             <InputOTPGroup>
//                               <InputOTPSlot index={0} />
//                               <InputOTPSlot index={1} />
//                               <InputOTPSlot index={2} />
//                               <InputOTPSlot index={3} />
//                               <InputOTPSlot index={4} />
//                             </InputOTPGroup>
//                           </InputOTP>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* timer + resend */}
//                 <div className="text-center space-y-3">
//                   <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
//                     <Timer className="h-4 w-4" />
//                     <span>Code expires in: {fmt(timeLeft)}</span>
//                   </div>

//                   {canResend ? (
//                     <Button
//                       type="button"
//                       onClick={handleResendOTP}
//                       variant="ghost"
//                       className="text-emerald-600 hover:text-emerald-700 font-medium"
//                       disabled={isLoading}
//                     >
//                       {isLoading && (
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       )}
//                       <RefreshCw className="mr-2 h-4 w-4" />
//                       Resend Code
//                     </Button>
//                   ) : (
//                     <p className="text-sm text-gray-500">
//                       You can resend a new code when the timer ends.
//                     </p>
//                   )}
//                 </div>

//                 {/* submit */}
//                 <Button
//                   type="submit"
//                   className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium"
//                   disabled={
//                     isLoading || form.watch("otp").length !== 5 /* 5 digits */
//                   }
//                 >
//                   {isLoading && (
//                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   )}
//                   Verify
//                 </Button>
//               </form>
//             </Form>

//             {/* links */}
//             <div className="text-center pt-4 border-t border-gray-200">
//               <Link
//                 to="/register"
//                 className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
//               >
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back to Registration
//               </Link>
//             </div>

//             <div className="text-center">
//               <span className="text-gray-600">Already have an account? </span>
//               <Link
//                 to="/login"
//                 className="text-emerald-600 hover:text-emerald-700 font-medium"
//               >
//                 Sign in here
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;

import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Loader2,
  ArrowLeft,
  CheckCircle2,
  Timer,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Context } from '@/main'; // Change path if needed

// ------ Zod Schema and Types ------
const otpSchema = z.object({
  otp: z
    .string()
    .min(5, 'Please enter the complete 5-digit code')
    .max(5, 'Invalid code length'),
});

type OTPFormData = z.infer<typeof otpSchema>;

// ------------ Component -----------
const OTPVerification: React.FC = () => {
  // Global auth context (adjust this if your context is elsewhere)
  const { setIsAuthenticated, setUser } = useContext(Context);

  // Route params ('email' and/or 'phone' must be provided via the route!)
  const { email, phone } = useParams<{
    email?: string;
    phone?: string;
  }>();

  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 min
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Timer for code expiry/resend logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  // React-Hook-Form
  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // --------- OTP VERIFY HANDLER -----------
  const onSubmit = async (data: OTPFormData) => {
    setIsLoading(true);
    try {
      // Ensure phone has +91 prefix if it doesn't already
      const formattedPhone = phone?.startsWith('+91') ? phone : `+91${phone}`;
      
      const payload = {
        email,
        phone: formattedPhone,
        otp: data.otp,
      };
      
      const res = await axios.post(
        'http://localhost:4000/api/v1/user/otp-verification',
        payload,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      
      toast({
        title: 'Verification successful!',
        description: res.data.message,
      });
      setIsVerified(true);
      setIsAuthenticated(true);
      setUser(res.data.user);
      setTimeout(() => navigate('/'), 2000); // Navigate to home, not login
    } catch (err: any) {
      console.error('OTP Verification Error:', err.response?.data); // Add logging
      toast({
        title: 'Verification failed',
        description:
          err?.response?.data?.message ||
          'Invalid verification code. Please try again.',
        variant: 'destructive',
      });
      setIsAuthenticated(false);
      setUser(null);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  // --------- OTP RESEND HANDLER -----------
  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const formattedPhone = phone?.startsWith('+91') ? phone : `+91${phone}`;
      
      await axios.post(
        'http://localhost:4000/api/v1/user/resend-otp',
        { email, phone: formattedPhone },
        { withCredentials: true }
      );
      setTimeLeft(300);
      setCanResend(false);
      form.reset();
      toast({
        title: 'Code resent!',
        description: 'A new verification code has been sent to your email.',
      });
    } catch (error) {
      console.error('Resend OTP Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to resend verification code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ----------- Verified UI ----------------
  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  PrimeWrap
                </h1>
              </div>
              <div className="mx-auto mb-4 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Verification Complete!
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your email has been successfully verified. You can now access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-sm text-emerald-800">
                    <strong>Account Verified!</strong>
                    <br />
                    Redirecting you to login page...
                  </p>
                </div>
              </div>
              <Button
                onClick={() => navigate('/login')}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium"
              >
                Continue to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ------------- Main UI ---------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                PrimeWrap
              </h1>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-gray-600">
              We&apos;ve sent a <strong>5-digit verification code</strong> to your email address. Please enter it below to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-gray-700 font-medium text-center block">
                        Enter Verification Code
                      </FormLabel>
                      <FormControl>
                        <div className="flex justify-center">
                          <InputOTP maxLength={5} value={field.value} onChange={field.onChange}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Timer and Resend UI */}
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Timer className="h-4 w-4" />
                    <span>Code expires in: {formatTime(timeLeft)}</span>
                  </div>
                  {canResend ? (
                    <Button
                      type="button"
                      onClick={handleResendOTP}
                      variant="ghost"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      <RefreshCw className="mr-2 h-4 w-4" /> Resend Code
                    </Button>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Didn&apos;t receive the code? You can resend it when the timer expires.
                    </p>
                  )}
                </div>

                {/* Verify Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium"
                  disabled={isLoading || form.watch('otp').length !== 5}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  Verify Email
                </Button>
              </form>
            </Form>

            {/* Footer links */}
            <div className="text-center pt-4 border-t border-gray-200">
              <Link
                to="/register"
                className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Registration
              </Link>
            </div>
            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;


// export const sendToken = (user, statusCode, message, res) => {
//     const token = user.generateToken();
//     res
//        .status(statusCode)
//        .cookie("token", token, {
//             expires: new Date(
//                 Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//             ),
//             httpOnly: true,
//        })
//        .json({
//         success: true,
//         message,
//         token,
//         user,
//        })
// }

export const sendToken = (user, statusCode, message, res) => {
    const token = user.generateToken();

    const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 7; // fallback to 7 days

    res
        .status(statusCode)
        .cookie("token", token, {
            expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true for HTTPS in prod
            sameSite: "Lax", // can adjust based on your frontend/backend config
        })
        .json({
            success: true,
            message,
            token,
            user,
        });
};

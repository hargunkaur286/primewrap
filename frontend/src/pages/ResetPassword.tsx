// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Loader2, Lock, CheckCircle2, Eye, EyeOff, AlertCircle } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { Link, useSearchParams, useNavigate } from 'react-router-dom';

// const resetPasswordSchema = z.object({
//   password: z.string()
//     .min(8, 'Password must be at least 8 characters')
//     .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
//   confirmPassword: z.string().min(8, 'Please confirm your password'),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// const ResetPassword = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const token = searchParams.get('token');
//   const { toast } = useToast();

//   const form = useForm<ResetPasswordFormData>({
//     resolver: zodResolver(resetPasswordSchema),
//     defaultValues: {
//       password: '',
//       confirmPassword: '',
//     },
//   });

//   // Validate token on component mount
//   useEffect(() => {
//     const validateToken = async () => {
//       if (!token) {
//         setIsValidToken(false);
//         return;
//       }

//       try {
//         // TODO: Replace with your JWT auth implementation
//         console.log('Validating reset token:', token);
        
//         // Simulate API call to validate token
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // For demo purposes, assume token is valid
//         setIsValidToken(true);
        
//       } catch (error) {
//         console.error('Token validation failed:', error);
//         setIsValidToken(false);
//       }
//     };

//     validateToken();
//   }, [token]);

//   const onSubmit = async (data: ResetPasswordFormData) => {
//     if (!token || !isValidToken) {
//       toast({
//         title: "Invalid reset link",
//         description: "This password reset link is invalid or has expired.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // TODO: Replace with your JWT auth implementation
//       console.log('Reset password with token:', token, 'and new password');
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setIsSuccess(true);
//       toast({
//         title: "Password reset successful!",
//         description: "Your password has been updated successfully.",
//       });
      
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to reset password. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Loading state while validating token
//   if (isValidToken === null) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 p-4">
//         <div className="w-full max-w-md">
//           <Card className="shadow-xl border-0">
//             <CardContent className="flex items-center justify-center py-12">
//               <div className="text-center">
//                 <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
//                 <p className="text-gray-600">Validating reset link...</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   // Invalid token state
//   if (!token || !isValidToken) {
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
//               <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
//                 <AlertCircle className="h-8 w-8 text-red-600" />
//               </div>
//               <CardTitle className="text-2xl font-bold text-gray-900">Invalid Reset Link</CardTitle>
//               <CardDescription className="text-gray-600">
//                 This password reset link is invalid, expired, or has already been used.
//               </CardDescription>
//             </CardHeader>
            
//             <CardContent className="space-y-6">
//               <div className="text-center">
//                 <p className="text-sm text-gray-600 mb-6">
//                   Please request a new password reset link to continue.
//                 </p>
                
//                 <Link to="/forgot-password">
//                   <Button className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium">
//                     Request New Reset Link
//                   </Button>
//                 </Link>
//               </div>

//               <div className="text-center pt-4 border-t border-gray-200">
//                 <Link
//                   to="/login"
//                   className="text-emerald-600 hover:text-emerald-700 font-medium"
//                 >
//                   Back to Login
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   // Success state
//   if (isSuccess) {
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
//               <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//                 <CheckCircle2 className="h-8 w-8 text-green-600" />
//               </div>
//               <CardTitle className="text-2xl font-bold text-gray-900">Password Reset Complete!</CardTitle>
//               <CardDescription className="text-gray-600">
//                 Your password has been successfully updated. You can now sign in with your new password.
//               </CardDescription>
//             </CardHeader>
            
//             <CardContent className="space-y-6">
//               <Button
//                 onClick={() => navigate('/login')}
//                 className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium"
//               >
//                 Continue to Login
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   // Reset password form
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
//             <CardTitle className="text-2xl font-bold text-gray-900">Create New Password</CardTitle>
//             <CardDescription className="text-gray-600">
//               Choose a strong password to secure your PrimeWrap account.
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent className="space-y-6">
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-gray-700 font-medium">New Password</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                           <Input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Enter your new password"
//                             className="pl-11 pr-11 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
//                             {...field}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                           >
//                             {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                           </button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="confirmPassword"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-gray-700 font-medium">Confirm New Password</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                           <Input
//                             type={showConfirmPassword ? "text" : "password"}
//                             placeholder="Confirm your new password"
//                             className="pl-11 pr-11 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
//                             {...field}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                           >
//                             {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                           </button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <p className="text-sm text-blue-800">
//                     <strong>Password requirements:</strong><br/>
//                     • At least 8 characters long<br/>
//                     • Contains uppercase and lowercase letters<br/>
//                     • Contains at least one number
//                   </p>
//                 </div>

//                 <Button 
//                   type="submit" 
//                   className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium" 
//                   disabled={isLoading}
//                 >
//                   {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
//                   Update Password
//                 </Button>
//               </form>
//             </Form>

//             <div className="text-center pt-4 border-t border-gray-200">
//               <Link
//                 to="/login"
//                 className="text-emerald-600 hover:text-emerald-700 font-medium"
//               >
//                 Back to Login
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Loader2,
  Lock,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from '../main';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { token } = useParams<{ token?: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { setIsAuthenticated, setUser } = useContext(Context);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }
      try {
        // Call backend API to verify if token is valid
        const res = await axios.get(
          `http://localhost:4000/api/v1/user/password/reset/${token}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        setIsValidToken(false);
      }
    };
    validateToken();
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token || !isValidToken) {
      toast({
        title: 'Invalid reset link',
        description: 'This password reset link is invalid or has expired.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/user/password/reset/${token}`,
        { password: data.password, confirmPassword: data.confirmPassword },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      toast.success(res.data.message || 'Password reset successful!');
      setIsAuthenticated(true);
      setUser(res.data.user);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          'Failed to reset password. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidToken === null) {
    // Token validation loading
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
                <p className="text-gray-600">Validating reset link...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!token || !isValidToken) {
    // Invalid token UI
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
              <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Invalid Reset Link
              </CardTitle>
              <CardDescription className="text-gray-600">
                This password reset link is invalid, expired, or has already been
                used.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-6">
                  Please request a new password reset link to continue.
                </p>

                <Link to="/forgot-password">
                  <Button className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium">
                    Request New Reset Link
                  </Button>
                </Link>
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <Link
                  to="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    // Success UI
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
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Password Reset Complete!
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your password has been successfully updated. You can now sign in
                with your new password.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
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

  // Reset password form UI
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
              Create New Password
            </CardTitle>
            <CardDescription className="text-gray-600">
              Choose a strong password to secure your PrimeWrap account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your new password"
                            className="pl-11 pr-11 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your new password"
                            className="pl-11 pr-11 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Password requirements:</strong>
                    <br />
                    • At least 8 characters long
                    <br />
                    • Contains uppercase and lowercase letters
                    <br />
                    • Contains at least one number
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  Update Password
                </Button>
              </form>
            </Form>

            <div className="text-center pt-4 border-t border-gray-200">
              <Link
                to="/login"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;

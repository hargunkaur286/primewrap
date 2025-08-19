// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { Loader2, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useToast } from '@/hooks/use-toast';

// const registerSchema = z.object({
//   firstName: z.string().min(2, 'First name must be at least 2 characters'),
//   lastName: z.string().min(2, 'Last name must be at least 2 characters'),
//   email: z.string().email('Please enter a valid email address'),
//   password: z.string()
//     .min(8, 'Password must be at least 8 characters')
//     .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
//   confirmPassword: z.string().min(8, 'Please confirm your password'),
//   agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms and conditions'),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// type RegisterFormData = z.infer<typeof registerSchema>;

// const Register = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { toast } = useToast();

//   const form = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       agreeToTerms: false,
//     },
//   });

//   const onSubmit = async (data: RegisterFormData) => {
//     setIsLoading(true);
//     try {
//       // TODO: Replace with your JWT auth implementation
//       console.log('Register data:', data);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       toast({
//         title: "Account created successfully!",
//         description: "Welcome to PrimeWrap! Please check your email to verify your account.",
//       });
      
//       // TODO: Handle JWT token and redirect
      
//     } catch (error) {
//       toast({
//         title: "Registration failed",
//         description: "Unable to create account. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//             <CardTitle className="text-2xl font-bold text-gray-900">Create Your Account</CardTitle>
//             <CardDescription className="text-gray-600">
//               Join PrimeWrap and start your sustainable packaging journey
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent className="space-y-6">
//             <Button
//               type="button"
//               variant="outline"
//               className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-colors"
//             >
//               <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
//                 <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//               Sign up with Google
//             </Button>

//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <Separator className="w-full" />
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-white px-3 text-gray-500 font-medium">Or create account with email</span>
//               </div>
//             </div>

//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-gray-700 font-medium">First Name</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                             <Input
//                               placeholder="First name"
//                               className="pl-10 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
//                               {...field}
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
                  
//                   <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-gray-700 font-medium">Last Name</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                             <Input
//                               placeholder="Last name"
//                               className="pl-10 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
//                               {...field}
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                           <Input
//                             placeholder="Enter your email address"
//                             className="pl-10 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
//                             {...field}
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                           <Input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Create a strong password"
//                             className="pl-10 pr-10 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
//                             {...field}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                           >
//                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
//                       <FormLabel className="text-gray-700 font-medium">Confirm Password</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                           <Input
//                             type={showConfirmPassword ? "text" : "password"}
//                             placeholder="Confirm your password"
//                             className="pl-10 pr-10 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
//                             {...field}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                           >
//                             {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="agreeToTerms"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                       <FormControl>
//                         <input
//                           type="checkbox"
//                           className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mt-1"
//                           checked={field.value}
//                           onChange={field.onChange}
//                         />
//                       </FormControl>
//                       <div className="space-y-1 leading-none">
//                         <FormLabel className="text-sm text-gray-600">
//                           I agree to the{" "}
//                           <Link to="/terms" className="text-emerald-600 hover:text-emerald-700 underline">
//                             Terms of Service
//                           </Link>{" "}
//                           and{" "}
//                           <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700 underline">
//                             Privacy Policy
//                           </Link>
//                         </FormLabel>
//                         <FormMessage />
//                       </div>
//                     </FormItem>
//                   )}
//                 />

//                 <Button 
//                   type="submit" 
//                   className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium" 
//                   disabled={isLoading}
//                 >
//                   {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
//                   Create PrimeWrap Account
//                 </Button>
//               </form>
//             </Form>

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

// export default Register;

// src/pages/Register.tsx   (rename / relocate as you prefer)

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

/* ------------------------------------------------------------------ */
/* validation schema — mirrors what the API expects                    */
/* ------------------------------------------------------------------ */
const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phone: z
      .string()
      .regex(/^\d{10}$/, "Enter a 10-digit mobile number (no +91)"),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Must contain upper, lower & number"
      ),
    confirmPassword: z.string().min(8),
    verificationMethod: z.enum(["email", "phone"], {
      required_error: "Choose a verification method",
    }),
    agreeToTerms: z
      .boolean()
      .refine((v) => v === true, "You must agree to the terms"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

/* ------------------------------------------------------------------ */
/* component                                                           */
/* ------------------------------------------------------------------ */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      verificationMethod: "email",
      agreeToTerms: false,
    },
  });

  /* ----------------------------- submit ----------------------------- */
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      /* 1️⃣ build payload expected by your API ----------------------- */
      const payload = {
        name: `${data.firstName.trim()} ${data.lastName.trim()}`,
        email: data.email,
        phone: `+91${data.phone}`,
        password: data.password,
        verificationMethod: data.verificationMethod,
      };

      /* 2️⃣ send request --------------------------------------------- */
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      /* 3️⃣ success UI + redirect ------------------------------------ */
      toast({
        title: "Account created!",
        description:
          res.data.message ||
          "Please verify your account to complete registration.",
      });

      navigate(`/otp-verification/${data.email}/${data.phone}`);
    } catch (err: unknown) {
      const fallback = "Unable to create account. Please try again.";
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : fallback;
      toast({
        title: "Registration failed",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ----------------------------- UI -------------------------------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          {/* ------------ header ------------ */}
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                PrimeWrap
              </h1>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Join PrimeWrap and start your sustainable packaging journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* ------------ social button (placeholder) ------------ */}
            {/* <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Sign up with Google
            </Button> */}

            {/* divider */}
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-500 font-medium">
                  Or create account with email
                </span>
              </div>
            </div> */}

            {/* --------------------- form --------------------- */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* name row */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="First name"
                              className="pl-10 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Last name"
                              className="pl-10 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Mobile Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          {/* <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" /> */}
                          <div className="flex">
                            <span className="px-3 flex items-center text-sm text-gray-500 border border-r-0 border-gray-200 rounded-l-md bg-gray-50">
                              +91
                            </span>
                            <Input
                              placeholder="10-digit number"
                              className="h-11 border-gray-200 border-l-0 rounded-l-none focus:border-emerald-500 focus:ring-emerald-500"
                              {...field}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Enter your email address"
                            className="pl-10 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="pl-10 pr-10 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* confirm password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* verification method */}
                <FormField
                  control={form.control}
                  name="verificationMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Verification Method
                      </FormLabel>
                      <FormControl>
                        <div className="flex space-x-6">
                          {["email", "phone"].map((v) => (
                            <label
                              key={v}
                              className="flex items-center space-x-2 cursor-pointer text-gray-700"
                            >
                              <input
                                type="radio"
                                value={v}
                                checked={field.value === v}
                                onChange={() => field.onChange(v)}
                              />
                              <span className="capitalize">{v}</span>
                            </label>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* agree to terms */}
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mt-1"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-600">
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="text-emerald-600 hover:text-emerald-700 underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="text-emerald-600 hover:text-emerald-700 underline"
                          >
                            Privacy Policy
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* submit */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  Create PrimeWrap Account
                </Button>
              </form>
            </Form>

            {/* footer */}
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

export default Register;

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Loader2, Mail, ArrowLeft } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { Link } from 'react-router-dom';

// const forgotPasswordSchema = z.object({
//   email: z.string().email('Please enter a valid email address'),
// });

// type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// const ForgotPasswordForm = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEmailSent, setIsEmailSent] = useState(false);
//   const { toast } = useToast();

//   const form = useForm<ForgotPasswordFormData>({
//     resolver: zodResolver(forgotPasswordSchema),
//     defaultValues: {
//       email: '',
//     },
//   });

//   const onSubmit = async (data: ForgotPasswordFormData) => {
//     setIsLoading(true);
//     try {
//       // This would connect to your backend API
//       const response = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: data.email })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send reset email');
//       }

//       setIsEmailSent(true);
//       toast({
//         title: "Reset email sent!",
//         description: "Check your email for password reset instructions.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to send reset email. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isEmailSent) {
//     return (
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
//           <CardDescription>
//             We've sent password reset instructions to your email address.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="text-center">
//             <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
//             <p className="text-sm text-muted-foreground mb-6">
//               If you don't see the email, check your spam folder or try again.
//             </p>
//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={() => setIsEmailSent(false)}
//             >
//               Try Different Email
//             </Button>
//           </div>
//           <div className="text-center">
//             <Link
//               to="/login"
//               className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Login
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
//         <CardDescription>
//           Enter your email address and we'll send you a link to reset your password.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         placeholder="Enter your email"
//                         className="pl-10"
//                         {...field}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//               Send Reset Link
//             </Button>
//           </form>
//         </Form>

//         <div className="text-center">
//           <Link
//             to="/login"
//             className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Login
//           </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ForgotPasswordForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log('Submitting form with:', data);
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/password/forgot',
        { email: data.email },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      console.log('Forgot password response:', response.data);

      if (response.status === 200 && response.data.success) {
        setIsEmailSent(true);
        toast({
          title: 'Reset email sent!',
          description: response.data.message || 'Check your email for password reset instructions.',
        });
      } else {
        toast({
          title: 'Error',
          description: response.data.message || 'Failed to send reset email. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message ||
          'Failed to send reset email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };


  if (isEmailSent) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription>
            We've sent password reset instructions to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-6">
              If you don't see the email, check your spam folder or try again.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsEmailSent(false)}
            >
              Try Different Email
            </Button>
          </div>
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your email"
                        className="pl-10"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Reset Link
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;

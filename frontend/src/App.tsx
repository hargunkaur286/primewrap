
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./contexts/CartContext";
// import { AuthProvider } from "./contexts/AuthContext";
// import Index from "./pages/Index";
// import Dashboard from "./pages/Dashboard";
// import OrderManagement from "./pages/OrderManagement";
// import ProductManagement from "./pages/ProductManagement";
// import DeliveryManagement from "./pages/DeliveryManagement";
// import DriverPanel from "./pages/DriverPanel";
// import Analytics from "./pages/Analytics";
// import Accounting from "./pages/Accounting";
// import Shop from "./pages/Shop";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import ProductDetail from "./pages/ProductDetail";
// import ProductScented from "./pages/ProductScented";
// import ProductRecycling from "./pages/ProductRecycling";
// import Auth from "./pages/Auth";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";
// import OTPVerification from "./pages/OTPVerification";
// import Payment from "./pages/Payment";
// import Cart from "./pages/Cart";
// import UsersManagement from "./pages/UsersManagement";
// import OrdersManagement from "./pages/OrdersManagement";
// import NewsletterSubscribers from "./pages/NewsletterSubscribers";
// import ContactQueries from "./pages/ContactQueries";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <AuthProvider>
//         <CartProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <div className="min-h-screen bg-white font-satoshi">
//               <Header />
//               <Routes>
//                 <Route path="/" element={<Index />} />
//                 <Route path="/shop" element={<Shop />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/product/:id" element={<ProductDetail />} />
//                 <Route path="/product/scented" element={<ProductScented />} />
//                 <Route path="/product/recycling" element={<ProductRecycling />} />
//                 <Route path="/auth" element={<Auth />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/password/forgot" element={<ForgotPassword />} />
//                 <Route path="/password/reset/:token" element={<ResetPassword />} />
//                 <Route path="/otp-verification/:email/:phone" element={<OTPVerification />} />
//                 {/* <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/dashboard/orders" element={<OrderManagement />} /> */}
//                 <Route 
//                   path="/dashboard" 
//                   element={
//                     <ProtectedRoute allowedEmails={["hargunkaur2863@gmail.com"]}>
//                       <Dashboard />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route 
//                   path="/dashboard/orders" 
//                   element={
//                     <ProtectedRoute allowedEmails={["hargunkaur2863@gmail.com"]}>
//                       <OrderManagement />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route path="/dashboard/products" element={<ProductManagement />} />
//                 <Route path="/dashboard/delivery" element={<DeliveryManagement />} />
//                 <Route path="/dashboard/drivers" element={<DriverPanel />} />
//                 <Route path="/dashboard/analytics" element={<Analytics />} />
//                 <Route path="/dashboard/accounting" element={<Accounting />} />
//                 <Route path="/dashboard/users" element={<UsersManagement />} />
//                 <Route path="/dashboard/orders-admin" element={<OrdersManagement />} />
//                 <Route path="/dashboard/newsletter" element={<NewsletterSubscribers />} />
//                 <Route path="/dashboard/contact-queries" element={<ContactQueries />} />
//                 <Route path="/payment" element={<Payment />} />
//                 <Route 
//                   path="/profile" 
//                   element={
//                     <ProtectedRoute>
//                       <Profile />
//                     </ProtectedRoute>
//                   } 
//                 />
//                 <Route path="*" element={<NotFound />} />
//                 <Route path="/cart" element={<Cart />} />
//               </Routes>
//               <Footer />
//             </div>
//           </BrowserRouter>
//         </CartProvider>
//       </AuthProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


// src/App.tsx
// src/App.tsx
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { useAuth, AuthProvider } from "./contexts/AuthContext";  // <-- add AuthProvider

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import OrderManagement from "./pages/OrderManagement";
import ProductManagement from "./pages/ProductManagement";
import DeliveryManagement from "./pages/DeliveryManagement";
import DriverPanel from "./pages/DriverPanel";
import Analytics from "./pages/Analytics";
import Accounting from "./pages/Accounting";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import ProductScented from "./pages/ProductScented";
import ProductRecycling from "./pages/ProductRecycling";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OTPVerification from "./pages/OTPVerification";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";
import UsersManagement from "./pages/UsersManagement";
import OrdersManagement from "./pages/OrdersManagement";
import NewsletterSubscribers from "./pages/NewsletterSubscribers";
import ContactQueries from "./pages/ContactQueries";

import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PromoBar from "./components/PromoBar";

const queryClient = new QueryClient();
const ADMIN_EMAILS = ["hargunkaur2863@gmail.com", "gursahib@pinewrap.com"];

const AppShell: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  const isAdmin =
    isAuthenticated &&
    ADMIN_EMAILS.includes((user?.email ?? '').trim().toLowerCase());

  if (isLoading) {
    return <p className="p-8 text-center">Loading…</p>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen bg-white font-satoshi">
              <PromoBar />
              <Header />
              <Routes>
                {/* Auth pages */}
                <Route
                  path="/login"
                  element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
                />
                <Route
                  path="/register"
                  element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
                />
                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route path="/password/reset/:token" element={<ResetPassword />} />
                <Route path="/otp-verification/:email/:phone" element={<OTPVerification />} />

                {/* Home (public) */}
                <Route path="/" element={<Index />} />

                {/* Public shop pages */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/product/scented" element={<ProductScented />} />
                <Route path="/product/recycling" element={<ProductRecycling />} />

                {/* Admin-only */}
                <Route
                  path="/dashboard"
                  element={
                    isAdmin
                      ? <Dashboard />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/dashboard/orders"
                  element={
                    isAdmin
                      ? <OrderManagement />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/dashboard/products"
                  element={
                    isAdmin
                      ? <ProductManagement />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/dashboard/delivery"
                  element={
                    isAdmin
                      ? <DeliveryManagement />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/dashboard/drivers"
                  element={
                    isAdmin
                      ? <DriverPanel />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/dashboard/analytics"
                  element={
                    isAdmin
                      ? <Analytics />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/dashboard/accounting"
                  element={
                    isAdmin
                      ? <Accounting />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/dashboard/users"
                  element={
                    isAdmin
                      ? <UsersManagement />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/dashboard/orders-admin"
                  element={
                    isAdmin
                      ? <OrdersManagement />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/dashboard/newsletter"
                  element={
                    isAdmin
                      ? <NewsletterSubscribers />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/dashboard/contact-queries"
                  element={
                    isAdmin
                      ? <ContactQueries />
                      : isAuthenticated
                        ? <Navigate to="/" replace />
                        : <Navigate to="/login" replace />
                  }
                />

                {/* Authed user pages */}
                <Route
                  path="/profile"
                  element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
                />

                {/* Cart & payment */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Mount the AuthProvider here so useAuth() actually has a provider.
const App: React.FC = () => (
  <AuthProvider>
    <AppShell />
  </AuthProvider>
);

export default App;


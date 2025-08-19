
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Loader2 } from 'lucide-react';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   const location = useLocation();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     // Redirect to login page with return url
//     return <Navigate to="/auth" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { Context } from "@/main";

// const ProtectedRoute = ({ children, allowedEmails }: { children: React.ReactNode, allowedEmails?: string[] }) => {
//   const { isAuthenticated, user } = useContext(Context);

//   if (!isAuthenticated || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedEmails && !allowedEmails.includes(user.email)) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedEmails?: string[]; // 👈 optional whitelist
}

const ProtectedRoute = ({ children, allowedEmails }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth(); // 👈 make sure 'user' is available in context
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 👇 If `allowedEmails` is provided and user is not on the list
  if (allowedEmails && (!user || !allowedEmails.includes(user.email))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

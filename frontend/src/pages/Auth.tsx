
// import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import LoginForm from '@/components/LoginForm';
// import RegisterForm from '@/components/RegisterForm';

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const { isAuthenticated } = useAuth();

//   // Redirect if already authenticated
//   if (isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 p-4">
//       <div className="w-full max-w-md">
//         {isLogin ? (
//           <LoginForm onToggleMode={() => setIsLogin(false)} />
//         ) : (
//           <RegisterForm onToggleMode={() => setIsLogin(true)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Auth;

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

const Auth = () => {
  const { isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Already signed-in? Kick them home.
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* --- TOGGLE BAR (the only new bit) --- */}
        <div className="flex mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-l-lg transition-colors duration-200
              ${isLogin
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-r-lg transition-colors duration-200
              ${!isLogin
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
          >
            Register
          </button>
        </div>

        {/* --- FORM SLOT --- */}
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default Auth;

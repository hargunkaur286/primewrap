
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// export interface User {
//   id: string;
//   email: string;
//   name?: string;
//   avatar?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string, name?: string) => Promise<void>;
//   logout: () => Promise<void>;
//   loginWithGoogle: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate checking for existing session on mount
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         // This would connect to your backend API
//         const token = localStorage.getItem('auth_token');
//         if (token) {
//           // Validate token with your backend
//           const response = await fetch('/api/auth/me', {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           if (response.ok) {
//             const userData = await response.json();
//             setUser(userData);
//           } else {
//             localStorage.removeItem('auth_token');
//           }
//         }
//       } catch (error) {
//         console.error('Session check failed:', error);
//         localStorage.removeItem('auth_token');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkSession();
//   }, []);

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       // This would connect to your backend API
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const { user, token } = await response.json();
//       localStorage.setItem('auth_token', token);
//       setUser(user);
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const register = async (email: string, password: string, name?: string) => {
//     setIsLoading(true);
//     try {
//       // This would connect to your backend API
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, name })
//       });

//       if (!response.ok) {
//         throw new Error('Registration failed');
//       }

//       const { user, token } = await response.json();
//       localStorage.setItem('auth_token', token);
//       setUser(user);
//     } catch (error) {
//       console.error('Registration error:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loginWithGoogle = async () => {
//     setIsLoading(true);
//     try {
//       // This would redirect to your backend's Google OAuth endpoint
//       window.location.href = '/api/auth/google';
//     } catch (error) {
//       console.error('Google login error:', error);
//       setIsLoading(false);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       // Optional: notify backend of logout
//       const token = localStorage.getItem('auth_token');
//       if (token) {
//         await fetch('/api/auth/logout', {
//           method: 'POST',
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       localStorage.removeItem('auth_token');
//       setUser(null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       isLoading,
//       isAuthenticated: !!user,
//       login,
//       register,
//       logout,
//       loginWithGoogle
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// // Define User type based on backend response
// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   accountVerified: boolean;
//   cart?: any[];
//   // add other fields you return in /me
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   // Optionally register (without OTP flow here)
//   register: (data: {
//     name: string;
//     email: string;
//     phone: string;
//     password: string;
//     verificationMethod: 'email' | 'phone';
//   }) => Promise<void>;
// }

// // Create context with default values
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
//   login: async () => {},
//   logout: async () => {},
//   register: async () => {}
// });

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch the current user on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(
//           'http://localhost:4000/api/v1/user/me',
//           { withCredentials: true }
//         );
//         setUser(res.data.user);
//         setIsAuthenticated(true);
//         return loggedInUser;
//       } catch {
//         setUser(null);
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Login function
//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       const res = await axios.post(
//         'http://localhost:4000/api/v1/user/login',
//         { email, password },
//         { withCredentials: true }
//       );
//       setUser(res.data.user);
//       setIsAuthenticated(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     setIsLoading(true);
//     try {
//       await axios.get('http://localhost:4000/api/v1/user/logout', {
//         withCredentials: true
//       });
//       setUser(null);
//       setIsAuthenticated(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Register function (initiate OTP/email verification)
//   const register = async (data: {
//     name: string;
//     email: string;
//     phone: string;
//     password: string;
//     verificationMethod: 'email' | 'phone';
//   }) => {
//     setIsLoading(true);
//     try {
//       await axios.post(
//         'http://localhost:4000/api/v1/user/register',
//         data,
//         { withCredentials: true }
//       );
//       // Caller handles navigation to OTP page
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         isLoading,
//         login,
//         logout,
//         register
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import axios from 'axios';

/* ----------------------------- Types ----------------------------- */
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  accountVerified: boolean;
  cart?: any[];
  // add other fields you return in /me if needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** Logs in and returns the logged-in user so callers can branch on roles */
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    verificationMethod: 'email' | 'phone';
  }) => Promise<void>;
  /** Re-fetch /me (handy after profile updates) */
  refreshMe: () => Promise<void>;
}

/* ----------------------------- Axios ---------------------------- */
const API_BASE = import.meta.env?.VITE_API_URL ?? 'http://localhost:4000';
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

/* ---------------------------- Context --------------------------- */
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {
    throw new Error('AuthProvider not mounted');
  },
  logout: async () => {},
  register: async () => {},
  refreshMe: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

/* --------------------------- Provider --------------------------- */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser]               = useState<User | null>(null);
  const [isAuthenticated, setAuthed]  = useState(false);
  const [isLoading, setLoading]       = useState(true);

  const refreshMe = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/v1/user/me');
      setUser(data.user as User);
      setAuthed(true);
    } catch {
      setUser(null);
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const { data } = await api.post('/api/v1/user/login', { email, password });
      const loggedInUser: User = data.user;
      setUser(loggedInUser);
      setAuthed(true);
      return loggedInUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.get('/api/v1/user/logout');
      setUser(null);
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    verificationMethod: 'email' | 'phone';
  }) => {
    setLoading(true);
    try {
      await api.post('/api/v1/user/register', payload);
      // caller handles navigation to OTP page
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, register, refreshMe }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ----------------------------- Hook ----------------------------- */
export const useAuth = () => useContext(AuthContext);

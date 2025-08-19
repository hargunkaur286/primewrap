
// import React, { useState, useContext } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { ShoppingCart, Leaf, User, LogOut } from 'lucide-react';
// import { useCart } from '@/contexts/CartContext';
// import { Context } from '../main';
// import CartDropdown from './CartDropdown';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import axios from 'axios';

// const Header = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const { getTotalItems } = useCart();
//   type UserType = {
//     avatar?: string;
//     name?: string;
//     email?: string;
//     // add other user properties if needed
//   };

//   const { user, isAuthenticated, setIsAuthenticated, setUser } = useContext(Context) as {
//     user: UserType | null;
//     isAuthenticated: boolean;
//     setIsAuthenticated: (auth: boolean) => void;
//     setUser: (user: UserType | null) => void;
//   };
//   const location = useLocation();
//   const totalItems = getTotalItems();

//   const navigation = [
//     { name: 'Home', href: '/' },
//     { name: 'Shop', href: '/shop' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   const getInitials = (name?: string, email?: string) => {
//     if (name) {
//       return name
//         .split(' ')
//         .map(part => part[0])
//         .join('')
//         .toUpperCase()
//         .slice(0, 2);
//     }
//     if (email) {
//       return email[0].toUpperCase();
//     }
//     return 'U';
//   };

//   const logout = async () => {
//     try {
//       await axios.get("http://localhost:4000/api/v1/user/logout", {
//         withCredentials: true,
//       });
//       setUser(null);
//       setIsAuthenticated(false);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-50/95 to-cyan-50/95 backdrop-blur-xl border-b border-emerald-200/30 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo */}
//           <Link to="/" className="group flex items-center space-x-3 transform-gpu hover:scale-105 transition-all duration-300">
//             <div className="relative perspective-1000">
//               <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transform-gpu group-hover:rotate-y-12 transition-transform duration-500 transform-style-preserve-3d">
//                 <Leaf className="w-6 h-6 text-white transform-gpu group-hover:scale-110 transition-transform duration-300" />
//                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl -z-10 translate-x-1 translate-y-1 opacity-60"></div>
//               </div>
//             </div>
//             <div className="font-bold text-2xl tracking-tight">
//               <span className="bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent">
//                 PRIME
//               </span>
//               <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
//                 WRAP
//               </span>
//             </div>
//           </Link>

//           {/* Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`relative text-sm font-semibold transition-all duration-300 transform-gpu hover:scale-105 ${
//                   location.pathname === item.href
//                     ? 'text-emerald-700'
//                     : 'text-slate-700 hover:text-emerald-600'
//                 } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-emerald-500 after:to-cyan-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Right side - Cart and Auth */}
//           <div className="flex items-center space-x-4">
//             {/* Cart */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsCartOpen(!isCartOpen)}
//                 className="group relative p-3 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-2xl text-emerald-700 hover:from-emerald-200 hover:to-cyan-200 transition-all duration-300 transform-gpu hover:scale-110 hover:rotate-6 shadow-lg"
//               >
//                 <ShoppingCart size={24} className="transform-gpu group-hover:scale-110 transition-transform duration-300" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
//                     {totalItems}
//                   </span>
//                 )}
//                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-cyan-200/50 rounded-2xl -z-10 translate-x-1 translate-y-1"></div>
//               </button>
//               <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//             </div>

//             {/* Authentication */}
//             {isAuthenticated && user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="relative h-12 w-12 rounded-full">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src={user.avatar} alt={user.name || user.email} />
//                       <AvatarFallback>
//                         {getInitials(user.name, user.email)}
//                       </AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56" align="end" forceMount>
//                   <DropdownMenuLabel className="font-normal">
//                     <div className="flex flex-col space-y-1">
//                       <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
//                       <p className="text-xs leading-none text-muted-foreground">
//                         {user.email}
//                       </p>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem asChild>
//                     <Link to="/profile" className="cursor-pointer">
//                       <User className="mr-2 h-4 w-4" />
//                       <span>Profile</span>
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={logout} className="cursor-pointer">
//                     <LogOut className="mr-2 h-4 w-4" />
//                     <span>Log out</span>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Link to="/login">
//                 <Button variant="outline" className="bg-gradient-to-r from-emerald-100 to-cyan-100 border-emerald-200 hover:from-emerald-200 hover:to-cyan-200 text-emerald-700">
//                   <User className="mr-2 h-4 w-4" />
//                   Sign In
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <div className="md:hidden border-t border-emerald-200/30 bg-gradient-to-r from-emerald-50/90 to-cyan-50/90 backdrop-blur-sm">
//         <nav className="flex justify-around py-4">
//           {navigation.map((item) => (
//             <Link
//               key={item.name}
//               to={item.href}
//               className={`text-xs font-semibold transition-all duration-300 transform-gpu hover:scale-105 ${
//                 location.pathname === item.href
//                   ? 'text-emerald-700'
//                   : 'text-slate-700 hover:text-emerald-600'
//               }`}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, User as UserIcon, LogOut } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import CartDropdown from './CartDropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';     // ← import your hook

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();  // ← get logout from context
  const location = useLocation();
  const totalItems = getTotalItems();

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase();
    }
    if (email) return email[0].toUpperCase();
    return 'U';
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-50/95 to-cyan-50/95 backdrop-blur-xl border-b border-emerald-200/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-cyan-700">PRIME</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-emerald-600">WRAP</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {['/', '/shop', '/about', '/contact'].map(href => {
            const name = href === '/' ? 'Home' : href.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            const active = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`relative font-semibold transition hover:scale-105 ${
                  active ? 'text-emerald-700' : 'text-slate-700 hover:text-emerald-600'
                }`}
              >
                {name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 transform ${active ? 'scale-x-100' : 'scale-x-0'} transition-transform`} />
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <div className="relative">
            <Button
              variant="ghost"
              className="relative p-3 bg-emerald-100 rounded-2xl hover:bg-emerald-200 transition"
              onClick={() => setIsCartOpen(o => !o)}
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>

          {/* Auth */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-1 rounded-full">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name || user.email} />
                    <AvatarFallback>{getInitials(user.name, user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name || 'User'}</span>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center space-x-2">
                    <UserIcon size={16} /> <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => logout()} className="flex items-center space-x-2">
                  <LogOut size={16} /> <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="flex items-center space-x-2">
                <UserIcon size={16} /> <span>Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden border-t border-emerald-200/30 bg-emerald-50/90 backdrop-blur-sm">
        <nav className="flex justify-around py-3">
          {['/', '/shop', '/about', '/contact'].map(href => (
            <Link
              key={href}
              to={href}
              className={`text-sm font-semibold ${
                location.pathname === href ? 'text-emerald-700' : 'text-slate-700'
              }`}
            >
              {href === '/' ? 'Home' : href.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, LogOut, Menu } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import CartDropdown from './CartDropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
    <header className="sticky top-5 z-40 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 sm:h-20 items-center justify-between gap-2">
        {/* Logo */}
        <Link to="/" className="group flex items-center space-x-3 hover:scale-105 transition">
          <img
            src="/uploads/logo-48.webp"
            srcSet="/uploads/logo-36.webp 36w, /uploads/logo-48.webp 48w, /uploads/logo-64.webp 64w, /uploads/logo-96.webp 96w, /uploads/logo-128.webp 128w"
            sizes="(max-width: 640px) 36px, 48px"
            width={48}
            height={48}
            alt="Pinewrap Logo"
            className="w-9 h-9 sm:w-12 sm:h-12 object-contain"
            decoding="async"
          />
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight">
            <span className="text-foreground">PINE</span>
            <span className="text-primary">WRAP</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {['/', '/shop', '/contact'].map(href => {
            const name = href === '/' ? 'Home' : href.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            const active = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`relative font-semibold transition hover:scale-105 ${
                  active ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                {name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform ${active ? 'scale-x-100' : 'scale-x-0'} transition-transform`} />
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Cart */}
          <div className="relative">
            <Button
              variant="ghost"
              className="relative p-2 sm:p-3 bg-muted rounded-2xl hover:bg-muted/80 transition"
              onClick={() => setIsCartOpen(o => !o)}
            >
              <ShoppingCart size={20} className="sm:hidden" />
              <ShoppingCart size={24} className="hidden sm:block" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
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
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                collisionPadding={12}
                className="w-56 max-w-[calc(100vw-1.5rem)]"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium truncate">{user.name || 'User'}</span>
                    <span className="text-sm text-muted-foreground truncate" title={user.email}>
                      {user.email}
                    </span>
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
                <UserIcon size={16} /> <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
          )}

          {/* Mobile hamburger (right-most on mobile) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden p-2 rounded-2xl bg-muted hover:bg-muted/80 transition"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-foreground">Menu</div>
                </div>

                <nav className="flex flex-col gap-3">
                  {[
                    { href: '/', label: 'Home' },
                    { href: '/shop', label: 'Shop' },
                    { href: '/contact', label: 'Contact' },
                  ].map(({ href, label }) => (
                    <SheetClose asChild key={href}>
                      <Link
                        to={href}
                        className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted ${
                          location.pathname === href ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, ShoppingCart, User, Menu, X, Package, 
  ChevronDown, LogIn, Settings, ShoppingBag 
} from 'lucide-react';
import { 
  Button, 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-subtle py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-bold text-2xl transition-transform duration-300 hover:scale-105"
        >
          <Package className="h-8 w-8" />
          <span className="hidden sm:inline">ToyWorld</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/catalog" 
            className={`font-medium transition-colors hover:text-primary ${
              location.pathname === '/catalog' ? 'text-primary' : ''
            }`}
          >
            Catalog
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="font-medium flex items-center space-x-1 transition-colors hover:text-primary">
              <span>Categories</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="glass-panel w-56 animate-scale-in">
              <DropdownMenuItem asChild>
                <Link to="/catalog?category=educational-toys" className="cursor-pointer">
                  Educational Toys
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/catalog?category=building-blocks" className="cursor-pointer">
                  Building Blocks
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/catalog?category=board-games" className="cursor-pointer">
                  Board Games
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/catalog?category=action-figures" className="cursor-pointer">
                  Action Figures
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/catalog" className="cursor-pointer">
                  View All Categories
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link 
            to="/about" 
            className={`font-medium transition-colors hover:text-primary ${
              location.pathname === '/about' ? 'text-primary' : ''
            }`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium transition-colors hover:text-primary ${
              location.pathname === '/contact' ? 'text-primary' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Search, Cart, and User Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="glass-panel">
              <div className="container mx-auto max-w-lg py-6">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search for toys..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="glass-input w-full py-3 px-5 pr-12 rounded-full focus:outline-none focus:ring-2"
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    variant="ghost" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>

          {/* Cart */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-panel w-56 animate-scale-in">
                <div className="p-2 text-center border-b">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="cursor-pointer">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-panel">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <Link to="/" className="flex items-center space-x-2 font-bold text-2xl">
                    <Package className="h-7 w-7" />
                    <span>ToyWorld</span>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </SheetClose>
                </div>
                
                <nav className="flex flex-col space-y-6 text-lg">
                  <Link to="/catalog" className="flex items-center">
                    <ShoppingBag className="mr-3 h-5 w-5" />
                    <span>Catalog</span>
                  </Link>
                  <div className="space-y-3 pl-8">
                    <Link to="/catalog?category=educational-toys" className="block">
                      Educational Toys
                    </Link>
                    <Link to="/catalog?category=building-blocks" className="block">
                      Building Blocks
                    </Link>
                    <Link to="/catalog?category=board-games" className="block">
                      Board Games
                    </Link>
                    <Link to="/catalog?category=action-figures" className="block">
                      Action Figures
                    </Link>
                  </div>
                  <Link to="/about" className="flex items-center">
                    <span>About</span>
                  </Link>
                  <Link to="/contact" className="flex items-center">
                    <span>Contact</span>
                  </Link>
                </nav>

                <div className="mt-auto pt-6 border-t">
                  {user ? (
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <Link 
                          to="/account" 
                          className="flex items-center"
                        >
                          <User className="mr-3 h-5 w-5" />
                          <span>My Account</span>
                        </Link>
                        <Link 
                          to="/orders" 
                          className="flex items-center"
                        >
                          <ShoppingBag className="mr-3 h-5 w-5" />
                          <span>My Orders</span>
                        </Link>
                        {user.role === 'admin' && (
                          <Link 
                            to="/admin/dashboard" 
                            className="flex items-center"
                          >
                            <Settings className="mr-3 h-5 w-5" />
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        <button 
                          onClick={logout}
                          className="flex items-center text-left"
                        >
                          <LogIn className="mr-3 h-5 w-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <Link 
                        to="/login"
                        className="w-full py-2 border border-input rounded-full text-center transition-colors hover:bg-secondary"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register"
                        className="w-full py-2 bg-primary text-primary-foreground rounded-full text-center transition-colors hover:bg-primary/90"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

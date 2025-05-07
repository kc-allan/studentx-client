
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, User, Menu, X } from "lucide-react";
import { categories } from "@/data/mockData";

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  // checks if page is scrolled from top
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 ${!isScrolled ? 'rounded-md w-[96%] top-3' : 'w-full'} bg-white shadow-lg z-50 transition-all duration-300 h-35`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">
              Student<span className="text-black shadow-lg">X</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-cols-2 gap-2 p-4 w-[400px]">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/categories/${category.slug}`}
                              className="block p-2 hover:bg-primary-100 rounded-md"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/featured" className="p-2">
                        Featured Deals
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/new" className="p-2">
                        New Deals
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/how-it-works" className="p-2">
                        How It Works
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search deals..."
                    className="pl-10 max-w-[200px]"
                  />
                </div>

                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <User className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/saved">Saved Deals</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setIsLoggedIn(false)}
                        className="text-red-500"
                      >
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsLoggedIn(true)}
                    >
                      Log In
                    </Button>
                    <Button onClick={() => setIsLoggedIn(true)}>Sign Up</Button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search deals..."
                  className="pl-10"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Link
                  to="/categories"
                  className="px-2 py-2 hover:bg-primary-100"
                >
                  Categories
                </Link>
                <Link
                  to="/featured"
                  className="px-2 py-2 hover:bg-primary-100"
                >
                  Featured Deals
                </Link>
                <Link to="/new" className="px-2 py-2 hover:bg-primary-100">
                  New Deals
                </Link>
                <Link
                  to="/how-it-works"
                  className="px-2 py-2 hover:bg-primary-100"
                >
                  How It Works
                </Link>
              </div>

              <div className="pt-2 border-t">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-2 py-2 hover:bg-primary-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/saved"
                      className="block px-2 py-2 hover:bg-primary-100"
                    >
                      Saved Deals
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-2 py-2 hover:bg-primary-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full text-left px-2 py-2 text-red-500 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsLoggedIn(true)}
                      className="w-full"
                    >
                      Log In
                    </Button>
                    <Button
                      onClick={() => setIsLoggedIn(true)}
                      className="w-full"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

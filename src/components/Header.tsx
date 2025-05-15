import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
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
import { Search, User, Menu, X, Zap } from "lucide-react";
import { categories } from "@/data/mockData";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setLogout } from "@/state/auth";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, isAuthenticated } = useSelector((state: RootState) => {
    return {
      currentUser: state.auth.user,
      isAuthenticated: !!state.auth.user,
    };
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background shadow-sm' : 'bg-background-subtle w-[96%] mt-4 rounded-lg backdrop-blur-sm py-2'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 min-w-max">
            <Zap className="h-6 w-6 text-brand-primary" />
            <h1 className="text-xl font-bold text-text-primary">
              Student<span className="text-brand-primary">X</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm lg:text-base text-text-primary hover:text-brand-primary data-[state=open]:text-brand-primary">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-lg border border-border bg-background w-[280px] lg:w-[400px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-4">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          replace={false}
                          to={`/deals?filters=${category.slug}`}
                          className="block p-3 rounded-md hover:bg-background-soft text-text-primary transition-colors text-sm lg:text-base"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <Link
                  to="/deals?filters=featured"
                  className="text-sm lg:text-base font-medium text-text-primary hover:text-brand-primary transition-colors px-3 py-2 whitespace-nowrap"
                >
                  Featured
                </Link>
                <Link
                  to="/deals?filters=new-arrivals"
                  className="text-sm lg:text-base font-medium text-text-primary hover:text-brand-primary transition-colors px-3 py-2 whitespace-nowrap"
                >
                  New Deals
                </Link>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-light h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search deals..."
                  className="pl-10 w-32 lg:w-48 text-sm h-9 border-border focus:border-brand-primary"
                />
              </div>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-background-soft"
                    >
                      <User className="h-4 w-4 text-text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border-border bg-background min-w-[180px]"
                  >
                    <DropdownMenuLabel className="text-text-primary">
                      {currentUser.first_name} {currentUser.last_name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem className="hover:bg-background-soft">
                      <Link to="/dashboard" className="w-full text-text-primary">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-background-soft">
                      <Link to="/saved" className="w-full text-text-primary">
                        Saved Deals
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-background-soft">
                      <Link to="/settings" className="w-full text-text-primary">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem
                      onClick={() => {
                        dispatch(setLogout());
                      }}
                      className="text-brand-danger hover:bg-red-50"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/auth?page=login')}
                    className="border-border text-text-primary hover:bg-background-soft whitespace-nowrap text-sm h-9 px-3"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => navigate('/auth?page=signup')}
                    className="bg-brand-primary hover:bg-brand-secondary text-text-inverted whitespace-nowrap text-sm h-9 px-3"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-background-soft"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-text-primary" />
              ) : (
                <Menu className="h-5 w-5 text-text-primary" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col space-y-3 mt-4">
              <div className="relative px-2">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-light h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search deals..."
                  className="pl-10 w-full text-sm h-10 border-border"
                />
              </div>

              <nav className="flex flex-col space-y-1 px-2">
                <Link
                  to="/categories"
                  className="px-3 py-2 rounded-md text-text-primary hover:bg-background-soft"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  to="/featured"
                  className="px-3 py-2 rounded-md text-text-primary hover:bg-background-soft"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Featured Deals
                </Link>
                <Link
                  to="/new"
                  className="px-3 py-2 rounded-md text-text-primary hover:bg-background-soft"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Deals
                </Link>
              </nav>

              <div className="pt-3 border-t border-border px-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 rounded-md text-text-primary hover:bg-background-soft"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/saved"
                      className="block px-3 py-2 rounded-md text-text-primary hover:bg-background-soft"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Saved Deals
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(setLogout());
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-brand-danger hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/auth?page=login')}
                      className="w-full border-border text-text-primary hover:bg-background-soft"
                    >
                      Log In
                    </Button>
                    <Button
                      onClick={() => navigate('/auth?page=signup')}
                      className="w-full bg-brand-primary hover:bg-brand-secondary text-text-inverted"
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
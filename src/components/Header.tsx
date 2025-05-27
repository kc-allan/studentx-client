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
import { RootState } from "@/state";
import { setLogout } from "@/state/auth";

type HeaderProps = {
  sx?: string;
};

const Header: React.FC<HeaderProps> = ({ sx }) => {
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
    <header className={`${sx} fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-100 shadow-sm w-full' : 'bg-slate-100/90 w-[96%] mt-4 rounded-xl backdrop-blur-sm'}`}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo with better visual hierarchy */}
          <Link to="/" className="flex items-center space-x-2 min-w-max">
            <Zap className="h-6 w-6 text-brand-primary animate-pulse" />
            <h1 className="text-xl font-bold text-gray-900">
              Student<span className="text-brand-primary">X</span>
            </h1>
          </Link>

          {/* Desktop Navigation with improved dropdowns */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm lg:text-base text-gray-900 hover:text-brand-primary data-[state=open]:text-brand-primary">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-xl border border-gray-200 bg-white w-[280px] md:w-[400px] p-4">
                    <div className="grid grid-cols-2 gap-3 z-40">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/deals?filters=${category.slug}`}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 text-gray-800 transition-colors text-sm lg:text-base"
                        >
                          <span className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mr-3">
                            {(category.name[0])}
                          </span>
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/deals?filters=featured"
              className="text-sm lg:text-base font-medium text-gray-900 hover:text-brand-primary transition-colors px-3 py-2 whitespace-nowrap"
            >
              Featured
            </Link>
            <Link
              to="/deals?filters=new-arrivals"
              className="text-sm lg:text-base font-medium text-gray-900 hover:text-brand-primary transition-colors px-3 py-2 whitespace-nowrap"
            >
              New Deals
            </Link>
          </nav>

          {/* Search and Auth with better thumb zone placement */}
          <div className="flex items-center space-x-3">
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search deals..."
                className="pl-10 w-32 lg:w-48 text-sm h-10 border-gray-300 focus:border-brand-primary rounded-lg"
              />
            </div> */}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100 rounded-full w-10 h-10"
                  >
                    <User className="h-5 w-5 text-gray-700" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border-gray-200 bg-white min-w-[200px] rounded-xl shadow-lg p-2"
                >
                  <DropdownMenuLabel className="text-gray-900 font-medium">
                    <Link to="/me" className="w-full text-gray-700">
                      {currentUser.first_name} {currentUser.last_name}
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-100" />
                  {/* <DropdownMenuItem className="hover:bg-gray-50 rounded-lg">
                    <Link to="/dashboard" className="w-full text-gray-700">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-50 rounded-lg">
                    <Link to="/saved" className="w-full text-gray-700">
                      Saved Deals
                    </Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator className="bg-gray-100" />
                  <DropdownMenuItem
                    onClick={() => dispatch(setLogout())}
                    className="text-red-600 hover:bg-red-50 rounded-lg"
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
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 whitespace-nowrap text-sm h-10 px-4 rounded-lg"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate('/auth?page=signup')}
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white whitespace-nowrap text-sm h-10 px-4 rounded-lg shadow-sm"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

  );
};

export default Header;
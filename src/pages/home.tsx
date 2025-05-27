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
import { Search, User, Menu, X, Zap, ShieldCheck, ArrowRight, ShoppingCart, BadgeCheck, Star, Quote, UserPlus, ChevronDown } from "lucide-react";
import { categories } from "@/data/mockData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state";
import { setLogout } from "@/state/auth";
import { Offer } from "@/types/offer";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/api/axios";
import OfferCard from "@/components/offers/OfferCard";
import OfferCardSkeleton from "@/components/offers/OfferCardSkeleton";
import EmptyState from "@/components/EmptyState";
import { Badge, Card, CardContent } from "@mui/material";
import { Merchant } from "@/types/user";
import UserAvatar from "@/components/UserAvatar";
import SignUpBanner from "@/components/SignUpBanner";


const Index = () => {
  return (
	<div className="min-h-screen flex flex-col items-center w-full bg-gray-50">
	  <Header />
	  <main className="flex-grow flex flex-col items-center justify-center w-full">
		<Hero />
		<HowItWorks />
		<FeaturedOffers />
		<LatestOffers />
		<CategoryList />
		<ProviderHighlights />
		<TestimonialsSection />
	  </main>
	  <Footer />
	</div>
  );
};

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
					{currentUser.first_name} {currentUser.last_name}
				  </DropdownMenuLabel>
				  <DropdownMenuSeparator className="bg-gray-100" />
				  <DropdownMenuItem className="hover:bg-gray-50 rounded-lg">
					<Link to="/dashboard" className="w-full text-gray-700">
					  Dashboard
					</Link>
				  </DropdownMenuItem>
				  <DropdownMenuItem className="hover:bg-gray-50 rounded-lg">
					<Link to="/saved" className="w-full text-gray-700">
					  Saved Deals
					</Link>
				  </DropdownMenuItem>
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
}

const Hero = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const popularSearches = ["Apple", "Nike", "Spotify", "Adobe", "Uber Eats"];

  return (
	<>

	  <section className="relative w-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white overflow-hidden min-h-screen lg:pt-12 pt-20">
		{/* Abstract background with subtle animation */}
		<div className="absolute inset-0 overflow-hidden opacity-15">
		  <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxwYXRoIGQ9Ik0tMTAgLTEwIEwyMCAtMTAgTDIwIDIwIEwtMTAgMjAgWiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] animate-very-slow-pan"></div>
		</div>


		<div className="px-4 md:px-12 py-8 md:py-12 lg:py-16 relative z-10 container mx-auto">
		  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 min-h-[80vh]">
			{/* Left side content */}
			<div className="flex-1 space-y-6 max-w-2xl">
			  <div className="inline-flex items-center bg-gradient-to-r from-brand-primary to-gray-700 text-white text-sm font-medium px-4 py-1.5 rounded-full">
				<BadgeCheck className="h-4 w-4 mr-2" />
				<span>Student Exclusive Verified</span>
			  </div>

			  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
				<span className="text-transparent bg-clip-text bg-brand-primary">X</span>clusive
				<div className="text-transparent bg-clip-text bg-brand-primary">student discounts</div>
				<span>just for you</span>
			  </h1>

			  <p className="mb-8 text-neutral-300 max-w-2xl leading-relaxed">
				Access <span className="font-semibold text-white">thousands of verified student deals</span> from your favorite brands. Save on software, fashion, food subscriptions, and more with your student status.
			  </p>

			  {/* Search bar */}
			  <div className="relative max-w-full">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				  <Search className="h-5 w-5 text-neutral-400" />
				</div>
				<Input
				  type="text"
				  className="block w-full pl-10 pr-4 py-6 bg-white/5 border border-neutral-400 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder-neutral-400"
				  placeholder="Search for brands or categories..."
				  value={searchQuery}
				  onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<div className="absolute right-2 top-1/2 transform -translate-y-1/2">
				  <Button className="bg-brand-primary hover:bg-brand-primary/70 text-white font-medium rounded-lg px-4 py-2">
					Search
				  </Button>
				</div>
			  </div>

			  <div className="flex flex-wrap items-center gap-2 mt-2">
				<span className="text-sm text-neutral-400">Popular Searches: </span>
				{popularSearches.map((search) => (
				  <button
					key={search}
					onClick={() => setSearchQuery(search)}
					className="text-sm text-neutral-300 hover:text-white px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
				  >
					{search}
				  </button>
				))}
			  </div>

			  {/* CTA buttons */}
			  <div className="flex flex-col sm:flex-row gap-4 mt-8">
				<Button asChild size="lg" className="bg-gradient-to-r from-brand-primary to-brand-primary/70 hover:from-brand-primary/70 hover:to-brand-primary text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-300">
				  <a href="/auth?page=signup">Get Started — It's Free</a>
				</Button>
				<Button 
				  onClick={() => {
					const element = document.getElementById("how-it-works");
					if (element) {
					  element.scrollIntoView({ behavior: "smooth" });
					}
				  }} 
				  asChild 
				  size="lg" 
				  variant="outline" 
				  className="cursor-pointer border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-lg"
				>
				  <span className="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					  <circle cx="12" cy="12" r="10"></circle>
					  <polygon points="10 8 16 12 10 16 10 8"></polygon>
					</svg>
					See How It Works
				  </span>
				</Button>
			  </div>

			  {/* Trust badges */}
			  <div className="mt-8 flex flex-col gap-4">
				<div className="flex items-center gap-3 text-sm text-neutral-300">
				  <div className="flex items-center gap-1">
					<ShieldCheck className="h-4 w-4 text-emerald-400" />
					<span>Verified student discounts</span>
				  </div>
				  <div className="h-4 w-px bg-white/20"></div>
				  <div className="flex items-center gap-1">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
					  <polyline points="22 4 12 14.01 9 11.01"></polyline>
					</svg>
					<span>100% free to use</span>
				  </div>
				</div>

				<div className="flex flex-wrap gap-6 items-center">
				  <img 
					alt="Google" 
					className="h-6 opacity-80 hover:opacity-100 transition-opacity" 
					src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
					loading="lazy"
				  />
				  <img 
					alt="Coursera" 
					className="h-8 w-24 opacity-80 hover:opacity-100 transition-opacity" 
					src="https://upload.wikimedia.org/wikipedia/commons/2/21/Coursera-logo_500x500.svg" 
					loading="lazy"
				  />
				  <img 
					alt="Udemy" 
					className="h-8 opacity-80 hover:opacity-100 transition-opacity bg-white p-0.5 rounded" 
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/2560px-Udemy_logo.svg.png" 
					loading="lazy"
				  />
				  <img 
					alt="Nike" 
					className="h-8 opacity-80 hover:opacity-100 transition-opacity" 
					src="https://cdn.simpleicons.org/nike/white" 
					loading="lazy"
				  />
				  <img 
					alt="Spotify" 
					className="h-6 opacity-80 hover:opacity-100 transition-opacity" 
					src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" 
					loading="lazy"
				  />
				</div>
			  </div>
			</div>

			{/* Right side - Benefits cards with images */}
			<div className="flex-1 relative max-w-full lg:mx-0">
			  <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
			  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"></div>

			  <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10 overflow-hidden">
				{/* Quick stats */}
				<div className="hidden relative bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-xl p-6 text-center overflow-hidden">
				  <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
				  <div className="flex justify-center gap-4 lg:gap-8">
					<div className="space-y-1">
					  <p className="text-3xl font-bold text-white">10k+</p>
					  <p className="text-sm text-neutral-300">Verified Deals</p>
					</div>
					<div className="space-y-1">
					  <p className="text-3xl font-bold text-white">500+</p>
					  <p className="text-sm text-neutral-300">Premium Brands</p>
					</div>
					<div className="space-y-1">
					  <p className="text-3xl font-bold text-white">100%</p>
					  <p className="text-sm text-neutral-300">Free Access</p>
					</div>
				  </div>
				</div>

				{/* Benefit cards with images */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
				  <BenefitCard
					image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mdHdhcmUlMjBkaXNjb3VudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
					title="Tech & Software"
					description="Up to 90% off on essential tools"
					stats="2,340+ deals"
				  />
				  <BenefitCard
					image="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbiUyMGRpc2NvdW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
					title="Fashion & Apparel"
					description="Exclusive student pricing"
					stats="1,850+ deals"
				  />
				  <BenefitCard
					image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGRpc2NvdW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
					title="Food & Dining"
					description="Daily meal savings"
					stats="980+ deals"
				  />
				  <BenefitCard
					image="https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3MlMjBkaXNjb3VudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
					title="Books & Courses"
					description="Academic essentials"
					stats="3,120+ deals"
				  />
				</div>

				{/* Trust indicators */}
				<div className="mt-6 flex flex-col items-center gap-2 text-sm text-neutral-300 bg-white/5 rounded-lg p-3 border border-white/10">
				  <div className="flex items-center gap-2">
					<div className="flex items-center justify-center w-8 h-8 bg-emerald-500/10 rounded-full">
					  <ShieldCheck className="h-4 w-4 text-emerald-400" />
					</div>
					<span>All deals verified for students</span>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>

		{/* Bottom wave decoration */}
		<div className="absolute bottom-0 left-0 w-full overflow-hidden">
		  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16">
			<path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white opacity-5"></path>
		  </svg>
		</div>
	  </section>
	</>
  );
};

const BenefitCard = ({ image, title, description, stats }) => (
  <div className="group relative overflow-hidden rounded-xl hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 border border-white/10">
	<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 z-10"></div>
	<img 
	  src={image} 
	  alt={title} 
	  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
	  loading="lazy"
	/>
	<div className="absolute bottom-0 left-0 p-4 z-20 w-full">
	  <div className="flex justify-between items-end">
		<div>
		  <h3 className="font-bold text-white">{title}</h3>
		  <p className="text-sm text-neutral-300">{description}</p>
		</div>
		<span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">{stats}</span>
	  </div>
	</div>
  </div>
);

const HowItWorks = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);
  const steps = [
	{
	  title: "Sign Up",
	  description: "Create your free account with your student email",
	  icon: <UserPlus className="h-6 w-6" />,
	},
	{
	  title: "Verify",
	  description: "Confirm your student status instantly",
	  icon: <BadgeCheck className="h-6 w-6" />,
	},
	{
	  title: "Browse",
	  description: "Discover thousands of exclusive deals",
	  icon: <Search className="h-6 w-6" />,
	},
	{
	  title: "Save",
	  description: "Use your discounts and save money",
	  icon: <Zap className="h-6 w-6" />,
	},
  ];

  return (
	<section id="how-it-works" className="pt-16 w-full bg-white">
	  <div className="container w-full px-4 mx-auto">
		<div className="text-center mb-12">
		  <h2 className="text-3xl font-bold text-gray-900 mb-4">How StudentX Works</h2>
		  <p className="text-gray-600 max-w-2xl mx-auto">
			Get started in minutes and start saving on everything you need
		  </p>
		</div>

		<div className="relative">
		  {/* Progress line */}
		  <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gray-200 z-0 mx-16"></div>

		  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
			{steps.map((step, index) => (
			  <div key={index} className="flex flex-col items-center">
				<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm w-full h-full transition-all hover:shadow-md">
				  <div className="bg-brand-primary/10 text-brand-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
					{step.icon}
				  </div>
				  <div className="text-center">
					<div className="md:hidden bg-gray-100 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3 mx-auto">
					  {index + 1}
					</div>
					<h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
					<p className="text-gray-600">{step.description}</p>
				  </div>
				</div>

				{index < steps.length - 1 && (
				  <div className="md:hidden mt-4 mb-4">
					<ChevronDown className="text-gray-300 h-6 w-6" />
				  </div>
				)}
			  </div>
			))}
		  </div>
		</div>
		{!isAuthenticated && (
		  <div className="mt-16 text-center">
			<Button className="bg-brand-primary hover:bg-brand-primary/90 px-8 py-6 text-white text-lg">
			  Join Now & Start Saving
			</Button>
		  </div>
		)}
	  </div>
	</section>
  );
};

const FeaturedOffers = () => {
  const [featuredOffers, setFeaturedOffers] = React.useState<Offer[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchFeaturedOffers = async () => {
    try {
      const response = await axiosInstance.get('/offer/featured');
      setFeaturedOffers(response.data);
    } catch (error) {
      toast({
        title: "Error fetching featured offers",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchFeaturedOffers();
  }, []);

  return (
    <section className="pt-16 pb-4 w-full bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Student Deals</h2>
            <p className="text-gray-600 max-w-lg">
              Exclusive discounts handpicked for students
            </p>
          </div>
          <Link to="/featured">
            <Button
              variant="outline"
              className="mt-4 md:mt-0 border-brand-primary text-brand-primary hover:bg-brand-primary/5"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <OfferCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredOffers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<ShoppingCart className="h-12 w-12 text-gray-400" />}
            title="No featured deals right now"
            description="Check back later for new student discounts"
            action={
              <Button className="bg-brand-primary hover:bg-brand-primary/90">
                Browse All Deals
              </Button>
            }
          />
        )}
      </div>
    </section>
  );
};

const LatestOffers = () => {
  const [recentOffers, setRecentOffers] = React.useState<Offer[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchRecentOffers = async () => {
	try {
	  setLoading(true);
	  const response = await axiosInstance.get('/offer/latest');
	  if (response.status !== 200) {
		throw new Error(response.data.message || 'An error occurred while fetching recent offers');
	  }
	  const offers = response.data.data;
	  setRecentOffers(offers);
	} catch (error) {
	  console.error(error);
	  toast({
		title: error.response.data?.message || error.message || "An error occurred",
		description: error.response.data?.message || "Something went wrong while getting recent offers. It's not you it's us",
		variant: `${error.response.status.toLocaleString().startsWith(4) ? "warning" : "destructive"}`
	  });
	} finally {
	  setLoading(false);
	}
  }

  React.useEffect(() => {
	fetchRecentOffers();
  }, []);

  return (
	<section className="pt-16 pb-4 w-full bg-gray-50">
	  <div className="container px-4 mx-auto">
		<div className="flex flex-col md:flex-row justify-between items-center mb-10">
		  <div className="text-center md:text-left">
			<h2 className="text-3xl font-bold text-gray-900 mb-2">Fresh Deals</h2>
			<p className="text-gray-600 max-w-lg">
			  Just added - don't miss these exclusive discounts
			</p>
		  </div>
		  <Link to="/deals?filters=latest">
			<Button
			  variant="outline"
			  className="mt-4 md:mt-0 border-brand-primary text-brand-primary hover:bg-brand-primary/5"
			>
			  View All <ArrowRight className="ml-2 h-4 w-4" />
			</Button>
		  </Link>
		</div>

		{loading ? (
		  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{[...Array(4)].map((_, i) => (
			  <OfferCardSkeleton key={i} />
			))}
		  </div>
		) : recentOffers.length > 0 ? (
		  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{recentOffers.map((offer) => (
			  <OfferCard key={offer.id} offer={offer} />
			))}
		  </div>
		) : (
		  <EmptyState
			icon={<ShoppingCart className="h-12 w-12 text-gray-400" />}
			title="No featured deals right now"
			description="Check back later for new student discounts"
			action={
			  <Button className="bg-brand-primary hover:bg-brand-primary/90">
				Browse All Deals
			  </Button>
			}
		  />
		)}
	  </div>
	</section>
  );
}

const getCategoryInitials = (name: string) => {
  return name
	.split(" ")
	.map((word) => word.replace(/[^a-zA-Z]/g, ""))
	.filter(Boolean)
	.map((word) => word[0])
	.join("")
	.toUpperCase();
};

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const fetchCategories = async () => {
	try {
	  const response = await axiosInstance.get('/offer/categories');
	  if (response.status !== 200) {
		throw new Error(response.data.message || 'An error occurred while fetching offer categories');
	  }
	  const categories = response.data.data
	  setCategories(categories);
	} catch (error) {
	  console.error(error)
	  toast({
		title: error.response.data?.message || error.message || "An error occurred",
		description: error.response.data?.message || "Something went wrong while getting offer categories. It's not you it's us",
		variant: `${error.response.status.toLocaleString().startsWith(4) ? "warning" : "destructive"}`
	  })
	}
  }

  React.useEffect(() => {
	fetchCategories();
  }, [])
  return (
	<section
	  aria-labelledby="category-heading"
	  className="py-12 bg-background-subtle w-full"
	>
	  <div className="container  px-4">
		<div className="text-center mb-10">
		  <h2
			id="category-heading"
			className="text-3xl font-bold text-text-primary"
		  >
			Popular Categories
		  </h2>
		  <p className="text-neutral-medium mt-2">
			Explore deals in your favorite categories
		  </p>
		</div>

		<div
		  role="grid"
		  aria-label="Category navigation"
		  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
		>
		  {categories.slice(0, 5).map((category) => {
			const initials = getCategoryInitials(category.name);
			return (
			  <Link
				to={`/deals?category=${category.slug}`}
				key={category.id}
				className="group outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-xl"
				aria-label={`Browse ${category.name} deals`}
			  >
				<div
				  role="gridcell"
				  className="flex flex-col items-center justify-center p-6 border border-border rounded-xl hover:border-brand-accent transition-all bg-background hover:bg-background-soft h-full"
				>
				  <Badge
					aria-hidden="true"
					className="h-14 w-14 rounded-full flex items-center justify-center bg-neutral-300 text-brand-primary group-hover:bg-brand-primary group-hover:text-neutral-300 text-lg font-bold mb-3"
				  >
					{initials}
				  </Badge>
				  <span className="text-sm font-medium text-center text-text-primary">
					{category.name}
				  </span>
				</div>
			  </Link>
			);
		  })}

		  <Link
			to="/categories"
			className="group outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-xl"
			aria-label="View all categories"
		  >
			<div
			  role="gridcell"
			  className="flex flex-col items-center justify-center p-6 border border-border rounded-xl hover:border-brand-accent transition-all bg-background hover:bg-background-soft h-full"
			>
			  <Badge
				aria-hidden="true"
				className="h-14 w-14 rounded-full flex items-center justify-center bg-background-softer text-brand-primary group-hover:bg-brand-primary group-hover:text-white mb-3"
			  >
				<ArrowRight className="h-6 w-6" />
			  </Badge>
			  <span className="text-sm font-medium text-center text-text-primary">
				View All
			  </span>
			</div>
		  </Link>
		</div>
	  </div>
	</section>
  );
};

const ProviderHighlights = () => {
  const [merchants, setMerchants] = React.useState([]);

  const fetchFeaturedMerchants = async () => {
	try {
	  const response = await axiosInstance.get('/merchants/featured');
	  if (response.status !== 200) {
		throw new Error(response.data.message || 'An error occurred while fetching featured merchants');
	  }
	  const { data } = response.data;
	  setMerchants(data);
	} catch (error) {
	  console.error(error);
	  toast({
		title: error.response.data?.message || error.message || "An error occurred",
		description: error.response.data?.message || "Something went wrong while getting featured merchants. It's not you it's us",
		variant: `${error.response.status.toLocaleString().startsWith(4) ? "warning" : "destructive"}`
	  });
	}
  }
  return (
	<section className="py-20 w-full bg-background-soft">
	  <div className="container  px-4">
		<div className="text-center mb-14">
		  <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
			<BadgeCheck className="h-5 w-5 mr-2" />
			Trusted Partners
		  </div>
		  <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
			Featured Brands
		  </h2>
		  <p className="text-neutral-medium text-lg ">
			Discover exclusive student discounts from top companies
		  </p>
		</div>

		<div className="flex flex-wrap justify-center gap-6">
		  {merchants.map((merchant: Merchant) => (
			<Card
			  key={merchant.id}
			  className="border border-border w-50px md:w-[200px] hover:border-brand-primary/30 hover:shadow-sm transition-all bg-background group"
			>
			  <CardContent className="p-6 flex flex-col items-center">
				<div className="relative mb-4">
				  <div className="w-20 h-20 rounded-full bg-background-subtle p-3 flex items-center justify-center border-2 border-border-subtle group-hover:border-brand-primary/20 transition-colors">
					<img
					  src={merchant.logo || "/placeholder.svg"}
					  alt={merchant.name}
					  className="w-full h-full object-cover rounded-full"
					/>
				  </div>
				  {merchant.isApproved && (
					<div className="absolute -top-2 -right-2 bg-brand-primary text-text-inverted rounded-full p-1">
					  <Star className="h-4 w-4 fill-current" />
					</div>
				  )}
				</div>
				<h3 className="text-sm font-semibold text-center text-text-primary group-hover:text-brand-primary transition-colors">
				  {merchant.name}
				</h3>
				<div className="mt-2 text-xs text-neutral-light flex items-center">
				  <Star className="h-3 w-3 fill-current text-brand-primary mr-1" />
				  <span>{merchant.rating || '4.8'}</span>
				</div>
			  </CardContent>
			</Card>
		  ))}
		</div>

		<div className="mt-16 text-center">
		  <Button
			variant="outline"
			className="border-brand-primary text-brand-primary hover:bg-background-soft px-8 py-6"
		  >
			View All Partners <ArrowRight className="ml-2 h-5 w-5" />
		  </Button>
		</div>
	  </div>
	</section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
	{
	  name: "Alex Johnson",
	  university: "State University",
	  quote: "StudentX has saved me hundreds this semester alone! The food discounts are amazing.",
	  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
	  rating: 5
	},
	{
	  name: "Taylor Kim",
	  university: "City College",
	  quote: "I love how easy it is to find tech deals. Got 30% off my new laptop!",
	  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
	  rating: 4
	},
	{
	  name: "Jordan Smith",
	  university: "Metro University",
	  quote: "The app is super easy to use and I've found so many deals near campus.",
	  avatar: "/placeholder.jpeg",
	  rating: 5
	},
  ];

  const renderStars = (rating: number) => {
	return (
	  <div className="flex justify-center space-x-0.5 mb-3">
		{[...Array(5)].map((_, i) => (
		  <Star
			key={i}
			className={`h-4 w-4 ${i < rating ? 'fill-brand-primary text-brand-primary' : 'text-neutral-light'}`}
		  />
		))}
	  </div>
	);
  };

  return (
	<section className="py-20 bg-background-subtle">
	  <div className="mx-auto px-4">
		<div className="text-center mb-16">
		  <div className="inline-flex items-center text-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
			<Quote className="h-4 w-4 mr-2" />
			Student Testimonials
		  </div>
		  <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
			Real Students, Real Savings
		  </h2>
		  <p className="text-neutral-medium text-lg max-w-full ">
			Hear from students who are already enjoying exclusive discounts
		  </p>
		</div>

		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
		  {testimonials.map((testimonial, index) => (
			<Card
			  key={index}
			  className="border border-border hover:border-brand-primary/30 hover:shadow-md transition-all bg-background relative overflow-hidden"
			>
			  {/* Floating quote icon */}
			  <div className="absolute top-6 right-6 text-brand-primary/10">
				<Quote className="h-16 w-16" />
			  </div>

			  <CardContent className="p-8 flex flex-col items-center text-center">
				<div className="relative mb-6">
				  <div className="w-20 h-20 rounded-full border-2 border-border">
					<UserAvatar src={testimonial.avatar} alt={testimonial.name} className='object-cover' />
				  </div>
				  <div className="absolute -bottom-2 -right-2 bg-brand-primary text-text-inverted rounded-full p-1">
					<Quote className="h-4 w-4" />
				  </div>
				</div>

				{renderStars(testimonial.rating)}

				<blockquote className="text-neutral-medium italic mb-6 relative z-10">
				  "{testimonial.quote}"
				</blockquote>

				<div className="mt-auto">
				  <p className="font-semibold text-text-primary">{testimonial.name}</p>
				  <p className="text-sm text-neutral-light">{testimonial.university}</p>
				</div>
			  </CardContent>
			</Card>
		  ))}
		</div>
	  </div>
	</section>
  );
};

const Footer: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user)
  return (
	<footer className={`bg-gray-900 w-full ${!isAuthenticated && 'mt-48'} relative text-white`}>
	  {!isAuthenticated && (
		<SignUpBanner />
	  )}
	  <div className={`container ${!isAuthenticated && 'pt-48'}  px-4 py-12`}>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
		  <div>
			<h3 className="text-xl font-bold mb-4">Student<span className="text-brand-primary">X</span> </h3>
			<p className="text-gray-400 mb-4">
			  Connecting students with the best discounts and deals across campus and beyond.
			</p>
			<div className="flex space-x-4">
			  <a href="#" className="text-gray-400 hover:text-white">
				<span className="sr-only">Facebook</span>
				<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
				  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
				</svg>
			  </a>
			  <a href="#" className="text-gray-400 hover:text-white">
				<span className="sr-only">Instagram</span>
				<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
				  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
				</svg>
			  </a>
			  <a href="#" className="text-gray-400 hover:text-white">
				<span className="sr-only">Twitter</span>
				<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
				  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
				</svg>
			  </a>
			</div>
		  </div>

		  <div>
			<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
			<ul className="space-y-2">
			  <li>
				<Link to="/" className="text-gray-400 hover:text-white">Home</Link>
			  </li>
			  <li>
				<Link to="/featured" className="text-gray-400 hover:text-white">Featured Deals</Link>
			  </li>
			  <li>
				<Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link>
			  </li>
			  <li>
				<Link to="/how-it-works" className="text-gray-400 hover:text-white">How It Works</Link>
			  </li>
			</ul>
		  </div>

		  <div>
			<h3 className="text-lg font-semibold mb-4">For Businesses</h3>
			<ul className="space-y-2">
			  <li>
				<Link to="/partner" className="text-gray-400 hover:text-white">Partner With Us</Link>
			  </li>
			  <li>
				<Link to="/provider-login" className="text-gray-400 hover:text-white">Provider Login</Link>
			  </li>
			  <li>
				<Link to="/success-stories" className="text-gray-400 hover:text-white">Success Stories</Link>
			  </li>
			  <li>
				<Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
			  </li>
			</ul>
		  </div>

		  <div>
			<h3 className="text-lg font-semibold mb-4">Contact & Support</h3>
			<ul className="space-y-2">
			  <li>
				<Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
			  </li>
			  <li>
				<Link to="/faq" className="text-gray-400 hover:text-white">FAQs</Link>
			  </li>
			  <li>
				<Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
			  </li>
			  <li>
				<Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
			  </li>
			</ul>
		  </div>
		</div>

		<div className="border-t border-gray-800 mt-12 pt-8">
		  <p className="text-center text-gray-400 text-sm">
			&copy; {new Date().getFullYear()} StudentX. All rights reserved.
		  </p>
		</div>
	  </div>
	</footer>
  );
};
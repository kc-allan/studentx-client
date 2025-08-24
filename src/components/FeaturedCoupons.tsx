import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, TrendingUp, Lightbulb, BookOpen } from "lucide-react";
import { Offer } from "@/types/offer";
import axiosInstance from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import OfferCardSkeleton from "./offers/OfferCardSkeleton";
import ServerError from "./ServerError";
import OfferCard from "./offers/OfferCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const studentResources = [
  {
    id: 1,
    title: "Budgeting Masterclass",
    description: "Stretch your student budget with these pro tips.",
    icon: <TrendingUp className="h-5 w-5" />,
    category: "Finance",
    url: "https://www.snhu.edu/about-us/newsroom/education/budgeting-for-college-students"
  },
  {
    id: 2,
    title: "Free Tech Stack",
    description: "Essential free tools for student productivity.",
    icon: <Lightbulb className="h-5 w-5" />,
    category: "Tech",
    url: "https://www.scape.com/blog/productivity-apps"
  },
  {
    id: 3,
    title: "Discount Hunting",
    description: "Find hidden student deals you're missing.",
    icon: <ShoppingCart className="h-5 w-5" />,
    category: "Shopping",
    url: "/deals"
  },
  {
    id: 4,
    title: "Fun Fact",
    description: "Ever heard of the 'Curse of Knowledge'? Learn why experts often struggle to teach beginners.",
    icon: <BookOpen className="h-5 w-5" />,
    category: "Academics",
    url: "https://www.oxfordlearning.com/study-tips-for-students/"
  }
];

const FeaturedOffers = () => {
  const [featuredOffers, setFeaturedOffers] = React.useState<Offer[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<{
    title: string;
    description: string;
  } | null>(null);
  const mobile = window.innerWidth < 768; // Adjust based on your breakpoint

  const fetchFeaturedOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/offer/featured');
      setFeaturedOffers(response.data);
    } catch (error) {
      if (error.response && error.response.status >= 500) {
        setError({
          title: error.response?.data?.message || "Error fetching featured offers",
          description: error.response?.data?.description || error.message || "Something went wrong",
        })
      } else {
        toast({
          title: "Error fetching featured offers",
          description: error.response?.data?.message || "Something went wrong",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchFeaturedOffers();
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image with overlay - optimized for mobile */}
      <div className="absolute inset-0 bg-gray-900">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center md:bg-fixed"
          style={{
            backgroundPosition: mobile ? "center" : "right center"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-black md:bg-gradient-to-r md:from-gray-900/90 md:via-gray-900/90 md:to-transparent"></div>
        </div>
      </div>

      <div className="container relative px-4 mx-auto py-12 md:py-16">
        {/* Header - centered on mobile, left on desktop */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left mb-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl mb-2">
            Featured Student Deals
          </h2>
          <p className="text-gray-300 max-w-lg text-sm sm:text-base">
            Exclusive discounts handpicked for students
          </p>
          <Link to="/deals" className={`${featuredOffers.length > 0 ? 'block' : 'hidden'} mt-4 md:mt-0 md:absolute md:right-4 md:top-4`}>
            <Button
              variant="outline"
              size="sm"
              className="border-none text-brand-primary hover:bg-white/80 hover:text-brand-primary/90 transition-colors"
            >
              View All <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </div>

        {error ? (
          <ServerError onRetry={fetchFeaturedOffers} />
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <OfferCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredOffers.length > 0 ? (
            <div className="flex overflow-x-auto gap-4 sm:gap-6 snap-x snap-mandatory py-4 scrollbar-hide">
            {featuredOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
            </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="mb-8 text-center md:text-left">
              <ShoppingCart className="h-8 w-8 sm:h-10 sm:w-10 text-brand-primary mx-auto md:mx-0" />
              <h3 className="mt-3 text-xl font-medium text-white sm:text-2xl">
                No featured deals right now
              </h3>
              <p className="mt-1 text-gray-300 text-sm sm:text-base">
                While you wait, explore these student resources
              </p>
            </div>
            
            {/* Responsive grid for resources */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {studentResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors h-full">
                    <CardHeader className="flex flex-row items-start space-x-3 space-y-0 p-4">
                      <div className="p-2 rounded-lg bg-brand-primary mt-0.5">
                        {resource.icon}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-medium text-brand-primary">
                          {resource.category}
                        </span>
                        <CardTitle className="text-white text-base sm:text-lg">
                          {resource.title}
                        </CardTitle>
                        <p className="text-gray-300 text-xs sm:text-sm">
                          {resource.description}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-brand-primary hover:text-white px-4 text-xs sm:text-sm transition-colors"
                      >
                        <Link to={resource.url} target="_blank" rel="noopener noreferrer">
                        Learn more →
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center md:text-left">
              <Link to="/deals">
                <Button 
                  size="sm"
                  className="bg-brand-primary hover:bg-brand-primary/90 text-sm sm:text-base text-white"
                >
                  Browse More Deals
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative floating elements - hidden on mobile */}
      <div className="hidden md:block absolute right-20 top-1/4 w-32 h-32 rounded-full bg-brand-primary/20 filter blur-xl animate-float"></div>
      <div className="hidden md:block absolute right-1/3 bottom-1/4 w-24 h-24 rounded-full bg-brand-primary/15 filter blur-lg animate-float-delayed"></div>
    </section>
  );
};

export default FeaturedOffers;
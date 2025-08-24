import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ShoppingCart, Zap } from "lucide-react";
import axiosInstance from "@/api/axios";
import { toast } from "@/hooks/use-toast";
import OfferCard from "./offers/OfferCard";
import { Offer } from "@/types/offer";
import OfferCardSkeleton from "./offers/OfferCardSkeleton";

const LatestOffers = () => {
  const [recentOffers, setRecentOffers] = React.useState<Offer[]>([]);
  const [loading, setLoading] = React.useState(false);

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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Fresh Deals</h2>
            <p className="text-gray-600 max-w-lg text-sm sm:text-base">
              Just added - don't miss these exclusive discounts
            </p>
          </div>
          {recentOffers.length > 0 && (
            <Link to="/deals">
              <Button
                variant="outline"
                className="hidden md:block mt-4 md:mt-0 border-brand-primary text-brand-primary hover:bg-brand-primary/5"
              >
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
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
          <div className="flex flex-col items-center justify-center p-12 sm:p-8 bg-gradient-to-br from-gray-50 to-indigo-100 min-h-[320px]">
            <video
              autoPlay
              loop
              muted
              src="/coming-soon.webm"
              className="w-28 mb-6 opacity-85"
            />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              Hang tight!
            </h2>
            <p
              className="text-base mb-6 text-center max-w-[340px] text-gray-700"
            >
              We’re working hard to bring you the latest deals from our partners. Check back soon for exclusive offers just for you!
            </p>
            <button
              className="bg-brand-primary hover:bg-brand-primary/90 text-white border-none rounded-full px-8 py-3 font-semibold text-base cursor-pointer shadow-md transition-colors duration-200"
              onClick={() => fetchRecentOffers()}
            >
              Refresh Deals
            </button>
          </div>
        )}
        {recentOffers.length > 0 && (
          <Link to="/deals">
            <Button
              variant="outline"
              className="md: hidden mt-4 md:mt-0 border-brand-primary text-brand-primary hover:bg-brand-primary/5"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}

export default LatestOffers;
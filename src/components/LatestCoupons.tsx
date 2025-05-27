import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllCoupons } from "@/data/mockData";
import { ArrowRight, Clock, ShoppingCart, Zap } from "lucide-react";
import axiosInstance from "@/api/axios";
import { toast } from "@/hooks/use-toast";
import OfferCard from "./offers/OfferCard";
import { Offer } from "@/types/offer";
import EmptyState from "./EmptyState";
import OfferCardSkeleton from "./offers/OfferCardSkeleton";

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

export default LatestOffers;
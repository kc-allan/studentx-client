import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getFeaturedCoupons } from "@/data/mockData";
import { ArrowRight, Clock, ShoppingCart, Star } from "lucide-react";
import { Offer } from "@/types/offer";
import { Avatar } from "@mui/material";
import axiosInstance from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import UserAvatar from "./UserAvatar";
import Countdown from "./offers/Countdown";
import OfferCardSkeleton from "./offers/OfferCardSkeleton";
import EmptyState from "./EmptyState";
import OfferCard from "./offers/OfferCard";

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

export default FeaturedOffers;

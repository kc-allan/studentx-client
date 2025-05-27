import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
// import { mockProviders } from "@/data/mockData";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/api/axios";
import { Merchant } from "@/types/user";

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

export default ProviderHighlights;
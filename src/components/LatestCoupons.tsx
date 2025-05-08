import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllCoupons } from "@/data/mockData";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { Coupon } from "@/types";

const LatestCoupons = () => {
  const recentCoupons = getAllCoupons()
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 6);

  return (
    <section className="py-16 bg-background-subtle">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-3">
              <Zap className="h-4 w-4 mr-2" />
              Fresh Deals
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Latest Offers</h2>
            <p className="text-neutral-medium mt-2">
              Just added - don't miss these exclusive student discounts
            </p>
          </div>
          <Link to="/coupons">
            <Button 
              variant="outline" 
              className="border-brand-primary text-brand-primary hover:bg-background-soft"
            >
              View All Deals <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Featured Grid (Top 4 deals) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {recentCoupons.slice(0, 4).map((coupon: Coupon) => (
            <div 
              key={coupon.id} 
              className="bg-background rounded-xl shadow-sm hover:shadow-md transition-all border border-border overflow-hidden group"
            >
              <div className="relative">
                <div className="absolute top-3 left-3 bg-brand-primary text-text-inverted text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </div>
                <div className="h-48 bg-background-subtle flex items-center justify-center">
                  <img 
                    src={coupon.providerLogo || "/placeholder.svg"} 
                    alt={coupon.providerName}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-text-primary mb-2">{coupon.title}</h3>
                <p className="text-sm text-neutral-medium mb-4 line-clamp-2">{coupon.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xs text-neutral-light">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Expires {new Date(coupon.endDate).toLocaleDateString()}</span>
                  </div>
                  <Button size="sm" className="bg-brand-primary hover:bg-brand-secondary text-text-inverted">
                    Get Deal
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Highlighted Deals (Next 2 deals) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recentCoupons.slice(4, 6).map((coupon: Coupon) => (
            <div 
              key={coupon.id} 
              className="bg-background rounded-xl shadow-sm hover:shadow-md transition-all border border-border overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="relative lg:w-2/5">
                  <div className="absolute top-3 left-3 bg-brand-primary text-text-inverted text-xs font-bold px-3 py-1 rounded-full">
                    NEW
                  </div>
                  <div className="h-48 lg:h-full bg-background-subtle flex items-center justify-center">
                    <img 
                      src={coupon.providerLogo || "/placeholder.svg"} 
                      alt={coupon.providerName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6 lg:w-3/5 flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-text-primary mb-2">{coupon.title}</h3>
                    <p className="text-neutral-medium">{coupon.description}</p>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center text-sm text-neutral-light">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Expires {new Date(coupon.endDate).toLocaleDateString()}</span>
                    </div>
                    <Button className="bg-brand-primary hover:bg-brand-secondary text-text-inverted">
                      Get Deal
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-brand-primary hover:bg-brand-secondary text-text-inverted px-8"
          >
            <Link to="/coupons">
              Browse All Deals <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestCoupons;
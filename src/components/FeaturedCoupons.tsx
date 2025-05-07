
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CouponCard from "@/components/CouponCard";
import { getFeaturedCoupons } from "@/data/mockData";

const FeaturedCoupons = () => {
  const featuredCoupons = getFeaturedCoupons();

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary-900">Featured Deals</h2>
            <p className="text-gray-600 mt-2">
              Exclusive offers you don't want to miss
            </p>
          </div>
          <Link to="/featured">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Featured
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoupons;

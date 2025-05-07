
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CouponCard from "@/components/CouponCard";
import { getAllCoupons } from "@/data/mockData";

const LatestCoupons = () => {
  // Get all coupons and sort by newest first (using mock data)
  const recentCoupons = getAllCoupons()
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 8);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Latest Deals</h2>
            <p className="text-gray-600 mt-2">
              Fresh deals and offers added recently
            </p>
          </div>
          <Link to="/coupons">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Deals
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCoupons;

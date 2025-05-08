
import * as React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CouponCard from "@/components/CouponCard";
import SignUpBanner from "@/components/SignUpBanner";
import { getFeaturedCoupons } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

const FeaturedDeals = () => {
  const featuredCoupons = getFeaturedCoupons();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-primary-100 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Featured Student Deals</h1>
            <p className="text-center mt-3 text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of the best student discounts and offers currently available
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Mobile Collapsible */}
            <div className="md:hidden w-full mb-6">
              <Collapsible open={expanded} onOpenChange={setExpanded} className="w-full border rounded-lg p-4">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full justify-between p-2">
                    <span>Filter Deals</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "transform rotate-180" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pt-4">
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="food-mobile" />
                        <label htmlFor="food-mobile" className="text-sm">Food & Drink</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fashion-mobile" />
                        <label htmlFor="fashion-mobile" className="text-sm">Fashion</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tech-mobile" />
                        <label htmlFor="tech-mobile" className="text-sm">Technology</label>
                      </div>
                    </div>

                    <h3 className="font-medium mb-3 mt-6">Discount Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="percentage-mobile" />
                        <label htmlFor="percentage-mobile" className="text-sm">Percentage Off</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fixed-mobile" />
                        <label htmlFor="fixed-mobile" className="text-sm">Fixed Amount Off</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bogo-mobile" />
                        <label htmlFor="bogo-mobile" className="text-sm">Buy One Get One</label>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Filters - Desktop Sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <div className="sticky top-24 border rounded-lg p-6">
                <h3 className="font-medium mb-4">Filters</h3>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="food" />
                      <label htmlFor="food" className="text-sm">Food & Drink</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fashion" />
                      <label htmlFor="fashion" className="text-sm">Fashion</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tech" />
                      <label htmlFor="tech" className="text-sm">Technology</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="entertainment" />
                      <label htmlFor="entertainment" className="text-sm">Entertainment</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="travel" />
                      <label htmlFor="travel" className="text-sm">Travel</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Discount Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="percentage" />
                      <label htmlFor="percentage" className="text-sm">Percentage Off</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fixed" />
                      <label htmlFor="fixed" className="text-sm">Fixed Amount Off</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bogo" />
                      <label htmlFor="bogo" className="text-sm">Buy One Get One</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-item" />
                      <label htmlFor="free-item" className="text-sm">Free Item</label>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-brand-primary text-white">Apply Filters</Button>
              </div>
            </div>

            {/* Coupons Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <SignUpBanner />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturedDeals;

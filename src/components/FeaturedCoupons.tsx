import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getFeaturedCoupons } from "@/data/mockData";
import { ArrowRight } from "lucide-react";
import { Coupon, CouponType } from "@/types";
import { Avatar } from "@mui/material";

function Countdown({ endDate }: { endDate: Date }) {
  const [timeLeft, setTimeLeft] = React.useState('');

  React.useEffect(() => {
    const updateCountdown = () => {
      const now: any = new Date();
      const end: any = new Date(endDate);
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const formatted =
        days > 0
          ? `${days}d ${hours}h ${minutes}m ${seconds}s`
          : hours > 0
            ? `${hours}h ${minutes}m ${seconds}s`
            : `${minutes}m ${seconds}s`;

      setTimeLeft(formatted);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="text-xs">
      <span className="text-neutral-medium">Time Left: </span>
      <span className={`${timeLeft === 'Expired' ? 'text-brand-danger' : 'text-brand-accent'} font-semibold`}>
        {timeLeft}
      </span>
    </div>
  );
}

const FeaturedCoupons = () => {
  const featuredCoupons = getFeaturedCoupons().slice(0, 4);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Featured Deals</h2>
            <p className="text-neutral-medium mt-2">
              Exclusive offers you don't want to miss
            </p>
          </div>
          <Link to="/featured">
            <Button
              variant="outline"
              className="mt-4 md:mt-0 border-brand-primary text-brand-primary hover:bg-background-soft"
            >
              View All Featured <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCoupons.map((coupon: Coupon) => (
            <div
              key={coupon.id}
              className="bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border relative"
            >
              <div className="relative">
                <div className="absolute top-3 left-3 bg-brand-primary text-text-inverted text-xs font-bold px-2 py-1 rounded">
                  {coupon.type === CouponType.PERCENTAGE ? (
                    `${coupon.value} % OFF`
                  ) : (
                  `$${coupon.value} OFF`
                  )}
                </div>
                <div className="h-40 bg-background-subtle rounded-t-lg flex items-center justify-center">
                  <img
                    src={coupon.providerLogo || "/placeholder.svg"}
                    alt={coupon.providerName}
                    className="w-full h-full bg-cover"
                  />
                </div>
              </div>

              <Avatar
                src={coupon.providerLogo || "/placeholder.svg"}
                alt={coupon.providerName}
                className="absolute -bottom-6 left-4 h-16 w-16 rounded-full border-2 border-background shadow-md"
              />

              <div className="p-4 pt-8">
                <h5 className="font-bold text-text-primary">{coupon.title}</h5>
                <p className="text-sm text-neutral-medium mt-1 mb-4">{coupon.description}</p>
                <div className="flex justify-between items-center">
                  <Countdown endDate={coupon.endDate} />
                  <Button className="bg-brand-primary hover:bg-brand-secondary text-text-inverted">
                    Get Deal
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoupons;
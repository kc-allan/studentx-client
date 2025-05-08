import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br h-screen from-neutral-darker via-neutral-800 to-brand-danger/70 text-white py-20 md:py-28 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute rounded-full h-80 w-80 bg-brand-primary -top-20 -right-20"></div>
        <div className="absolute rounded-full h-60 w-60 bg-brand-accent bottom-10 left-10"></div>
        <div className="absolute rounded-full h-40 w-40 bg-background-soft top-40 right-1/4"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="max-w-3xl mx-auto text-center justify-center flex flex-col items-stretch h-full gap-12 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-brand-primary">X</span>clusive Student <span className="text-brand-primary">Discounts</span> Just For You
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-neutral-200 max-w-2xl mx-auto">
              Access thousands of student deals and discounts from your favorite brands
            </p>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button asChild size="lg" className="bg-background-light text-text-primary hover:bg-background-soft">
                <Link to="/signup">Sign Up Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border-danger bg-brand-danger   text-white hover:bg-primary-700">
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm">
              <div>
                <span className="block text-2xl font-bold">10,000+</span>
                <span>Deals</span>
              </div>
              <div>
                <span className="block text-2xl font-bold">500+</span>
                <span>Brands</span>
              </div>
              <div>
                <span className="block text-2xl font-bold">100%</span>
                <span>Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
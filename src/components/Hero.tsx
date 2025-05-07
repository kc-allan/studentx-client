
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CategoryList from "./CategoryList";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-black to-primary-700 text-white py-16 md:py-24 overflow-hidden">
      {/* Background circles decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full h-80 w-80 bg-primary-500 opacity-20 -top-20 -right-20"></div>
        <div className="absolute rounded-full h-60 w-60 bg-primary-700 opacity-30 bottom-10 left-10"></div>
        <div className="absolute rounded-full h-40 w-40 bg-secondary-400 opacity-20 top-40 right-1/4"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex">
        <div className="w-2/3 px-4">
          <h1 className="text-5xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-highlight text-5xl">X</span>clusive Student Discounts Just For You
          </h1>
          <p className="text-lg md:text-xl mb-8 text-primary-100">
            Access thousands of student deals and discounts from your favorite brands and local businesses
          </p>

          {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for deals..."
                className="pl-10 text-black h-12 w-full"
              />
            </div>
            <Button className="bg-secondary hover:bg-secondary-600 h-12 px-8 whitespace-nowrap w-full sm:w-auto">
              Find Deals
            </Button>
          </div> */}

          {/* <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/how-it-works">How It Works</Link>
            </Button>
            <Button asChild className="bg-white text-primary hover:bg-primary-100">
              <Link to="/signup">Sign Up Free</Link>
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-primary-100">
            <span className="font-bold">10,000+</span> deals from <span className="font-bold">500+</span> brands
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;

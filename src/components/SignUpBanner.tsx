import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";

const SignUpBanner = () => {
  return (
    <section className="py-16 h-100 w-[90%] rounded-lg absolute -translate-y-[60%] left-1/2 -translate-x-1/2  bg-linear-to-br from-brand-primary/60 via-neutral-700 to-gray-900 overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute rounded-full h-80 w-80 bg-brand-accent -top-20 -right-20"></div>
        <div className="absolute rounded-full h-64 w-64 bg-text-inverted -bottom-32 -left-32"></div>
        <div className="absolute rounded-full h-40 w-40 bg-brand-primary opacity-30 top-1/4 right-1/3"></div>
      </div>

      <div className="container px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-6xl ">
          <div className="text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-background/20 border border-gray-700 text-text-inverted text-sm font-medium mb-4">
              <Zap className="h-4 w-4 mr-2 fill-current" />
              Exclusive Student Offers
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-inverted mb-4">
              Start Saving Today
            </h2>
            <p className="text-text-inverted/90 text-base">
              Join our community of students enjoying exclusive discounts on brands you love.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-background text-brand-primary hover:bg-background-soft hover:text-brand-primary px-8 py-6"
            >
              <Link to="/auth?page=signup" className="flex items-center">
                Sign Up Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
              asChild
              size="lg"
              variant="outline"
              className="border-none text-text-inverted bg-brand-primary hover:bg-brand-primary/70 hover:text-text-inverted px-8 py-6"
            >
              <p className="flex items-center">
                How It Works <ArrowRight className="ml-2 h-5 w-5" />
              </p>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpBanner;
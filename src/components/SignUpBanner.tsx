import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SignUpBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-neutral-800 to-brand-primary/80 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full h-64 w-64 bg-background-subtle opacity-10 -bottom-20 -right-20"></div>
        <div className="absolute rounded-full h-40 w-40 bg-brand-secondary opacity-10 top-10 left-1/4"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
          <div className="mb-8 md:mb-0 max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to start saving?
            </h2>
            <p className="text-white opacity-90">
              Join thousands of students who are already saving on food, fashion, tech, and more.
              Sign up now to unlock exclusive student discounts!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-background-subtle text-text-primary hover:bg-gray-200">
              <Link to="/signup">Sign Up Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-none text-white bg-brand-danger hover:bg-red-700">
              <Link to="/learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpBanner;
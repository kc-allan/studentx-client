
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SignUpBanner = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to start saving?
            </h2>
            <p className="text-white opacity-90">
              Join thousands of students who are already saving on food, fashion, tech, and more. 
              Sign up now to unlock exclusive student discounts!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-gray-100">
              <Link to="/signup">Sign Up Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-secondary-700">
              <Link to="/learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpBanner;

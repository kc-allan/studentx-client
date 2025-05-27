import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Handshake, ShoppingBag, FileText, ArrowDown, ChevronDown, Zap, Search, UserPlus, BadgeCheck, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/state";

const HowItWorks = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);
  const steps = [
    {
      title: "Sign Up",
      description: "Create your free account with your student email",
      icon: <UserPlus className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Verify",
      description: "Confirm your student status instantly",
      icon: <BadgeCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Browse",
      description: "Discover thousands of exclusive deals",
      icon: <Search className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Save",
      description: "Use your discounts and save money",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 w-full bg-white">
      <div className="container w-full px-4 sm:px-6 mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">How StudentX Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Get started in minutes and start saving on everything you need
          </p>
        </div>

        <div className="relative">
          {/* Progress line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 z-0 mx-16"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm w-full h-full transition-all hover:shadow-md">
                  <div className="bg-brand-primary/10 text-brand-primary w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <div className="md:hidden bg-gray-100 text-gray-800 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold mb-2 sm:mb-3 mx-auto text-sm sm:text-base">
                      {index + 1}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="md:hidden mt-3 sm:mt-4 mb-3 sm:mb-4">
                    {(index + 1) % 2 == 0 ? (
                    <ChevronRight className="text-gray-300 h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                    <ChevronDown className="text-gray-300 h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {!isAuthenticated && (
          <div className="mt-12 sm:mt-16 text-center">
            <Button className="bg-brand-primary hover:bg-brand-primary/90 px-6 py-4 sm:px-8 sm:py-6 text-white text-base sm:text-lg">
              Join Now & Start Saving
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
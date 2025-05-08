import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Handshake, ShoppingBag, FileText, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Create an Account",
      description: "Sign up using your student email to verify your status.",
      icon: <FileText className="h-8 w-8" />,
      color: "bg-brand-primary",
    },
    {
      number: 2,
      title: "Browse Deals",
      description: "Explore thousands of exclusive student discounts and offers.",
      icon: <Handshake className="h-8 w-8" />,
      color: "bg-brand-secondary",
    },
    {
      number: 3,
      title: "Get Your Coupon",
      description: "Click on a deal to get a unique coupon code just for you.",
      icon: <ShoppingBag className="h-8 w-8" />,
      color: "bg-brand-accent",
    },
    {
      number: 4,
      title: "Save Money",
      description: "Use your coupon online or in-store and enjoy the savings!",
      icon: <CheckCircle className="h-8 w-8" />,
      color: "bg-neutral-dark",
    },
  ];

  return (
    <section className="py-20 bg-background-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            How It Works
          </h2>
          <p className="text-neutral-medium text-lg max-w-2xl mx-auto">
            Getting started is quick and easy. Follow these simple steps to unlock exclusive student savings:
          </p>
        </div>

        <div className="relative">
          {/* Progress line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-background-subtle z-0 mx-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <Card className="border-none transition-all w-full h-full">
                  <CardContent className="p-8 flex flex-col items-center">
                    <div className={`${step.color} text-text-inverted rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
                      <div className="relative">
                        {step.icon}
                        <span className="absolute -top-2 -right-2 bg-background-subtle text-text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-neutral-medium text-center">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {step.number < 4 && (
                  <div className="lg:hidden mt-4 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <ArrowDown className="text-neutral-light" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-brand-primary hover:bg-brand-secondary text-text-inverted px-8 py-6 text-lg">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
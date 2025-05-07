
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Create an Account",
      description: "Sign up using your student email to verify your status.",
      icon: "✉️",
    },
    {
      number: 2,
      title: "Browse Deals",
      description: "Explore thousands of exclusive student discounts and offers.",
      icon: "🔍",
    },
    {
      number: 3,
      title: "Get Your Coupon",
      description: "Click on a deal to get a unique coupon code just for you.",
      icon: "🎫",
    },
    {
      number: 4,
      title: "Save Money",
      description: "Use your coupon online or in-store and enjoy the savings!",
      icon: "💰",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900">How It Works</h2>
          <p className="text-gray-600 mt-2 max-w-lg mx-auto">
            Getting started with StudentX is quick and easy. Follow these simple steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Card key={step.number} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

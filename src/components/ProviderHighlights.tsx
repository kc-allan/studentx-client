import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { mockProviders } from "@/data/mockData";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";
import { Button } from "./ui/button";

const ProviderHighlights = () => {
  return (
    <section className="py-20 bg-background-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
            <BadgeCheck className="h-5 w-5 mr-2" />
            Trusted Partners
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Featured Brands
          </h2>
          <p className="text-neutral-medium text-lg max-w-2xl mx-auto">
            Discover exclusive student discounts from top companies
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {mockProviders.map((provider) => (
            <Card 
              key={provider.id} 
              className="border border-border hover:border-brand-primary/30 hover:shadow-sm transition-all bg-background group"
            >
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-background-subtle p-3 flex items-center justify-center border-2 border-border-subtle group-hover:border-brand-primary/20 transition-colors">
                    <img 
                      src={provider.logo || "/placeholder.svg"} 
                      alt={provider.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {provider.isPremium && (
                    <div className="absolute -top-2 -right-2 bg-brand-primary text-text-inverted rounded-full p-1">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-center text-text-primary group-hover:text-brand-primary transition-colors">
                  {provider.name}
                </h3>
                <div className="mt-2 text-xs text-neutral-light flex items-center">
                  <Star className="h-3 w-3 fill-current text-brand-primary mr-1" />
                  <span>{provider.rating || '4.8'}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            className="border-brand-primary text-brand-primary hover:bg-background-soft px-8 py-6"
          >
            View All Partners <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProviderHighlights;
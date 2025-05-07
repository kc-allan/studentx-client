
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { mockProviders } from "@/data/mockData";

const ProviderHighlights = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Partners</h2>
          <p className="text-gray-600 mt-2">
            Companies that offer amazing student discounts
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {mockProviders.map((provider) => (
            <Card key={provider.id} className="border-none hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white p-2 flex items-center justify-center mb-4 border">
                  <img 
                    src={provider.logo || "/placeholder.svg"} 
                    alt={provider.name} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium text-center">{provider.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProviderHighlights;

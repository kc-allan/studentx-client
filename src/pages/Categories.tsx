
import * as React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignUpBanner from "@/components/SignUpBanner";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/mockData";

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Browse By Categories</h1>
            <p className="text-center mt-3 text-gray-600 max-w-2xl mx-auto">
              Find student discounts and offers sorted by category
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/categories/${category.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full">
                  <div className="relative h-40">
                    <img 
                      src={"/placeholder.svg"} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{category.name}</h3>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-600 text-sm">
                      {`Browse all ${category.name.toLowerCase()} deals and discounts for students.`}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <SignUpBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Categories;

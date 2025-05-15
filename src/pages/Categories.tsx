import * as React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignUpBanner from "@/components/SignUpBanner";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/mockData";
import { Zap, ArrowRight } from "lucide-react";

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background-soft">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
              <Zap className="h-4 w-4 mr-2" />
              Student Discounts
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Browse By Category
            </h1>
            <p className="text-neutral-medium text-lg max-w-2xl mx-auto">
              Discover exclusive student deals sorted by your interests
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/categories/${category.slug}`}
                className="group"
              >
                <Card className="h-full border border-border hover:border-brand-primary/30 transition-all overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={category.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-xl font-bold text-text-inverted mb-2">
                        {category.name}
                      </h3>
                      <div className="flex items-center text-text-inverted/90">
                        <span className="text-sm">Explore deals</span>
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-neutral-medium">
                      {`${category.dealCount || 25}+ student discounts available`}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* <SignUpBanner /> */}
      </main>
    </div>
  );
};

export default Categories;
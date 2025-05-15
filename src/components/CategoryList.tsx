import * as React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

const getCategoryInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.replace(/[^a-zA-Z]/g, ""))
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const CategoryList: React.FC = () => {
  return (
    <section 
      aria-labelledby="category-heading"
      className="py-12 bg-background-subtle"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 
            id="category-heading"
            className="text-3xl font-bold text-text-primary"
          >
            Popular Categories
          </h2>
          <p className="text-neutral-medium mt-2">
            Explore deals in your favorite categories
          </p>
        </div>

        <div 
          role="grid"
          aria-label="Category navigation"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {categories.slice(0, 5).map((category) => {
            const initials = getCategoryInitials(category.name);
            return (
              <Link
                to={`/deals?category=${category.slug}`}
                key={category.id}
                className="group outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-xl"
                aria-label={`Browse ${category.name} deals`}
              >
                <div 
                  role="gridcell"
                  className="flex flex-col items-center justify-center p-6 border border-border rounded-xl hover:border-brand-accent transition-all bg-background hover:bg-background-soft h-full"
                >
                  <Badge 
                    aria-hidden="true"
                    className="h-14 w-14 rounded-full flex items-center justify-center bg-neutral-300 text-text-danger group-hover:bg-brand-danger/50 group-hover:text-white text-lg font-bold mb-3"
                  >
                    {initials}
                  </Badge>
                  <span className="text-sm font-medium text-center text-text-primary">
                    {category.name}
                  </span>
                </div>
              </Link>
            );
          })}
          
          <Link 
            to="/categories" 
            className="group outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-xl"
            aria-label="View all categories"
          >
            <div 
              role="gridcell"
              className="flex flex-col items-center justify-center p-6 border border-border rounded-xl hover:border-brand-accent transition-all bg-background hover:bg-background-soft h-full"
            >
              <Badge 
                aria-hidden="true"
                className="h-14 w-14 rounded-full flex items-center justify-center bg-background-softer text-brand-primary group-hover:bg-brand-accent/40 group-hover:text-white mb-3"
              >
                <ArrowRight className="h-6 w-6" />
              </Badge>
              <span className="text-sm font-medium text-center text-text-primary">
                View All
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
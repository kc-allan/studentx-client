import * as React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

const CategoryList: React.FC = () => {
  return (
    <section className="py-12 bg-background-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-text-primary">Popular Categories</h2>
          <p className="text-neutral-medium mt-2">
            Explore deals in your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 5).map((category) => (
            <Link
              to={`/categories/${category.slug}`}
              key={category.id}
              className="group"
            >
              <div className="flex flex-col items-center justify-center p-6 border border-border-DEFAULT rounded-xl hover:border-brand-accent transition-all bg-background-DEFAULT hover:bg-background-soft h-full">
                <Badge className="h-14 w-14 rounded-full flex items-center justify-center bg-neutral-300 text-text-danger group-hover:bg-brand-danger/50 group-hover:text-white text-lg font-bold mb-3">
                  {category.name
                    .split(" ")
                    .map((word) => word.replace(/[^a-zA-Z]/g, "")) // remove non-letters
                    .filter(Boolean) // remove empty strings
                    .map((word) => word[0]) // get first letter
                    .join("")}
                </Badge>
                <span className="text-sm font-medium text-center text-text-primary">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
          <Link to="/categories" className="group">
            <div className="flex flex-col items-center justify-center p-6 border border-border-DEFAULT rounded-xl hover:border-brand-accent transition-all bg-background-DEFAULT hover:bg-background-soft h-full">
              <Badge className="h-14 w-14 rounded-full flex items-center justify-center bg-background-softer text-brand-primary group-hover:bg-brand-accent/40 group-hover:text-white mb-3">
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
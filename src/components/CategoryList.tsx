
import * as React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

const CategoryList: React.FC = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-black to-primary-700 overflow-auto w-full">
      <div className="container mx-auto px-4 overflow-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
         {/* <div className="flex gap-4 overflow-x-auto"> */}
          {categories.slice(0,5).map((category) => (
            <Link
              to={`/categories/${category.slug}`}
              key={category.id}
              className="group"
            >
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:border-primary transition-colors bg-white hover:bg-primary-100">
                <Badge className="h-12 w-12 rounded-full flex items-center justify-center bg-primary-100 group-hover:bg-primary text-primary group-hover:text-white">
                  {category.name.charAt(0)}
                </Badge>
                <span className="mt-2 text-sm font-medium text-center">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
          <Link
              to={`/categories`}
              className="group"
              key="see-more"
            >
              <div className="flex flex-col items-center justify-center p-4 rounded-lg hover:border-primary transition-colors">
                <Badge className="h-12 w-12 rounded-full flex items-center justify-center bg-primary-100 group-hover:bg-primary text-primary group-hover:text-white">
                  <ArrowRight className="h-6 w-6" />
                </Badge>
                <span className="mt-2 text-sm font-medium text-center text-white">
                  See More
                </span>
              </div>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;

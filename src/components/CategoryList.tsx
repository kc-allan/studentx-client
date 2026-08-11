import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import axiosInstance from "@/api/axios";
import { toast } from "@/hooks/use-toast";
import SectionHeading from "./SectionHeading";

/** "Student-Owned" reads as SO, so split on hyphens as well as spaces. */
const getCategoryInitials = (name: string) =>
  name
    .split(/[\s\-–—_/]+/)
    .map((word) => word.replace(/[^a-zA-Z]/g, ""))
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const prioritizeStudentOwned = <T extends { slug?: string }>(items: T[]) => {
  const studentOwnedItems = items.filter((item) => item.slug === "student-owned");
  const rest = items.filter((item) => item.slug !== "student-owned");
  return [...studentOwnedItems, ...rest];
};

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/offer/categories');
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Failed to fetch categories');
      }
      setCategories(response.data.data);
    } catch (error) {
      toast({
        title: error.response?.data?.message || error.message || "Error",
        description: error.response?.data?.message || "Couldn't load categories. Please try again later.",
        variant: `${error.response?.status?.toString().startsWith('4') ? "warning" : "destructive"}`
      });
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const visibleCategories = prioritizeStudentOwned(categories).slice(0, 7);

  if (visibleCategories.length === 0) return null;

  return (
    <section className="w-full bg-neutral-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Categories"
          title="Start where you spend"
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {visibleCategories.map((category) => (
            <Link
              key={category.id}
              to={`/deals?filters=${category.id}`}
              className="group relative flex aspect-[4/3] flex-col overflow-hidden bg-neutral-900 p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              {category.imageUrl ? (
                <>
                  <img
                    src={category.imageUrl}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Holds the label legible whatever the artwork behind it */}
                  <div className="absolute inset-0 bg-neutral-950/65 transition-colors group-hover:bg-neutral-950/55" />
                </>
              ) : (
                // Most categories carry no artwork, so the initials stand in for it
                <span
                  aria-hidden
                  className="relative text-5xl font-bold leading-none tracking-tight text-white/25 transition-colors group-hover:text-white/40 lg:text-6xl"
                >
                  {getCategoryInitials(category.name)}
                </span>
              )}
              <span className="relative mt-auto flex items-end justify-between gap-3">
                <span className="text-base font-semibold leading-snug text-white">
                  {category.name}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/50 transition-colors group-hover:text-white" />
              </span>
            </Link>
          ))}

          <Link
            to="/categories"
            className="group relative flex aspect-[4/3] flex-col border border-neutral-300 p-5 transition-colors hover:border-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            <Plus aria-hidden className="h-12 w-12 text-neutral-300 transition-colors group-hover:text-neutral-400 lg:h-14 lg:w-14" strokeWidth={1.5} />
            <span className="mt-auto flex items-end justify-between gap-3">
              <span className="text-base font-semibold leading-snug text-neutral-900">
                All categories
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-900" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;

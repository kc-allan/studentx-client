import * as React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CouponCard from "@/components/CouponCard";
import SignUpBanner from "@/components/SignUpBanner";
import { getAllCoupons } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Filter,
  X,
  Tag,
  Clock,
  Search
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

const useUpdateFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const addFilterToURL = (newFilter) => {
    const params = new URLSearchParams(location.search);
    const existing = params.get("filters")?.split(",").filter(Boolean) || [];

    if (!existing.includes(newFilter)) {
      existing.push(newFilter);
      params.set("filters", existing.join(","));
      navigate(`${location.pathname}?${params.toString()}`, { replace: false });
    }
  };

  const removeFilterFromURL = (filterToRemove) => {
    const params = new URLSearchParams(location.search);
    const existing = params.get("filters")?.split(",").filter(Boolean) || [];
    const updated = existing.filter((filter) => filter !== filterToRemove);
    if (updated.length === 0) {
      params.delete("filters");
    } else {
      params.set("filters", updated.join(","));
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: false });
  };
  const clearFiltersFromURL = () => {
    const params = new URLSearchParams(location.search);
    params.delete("filters");
    navigate(`${location.pathname}?${params.toString()}`, { replace: false });
  };

  return { addFilterToURL, removeFilterFromURL, clearFiltersFromURL };
};


const CouponDeals = () => {
  // Get all coupons and sort by newest first (using mock data)
  const recentCoupons = getAllCoupons()
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 12);

  const [expanded, setExpanded] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const urlQuery = new URLSearchParams(useLocation().search);
  const { addFilterToURL, removeFilterFromURL, clearFiltersFromURL } = useUpdateFilters();

  const addFilter = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
      addFilterToURL(filter);
    }
  };

  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
    removeFilterFromURL(filter);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    clearFiltersFromURL();
  };
  const categories = [
    { id: "food", label: "Food & Drink" },
    { id: "fashion", label: "Fashion" },
    { id: "tech", label: "Technology" },
    { id: "entertainment", label: "Entertainment" },
    { id: "travel", label: "Travel" },
    { id: "health", label: "Health & Fitness" },
    { id: "education", label: "Education" },
    { id: "home", label: "Home & Living" },
    { id: "beauty", label: "Beauty & Personal Care" },
    { id: "sports", label: "Sports & Outdoors" },
    { id: "automotive", label: "Automotive" },
    { id: "gaming", label: "Gaming" },
    { id: "books", label: "Books & Stationery" }
  ];

  const discountTypes = [
    { id: "percentage", label: "Percentage Off" },
    { id: "fixed", label: "Fixed Amount Off" },
    { id: "bogo", label: "Buy One Get One" },
    { id: "free-item", label: "Free Item" }
  ];
  const initialFilters = urlQuery.get("filters") ? urlQuery.get("filters").split(",") : [];
  const filterSet = new Set(initialFilters);
  const [selectedFilters, setSelectedFilters] = React.useState(() =>
    categories
      .filter(category => filterSet.has(String(category.id)))
      .map(category => category.id)
  );
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center flex-col items-center">
      <Header />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-black text-white pt-24 pb-12 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-4 bg-indigo-900 hover:bg-indigo-900">New Arrivals</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest Student Deals</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Fresh deals and discounts added just for students. Personalized with your favorite brands.
            </p>

            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search for deals..."
                className="w-full py-3 pl-10 pr-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 w-full">
        {/* Active Filters */}
        {selectedFilters.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>
            {selectedFilters.map(filter => (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {[...categories, ...discountTypes].find(category => category.id === filter)?.label || filter === 'new-arrivals' && 'New Arrivals' || filter === 'expiring-soon' && 'Expiring Soon' || filter}
                <button onClick={() => removeFilter(filter)}>
                  <X size={14} />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile Collapsible */}
          <div className="lg:hidden w-full mb-4">
            <Collapsible open={expanded} onOpenChange={setExpanded} className="w-full border rounded-lg shadow-sm bg-white">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex w-full justify-between p-4">
                  <div className="flex items-center gap-2">
                    <Filter size={16} />
                    <span>Filter Deals</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "transform rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 border-t">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${category.id}-mobile`}
                          checked={selectedFilters.includes(category.id)}
                          onCheckedChange={(checked) => {
                            checked ? addFilter(category.id) : removeFilter(category.id);
                          }}
                        />
                        <label htmlFor={`${category.id}-mobile`} className="text-sm">{category.label}</label>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-medium mb-3 mt-6">Discount Type</h3>
                  <div className="space-y-2">
                    {discountTypes.map(type => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${type.id}-mobile`}
                          checked={selectedFilters.includes(type.id)}
                          onCheckedChange={(checked) => {
                            checked ? addFilter(type.id) : removeFilter(type.id);
                          }}
                        />
                        <label htmlFor={`${type.id}-mobile`} className="text-sm">{type.label}</label>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-6 bg-brand-danger text-white">Apply Filters</Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Filters - Desktop Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-medium flex items-center gap-2">
                  <Filter size={16} />
                  <span>Filters</span>
                </h3>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Tag size={14} />
                    <span>Categories</span>
                  </h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedFilters.includes(category.id)}
                          onCheckedChange={(checked) => {
                            checked ? addFilter(category.id) : removeFilter(category.id);
                          }}
                        />
                        <label htmlFor={category.id} className="text-sm">{category.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    {/* <Fire size={14} /> */}
                    <span>Discount Type</span>
                  </h4>
                  <div className="space-y-2">
                    {discountTypes.map(type => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={selectedFilters.includes(type.id)}
                          onCheckedChange={(checked) => {
                            checked ? addFilter(type.id) : removeFilter(type.id);
                          }}
                        />
                        <label htmlFor={type.id} className="text-sm">{type.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Clock size={14} />
                    <span>Expiration</span>
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        onCheckedChange={(checked) =>
                          checked ? addFilter('expiring-soon') : removeFilter('expiring-soon')
                        }
                        checked={selectedFilters.includes('expiring-soon')}
                        id="expiring-soon" />
                      <label htmlFor="expiring-soon" className="text-sm">Expiring Soon</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        onCheckedChange={(checked) =>
                          checked ? addFilter('new-arrivals') : removeFilter('new-arrivals')
                        }
                        checked={selectedFilters.includes('new-arrivals')}
                        id="new-arrivals" />
                      <label htmlFor="new-arrivals" className="text-sm">New Arrivals</label>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
                <Button variant="outline" className="w-full mt-2" onClick={clearFilters}>
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Coupons Grid */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold">
                Showing <span className="text-blue-600">{recentCoupons.length}</span> deals
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="border rounded-md p-2 text-sm bg-white">
                  <option>Newest First</option>
                  <option>Highest Discount</option>
                  <option>Expiring Soon</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {recentCoupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>

            <div className="mt-12 flex justify-center ">
              <Button variant="outline" className="font-medium bg-gray-200">
                Load More Deals
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Banner */}
      <div className="mt-16 w-full">
        <SignUpBanner />
      </div>

    </div>
  );
};

export default CouponDeals;
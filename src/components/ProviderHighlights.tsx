import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, ExternalLink, Sparkles, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ProviderHighlights = () => {
  const navigate = useNavigate();
  const [featureMerchants, setFeatureMerchants] = React.useState<boolean>(false);
  const [merchants, setMerchants] = React.useState([
    {
      id: "1",
      name: "KFC",
      logo: "https://cdn.simpleicons.org/kfc",
      rating: 0,
      isApproved: false,
      categories: [],
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      created_at: "",
      updated_at: ""
    },
    {
      id: "2",
      name: "Spotify",
      logo: "https://cdn.simpleicons.org/spotify",
      rating: 0,
      isApproved: false,
      categories: [],
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      created_at: "",
      updated_at: ""
    },
    {
      id: "3",
      name: "Nike",
      logo: "https://cdn.simpleicons.org/nike",
      rating: 0,
      isApproved: false,
      categories: [],
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      created_at: "",
      updated_at: ""
    },
    {
      id: "4",
      name: "FIFA",
      logo: "https://cdn.simpleicons.org/fifa",
      rating: 0,
      isApproved: false,
      categories: [],
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      created_at: "",
      updated_at: ""
    },
    {
      id: "5",
      name: "Uber",
      logo: "https://cdn.simpleicons.org/uber",
      rating: 0,
      isApproved: false,
      categories: [],
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      created_at: "",
      updated_at: ""
    },
    {
      id: "6",
      name: "2K",
      logo: "https://cdn.simpleicons.org/2k",
      rating: 0,
      isApproved: false,
      categories: [],
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      created_at: "",
      updated_at: ""
    },
    {
      id: "7",
      name: "Rockstar Games",
      logo: "https://cdn.simpleicons.org/rockstargames",
      rating: 0,
      isApproved: false,
      categories: [],
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      created_at: "",
      updated_at: ""
    },
    {
      id: "8",
      name: "Airbnb",
      logo: "https://cdn.simpleicons.org/airbnb",
      rating: 0,
      isApproved: false,
      categories: [],
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      created_at: "",
      updated_at: ""
    }
  ]);


  const fetchFeaturedMerchants = async () => {
    try {
      const response = await axiosInstance.get('/merchants/featured');
      if (response.status !== 200) {
        throw new Error(response.data.message || 'An error occurred while fetching featured merchants');
      }
      const { data } = response.data;
      setMerchants(data);
    } catch (error) {

      toast({
        title: error.response.data?.message || error.message || "An error occurred",
        description: error.response.data?.message || "Something went wrong while getting featured merchants. It's not you it's us",
        variant: `${error.response.status.toLocaleString().startsWith(4) ? "warning" : "destructive"}`
      });
    }
  }
  if (!featureMerchants) {
    return (
      <section
        style={{
          backgroundImage: `url("/trusted-partner.webp")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="py-20 w-full relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 to-slate-50/95"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
            <Sparkles className="h-5 w-5 mr-2" />
            Coming Soon
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Exclusive Student Partnerships
          </h2>
          <div className="space-y-4 text-gray-600 mb-8">
            <p className="text-lg leading-relaxed">
              We're building meaningful partnerships with vendors that share our mission to bring you exclusive discounts and offers.
            </p>
            <p className="text-lg leading-relaxed">
              Stay tuned for amazing deals from your favorite brands!
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-md mx-auto mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Are you a business?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Reach thousands of students with your products or services. Get in touch to learn about partnership opportunities.
            </p>
            <a href="mailto:info@studentx.co.ke?subject=Partnership%20Inquiry&body=I%20am%20interested%20in%20partnering%20with%20StudentX%20to%20offer%20exclusive%20discounts%20to%20students.%20Please%20provide%20more%20information.">
              <button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center">
                Contact Us
                <ExternalLink className="h-4 w-4 ml-2" />
              </button>
            </a>
          </div>
        </div>
      </section >
    );
  }
  return (
    <section className="py-20 w-full bg-slate-100">
      <div className="">
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
            <BadgeCheck className="h-5 w-5 mr-2" />
            Trusted Partners
          </div>
          <p className="text-neutral-medium text-sm sm:text-base">
            Discover exclusive student discounts from top companies
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 px-4 max-w-7xl mx-auto">
          {merchants.map((merchant) => (
            <Card
              key={merchant.id}
              onClick={() => navigate(`/deals?search=${merchant.name}`)}
              className="border border-gray-200 hover:border-brand-primary/30 hover:shadow-md transition-all duration-200 bg-white rounded-lg overflow-hidden group"
            >
              <CardContent className="flex flex-col items-center p-4 gap-3">
                <div className="relative mb-2">
                  <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center border-[3px] border-gray-100 group-hover:border-brand-primary/20 transition-colors shadow-sm">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={merchant.logo} className="object-cover" />
                      <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-medium">
                        {merchant.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {merchant.isApproved && (
                    <div className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-sm border border-amber-100">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    </div>
                  )}
                </div>

                <div className="text-center space-y-1 w-full">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {merchant.name}
                  </h3>

                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-medium text-gray-700">
                      {merchant.rating || 'New'}
                    </span>
                  </div>
                </div>

                {/* Modified button with smooth transitions */}
                <button
                  className="mt-2 w-full text-xs 
                 h-0 opacity-0 overflow-hidden 
                 group-hover:h-auto group-hover:opacity-100 
                 bg-brand-primary hover:bg-brand-primary/90 
                 text-white font-medium py-2 px-3 
                 rounded-md transition-all duration-300 
                 shadow-sm transform group-hover:translate-y-0 translate-y-2"
                >
                  View Deals
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProviderHighlights;
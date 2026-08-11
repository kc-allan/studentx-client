import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/api/axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Cta } from "@/components/ui/cta";
import SectionHeading from "./SectionHeading";

interface FeaturedMerchant {
  id: string;
  name: string;
  logo: string;
  rating?: number;
  isApproved?: boolean;
}

const PARTNERSHIP_MAILTO =
  "mailto:info@studentx.co.ke?subject=Partnership%20Inquiry&body=I%20am%20interested%20in%20partnering%20with%20StudentX%20to%20offer%20exclusive%20discounts%20to%20students.%20Please%20provide%20more%20information.";

const ProviderHighlights = () => {
  const navigate = useNavigate();
  const [merchants, setMerchants] = React.useState<FeaturedMerchant[]>([]);

  React.useEffect(() => {
    let active = true;

    const fetchFeaturedMerchants = async () => {
      try {
        const response = await axiosInstance.get('/merchants/featured');
        if (response.status !== 200) {
          throw new Error(response.data.message || 'An error occurred while fetching featured merchants');
        }
        if (active) setMerchants(response.data?.data || []);
      } catch (error) {
        const status = error.response?.status;
        // A missing partner wall is not worth interrupting the page for
        if (status && status >= 500) {
          toast({
            title: error.response?.data?.message || error.message || "An error occurred",
            description: "Something went wrong while getting featured partners.",
            variant: "destructive",
          });
        }
      }
    };

    fetchFeaturedMerchants();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="w-full bg-neutral-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        {merchants.length > 0 ? (
          <>
            <SectionHeading
              eyebrow="Partners"
              title="Already offering student rates"
            />

            <div className="mt-12 grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-3 lg:grid-cols-5">
              {merchants.map((merchant) => (
                <button
                  key={merchant.id}
                  type="button"
                  onClick={() => navigate(`/deals?search=${encodeURIComponent(merchant.name)}`)}
                  className="flex flex-col items-center gap-3 bg-white px-4 py-8 transition-colors hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary group"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={merchant.logo} alt="" className="object-contain" />
                    <AvatarFallback className="bg-neutral-100 text-sm font-semibold text-neutral-600">
                      {merchant.name.split(' ').map((word) => word[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-center text-sm font-medium text-neutral-900 group-hover:text-white">
                    {merchant.name}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="For businesses"
                title="Reach a campus already looking for you"
              />
              <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="border-t border-neutral-900 pt-5">
                  <dt className="text-sm font-semibold text-neutral-900">
                    Verified audience
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-neutral-600">
                    Every account is checked as a student before it can claim.
                  </dd>
                </div>
                <div className="border-t border-neutral-900 pt-5">
                  <dt className="text-sm font-semibold text-neutral-900">
                    You set the terms
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-neutral-600">
                    The discount, the limits, how long it runs. Pull it anytime.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-neutral-200 bg-white p-8">
                <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                  Talk to us about listing
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Tell us what you sell and who you want to reach.
                </p>
                <div className="mt-8">
                  <Cta href={PARTNERSHIP_MAILTO} icon={ArrowUpRight}>
                    Get in touch
                  </Cta>
                </div>
                <p className="mt-6 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
                  info@studentx.co.ke
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProviderHighlights;

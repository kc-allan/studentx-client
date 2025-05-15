import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Zap, BookOpen, Coffee, Tag, TrendingUp } from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const popularSearches = ["Apple", "Nike", "Spotify", "Adobe", "Uber Eats"];

  return (
    <section className="relative bg-gradient-to-br from-neutral-500 via-neutral-900 to-black text-white overflow-hidden min-h-screen lg:pt-0 pt-20">
      {/* Abstract shapes for student-themed background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxwYXRoIGQ9Ik0tMTAgLTEwIEwyMCAtMTAgTDIwIDIwIEwtMTAgMjAgWiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 min-h-[80vh]">
          {/* Left side content */}
          <div className="flex-1 space-y-6 max-w-xl">
            <div className="inline-block bg-brand-danger text-white text-sm font-medium px-3 py-1 rounded-full animate-pulse-light">
              Student Exclusive 🎓
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-brand-primary">X</span>clusive Student <span className="text-brand-primary">Discounts</span> Just For You</h1>

              <p className="text-xl md:text-2xl mb-8 text-neutral-200 max-w-2xl mx-auto">
              Access thousands of student deals and discounts from your favorite brands
            </p>
            

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="bg-white text-brand-primary hover:bg-neutral-lightest transition-all duration-300 font-bold rounded-lg shadow-lg">
                <a href="/signup">Get Started</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-none bg-brand-danger text-white hover:bg-white/10 transition-all duration-300 rounded-lg">
                <a href="/how-it-works">See How It Works</a>
              </Button>
            </div>
          </div>

          {/* Right side - Benefits cards */}
          <div className="flex-1 relative max-w-md mx-auto lg:mx-0">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-accent/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-2xl"></div>

            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                {/* Quick stats */}
                <div className="col-span-2 bg-white/10 rounded-xl p-4 text-center">
                  <div className="flex justify-center gap-4 lg:gap-8">
                    <div className="space-y-1">
                      <p className="text-3xl font-bold">10k+</p>
                      <p className="text-sm text-neutral-lighter">Deals</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold">500+</p>
                      <p className="text-sm text-neutral-lighter">Brands</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold">100%</p>
                      <p className="text-sm text-neutral-lighter">Free</p>
                    </div>
                  </div>
                </div>

                {/* Benefit cards */}
                <BenefitCard
                  icon={<Zap size={18} />}
                  title="Instant Savings"
                  description="No waiting, just apply and save"
                />
                <BenefitCard
                  icon={<BookOpen size={18} />}
                  title="Study Essentials"
                  description="Textbooks, software & more"
                />
                <BenefitCard
                  icon={<Coffee size={18} />}
                  title="Lifestyle Perks"
                  description="Food, clothes & entertainment"
                />
                <BenefitCard
                  icon={<TrendingUp size={18} />}
                  title="New Deals Daily"
                  description="Fresh savings every day"
                />
              </div>

              {/* Trust indicators */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-lighter">
                <div className="flex items-center">
                  <Tag size={14} className="mr-1" />
                  <span>Verified Student Discounts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-background opacity-20"></path>
        </svg>
      </div>
    </section>
  );
};

const BenefitCard = ({ icon, title, description }) => (
  <div className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
    <div className="flex items-center gap-2 mb-1">
      <div className="p-1 bg-brand-accent/20 rounded-md text-brand-accent">
        {icon}
      </div>
      <h3 className="font-medium text-sm">{title}</h3>
    </div>
    <p className="text-xs text-neutral-lighter">{description}</p>
  </div>
);

export default Hero;
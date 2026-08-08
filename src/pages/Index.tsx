import * as React from "react";
import Header from "@/components/Header";
import AnnouncementStrip from "@/components/AnnouncementStrip";
import Hero from "@/components/Hero";
import CategoryList from "@/components/CategoryList";
import FeaturedCoupons from "@/components/FeaturedCoupons";
import StudentOwnedOffers from "@/components/StudentOwnedOffers";
import HowItWorks from "@/components/HowItWorks";
import LatestOffers from "@/components/LatestCoupons";
import ProviderHighlights from "@/components/ProviderHighlights";
import TestimonialsSection from "@/components/TestimonialsSection";
import SignUpBanner from "@/components/SignUpBanner";
import Footer from "@/components/Footer";


const Index = () => {
  const [stripVisible, setStripVisible] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-gray-50">
      <AnnouncementStrip onVisibilityChange={setStripVisible} />
      <Header offsetTop={stripVisible} />
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        <Hero />
        <HowItWorks />
        <FeaturedCoupons />
        <StudentOwnedOffers />
        <LatestOffers />
        <CategoryList />
        <ProviderHighlights />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

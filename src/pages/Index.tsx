import * as React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryList from "@/components/CategoryList";
import FeaturedCoupons from "@/components/FeaturedCoupons";
import HowItWorks from "@/components/HowItWorks";
import LatestCoupons from "@/components/LatestCoupons";
import ProviderHighlights from "@/components/ProviderHighlights";
import TestimonialsSection from "@/components/TestimonialsSection";
import SignUpBanner from "@/components/SignUpBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-gray-50">
      <Header />
      <main className="flex-grow w-full">
        <Hero />
        <CategoryList />
        <FeaturedCoupons />
        <HowItWorks />
        <LatestCoupons />
        <ProviderHighlights />
        <TestimonialsSection />
        <SignUpBanner />
      </main>
    </div>
  );
};

export default Index;
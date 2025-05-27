
import * as React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import SignUpBanner from "@/components/SignUpBanner";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="py-12 bg-gray-50">
          <div className="container  px-4">
            <h1 className="text-4xl font-bold text-center mb-12">How Student Deals Work</h1>
            <HowItWorks />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;

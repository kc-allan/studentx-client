
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CouponDetails from "./pages/CouponDetails";
import HowItWorks from "./pages/HowItWorks";
import FeaturedDeals from "./pages/FeaturedDeals";
import NewDeals from "./pages/NewDeals";
import Categories from "./pages/Categories";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Merchant routes
import MerchantDashboard from "./pages/merchant/Dashboard";
import MerchantCoupons from "./pages/merchant/Coupons";
import MerchantStores from "./pages/merchant/Stores";
import MerchantStudents from "./pages/merchant/Students";
import MerchantAnalytics from "./pages/merchant/Analytics";
import MerchantSettings from "./pages/merchant/Settings";

// Admin routes
import AdminDashboard from "./pages/admin/Dashboard";
import DefaultLayout from "./layout/DefaultLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main public routes */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/coupon/:id" element={<CouponDetails />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/featured" element={<FeaturedDeals />} />
            <Route path="/new" element={<NewDeals />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
          {/* Merchant routes */}
          <Route path="/merchant" element={<MerchantDashboard />} />
          <Route path="/merchant/coupons" element={<MerchantCoupons />} />
          <Route path="/merchant/stores" element={<MerchantStores />} />
          <Route path="/merchant/students" element={<MerchantStudents />} />
          <Route path="/merchant/analytics" element={<MerchantAnalytics />} />
          <Route path="/merchant/settings" element={<MerchantSettings />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Add more admin routes here */}

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

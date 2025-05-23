
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CouponDetails from "./pages/CouponDetails";
import HowItWorks from "./pages/HowItWorks";
import FeaturedDeals from "./pages/FeaturedDeals";
import NewDeals from "./pages/CouponDeals";
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
import CouponDeals from "./pages/CouponDeals";
import AuthPage from "./pages/Login";
import ProtectedRoute from "./context/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/deals" element={<CouponDeals />} />
          </Route>

          {/* Main public routes */}
          <Route element={<DefaultLayout />}>

            <Route path="/coupon/:id" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <CouponDetails />
              </ProtectedRoute>
            } />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/featured" element={<FeaturedDeals />} />
            <Route path="/signup" element={<SignUp />} />
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

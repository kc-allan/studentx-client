
import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart2, 
  PlusCircle, 
  Tag, 
  Settings, 
  Store, 
  Users,
  Eye
} from "lucide-react";
import MerchantLayout from "@/layout/MerchantLayout";
import { mockCoupons } from "@/data/mockData";

const MerchantDashboard = () => {
  // Get stats from mock data
  const totalCoupons = mockCoupons.length;
  const activeCoupons = mockCoupons.filter(c => c.status === "active").length;
  const totalRedemptions = mockCoupons.reduce((acc, c) => acc + c.redeemedCount, 0);
  const conversionRate = totalCoupons > 0 
    ? Math.round((totalRedemptions / (mockCoupons.reduce((acc, c) => acc + c.totalAvailable, 0))) * 100) 
    : 0;

  return (
    <MerchantLayout>
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
          <div className="flex mt-4 md:mt-0">
            <Link to="/merchant/coupons/new">
              <button className="flex items-center bg-primary text-white px-4 py-2 rounded-md">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Coupon
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCoupons}</div>
              <p className="text-xs text-muted-foreground">Across all campaigns</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Coupons</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCoupons}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRedemptions}</div>
              <p className="text-xs text-muted-foreground">Used by students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground">Avg. redemption rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/merchant/coupons">
            <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
              <CardContent className="flex flex-row items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Tag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Manage Coupons</CardTitle>
                  <CardDescription>View and edit your coupons</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/merchant/stores">
            <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
              <CardContent className="flex flex-row items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Manage Stores</CardTitle>
                  <CardDescription>Update store information</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/merchant/settings">
            <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
              <CardContent className="flex flex-row items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Account Settings</CardTitle>
                  <CardDescription>Update your profile</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardHeader>
            <CardTitle>Latest Redemptions</CardTitle>
            <CardDescription>Recent student redemptions of your coupons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCoupons.slice(0, 5).map((coupon) => (
                <div key={coupon.id} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">{coupon.title}</p>
                    <p className="text-sm text-muted-foreground">Code: {coupon.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{coupon.redeemedCount} used</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((coupon.redeemedCount / coupon.totalAvailable) * 100)}% redeemed
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MerchantLayout>
  );
};

export default MerchantDashboard;

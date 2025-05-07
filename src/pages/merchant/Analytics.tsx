
import * as React from "react";
import MerchantLayout from "@/components/merchant/MerchantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for charts
const monthlyCouponUsage = [
  { name: "Jan", redeemed: 14 },
  { name: "Feb", redeemed: 22 },
  { name: "Mar", redeemed: 38 },
  { name: "Apr", redeemed: 45 },
  { name: "May", redeemed: 30 },
  { name: "Jun", redeemed: 52 },
];

const couponPerformance = [
  { name: "Summer Discount", redeemed: 130, viewed: 450 },
  { name: "Welcome Code", redeemed: 250, viewed: 720 },
  { name: "Flash Deal", redeemed: 86, viewed: 320 },
  { name: "Holiday Special", redeemed: 196, viewed: 540 },
  { name: "New Student", redeemed: 152, viewed: 390 },
];

const MerchantAnalytics = () => {
  return (
    <MerchantLayout>
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="coupons">Coupons Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Coupon Redemptions</CardTitle>
                  <CardDescription>Number of coupons redeemed per month</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyCouponUsage}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="redeemed" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Coupon Performance</CardTitle>
                  <CardDescription>Views vs. Redemptions</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={couponPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="viewed" fill="#8884d8" />
                        <Bar dataKey="redeemed" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="coupons">
            <Card>
              <CardHeader>
                <CardTitle>Coupon Performance Details</CardTitle>
                <CardDescription>Detailed analytics for each coupon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                    <div className="col-span-3">Coupon Name</div>
                    <div className="col-span-2">Views</div>
                    <div className="col-span-2">Redemptions</div>
                    <div className="col-span-2">Conversion Rate</div>
                    <div className="col-span-3">Performance</div>
                  </div>
                  {couponPerformance.map((coupon, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                      <div className="col-span-3">
                        <p className="font-medium">{coupon.name}</p>
                      </div>
                      <div className="col-span-2">{coupon.viewed}</div>
                      <div className="col-span-2">{coupon.redeemed}</div>
                      <div className="col-span-2">{Math.round((coupon.redeemed / coupon.viewed) * 100)}%</div>
                      <div className="col-span-3">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${Math.round((coupon.redeemed / coupon.viewed) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MerchantLayout>
  );
};

export default MerchantAnalytics;

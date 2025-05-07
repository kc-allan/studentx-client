
import * as React from "react";
import MerchantLayout from "@/components/merchant/MerchantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCoupons } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const MerchantCoupons = () => {
  return (
    <MerchantLayout>
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold">Manage Coupons</h1>
          <div className="flex mt-4 md:mt-0">
            <Button className="flex items-center">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Coupon
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                <div className="col-span-5">Coupon</div>
                <div className="col-span-2">Code</div>
                <div className="col-span-2">Redeemed</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2">Actions</div>
              </div>
              {mockCoupons.map((coupon) => (
                <div key={coupon.id} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                  <div className="col-span-5">
                    <p className="font-medium">{coupon.title}</p>
                    <p className="text-sm text-muted-foreground">{coupon.description.substring(0, 60)}...</p>
                  </div>
                  <div className="col-span-2">
                    <code className="relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      {coupon.code}
                    </code>
                  </div>
                  <div className="col-span-2">{coupon.redeemedCount} / {coupon.totalAvailable}</div>
                  <div className="col-span-1">
                    <Badge variant={coupon.status === "active" ? "default" : "secondary"}>
                      {coupon.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="col-span-2 flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
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

export default MerchantCoupons;

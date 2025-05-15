
import * as React from "react";
import MerchantLayout from "@/layout/MerchantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash } from "lucide-react";

const mockStores = [
  { id: 1, name: "Downtown Campus Store", address: "123 University Ave", city: "College Town", state: "KE" },
  { id: 2, name: "Student Union Shop", address: "456 Campus Road", city: "College Town", state: "KE" },
  { id: 3, name: "Tech Corner", address: "789 Innovation Blvd", city: "College Town", state: "KE" },
];

const MerchantStores = () => {
  return (
    <MerchantLayout>
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold">Manage Stores</h1>
          <div className="flex mt-4 md:mt-0">
            <Button className="flex items-center">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Store
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Stores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                <div className="col-span-3">Store Name</div>
                <div className="col-span-4">Address</div>
                <div className="col-span-3">City</div>
                <div className="col-span-2">Actions</div>
              </div>
              {mockStores.map((store) => (
                <div key={store.id} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                  <div className="col-span-3">
                    <p className="font-medium">{store.name}</p>
                  </div>
                  <div className="col-span-4">
                    <p>{store.address}</p>
                  </div>
                  <div className="col-span-3">
                    <p>{store.city}, {store.state}</p>
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

export default MerchantStores;

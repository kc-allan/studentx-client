
import * as React from "react";
import MerchantLayout from "@/components/merchant/MerchantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockStudents = [
  { id: 1, name: "Alex Johnson", email: "alex@university.edu", couponsClaimed: 3, status: "verified" },
  { id: 2, name: "Sam Wilson", email: "sam@college.edu", couponsClaimed: 1, status: "verified" },
  { id: 3, name: "Taylor Smith", email: "taylor@university.edu", couponsClaimed: 0, status: "pending" },
  { id: 4, name: "Jordan Lee", email: "jordan@college.edu", couponsClaimed: 5, status: "verified" },
  { id: 5, name: "Casey Brown", email: "casey@university.edu", couponsClaimed: 2, status: "verified" },
];

const MerchantStudents = () => {
  return (
    <MerchantLayout>
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold">Student Customers</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                <div className="col-span-1"></div>
                <div className="col-span-3">Name</div>
                <div className="col-span-4">Email</div>
                <div className="col-span-2">Coupons Used</div>
                <div className="col-span-2">Status</div>
              </div>
              {mockStudents.map((student) => (
                <div key={student.id} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                  <div className="col-span-1">
                    <Avatar>
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="col-span-3">
                    <p className="font-medium">{student.name}</p>
                  </div>
                  <div className="col-span-4">
                    <p>{student.email}</p>
                  </div>
                  <div className="col-span-2">{student.couponsClaimed}</div>
                  <div className="col-span-2">
                    <Badge variant={student.status === "verified" ? "default" : "secondary"}>
                      {student.status === "verified" ? "Verified" : "Pending"}
                    </Badge>
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

export default MerchantStudents;

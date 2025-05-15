
import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart2, 
  Shield, 
  Users, 
  Store, 
  Tag, 
  Settings,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import AdminLayout from "@/layout/AdminLayout";
import { mockCoupons, mockProviders, mockStudents } from "@/data/mockData";

const AdminDashboard = () => {
  // Get stats from mock data
  const totalCoupons = mockCoupons.length;
  const totalProviders = mockProviders.length;
  const totalStudents = mockStudents.length;
  const pendingVerifications = mockStudents.filter(s => s.verificationStatus === "pending").length;

  return (
    <AdminLayout>
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex mt-4 md:mt-0">
            <Link to="/admin/reports">
              <button className="flex items-center bg-primary text-white px-4 py-2 rounded-md">
                <BarChart2 className="mr-2 h-5 w-5" />
                View Reports
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Merchants</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProviders}</div>
              <p className="text-xs text-muted-foreground">Active businesses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCoupons}</div>
              <p className="text-xs text-muted-foreground">Active & inactive</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingVerifications}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/students">
            <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
              <CardContent className="flex flex-row items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Manage Students</CardTitle>
                  <CardDescription>Review and verify accounts</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/merchants">
            <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
              <CardContent className="flex flex-row items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Manage Merchants</CardTitle>
                  <CardDescription>Review business accounts</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/settings">
            <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
              <CardContent className="flex flex-row items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Platform Settings</CardTitle>
                  <CardDescription>Configure system settings</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest Merchants</CardTitle>
              <CardDescription>Recently joined businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProviders.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center overflow-hidden">
                        {provider.logo ? (
                          <img src={provider.logo} alt={provider.name} className="w-full h-full object-cover" />
                        ) : (
                          <Store className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{provider.name}</p>
                        <p className="text-sm text-muted-foreground">{provider.company}</p>
                      </div>
                    </div>
                    <div>
                      <Link to={`/admin/merchants/${provider.id}`}>
                        <button className="text-xs text-primary">View</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Requests</CardTitle>
              <CardDescription>Student verification pending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        {student.verificationStatus === "verified" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : student.verificationStatus === "rejected" ? (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <Shield className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.university}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mr-2 ${
                        student.verificationStatus === "verified" 
                          ? "bg-green-100 text-green-800" 
                          : student.verificationStatus === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {student.verificationStatus.charAt(0).toUpperCase() + student.verificationStatus.slice(1)}
                      </span>
                      <Link to={`/admin/students/${student.id}`}>
                        <button className="text-xs text-primary">View</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

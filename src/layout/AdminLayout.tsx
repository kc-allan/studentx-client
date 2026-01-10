
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard,
  Users,
  Store,
  Tag,
  Shield,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: <Users className="h-5 w-5" />
    },
    {
      name: "Merchants",
      path: "/admin/merchants",
      icon: <Store className="h-5 w-5" />
    },
    {
      name: "Coupons",
      path: "/admin/coupons",
      icon: <Tag className="h-5 w-5" />
    },
    {
      name: "Verifications",
      path: "/admin/verifications",
      icon: <Shield className="h-5 w-5" />
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile menu toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <Link to="/admin">
            <h1 className="text-xl font-bold text-indigo-600">Admin Portal</h1>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r h-screen sticky top-0">
        <div className="p-4 border-b">
          <Link to="/admin">
            <h1 className="text-xl font-bold text-indigo-600">Admin Portal</h1>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Link
            to="/login"
            className="flex items-center p-3 text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {isMobileMenuOpen && (
        <aside className="md:hidden fixed inset-0 z-10 bg-white w-64 h-screen shadow-lg transition-transform transform translate-x-0">
          <div className="p-4 border-b mt-14">
            <h1 className="text-xl font-bold text-indigo-600">Admin Portal</h1>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <Link
              to="/login"
              className="flex items-center p-3 text-red-500 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-0"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-0 mt-16 md:mt-0">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

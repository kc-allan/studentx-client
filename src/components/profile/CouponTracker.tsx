
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Gift,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Share2,
  Copy,
  ExternalLink,
  Star,
  Percent,
  DollarSign,
  Eye,
  ShoppingBag
} from "lucide-react";
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

interface CouponTrackerProps {
  user: {
    totalSavings: number;
    dealsUsed: number;
    coupons: Coupon[];
  };
}

interface Coupon {
  id: string;
  code: string;
  title: string;
  brand: string;
  brandLogo: string;
  discount: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  description: string;
  expiryDate: string;
  status: 'active' | 'redeemed' | 'expired';
  category: {
    id: string;
    name: string;
  };
  savings?: number;
  usedDate?: string;
  originalPrice?: number;
  finalPrice?: number;
  redemptionType?: string; // 'online' or 'in-store'
}

export const CouponTracker: React.FC<CouponTrackerProps> = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const navigate = useNavigate();
  const [copied, setIsCopied] = useState(false);

  const coupons: Coupon[] = user.coupons;
  // [
  //   {
  //     id: '1',
  //     code: 'STUDENT20',
  //     title: '20% Off Sneakers',
  //     brand: 'Nike',
  //     brandLogo: 'https://cdn.simpleicons.org/nike/000000',
  //     discount: '20%',
  //     discountType: 'percentage',
  //     description: 'Get 20% off on all sneakers and athletic wear',
  //     expiryDate: '2024-12-31',
  //     status: 'active',
  //     category: 'Fashion',
  //     savings: 45.99
  //   },
  //   {
  //     id: '2',
  //     code: 'PREMIUM50',
  //     title: 'Spotify Premium Student',
  //     brand: 'Spotify',
  //     brandLogo: 'https://cdn.simpleicons.org/spotify/1DB954',
  //     discount: '50%',
  //     discountType: 'percentage',
  //     description: '50% off Spotify Premium for students',
  //     expiryDate: '2024-12-31',
  //     status: 'used',
  //     category: 'Entertainment',
  //     savings: 59.94,
  //     usedDate: '2024-11-15',
  //     originalPrice: 119.88,
  //     finalPrice: 59.94
  //   },
  //   {
  //     id: '3',
  //     code: 'FREESHIP',
  //     title: 'Free Shipping',
  //     brand: 'Amazon',
  //     brandLogo: 'https://cdn.simpleicons.org/amazon/FF9900',
  //     discount: 'Free Shipping',
  //     discountType: 'free_shipping',
  //     description: 'Free shipping on orders over $25',
  //     expiryDate: '2024-11-30',
  //     status: 'expired',
  //     category: 'Shopping',
  //   },
  //   {
  //     id: '4',
  //     code: 'STUDENT10',
  //     title: '$10 Off First Order',
  //     brand: 'Uber Eats',
  //     brandLogo: 'https://cdn.simpleicons.org/uber/000000',
  //     discount: '$10',
  //     discountType: 'fixed',
  //     description: '$10 off your first food delivery order',
  //     expiryDate: '2025-01-15',
  //     status: 'active',
  //     category: 'Food',
  //   }
  // ];

  const activeCoupons = coupons.filter(coupon => coupon.status === 'active');
  const usedCoupons = coupons.filter(coupon => coupon.status === 'redeemed');
  const expiredCoupons = coupons.filter(coupon => coupon.status === 'expired');

  const totalSavingsFromCoupons = usedCoupons.reduce((total, coupon) => total + (coupon.savings || 0), 0);

  const getDiscountIcon = (type: string) => {
    switch (type) {
      case 'percentage':
        return <Percent className="h-4 w-4" />;
      case 'fixed':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'used':
        return 'bg-brand-primary/10 text-brand-primary border-brand-primary/20';
      case 'expired':
        return 'bg-neutral-light/10 text-neutral-medium border-neutral-light/20';
      default:
        return 'bg-neutral-lighter text-neutral-medium border-neutral-lighter';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast({
      title: "Code Copied!",
      description: "The coupon code has been copied to your clipboard",
    });
    setTimeout(() => setIsCopied(false), 3000);
    // You could add a toast notification here
  };

  const renderCouponCard = (coupon: Coupon) => (
    <Card key={coupon.id} className="border-neutral-lighter hover:border-brand-primary/30 transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Brand Logo */}
          <div className="w-12 h-12 rounded-xl bg-background-subtle flex items-center justify-center border border-neutral-lighter">
            <img
              src={coupon.brandLogo}
              alt={coupon.brand}
              className="w-12 h-12 object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-1">{coupon.title}</h3>
                <p className="text-sm text-neutral-medium">{coupon.brand}</p>
              </div>
            </div>

            <p className="text-sm text-neutral-medium mb-3">{coupon.description}</p>

            {/* Coupon Code */}
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-brand-primary/10 border-2 border-dashed border-brand-primary/30 rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="font-mono font-bold text-brand-primary">{coupon.code}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 hover:bg-brand-primary/20 outline-none focus:outline-none"
                  onClick={() => copyToClipboard(coupon.code)}
                >
                  {copied ? <CheckCircle className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <div className="flex items-center gap-1 text-brand-primary font-semibold">
                {getDiscountIcon(coupon.discountType)}
                <span>{coupon.discount}</span>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-neutral-medium">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <div className="flex items-center gap-1 col-span-1">
                  <Calendar className="h-3 w-3" />
                  <span>Expires {formatDate(coupon.expiryDate)}</span>
                </div>
                
              </div>
              <Badge variant="outline" className="text-xs">
                {coupon.category.name}
              </Badge>
            </div>

            {/* Used Coupon Details */}
            {coupon.status === 'redeemed' && coupon.usedDate && (
              <div className="mt-3 p-3 bg-brand-primary/5 rounded-lg border border-brand-primary/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-medium">Used on {formatDate(coupon.usedDate)}</span>
                  {coupon.originalPrice && coupon.finalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-medium line-through">${coupon.originalPrice}</span>
                      <span className="text-success font-semibold">${coupon.finalPrice}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Ways to claim dialog */}


          {/* Actions */}
          <div className="flex flex-col gap-2">
            {coupon.status === 'active' && (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-brand-primary text-white hover:bg-brand-primary/90">
                      <ExternalLink className="h-3 w-3 mr-1 " />
                      Redeem
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>How to Claim</DialogTitle>
                      <DialogDescription>
                        Here are the steps to use this coupon:
                      </DialogDescription>
                    </DialogHeader>
                    <Card className="border-neutral-lighter mb-4">
                      <CardContent className="p-4">
                        <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-medium">
                          {coupon.redemptionType === 'online' ? (
                            <>
                              <li>Visit the <strong>{coupon.brand}</strong> website or app.</li>
                              <li>Enter the code <span className="font-mono font-bold">{coupon.code}</span> at checkout.</li>
                              <li>Enjoy your discount!</li>
                            </>
                          ) : (
                            <>
                              <li>Visit a <strong>{coupon.brand}</strong> store near you.</li>
                              <li>Show the coupon code <span className="font-mono font-bold">{coupon.code}</span> to the cashier.</li>
                              <li>Enjoy your discount!</li>
                            </>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </DialogContent>
                </Dialog>
              </>
            )}
            {coupon.status === 'redeemed' && (
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                <span className='hidden sm:inline'>View Details</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-neutral-lighter">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-brand-primary mb-1">{activeCoupons.length}</div>
            <div className="text-sm text-neutral-medium">Active Coupons</div>
          </CardContent>
        </Card>
        <Card className="border-neutral-lighter">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-success mb-1">{usedCoupons.length}</div>
            <div className="text-sm text-neutral-medium">Used Coupons</div>
          </CardContent>
        </Card>
        <Card className="border-neutral-lighter">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-brand-accent mb-1">${totalSavingsFromCoupons.toFixed(2)}</div>
            <div className="text-sm text-neutral-medium">Total Savings</div>
          </CardContent>
        </Card>
        <Card className="border-neutral-lighter">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-warning mb-1">{expiredCoupons.length}</div>
            <div className="text-sm text-neutral-medium">Expired</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-neutral-lighter">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
              <Input
                placeholder="Search coupons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coupons Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
            Active ({activeCoupons.length})
          </TabsTrigger>
          <TabsTrigger value="used" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
            Used ({usedCoupons.length})
          </TabsTrigger>
          <TabsTrigger value="expired" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
            Expired ({expiredCoupons.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeCoupons.length > 0 ? (
            activeCoupons.map(renderCouponCard)
          ) : (
            <Card className="border-neutral-lighter">
              <CardContent className="p-12 text-center">
                <Gift className="h-12 w-12 text-neutral-medium mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No Active Coupons</h3>
                <p className="text-neutral-medium mb-4">Discover new deals to add coupons to your collection</p>
                <Button onClick={() => navigate('/deals')} className="bg-brand-primary hover:bg-brand-primary/90">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Deals
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="used" className="space-y-4">
          {usedCoupons.length > 0 ? (
            usedCoupons.map(renderCouponCard)
          ) : (
            <Card className="border-neutral-lighter">
              <CardContent className="p-12 text-center">
                <Gift className="h-12 w-12 text-neutral-medium mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No Used Coupons</h3>
                <p className="text-neutral-medium mb-4">
                  You haven't used any coupons yet. Start saving with our exclusive deals!
                </p>
                <Button onClick={() => navigate('/deals')} className="bg-brand-primary hover:bg-brand-primary/90">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Deals
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {expiredCoupons.length > 0 ? (
            expiredCoupons.map(renderCouponCard)
          ) : (
            <Card className="border-neutral-lighter">
              <CardContent className="p-12 text-center">
                <Gift className="h-12 w-12 text-neutral-medium mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No Expired Coupons</h3>
                <p className="text-neutral-medium mb-4">
                  You have no expired coupons. Keep an eye on your active deals!
                </p>
                <Button onClick={() => navigate('/deals')} className="bg-brand-primary hover:bg-brand-primary/90">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Deals
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
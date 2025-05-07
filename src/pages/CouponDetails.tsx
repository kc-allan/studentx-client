
import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCouponById, getProviderById } from "@/data/mockData";
import { CouponType } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const CouponDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  
  const coupon = id ? getCouponById(id) : undefined;
  const provider = coupon ? getProviderById(coupon.providerId) : undefined;
  
  if (!coupon || !provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Coupon not found</h2>
            <p className="text-gray-600 mb-6">The coupon you are looking for doesn't exist or has expired.</p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Format the coupon value based on type
  const formatValue = () => {
    switch (coupon.type) {
      case CouponType.PERCENTAGE:
        return `${coupon.value}% OFF`;
      case CouponType.FIXED_AMOUNT:
        return `$${coupon.value} OFF`;
      case CouponType.BUY_ONE_GET_ONE:
        return `BUY 1 GET 1 ${coupon.value ? `${coupon.value}% OFF` : 'FREE'}`;
      case CouponType.FREE_ITEM:
        return 'FREE ITEM';
      default:
        return '';
    }
  };
  
  // Calculate days remaining until expiration
  const daysRemaining = () => {
    const today = new Date();
    const end = new Date(coupon.endDate);
    const diff = end.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };
  
  // Calculate percentage of coupons redeemed
  const percentRedeemed = Math.round((coupon.redeemedCount / coupon.totalAvailable) * 100);
  
  const handleRevealCode = () => {
    setIsRevealed(true);
    
    // Track that this coupon was viewed (would connect to analytics in a real app)
    console.log(`Coupon ${coupon.id} revealed by user`);
    
    toast({
      title: "Coupon Code Revealed!",
      description: "You can now use this code for your purchase",
    });
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    setIsCopied(true);
    
    toast({
      title: "Code Copied!",
      description: "The coupon code has been copied to your clipboard",
    });
    
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/" className="text-primary hover:underline">&larr; Back to Deals</Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coupon Details */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="relative h-56 bg-gray-200">
                  <img 
                    src={coupon.image || "/placeholder.svg"} 
                    alt={coupon.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-secondary text-white text-lg font-bold px-3 py-1.5">
                    {formatValue()}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <img 
                      src={provider.logo || "/placeholder.svg"} 
                      alt={provider.name}
                      className="w-10 h-10 object-contain rounded-full border"
                    />
                    <div>
                      <h3 className="font-medium">{provider.name}</h3>
                      <Link to={`/provider/${provider.id}`} className="text-sm text-primary hover:underline">
                        View all deals
                      </Link>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-2">{coupon.title}</h1>
                  
                  <p className="text-gray-600 mb-6">{coupon.description}</p>
                  
                  <Tabs defaultValue="details">
                    <TabsList>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Discount Type</h4>
                          <p>{coupon.type.replace('_', ' ')}</p>
                        </div>
                        
                        {coupon.minPurchase && (
                          <div>
                            <h4 className="font-semibold mb-1">Minimum Purchase</h4>
                            <p>${coupon.minPurchase}</p>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-semibold mb-1">Valid Until</h4>
                          <p>{new Date(coupon.endDate).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Category</h4>
                          <div className="flex flex-wrap gap-2">
                            {coupon.categories.map((categoryId) => (
                              <Badge key={categoryId} variant="outline">
                                {categoryId === "1" ? "Food & Drink" : 
                                 categoryId === "2" ? "Fashion" : 
                                 categoryId === "3" ? "Technology" : "Other"}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="terms" className="mt-4">
                      <div className="prose prose-sm max-w-none">
                        <p>{coupon.terms || "No specific terms provided for this deal. Please check with the provider for any restrictions or limitations that may apply."}</p>
                        <ul className="mt-4">
                          <li>Valid for students with verified accounts only</li>
                          <li>Cannot be combined with other promotions unless specified</li>
                          <li>The provider reserves the right to modify or end this promotion</li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Get Coupon Box */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Get Your Discount</h3>
                  
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Available</span>
                      <span className="text-sm">{coupon.totalAvailable - coupon.redeemedCount} remaining</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${percentRedeemed}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Expiration</span>
                      <span className="font-medium">{daysRemaining()} days left</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Used</span>
                      <span className="font-medium">{coupon.redeemedCount} times</span>
                    </div>
                  </div>
                  
                  {isRevealed ? (
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1">Coupon Code</label>
                      <div className="flex">
                        <div className="bg-gray-100 border rounded-l-md p-3 flex-grow text-center font-mono font-bold text-lg">
                          {coupon.code}
                        </div>
                        <Button 
                          onClick={handleCopyCode}
                          className="rounded-l-none"
                        >
                          {isCopied ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleRevealCode}
                      className="w-full mb-6"
                    >
                      Reveal Code
                    </Button>
                  )}
                  
                  <div className="text-center text-sm text-gray-500">
                    <p>Use this code at checkout on the {provider.name} website or in store.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CouponDetails;

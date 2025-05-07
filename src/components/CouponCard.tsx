
import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coupon, CouponType } from "@/types";

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  // Calculate percentage of coupons redeemed
  const percentRedeemed = Math.round((coupon.redeemedCount / coupon.totalAvailable) * 100);
  
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

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={coupon.image || "/placeholder.svg"} 
          alt={coupon.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-2 right-2 bg-secondary text-white font-bold">
          {formatValue()}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {coupon.providerName}
          </Badge>
          {coupon.featured && (
            <Badge variant="secondary" className="text-xs bg-secondary-400">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-2">{coupon.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <CardDescription className="line-clamp-2 text-sm">
          {coupon.description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="pt-2 flex flex-col space-y-3 border-t">
        <div className="w-full flex items-center justify-between text-sm text-muted-foreground">
          <span>{coupon.redeemedCount} used</span>
          <span>{daysRemaining()} days left</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-primary h-1.5 rounded-full" 
            style={{ width: `${percentRedeemed}%` }}
          ></div>
        </div>
        
        <Link to={`/coupon/${coupon.id}`} className="w-full">
          <Button variant="default" className="w-full bg-secondary hover:bg-primary-600 text-white">
            Get Deal
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CouponCard;

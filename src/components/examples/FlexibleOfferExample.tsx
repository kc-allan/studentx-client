import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UsageIndicator } from '@/components/ui/usage-indicator';
import { useOfferUsage } from '@/hooks/use-offer-usage';
import { UsageType } from '@/types/offer';
import { Loader2 } from 'lucide-react';

interface FlexibleOfferExampleProps {
  offerId: string;
  offerTitle: string;
  usageType: UsageType;
  maxClaimsPerUser?: number;
  cooldownPeriodHours?: number;
}

/**
 * Example component demonstrating how to use the flexible discount system
 */
export const FlexibleOfferExample: React.FC<FlexibleOfferExampleProps> = ({
  offerId,
  offerTitle,
  usageType,
  maxClaimsPerUser,
  cooldownPeriodHours
}) => {
  const {
    usageStats,
    claimAvailability,
    loading,
    claiming,
    canClaimMore,
    claimStatusMessage,
    nextClaimTime,
    usagePercentage,
    claimCoupon,
    refreshUsageInfo
  } = useOfferUsage({ offerId, autoFetch: true });

  const handleClaim = async () => {
    const result = await claimCoupon();
    if (result) {
      // Handle successful claim
      console.log('Coupon claimed successfully:', result);
    }
  };

  const handleRefresh = () => {
    refreshUsageInfo();
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">{offerTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin h-6 w-6 text-brand-primary" />
            <span className="ml-2 text-sm text-gray-600">Loading usage info...</span>
          </div>
        ) : (
          <>
            {/* Usage Type and Status Indicator */}
            <UsageIndicator
              usageType={usageType}
              maxClaimsPerUser={maxClaimsPerUser}
              cooldownPeriodHours={cooldownPeriodHours}
              claimAvailability={claimAvailability}
              usageStats={usageStats}
              showProgress={true}
              showAlert={true}
              size="md"
            />

            {/* Claim Status Message */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-800">Status:</p>
              <p className="text-sm text-gray-600">{claimStatusMessage}</p>
              {nextClaimTime && (
                <p className="text-xs text-gray-500 mt-1">
                  Next available in: {nextClaimTime}
                </p>
              )}
            </div>

            {/* Usage Statistics Display */}
            {usageStats && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {usageStats.usage_count}
                  </div>
                  <div className="text-xs text-blue-800">Claims</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    ${(usageStats.total_savings / 100).toFixed(2)}
                  </div>
                  <div className="text-xs text-green-800">Saved</div>
                </div>
              </div>
            )}

            {/* Usage Progress for Multi-use Offers */}
            {usageType === UsageType.MULTI_USE && maxClaimsPerUser && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span>{usagePercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleClaim}
                disabled={!canClaimMore || claiming}
                className="flex-1 bg-brand-primary hover:bg-brand-primary/90 disabled:bg-gray-300"
              >
                {claiming ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Claiming...
                  </>
                ) : canClaimMore ? (
                  'Claim Coupon'
                ) : (
                  'Cannot Claim'
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={loading}
                className="px-3"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  '↻'
                )}
              </Button>
            </div>

            {/* Debug Info (remove in production) */}
            {process.env.NODE_ENV === 'development' && (
              <details className="text-xs bg-gray-100 p-2 rounded">
                <summary>Debug Info</summary>
                <pre className="mt-2 whitespace-pre-wrap">
                  {JSON.stringify({
                    usageStats,
                    claimAvailability,
                    canClaimMore,
                    usagePercentage
                  }, null, 2)}
                </pre>
              </details>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Example usage scenarios
export const FlexibleOfferExamples: React.FC = () => {
  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold text-center">Flexible Discount System Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Single Use Example */}
        <FlexibleOfferExample
          offerId="single-use-example"
          offerTitle="Traditional 20% Off"
          usageType={UsageType.SINGLE_USE}
        />

        {/* Multi Use Example */}
        <FlexibleOfferExample
          offerId="multi-use-example"
          offerTitle="Coffee Shop Rewards"
          usageType={UsageType.MULTI_USE}
          maxClaimsPerUser={5}
          cooldownPeriodHours={24}
        />

        {/* Unlimited Example */}
        <FlexibleOfferExample
          offerId="unlimited-example"
          offerTitle="Daily Student Discount"
          usageType={UsageType.UNLIMITED}
          cooldownPeriodHours={2}
        />

        {/* Tiered Example */}
        <FlexibleOfferExample
          offerId="tiered-example"
          offerTitle="Loyalty Restaurant Deal"
          usageType={UsageType.TIERED}
          maxClaimsPerUser={10}
        />
      </div>
    </div>
  );
};
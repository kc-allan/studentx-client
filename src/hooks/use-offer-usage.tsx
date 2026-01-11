import { useState, useEffect, useCallback } from 'react';
import { 
  getOfferUsageStats, 
  checkClaimAvailability, 
  getUserSavingsSummary, 
  claimOfferCoupon 
} from '@/api/offers';
import { UsageStats, ClaimAvailability } from '@/types/offer';
import { CouponClaimResponse } from '@/types/coupon';
import { toast } from '@/hooks/use-toast';

interface UseOfferUsageOptions {
  offerId?: string;
  autoFetch?: boolean;
}

export const useOfferUsage = (options: UseOfferUsageOptions = {}) => {
  const { offerId, autoFetch = true } = options;
  
  // Usage statistics state
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [claimAvailability, setClaimAvailability] = useState<ClaimAvailability | null>(null);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);
  
  // Savings summary state
  const [savingsSummary, setSavingsSummary] = useState<any>(null);
  const [savingsLoading, setSavingsLoading] = useState(false);

  // Fetch usage statistics for a specific offer
  const fetchUsageStats = useCallback(async (targetOfferId?: string) => {
    const id = targetOfferId || offerId;
    if (!id) return;

    try {
      setLoading(true);
      const data = await getOfferUsageStats(id);
      setUsageStats(data.usage_stats);
      return data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [offerId]);

  // Fetch claim availability for a specific offer
  const fetchClaimAvailability = useCallback(async (targetOfferId?: string) => {
    const id = targetOfferId || offerId;
    if (!id) return;

    try {
      setLoading(true);
      const data = await checkClaimAvailability(id);
      setClaimAvailability(data);
      return data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [offerId]);

  // Fetch both usage stats and claim availability
  const fetchOfferUsageInfo = useCallback(async (targetOfferId?: string) => {
    const id = targetOfferId || offerId;
    if (!id) return;

    try {
      setLoading(true);
      const [statsResult, availabilityResult] = await Promise.allSettled([
        getOfferUsageStats(id),
        checkClaimAvailability(id)
      ]);

      if (statsResult.status === 'fulfilled') {
        setUsageStats(statsResult.value.usage_stats);
      }

      if (availabilityResult.status === 'fulfilled') {
        setClaimAvailability(availabilityResult.value);
      }

      return {
        usageStats: statsResult.status === 'fulfilled' ? statsResult.value.usage_stats : null,
        claimAvailability: availabilityResult.status === 'fulfilled' ? availabilityResult.value : null
      };
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [offerId]);

  // Fetch user's overall savings summary
  const fetchSavingsSummary = useCallback(async () => {
    try {
      setSavingsLoading(true);
      const data = await getUserSavingsSummary();
      setSavingsSummary(data);
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not load savings summary",
        variant: "destructive",
      });
      return null;
    } finally {
      setSavingsLoading(false);
    }
  }, []);

  // Claim a coupon for an offer
  const claimCoupon = useCallback(async (targetOfferId?: string): Promise<CouponClaimResponse | null> => {
    const id = targetOfferId || offerId;
    if (!id) return null;

    try {
      setClaiming(true);
      const response = await claimOfferCoupon(id);
      
      // Refresh usage info after successful claim
      await fetchOfferUsageInfo(id);
      
      toast({
        title: response.message || "Coupon claimed!",
        description: response.description || "Your coupon has been generated successfully",
        variant: "default",
      });

      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to claim coupon";
      const errorDescription = error.response?.data?.description || "Please try again later";
      
      toast({
        title: errorMessage,
        description: errorDescription,
        variant: "destructive",
      });

      // Handle specific error cases
      if (error.response?.status === 409) {
        // User already has a coupon for this offer
        return error.response.data;
      }

      return null;
    } finally {
      setClaiming(false);
    }
  }, [offerId, fetchOfferUsageInfo]);

  // Check if user can claim more coupons for this offer
  const canClaimMore = useCallback(() => {
    if (!claimAvailability) return false;
    return claimAvailability.can_claim_now;
  }, [claimAvailability]);

  // Get user-friendly message about claim status
  const getClaimStatusMessage = useCallback(() => {
    if (!claimAvailability) return "Loading...";
    
    if (claimAvailability.can_claim_now) {
      if (claimAvailability.remaining_claims === "unlimited") {
        return "You can claim this offer";
      } else {
        return `${claimAvailability.remaining_claims} claims remaining`;
      }
    } else {
      return claimAvailability.reason || "Cannot claim at this time";
    }
  }, [claimAvailability]);

  // Get next available claim time in a user-friendly format
  const getNextClaimTime = useCallback(() => {
    if (!claimAvailability?.next_available_claim) return null;
    
    const date = new Date(claimAvailability.next_available_claim);
    const now = new Date();
    const diffHours = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours <= 24) {
      return `${diffHours} hours`;
    } else {
      const diffDays = Math.ceil(diffHours / 24);
      return `${diffDays} days`;
    }
  }, [claimAvailability]);

  // Auto-fetch usage info when component mounts
  useEffect(() => {
    if (autoFetch && offerId) {
      fetchOfferUsageInfo();
    }
  }, [autoFetch, offerId, fetchOfferUsageInfo]);

  // Calculate usage percentage for progress bars
  const getUsagePercentage = useCallback(() => {
    if (!usageStats || !claimAvailability) return 0;
    
    const { current_usage_count } = claimAvailability;
    const maxClaims = claimAvailability.offer_details.max_claims_per_user;
    
    if (!maxClaims || claimAvailability.remaining_claims === "unlimited") return 0;
    
    return Math.min((current_usage_count / maxClaims) * 100, 100);
  }, [usageStats, claimAvailability]);

  return {
    // State
    usageStats,
    claimAvailability,
    savingsSummary,
    loading,
    claiming,
    savingsLoading,
    
    // Actions
    fetchUsageStats,
    fetchClaimAvailability,
    fetchOfferUsageInfo,
    fetchSavingsSummary,
    claimCoupon,
    
    // Computed values
    canClaimMore: canClaimMore(),
    claimStatusMessage: getClaimStatusMessage(),
    nextClaimTime: getNextClaimTime(),
    usagePercentage: getUsagePercentage(),
    
    // Helper functions
    refreshUsageInfo: fetchOfferUsageInfo,
    refreshSavings: fetchSavingsSummary,
  };
};
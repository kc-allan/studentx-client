import axiosInstance from './axios';
import { 
  Offer, 
  UsageStats, 
  ClaimAvailability, 
  DiscountInfo 
} from '@/types/offer';
import { CouponClaimResponse } from '@/types/coupon';

// Enhanced offer API calls for flexible usage system

/**
 * Get detailed usage statistics for a specific offer
 */
export const getOfferUsageStats = async (offerId: string): Promise<{
  offer: {
    id: string;
    title: string;
    usage_type: string;
    max_claims_per_user: number | null;
    cooldown_period_hours: number | null;
  };
  usage_stats: UsageStats;
  next_available_claim: string | null;
}> => {
  const response = await axiosInstance.get(`/offer/${offerId}/usage-stats`);
  return response.data.data;
};

/**
 * Check claim availability for a specific offer
 */
export const checkClaimAvailability = async (offerId: string): Promise<ClaimAvailability> => {
  const response = await axiosInstance.get(`/offer/${offerId}/available-claims`);
  return response.data.data;
};

/**
 * Get comprehensive savings summary for the current user
 */
export const getUserSavingsSummary = async (): Promise<{
  aggregate_stats: {
    total_savings: number;
    total_claims: number;
    total_redemptions: number;
    unique_offers_claimed: number;
    average_savings_per_redemption: number;
  };
  top_offers_by_savings: Array<{
    offer: {
      id: string;
      title: string;
      merchant_name: string;
    };
    total_savings: number;
    usage_count: number;
    total_redemptions: number;
  }>;
  recent_activity: Array<{
    offer: {
      id: string;
      title: string;
      merchant_name: string;
    };
    last_claimed_at: string;
    usage_count: number;
  }>;
}> => {
  const response = await axiosInstance.get('/offer/user/savings-summary');
  return response.data.data;
};

/**
 * Claim a coupon for an offer (enhanced with flexible usage)
 */
export const claimOfferCoupon = async (offerId: string): Promise<CouponClaimResponse> => {
  const response = await axiosInstance.post(`/offer/${offerId}/coupons/create`);
  return response.data;
};

/**
 * Get offer details with usage information
 */
export const getOfferWithUsage = async (offerId: string): Promise<Offer> => {
  const [offerResponse, usageResponse, availabilityResponse] = await Promise.allSettled([
    axiosInstance.get(`/offer/${offerId}`),
    axiosInstance.get(`/offer/${offerId}/usage-stats`),
    axiosInstance.get(`/offer/${offerId}/available-claims`)
  ]);

  let offer: Offer;
  
  if (offerResponse.status === 'fulfilled') {
    offer = offerResponse.value.data.data;
  } else {
    throw new Error('Failed to fetch offer');
  }

  // Attach usage information if available
  if (usageResponse.status === 'fulfilled') {
    offer.user_usage_stats = usageResponse.value.data.data.usage_stats;
  }

  if (availabilityResponse.status === 'fulfilled') {
    offer.claim_availability = availabilityResponse.value.data.data;
  }

  return offer;
};

/**
 * Get list of offers with optional usage information
 */
export const getOffersWithUsage = async (options: {
  page?: number;
  per_page?: number;
  category?: string;
  merchant?: string;
  status?: string;
  search?: string;
  featured?: boolean;
  include_usage?: boolean;
} = {}): Promise<{
  message: string;
  data: Offer[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    pages: number;
  };
}> => {
  const params = new URLSearchParams();
  
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const response = await axiosInstance.get(`/offer?${params.toString()}`);
  
  // If usage information is requested, fetch it for each offer
  if (options.include_usage && response.data.data) {
    const offersWithUsage = await Promise.allSettled(
      response.data.data.map(async (offer: Offer) => {
        try {
          const [usageResponse, availabilityResponse] = await Promise.allSettled([
            axiosInstance.get(`/offer/${offer.id}/usage-stats`),
            axiosInstance.get(`/offer/${offer.id}/available-claims`)
          ]);

          if (usageResponse.status === 'fulfilled') {
            offer.user_usage_stats = usageResponse.value.data.data.usage_stats;
          }

          if (availabilityResponse.status === 'fulfilled') {
            offer.claim_availability = availabilityResponse.value.data.data;
          }

          return offer;
        } catch (error) {
          // Return original offer if usage data fetch fails
          return offer;
        }
      })
    );

    response.data.data = offersWithUsage
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<Offer>).value);
  }

  return response.data;
};

/**
 * Get featured offers with usage information
 */
export const getFeaturedOffersWithUsage = async (): Promise<Offer[]> => {
  const response = await axiosInstance.get('/offer/featured');
  const offers: Offer[] = response.data;

  // Fetch usage information for each offer
  const offersWithUsage = await Promise.allSettled(
    offers.map(async (offer) => {
      try {
        const [usageResponse, availabilityResponse] = await Promise.allSettled([
          axiosInstance.get(`/offer/${offer.id}/usage-stats`),
          axiosInstance.get(`/offer/${offer.id}/available-claims`)
        ]);

        if (usageResponse.status === 'fulfilled') {
          offer.user_usage_stats = usageResponse.value.data.data.usage_stats;
        }

        if (availabilityResponse.status === 'fulfilled') {
          offer.claim_availability = availabilityResponse.value.data.data;
        }

        return offer;
      } catch (error) {
        return offer;
      }
    })
  );

  return offersWithUsage
    .filter(result => result.status === 'fulfilled')
    .map(result => (result as PromiseFulfilledResult<Offer>).value);
};

/**
 * Get recommended offers with usage information
 */
export const getRecommendedOffersWithUsage = async (options: {
  filters?: string;
  search?: string;
  sort?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{
  message: string;
  data: Offer[];
}> => {
  const params = new URLSearchParams();
  
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const response = await axiosInstance.get(`/offer/recommended?${params.toString()}`);
  const offers: Offer[] = response.data.data;

  // Fetch usage information for each offer
  const offersWithUsage = await Promise.allSettled(
    offers.map(async (offer) => {
      try {
        const [usageResponse, availabilityResponse] = await Promise.allSettled([
          axiosInstance.get(`/offer/${offer.id}/usage-stats`),
          axiosInstance.get(`/offer/${offer.id}/available-claims`)
        ]);

        if (usageResponse.status === 'fulfilled') {
          offer.user_usage_stats = usageResponse.value.data.data.usage_stats;
        }

        if (availabilityResponse.status === 'fulfilled') {
          offer.claim_availability = availabilityResponse.value.data.data;
        }

        return offer;
      } catch (error) {
        return offer;
      }
    })
  );

  return {
    message: response.data.message,
    data: offersWithUsage
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<Offer>).value)
  };
};

/**
 * Save an offer to user's favorites
 */
export const saveOffer = async (offerId: string): Promise<{ message: string }> => {
  const response = await axiosInstance.post(`/offer/${offerId}/save`);
  return response.data;
};

/**
 * Get similar offers for a given offer
 */
export const getSimilarOffers = async (offerId: string): Promise<{
  message: string;
  data: Offer[];
}> => {
  const response = await axiosInstance.get(`/offer/${offerId}/similar`);
  return response.data;
};
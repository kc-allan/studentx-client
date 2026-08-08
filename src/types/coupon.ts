import { Offer, DiscountInfo, UsageStats, OfferKind } from "./offer";
import { Consumer } from "./user";

export enum CouponStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  REDEEMED = "redeemed",
  INACTIVE = "inactive"
}

export interface Coupon {
	id: string;
	/** Null for event registrations, which reveal a shared link instead of a code. */
	code: string | null;
	qrCode: string;
	offerKind?: OfferKind;
	eventUrl?: string;
	expiryDate: string;
	status: CouponStatus;
	redeemed: boolean;
	redeemedAt: string | null;
	offer: Offer;
	consumer: Consumer;
	// New flexible system fields
	discount?: DiscountInfo;
	usage_stats?: {
		total_claims: number;
		total_savings: number;
		can_claim_more: boolean;
		next_available_claim: string | null;
	};
	savings_amount?: number;
}

export interface CouponClaimResponse {
	message: string;
	description: string;
	data: {
		code: string | null;
		qrCode: string;
		expiryDate: string;
		status: string;
		offerKind?: OfferKind;
		eventUrl?: string;
		discount: DiscountInfo;
		usage_stats: {
			total_claims: number;
			total_savings: number;
			can_claim_more: boolean;
			next_available_claim: string | null;
		};
	};
}
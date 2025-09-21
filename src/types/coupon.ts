import { Offer, DiscountInfo, UsageStats } from "./offer";
import { Consumer } from "./user";

export enum CouponStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  REDEEMED = "redeemed",
  INACTIVE = "inactive"
}

export interface Coupon {
	id: string;
	code: string;
	qrCode: string;
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
		code: string;
		qrCode: string;
		expiryDate: string;
		status: string;
		discount: DiscountInfo;
		usage_stats: {
			total_claims: number;
			total_savings: number;
			can_claim_more: boolean;
			next_available_claim: string | null;
		};
	};
}
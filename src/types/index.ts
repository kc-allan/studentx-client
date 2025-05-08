
export enum UserRole {
  STUDENT = "student",
  PROVIDER = "provider",
  ADMIN = "admin"
}

export enum CouponType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
  BUY_ONE_GET_ONE = "buy_one_get_one",
  FREE_ITEM = "free_item"
}

 export enum CouponStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  REDEEMED = "redeemed",
  INACTIVE = "inactive"
}

export enum VerificationStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  REJECTED = "rejected"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Student extends User {
  studentId?: string;
  university?: string;
  verificationStatus: VerificationStatus;
  savedCoupons: string[];
}

export interface Provider extends User {
  company: string;
  description?: string;
  logo?: string;
  website?: string;
  categories: string[];
  stores?: Store[];
}

export interface Store {
  id: string;
  name: string;
  address: string;
  providerId: string;
}

export interface Coupon {
  id: string;
  code: string;
  providerId: string;
  providerName: string;
  providerLogo?: string;
  currency?: string;
  title: string;
  description: string;
  type: CouponType;
  value: number; // Percentage or fixed amount
  minPurchase?: number; // unused
  maxDiscount?: number; // unused
  startDate: Date;
  endDate: Date;
  image?: string;
  totalAvailable: number;
  redeemedCount: number;
  status: CouponStatus;
  categories: string[];
  terms?: string;
  featured: boolean;
}

export interface CouponRedemption {
  id: string;
  couponId: string;
  studentId: string;
  redeemedAt: Date;
  storeId?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  imageUrl?: string;
}

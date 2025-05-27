
import { Coupon, CouponStatus } from "@/types/coupon";
import { Category } from "@/types/category";
import { Consumer, Merchant, UserRole, VerificationStatus } from "@/types/user";
import { OfferType } from "@/types/offer";

export const categories: Category[] = [
  { id: "1", name: "Food & Drink", slug: "food-drink", iconName: "ticket", imageUrl: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "2", name: "Fashion", slug: "fashion", iconName: "ticket", imageUrl: "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "3", name: "Technology", slug: "technology", iconName: "ticket", imageUrl: "https://images.pexels.com/photos/2417848/pexels-photo-2417848.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "4", name: "Entertainment", slug: "entertainment", iconName: "ticket", imageUrl: "https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "5", name: "Travel", slug: "travel", iconName: "ticket", imageUrl: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "6", name: "Health & Beauty", slug: "health-beauty", iconName: "ticket", imageUrl: "https://images.pexels.com/photos/2417848/pexels-photo-2417848.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "7", name: "Education", slug: "education", iconName: "ticket", imageUrl: "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "8", name: "Services", slug: "services", iconName: "ticket", imageUrl: "https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

export const mockProviders: Merchant[] = [
  {
    id: "p1",
    name: "Campus Eats",
    email: "info@campuseats.com",
    role: UserRole.PROVIDER,
    company: "Campus Eats Ltd.",
    description: "The best food delivery service for students.",
    logo: "https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://campuseats.com",
    categories: ["1"],
    createdAt: new Date("2023-01-15")
  },
  {
    id: "p2",
    name: "Student Tech",
    email: "support@studenttech.com",
    role: UserRole.PROVIDER,
    company: "Student Tech Inc.",
    description: "Premium tech products at student-friendly prices.",
    logo: "https://images.pexels.com/photos/2417848/pexels-photo-2417848.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://studenttech.com",
    categories: ["3"],
    createdAt: new Date("2022-11-10")
  },
  {
    id: "p3",
    name: "College Threads",
    email: "hello@collegethreads.com",
    role: UserRole.PROVIDER,
    company: "College Threads",
    description: "Trendy fashion for the modern student.",
    logo: "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://collegethreads.com",
    categories: ["2"],
    createdAt: new Date("2023-03-22")
  }
];

export const mockStudents: Consumer[] = [
  {
    id: "s1",
    name: "Alex Johnson",
    email: "alex.j@university.edu",
    role: UserRole.STUDENT,
    studentId: "UNI123456",
    university: "State University",
    verificationStatus: VerificationStatus.VERIFIED,
    savedCoupons: ["c1", "c3"],
    createdAt: new Date("2023-06-10")
  },
  {
    id: "s2",
    name: "Jamie Smith",
    email: "jamie.s@college.edu",
    role: UserRole.STUDENT,
    studentId: "COL789012",
    university: "City College",
    verificationStatus: VerificationStatus.VERIFIED,
    savedCoupons: ["c2"],
    createdAt: new Date("2023-07-15")
  }
];

export const mockCoupons: Coupon[] = [
  {
    id: "c1",
    code: "CAMPUSEATS25",
    providerId: "p1",
    providerName: "Campus Eats",
    providerLogo: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "25% Off Your First Order",
    description: "Get 25% off your first order with Campus Eats.",
    type: OfferType.PERCENTAGE,
    value: 25,
    minPurchase: 15,
    startDate: new Date("2023-09-01"),
    endDate: new Date("2025-05-08 10:01:00"),
    image: "https://images.pexels.com/photos/791942/pexels-photo-791942.jpeg?auto=compress&cs=tinysrgb&w=600",
    totalAvailable: 1000,
    redeemedCount: 234,
    status: CouponStatus.ACTIVE,
    categories: ["1"],
    terms: "Valid on first order only. Minimum purchase of $15 required.",
    featured: true
  },
  {
    id: "c2",
    code: "TECHSAVE50",
    providerId: "p2",
    providerName: "Student Tech",
    providerLogo: "https://images.pexels.com/photos/7657746/pexels-photo-7657746.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "$50 Off Laptops",
    description: "Save $50 on any laptop purchase over $500.",
    type: OfferType.FIXED_AMOUNT,
    value: 50,
    minPurchase: 500,
    startDate: new Date("2023-08-15"),
    endDate: new Date("2023-11-15"),
    image: "https://images.pexels.com/photos/4543103/pexels-photo-4543103.jpeg?auto=compress&cs=tinysrgb&w=600",
    totalAvailable: 500,
    redeemedCount: 189,
    status: CouponStatus.ACTIVE,
    categories: ["3", "1"],
    terms: "Valid on laptop purchases over $500. One per customer.",
    featured: true
  },
  {
    id: "c3",
    code: "THREADS30",
    providerId: "p3",
    providerName: "College Threads",
    providerLogo: "https://images.pexels.com/photos/31890025/pexels-photo-31890025/free-photo-of-artistic-black-and-white-fashion-portrait-with-photos.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "30% Off Entire Purchase",
    description: "Enjoy 30% off your entire purchase at College Threads.",
    type: OfferType.PERCENTAGE,
    value: 30,
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-10-31"),
    image: "https://images.pexels.com/photos/4480519/pexels-photo-4480519.jpeg?auto=compress&cs=tinysrgb&w=600",
    totalAvailable: 300,
    redeemedCount: 87,
    status: CouponStatus.ACTIVE,
    categories: ["2"],
    terms: "Cannot be combined with other offers. In-store and online.",
    featured: false
  },
  {
    id: "c4",
    code: "EATS10",
    providerId: "p1",
    providerName: "Campus Eats",
    providerLogo: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "$10 Off Order",
    description: "Get $10 off any order over $30 with Campus Eats.",
    type: OfferType.FIXED_AMOUNT,
    value: 10,
    minPurchase: 30,
    startDate: new Date("2023-09-15"),
    endDate: new Date("2023-11-15"),
    image: "https://images.pexels.com/photos/3324427/pexels-photo-3324427.jpeg?auto=compress&cs=tinysrgb&w=600",
    totalAvailable: 750,
    redeemedCount: 320,
    status: CouponStatus.ACTIVE,
    categories: ["1"],
    terms: "Valid on orders over $30. Delivery fee not included.",
    featured: false
  },
  {
    id: "c5",
    code: "TECH20",
    providerId: "p2",
    providerName: "Student Tech",
    providerLogo: "https://images.pexels.com/photos/7657746/pexels-photo-7657746.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "20% Off Accessories",
    description: "20% off all tech accessories at Student Tech.",
    type: OfferType.PERCENTAGE,
    value: 20,
    startDate: new Date("2023-10-05"),
    endDate: new Date("2025-05-18"),
    image: "https://images.pexels.com/photos/4480460/pexels-photo-4480460.jpeg?auto=compress&cs=tinysrgb&w=600",
    totalAvailable: 1000,
    redeemedCount: 156,
    status: CouponStatus.ACTIVE,
    categories: ["3"],
    terms: "Valid on accessories only. Cannot be combined with other offers.",
    featured: true
  },
  {
    id: "c6",
    code: "THREADSBOGO",
    providerId: "p3",
    providerName: "College Threads",
    providerLogo: "https://images.pexels.com/photos/31890025/pexels-photo-31890025/free-photo-of-artistic-black-and-white-fashion-portrait-with-photos.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Buy One, Get One 50% Off",
    description: "Buy one item, get another 50% off at College Threads.",
    type: OfferType.BUY_ONE_GET_ONE,
    value: 50,
    startDate: new Date("2023-09-20"),
    endDate: new Date("2023-10-20"),
    image: "https://images.pexels.com/photos/4503739/pexels-photo-4503739.jpeg?auto=compress&cs=tinysrgb&w=600",
    totalAvailable: 250,
    redeemedCount: 98,
    status: CouponStatus.ACTIVE,
    categories: ["2"],
    terms: "Second item must be of equal or lesser value.",
    featured: false
  },
];

// Helper function to get all coupons
export const getAllCoupons = (): Coupon[] => {
  return mockCoupons;
};

// Helper function to get featured coupons
export const getFeaturedCoupons = (): Coupon[] => {
  return mockCoupons.filter(coupon => coupon.featured);
};

// Helper function to get coupons by category
export const getCouponsByCategory = (categoryId: string): Coupon[] => {
  return mockCoupons.filter(coupon => coupon.categories.includes(categoryId));
};

// Helper function to get coupon by ID
export const getCouponById = (couponId: string): Coupon | undefined => {
  return mockCoupons.find(coupon => coupon.id === couponId);
};

// Helper function to get provider by ID
export const getProviderById = (providerId: string): Merchant | undefined => {
  return mockProviders.find(provider => provider.id === providerId);
};

// Helper function to check if a coupon is saved by a student
export const isCouponSavedByStudent = (couponId: string, studentId: string): boolean => {
  const student = mockStudents.find(s => s.id === studentId);
  if (!student) return false;
  return student.savedCoupons.includes(couponId);
};

export const getSimilarOffers = (couponId: string): Offer[] => {
  const coupon = getCouponById(couponId);
  if (!coupon) return [];
  
  return mockCoupons.filter(c => c.id !== couponId && c.categories.some(cat => coupon.categories.includes(cat)));
}
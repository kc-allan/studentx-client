
import { 
  Coupon, 
  CouponStatus, 
  CouponType, 
  Provider, 
  Student, 
  UserRole, 
  VerificationStatus,
  Category
} from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Food & Drink", slug: "food-drink", iconName: "ticket" },
  { id: "2", name: "Fashion", slug: "fashion", iconName: "ticket" },
  { id: "3", name: "Technology", slug: "technology", iconName: "ticket" },
  { id: "4", name: "Entertainment", slug: "entertainment", iconName: "ticket" },
  { id: "5", name: "Travel", slug: "travel", iconName: "ticket" },
  { id: "6", name: "Health & Beauty", slug: "health-beauty", iconName: "ticket" },
  { id: "7", name: "Education", slug: "education", iconName: "ticket" },
  { id: "8", name: "Services", slug: "services", iconName: "ticket" }
];

export const mockProviders: Provider[] = [
  {
    id: "p1",
    name: "Campus Eats",
    email: "info@campuseats.com",
    role: UserRole.PROVIDER,
    company: "Campus Eats Ltd.",
    description: "The best food delivery service for students.",
    logo: "/placeholder.svg",
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
    logo: "/placeholder.svg",
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
    logo: "/placeholder.svg",
    website: "https://collegethreads.com",
    categories: ["2"],
    createdAt: new Date("2023-03-22")
  }
];

export const mockStudents: Student[] = [
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
    title: "25% Off Your First Order",
    description: "Get 25% off your first order with Campus Eats.",
    type: CouponType.PERCENTAGE,
    value: 25,
    minPurchase: 15,
    startDate: new Date("2023-09-01"),
    endDate: new Date("2023-12-31"),
    image: "/placeholder.svg",
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
    title: "$50 Off Laptops",
    description: "Save $50 on any laptop purchase over $500.",
    type: CouponType.FIXED_AMOUNT,
    value: 50,
    minPurchase: 500,
    startDate: new Date("2023-08-15"),
    endDate: new Date("2023-11-15"),
    image: "/placeholder.svg",
    totalAvailable: 500,
    redeemedCount: 189,
    status: CouponStatus.ACTIVE,
    categories: ["3"],
    terms: "Valid on laptop purchases over $500. One per customer.",
    featured: true
  },
  {
    id: "c3",
    code: "THREADS30",
    providerId: "p3",
    providerName: "College Threads",
    title: "30% Off Entire Purchase",
    description: "Enjoy 30% off your entire purchase at College Threads.",
    type: CouponType.PERCENTAGE,
    value: 30,
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-10-31"),
    image: "/placeholder.svg",
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
    title: "$10 Off Order",
    description: "Get $10 off any order over $30 with Campus Eats.",
    type: CouponType.FIXED_AMOUNT,
    value: 10,
    minPurchase: 30,
    startDate: new Date("2023-09-15"),
    endDate: new Date("2023-11-15"),
    image: "/placeholder.svg",
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
    title: "20% Off Accessories",
    description: "20% off all tech accessories at Student Tech.",
    type: CouponType.PERCENTAGE,
    value: 20,
    startDate: new Date("2023-10-05"),
    endDate: new Date("2023-12-05"),
    image: "/placeholder.svg",
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
    title: "Buy One, Get One 50% Off",
    description: "Buy one item, get another 50% off at College Threads.",
    type: CouponType.BUY_ONE_GET_ONE,
    value: 50,
    startDate: new Date("2023-09-20"),
    endDate: new Date("2023-10-20"),
    image: "/placeholder.svg",
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
export const getProviderById = (providerId: string): Provider | undefined => {
  return mockProviders.find(provider => provider.id === providerId);
};

// Helper function to check if a coupon is saved by a student
export const isCouponSavedByStudent = (couponId: string, studentId: string): boolean => {
  const student = mockStudents.find(s => s.id === studentId);
  if (!student) return false;
  return student.savedCoupons.includes(couponId);
};

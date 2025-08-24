
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	User,
	BadgeCheck,
	Star,
	ShoppingCart,
	Bell,
	Settings,
	CreditCard,
	MapPin,
	Calendar,
	Upload,
	Eye,
	EyeOff,
	Phone,
	Mail,
	School,
	Trophy,
	Gift,
	TrendingUp,
	Heart,
	Bookmark,
	Download,
	Share2,
	Camera,
	Edit3,
	Shield,
	Clock,
	CheckCircle,
	AlertCircle,
	XCircle,
	Zap,
	Target,
	Award,
	Percent,
	Plus,
	Search,
	ShoppingBag,
	ExternalLink,
	Users,
	Loader2
} from "lucide-react";
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { VerificationTasks } from "@/components/profile/Verification";
import { SavedDeals } from "@/components/profile/SavedDeals";
import { PreferencesSettings } from "@/components/profile/PreferencesSettings";
import { AccountSettings } from "@/components/profile/AccountSettings";
import { ActivityStats } from "@/components/profile/ActivityStats";
import { Header } from '@radix-ui/react-accordion';
import { CouponTracker } from '@/components/profile/CouponTracker';
import { toast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';

const Profile = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const [activeTab, setActiveTabFn] = useState(urlParams.get('tab') || "account");
	const [userData, setUserData] = useState(null);
	const [fetchingProfile, setFetchingProfile] = useState(false);

	const setActiveTab = (tab: string) => {
		setActiveTabFn(tab);
		urlParams.set('tab', tab);
		window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
	};

	// Mock user data - in real app this would come from API/context
	// const userData = {
	// 	id: "1",
	// 	firstName: "Alex",
	// 	lastName: "Johnson",
	// 	email: "alex.johnson@university.edu",
	// 	phone: "+1 (555) 123-4567",
	// 	avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
	// 	university: "State University",
	// 	graduationYear: "2025",
	// 	major: "Computer Science",
	// 	studentId: "SU12345",
	// 	joinDate: "2024-01-15",
	// 	isVerified: true,
	// 	verificationLevel: 85,
	// 	totalSavings: 1247.50,
	// 	dealsUsed: 24,
	// 	favoriteCategories: ["Technology", "Food & Dining", "Fashion"],
	// 	membershipTier: "Gold"
	// };

	const fetchUserData = async () => {
		try {
			setFetchingProfile(true);
			const response = await axiosInstance.get('/user/me');
			if (response.status !== 200) {
				throw new Error("No user data found");
			}
			setUserData(response.data.data);
		} catch (error) {
			
			toast({
				title: error.response.data.message || error.message || "Error populating profile",
				description: error.response.data.description || "Failed to load user data. Please try again later.",
				variant: "destructive"
			})
		} finally {
			setFetchingProfile(false);
		}
	}

	useEffect(() => {
		fetchUserData();
	}, []);

	// Check for empty/new user states
	const isNewUser = userData?.totalSavings === 0 && userData.dealsUsed === 0;
	const hasNoSavedDeals = false; // This would come from saved deals data
	const hasLowVerification = userData?.verificationLevel < 50;

	return (
		<div>
			{/* <Header /> */}
			{fetchingProfile ? (
				<div className="min-h-screen flex items-center justify-center">
					<Card className="w-full max-w-md">
						<CardContent className="text-center">
							<Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin" />
							<p className="text-lg text-text-primary">Loading your profile...</p>
						</CardContent>
					</Card>
				</div>
			) : !userData ? (
				<div className="min-h-screen flex items-center justify-center">
					<Card className="w-full max-w-md">
						<CardContent className="text-center">
							<XCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
							<p className="text-lg text-text-primary">Profile not found</p>
							<p className="text-sm text-neutral-medium mt-2">Please check your account or contact support.</p>
						</CardContent>
					</Card>
				</div>
			) : (
				<div className="min-h-screen bg-background-lighter">
					{/* Header */}
					<ProfileHeader user={userData} />

					{/* Main Content */}
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 max-w-7xl">
						<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
							{/* Navigation Tabs - Responsive */}
							<div className="bg-white rounded-xl mt-4 shadow-sm border border-neutral-lighter mb-6 overflow-hidden">
								<TabsList className="flex justify-between overflow-x-auto w-full p-2 h-auto bg-transparent gap-4 *:w-full">
									{/* <TabsTrigger
									value="overview"
									className="data-[state=active]:bg-brand-primary data-[state=active]:text-white flex items-center gap-2 py-3 px-2 text-xs sm:text-sm"
								>
									<User className="h-4 w-4" />
									<span className="">Overview</span>
								</TabsTrigger> */}
									<TabsTrigger
										value="account"
										className="data-[state=active]:bg-brand-primary data-[state=active]:text-white flex items-center gap-2 py-3 px-2 text-xs sm:text-sm"
									>
										<Shield className="h-4 w-4" />
										<span className="">Account</span>
									</TabsTrigger>
									<TabsTrigger
										value="verification"
										className="data-[state=active]:bg-brand-primary data-[state=active]:text-white flex items-center gap-2 py-3 px-2 text-xs sm:text-sm"
									>
										<BadgeCheck className="h-4 w-4" />
										<span className="">Verify</span>
									</TabsTrigger>
									<TabsTrigger
										value="coupons"
										className="data-[state=active]:bg-brand-primary data-[state=active]:text-white flex items-center gap-2 py-3 px-2 text-xs sm:text-sm"
									>
										<Gift className="h-4 w-4" />
										<span className="">Coupons</span>
									</TabsTrigger>
									<TabsTrigger
										value="saved"
										className="data-[state=active]:bg-brand-primary data-[state=active]:text-white flex items-center gap-2 py-3 px-2 text-xs sm:text-sm"
									>
										<Bookmark className="h-4 w-4" />
										<span className="">Saved</span>
									</TabsTrigger>
									<TabsTrigger
										value="preferences"
										className="data-[state=active]:bg-brand-primary data-[state=active]:text-white flex items-center gap-2 py-3 px-2 text-xs sm:text-sm"
									>
										<Settings className="h-4 w-4" />
										<span className="">Settings</span>
									</TabsTrigger>

								</TabsList>
							</div>

							{/* Tab Contents */}
							<TabsContent value="overview" className="space-y-6">
								{isNewUser ? (
									// New User Welcome State
									<div className="text-center py-12">
										<Card className="border-brand-primary/20 bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 max-w-2xl mx-auto">
											<CardContent className="p-8 sm:p-12">
												<div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
													<Star className="h-8 w-8 text-brand-primary" />
												</div>
												<h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">Welcome to StudentX!</h2>
												<p className="text-neutral-medium mb-8 text-sm sm:text-base">
													Start your savings journey by verifying your student status and exploring exclusive deals.
												</p>
												<div className="flex flex-col sm:flex-row gap-4 justify-center">
													<Button
														onClick={() => setActiveTab("verification")}
														className="bg-brand-primary hover:bg-brand-primary/90"
													>
														<BadgeCheck className="h-4 w-4 mr-2" />
														Get Verified
													</Button>
													<Button variant="outline">
														<Search className="h-4 w-4 mr-2" />
														Browse Deals
													</Button>
												</div>
											</CardContent>
										</Card>
									</div>
								) : (
									<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
										{/* Left Column - Main Stats */}
										<div className="xl:col-span-2 space-y-6">
											<ActivityStats user={userData} />

											{/* Quick Actions - Responsive Grid */}
											<Card className="border-neutral-lighter">
												<CardHeader>
													<CardTitle className="flex items-center gap-2">
														<Zap className="h-5 w-5 text-brand-primary" />
														Quick Actions
													</CardTitle>
												</CardHeader>
												<CardContent>
													<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
														<Button
															variant="outline"
															className="h-auto py-4 flex flex-col gap-2 hover:border-brand-primary hover:text-brand-primary text-xs sm:text-sm"
															onClick={() => setActiveTab("verification")}
														>
															<BadgeCheck className="h-5 w-5 sm:h-6 sm:w-6" />
															<span>Verify Account</span>
														</Button>
														<Button
															variant="outline"
															className="h-auto py-4 flex flex-col gap-2 hover:border-brand-primary hover:text-brand-primary text-xs sm:text-sm"
															onClick={() => setActiveTab("saved")}
														>
															<Bookmark className="h-5 w-5 sm:h-6 sm:w-6" />
															<span>Saved Deals</span>
														</Button>
														<Button
															variant="outline"
															className="h-auto py-4 flex flex-col gap-2 hover:border-brand-primary hover:text-brand-primary text-xs sm:text-sm"
														>
															<Users className="h-5 w-5 sm:h-6 sm:w-6" />
															<span>Refer Friends</span>
														</Button>
														<Button
															variant="outline"
															className="h-auto py-4 flex flex-col gap-2 hover:border-brand-primary hover:text-brand-primary text-xs sm:text-sm"
														>
															<Download className="h-5 w-5 sm:h-6 sm:w-6" />
															<span>Get App</span>
														</Button>
													</div>
												</CardContent>
											</Card>

											{/* Low Verification Alert */}
											{hasLowVerification && (
												<Card className="border-warning/30 bg-warning/5">
													<CardContent className="p-6">
														<div className="flex items-start gap-4">
															<div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
																<AlertCircle className="h-6 w-6 text-warning" />
															</div>
															<div className="flex-1 min-w-0">
																<h3 className="font-semibold text-text-primary mb-2">Complete Your Verification</h3>
																<p className="text-sm text-neutral-medium mb-4">
																	Increase your verification level to unlock more deals and higher discounts.
																</p>
																<Button
																	size="sm"
																	onClick={() => setActiveTab("verification")}
																	className="bg-warning hover:bg-warning/90"
																>
																	Complete Verification
																</Button>
															</div>
														</div>
													</CardContent>
												</Card>
											)}
										</div>

										{/* Right Column - Side Info */}
										<div className="space-y-6">
											{/* Achievement Progress */}
											<Card className="border-neutral-lighter">
												<CardHeader>
													<CardTitle className="flex items-center gap-2 text-lg">
														<Trophy className="h-5 w-5 text-brand-primary" />
														Achievements
													</CardTitle>
												</CardHeader>
												<CardContent className="space-y-4">
													<div>
														<div className="flex justify-between items-center mb-2">
															<span className="text-sm font-medium">Deal Hunter</span>
															<span className="text-sm text-neutral-medium">24/50</span>
														</div>
														<Progress value={48} className="h-2" />
													</div>
													<div>
														<div className="flex justify-between items-center mb-2">
															<span className="text-sm font-medium">Savings Champion</span>
															<span className="text-sm text-neutral-medium">$1,247/$2,000</span>
														</div>
														<Progress value={62} className="h-2" />
													</div>
													<div>
														<div className="flex justify-between items-center mb-2">
															<span className="text-sm font-medium">Social Saver</span>
															<span className="text-sm text-neutral-medium">3/10</span>
														</div>
														<Progress value={30} className="h-2" />
													</div>
												</CardContent>
											</Card>

											{/* Recent Activity */}
											<Card className="border-neutral-lighter">
												<CardHeader>
													<CardTitle className="flex items-center gap-2 text-lg">
														<Clock className="h-5 w-5 text-brand-primary" />
														Recent Activity
													</CardTitle>
												</CardHeader>
												<CardContent className="space-y-3">
													<div className="flex items-start gap-3">
														<div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium">Used Nike Student Discount</p>
															<p className="text-xs text-neutral-medium">Saved $25.00 • 2 hours ago</p>
														</div>
													</div>
													<div className="flex items-start gap-3">
														<div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0"></div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium">Verified University Email</p>
															<p className="text-xs text-neutral-medium">1 day ago</p>
														</div>
													</div>
													<div className="flex items-start gap-3">
														<div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium">Saved Spotify Premium Deal</p>
															<p className="text-xs text-neutral-medium">3 days ago</p>
														</div>
													</div>
												</CardContent>
											</Card>
										</div>
									</div>
								)}
							</TabsContent>

							<TabsContent value="verification">
								<VerificationTasks onChangeTab={setActiveTab} user={userData} />
							</TabsContent>

							<TabsContent value="saved">
								{hasNoSavedDeals ? (
									<Card className="border-neutral-lighter">
										<CardContent className="p-12 text-center">
											<div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
												<Bookmark className="h-8 w-8 text-brand-primary" />
											</div>
											<h3 className="text-xl font-semibold text-text-primary mb-3">No Saved Deals Yet</h3>
											<p className="text-neutral-medium mb-6 max-w-md mx-auto">
												Start building your personal collection of deals by saving the ones you're interested in.
											</p>
											<div className="flex flex-col sm:flex-row gap-3 justify-center">
												<Button className="bg-brand-primary hover:bg-brand-primary/90">
													<Search className="h-4 w-4 mr-2" />
													Browse Deals
												</Button>
												<Button variant="outline">
													<Heart className="h-4 w-4 mr-2" />
													View Popular Deals
												</Button>
											</div>
										</CardContent>
									</Card>
								) : (
									<SavedDeals user={userData} />
								)}
							</TabsContent>

							<TabsContent value="coupons">
								<CouponTracker user={userData} />
							</TabsContent>

							<TabsContent value="preferences">
								<PreferencesSettings user={userData} />
							</TabsContent>

							<TabsContent value="account">
								<AccountSettings user={userData} />
							</TabsContent>
						</Tabs>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
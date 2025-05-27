import axiosInstance from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { setCurrentUser } from "@/state/auth";
import { Input } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowRight, AtSign, Building, ChevronRight, Eye, EyeOff, KeyRound, School, User } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";


const MerchantLogin = () => {
	const searchParams = new URLSearchParams(useLocation().search);
	const next = searchParams.get("next");
	const [loginEmail, setLoginEmail] = React.useState("");
	const [loginPassword, setLoginPassword] = React.useState("");
	const [submitting, setIsSubmitting] = React.useState(false);
	const [activeForm, setActiveForm] = React.useState("login");
	const [rememberMe, setRememberMe] = React.useState(false);
	const [signupEmail, setSignupEmail] = React.useState("");
	const [company, setCompany] = React.useState("");
	const [agreeTerms, setAgreeTerms] = React.useState(false);

	const [showLoginPassword, setShowLoginPassword] = React.useState(false);
	const [error, setError] = React.useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleForm = (form) => {
		setError("");
		setIsSubmitting(false);
		setActiveForm(form);
	};

	const handleSignupRequest = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");
		try {
			const response = await axiosInstance.post("/auth/user/signup", {
				email: signupEmail,
				company: company,
			});
			if (response.status !== 200) {
				console.error("Signup failed:", response.data);
				throw new Error(response.data.message);
			}
			toast({
				title: response.data.message,
				description: "Check your email for a verification link",
				variant: "success",
			});
			navigate("/merchant/login");
		} catch (error) {
			console.error("Signup error:", error);
			toast({
				title: error.response?.data.message || error.message || "Signup failed",
				description: "An error occurred while signing up. Please try again.",
				variant: "warning",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleMerchantLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");
		try {
			const response = await axiosInstance.post("/auth/user/login", {
				email: loginEmail,
				password: loginPassword,
			});
			if (response.status !== 200) {
				console.error("Login failed:", response.data);
				throw new Error(response.data.message);
			}
			const { message, user, user_role } = response.data
			toast({
				title: message,
				description: `Welcome back, ${user.first_name}!`,
				variant: "success",
			})
			dispatch(
				setCurrentUser({
					user: user,
					role: user_role,
				})
			);
			navigate(next || "/");
		} catch (error) {
			console.error("Login error:", error);
			toast({
				title: error.response?.data.message || error.message || "Login failed",
				description: "An error occurred while logging in. Please try again.",
				variant: "warning",
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
			<AnimatePresence mode="wait">
				{activeForm === "login" ? (
					<motion.div
						key="login-form"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						transition={{ duration: 0.3 }}
						className="w-full max-w-md "
					>
						<div className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900">Log in to your account</h2>
							<p className="text-gray-600 mt-2">Enter account details to manage your StudentX coupons</p>
						</div>

						{error && (
							<div id="form-errors" className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
								<AlertCircle className="h-5 w-5" />
								<span className="text-sm">{error}</span>
							</div>
						)}

						<form onSubmit={handleMerchantLogin} className="space-y-4">
							<div className="space-y-2">
								<label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
									<AtSign className="h-4 w-4 text-gray-500" />
									Email address
								</label>
								<Input
									id="email"
									type="email"
									placeholder="your.email@university.edu"
									required
									className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
									value={loginEmail}
									onChange={(e) => setLoginEmail(e.target.value)}
								/>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
										<KeyRound className="h-4 w-4 text-gray-500" />
										Password
									</label>
									<Link to="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 hover:underline">
										Forgot password?
									</Link>
								</div>
								<div className="relative">
									<Input
										id="password"
										type={showLoginPassword ? "text" : "password"}
										required
										className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
										value={loginPassword}
										onChange={(e) => setLoginPassword(e.target.value)}
									/>
									<button
										type="button"
										className="text-gray-400 absolute right-2 top-0 h-full cursor-pointer"
										onClick={() => setShowLoginPassword(!showLoginPassword)}
									>
										{showLoginPassword ? (
											<EyeOff className="h-5 w-5 text-gray-500" />
										) : (
											<Eye className="h-5 w-5 text-gray-500" />
										)}
									</button>
								</div>

							</div>

							<div className="flex items-center space-x-2">
								<Checkbox
									id="remember"
									checked={rememberMe}
									onCheckedChange={(checked) => setRememberMe(!!checked)}
								/>
								<label
									htmlFor="remember"
									className="text-sm font-medium leading-none cursor-pointer select-none"
								>
									Remember me for 30 days
								</label>
							</div>

							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
								disabled={submitting}
							>
								{submitting ? (
									<span className="flex items-center justify-center">
										<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Logging in...
									</span>
								) : (
									<span className="flex items-center justify-center">
										Log in
										<ArrowRight className="ml-2 h-4 w-4" />
									</span>
								)}
							</Button>
						</form>

						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Or continue with</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<Button variant="outline" type="button" className="border-gray-300 hover:bg-gray-50">
								<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
									<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
									<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
									<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
								</svg>
								Google
							</Button>
							<Button variant="outline" type="button" className="border-gray-300 hover:bg-gray-50">
								<svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
								</svg>
								Facebook
							</Button>
						</div>

						<div className="mt-8 text-center">
							<p className="text-sm text-gray-600">
								Don't have an account?{" "}
								<button
									onClick={() => toggleForm("signup")}
									className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
								>
									Contact Sales
								</button>
							</p>
						</div>
					</motion.div>
				) : (
					<motion.div
						key="signup-form"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
						className="w-full max-w-md relative"
					>
						<div className="mb-6">
							<h2 className="text-2xl font-bold text-gray-900">Request Demo</h2>
							<p className="text-xs">
								Provide some details to help with approval of your account. Our team will get back to you shortly.
							</p>
						</div>

						{error && (
							<div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
								<AlertCircle className="h-5 w-5" />
								<span className="text-sm">{error}</span>
							</div>
						)}

						<form onSubmit={handleSignupRequest} className="space-y-4">


							<div className="space-y-2">
								<label htmlFor="signupEmail" className="text-sm font-medium flex items-center gap-2">
									<AtSign className="h-4 w-4 text-gray-500" />
									Email address
								</label>
								<Input
									id="signupEmail"
									type="email"
									placeholder="your.email@university.edu"
									required
									className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
									value={signupEmail}
									onChange={(e) => setSignupEmail(e.target.value)}
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="university" className="text-sm font-medium flex items-center gap-2">
									<Building className="h-4 w-4 text-gray-500" />
									Company Name
								</label>
								<Input
									id="company"
									type="text"
									placeholder="Company/business name"
									required
									className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
									value={company}
									onChange={(e) => setCompany(e.target.value)}
								/>
							</div>

							<div className="flex items-start space-x-2 mt-4">
								<Checkbox
									id="terms"
									checked={agreeTerms}
									onCheckedChange={(checked) => setAgreeTerms(!!checked)}
									className="mt-1"
								/>
								<label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
									I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
								</label>
							</div>

							<Button
								type="submit"
								className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
								disabled={submitting || !agreeTerms}
							>
								{submitting ? (
									<span className="flex items-center justify-center">
										<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Submitting Details...
									</span>
								) : (
									<span className="flex items-center justify-center">
										Submit
										<ChevronRight className="ml-2 h-4 w-4" />
									</span>
								)}
							</Button>
						</form>

						<img
						className="absolute top-1/3 -translate-y-12 right-4 w-40 h-40 rounded-full opacity-60 bg-gradient-to-br from-blue-600 to-indigo-600"
						src="https://images.pexels.com/photos/20745050/pexels-photo-20745050/free-photo-of-beautiful-young-woman-posing-in-a-patterned-blazer.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />

						<div className="mt-8 text-center">
							<p className="text-sm text-gray-600">
								Already have an account?{" "}
								<button
									onClick={() => toggleForm("login")}
									className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
								>
									Log in
								</button>
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			</div>
		</div>
	);
}

export default MerchantLogin;
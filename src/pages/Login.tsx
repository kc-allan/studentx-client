import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { AtSign, KeyRound, ArrowRight, Check, AlertCircle, Zap, User, School, ChevronRight, Lock, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/api/axios";
import { setCurrentUser } from "@/state/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state";

type LoggedInUser = {
  first_name: string;
  last_name: string
}

const AuthPage = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);
  const query = new URLSearchParams(useLocation().search)
  const page = query.get('page')
  const next = query.get('next')
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "You are already logged in",
        description: "Redirecting to home page...",
        variant: "info",
      });
      navigate(next || "/");
      return;
    }

  }
    , []);

  const dispatch = useDispatch();
  const [activeForm, setActiveForm] = React.useState<string>(page && (page.includes('login') || page.includes('signup')) ? page : "login");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showLoginPassword, setShowLoginPassword] = React.useState<boolean>(false);

  // Login form state
  const [loginEmail, setLoginEmail] = React.useState<string>("");
  const [loginPassword, setLoginPassword] = React.useState<string>("");
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);

  // Signup form state
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [signupEmail, setSignupEmail] = React.useState<string>("");
  const [university, setUniversity] = React.useState<string>("");
  const [signupPassword, setSignupPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [agreeTerms, setAgreeTerms] = React.useState<boolean>(false);

  React.useEffect(() => {
    const element = document.getElementById("form-panel");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Form toggling with animationVe
  const toggleForm = (form) => {
    setError("");
    setIsSubmitting(false);
    setActiveForm(form);
    query.set('page', form)
    window.history.replaceState({}, '', `${window.location.pathname}?${query}`);
  };

  // Handle login submission
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await axiosInstance.post("/auth/user/login", {
        email: loginEmail,
        password: loginPassword,
        rememberMe
      });
      if (response.status !== 200) {

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

      toast({
        title: error.response?.data.message || error.message || "Login failed",
        description: "An error occurred while logging in. Please try again.",
        variant: "warning",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    const formErrors = document.getElementById("form-errors");
    if (error && formErrors) {
      formErrors.scrollIntoView({ behavior: "smooth" });
    }
  }, [error]);

  // Handle signup submission
  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (
      signupPassword !== confirmPassword ||
      signupPassword.length < 8 ||
      !signupPassword.match(/[A-Z]/) ||
      !signupPassword.match(/[a-z]/) ||
      !signupPassword.match(/[0-9]/) ||
      !signupPassword.match(/[^A-Za-z0-9]/)
    ) {
      setError("Password must be at least 8 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.");
      setIsSubmitting(false);
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      const response = await axiosInstance.post("/auth/user/consumer/register", {
        first_name: firstName,
        last_name: lastName,
        email: signupEmail,
        school: university,
        password: signupPassword,
      });
      if (response.status !== 201) {

        throw new Error(response.data.message);
      }
      const { message, username } = response.data


      toast({
        title: message,
        description: `Welcome, ${username}! You've started your journey with StudentX. Please log in to continue.`,
        variant: "success",
      });
      setActiveForm("login");
      setLoginEmail(signupEmail);
      setLoginPassword(signupPassword);
    } catch (error) {

      toast({
        title: error.response?.data.message || error.message || "Signup failed",
        description: error.response?.data.description || "An error occurred while signing up. Please try again.",
        variant: `${error.response?.status === 404 ? "warning" : "destructive"}`,
      });
    } finally {
      setIsSubmitting(false);
    }

  };

  // Content for the side panel based on active form
  const sideContent = {
    login: {
      title: "Welcome back!",
      description: "Access exclusive student discounts and offers by logging in to your account.",
      features: [
        {
          title: "Student-exclusive deals",
          description: "Special offers only available to verified students"
        },
        {
          title: "Personalized recommendations",
          description: "Get deals tailored to your interests and needs"
        },
        {
          title: "Save your favorites",
          description: "Bookmark deals to use later when you need them"
        }
      ],
      cta: {
        text: "Need an account?",
        linkText: "Sign up for free",
        action: () => {
          toggleForm("signup");
        }
      }
    },
    signup: {
      title: "Join StudentX today",
      description: "Create your account and get instant access to exclusive student discounts.",
      features: [
        {
          title: "Verify once, save always",
          description: "One-time student verification unlocks all deals"
        },
        {
          title: "Exclusive welcome bonus",
          description: "New members get special welcome offers"
        },
        {
          title: "Stay updated",
          description: "Get notified when new deals match your interests"
        }
      ],
      cta: {
        text: "Already have an account?",
        linkText: "Log in here",
        action: () => {
          toggleForm("login");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <main className="flex-grow flex md:items-center justify-center md:p-4">
        <div className={`w-full max-w-6xl flex flex-col ${activeForm === "login" ? "md:flex-row" : "md:flex-row-reverse"} overflow-hidden md:rounded-xl shadow-2xl transition-all duration-500`}>
          {/* Info Panel */}
          <div className={`w-full relative md:w-1/2 flex flex-col justify-center p-6 md:p-16 text-white ${activeForm === "login"
            ? "bg-gradient-to-br from-blue-900 to-black"
            : "bg-gradient-to-br from-blue-900 to-black"}`}>
            <Link to="/" className="flex absolute z-50 top-4 left-6 items-center space-x-2 min-w-max">
              <Zap className="h-6 w-6 text-brand-primary" />
              <h1 className="text-xl font-bold text-text-inverted">
                Student<span className="text-brand-primary">X</span>
              </h1>
            </Link>
            {/* Pattern overlay */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxwYXRoIGQ9Ik0tMTAgLTEwIEwyMCAtMTAgTDIwIDIwIEwtMTAgMjAgWiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
            </div>

            <div className="relative max-w-md  md:mx-0 z-10 pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeForm}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold">{sideContent[activeForm].title}</h1>
                  <p className="text-lg text-blue-100 mb-8">
                    {sideContent[activeForm].description}
                  </p>

                  <div className="space-y-6 mb-12 hidden md:block">
                    {sideContent[activeForm].features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 bg-white/20 backdrop-blur-sm rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-base text-white">{feature.title}</h3>
                          <p className="text-sm text-blue-100/80">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="hidden md:block">
                    <p className="text-blue-100">
                      {sideContent[activeForm].cta.text}{" "}
                      <button
                        onClick={sideContent[activeForm].cta.action}
                        className="font-medium text-white underline underline-offset-2 hover:text-blue-200 transition-colors"
                      >
                        {sideContent[activeForm].cta.linkText}
                      </button>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Form Panel */}
          <div id="form-panel" className="w-full md:w-1/2 bg-white z-20 h-full lg:min-h-[540px] lg:max-h-[540px] overflow-y-auto shadow-lg">
            <div className="h-full flex flex-col justify-center p-5 md:p-12">
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
                      <p className="text-gray-600 mt-2">Enter your details to access your StudentX account</p>
                    </div>

                    {error && (
                      <div id="form-errors" className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                          <Link to="/reset-password" className="text-xs text-blue-600 hover:text-blue-800 hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            placeholder="Enter your password"
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
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
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

                    {/* <div className="relative my-6">
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
                    </div> */}

                    <div className="mt-8 text-center md:hidden">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                          onClick={() => toggleForm("signup")}
                          className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
                        >
                          Sign up for free
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
                    className="w-full max-w-md "
                  >
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                      <p className="text-gray-600 mt-2">Join StudentX for exclusive student discounts</p>
                    </div>

                    {error && (
                      <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSignupSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="text-sm font-medium flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500" />
                              First Name
                            </label>
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="Your first name"
                              required
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="text-sm font-medium flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500" />
                              Last Name
                            </label>
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Your last name"
                              required
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

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
                          <School className="h-4 w-4 text-gray-500" />
                          University
                        </label>
                        <Input
                          id="university"
                          type="text"
                          placeholder="Your university name"
                          required
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="signupPassword" className="text-sm font-medium flex items-center gap-2">
                          <Lock className="h-4 w-4 text-gray-500" />
                          Password
                        </label>
                        <div className="relative">
                          <Input
                            id="signupPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            required
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                          />
                          <button type="button" className="text-gray-400 absolute right-2 top-0 h-full cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                              <EyeOff />
                            ) : (
                              <Eye />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
                          <KeyRound className="h-4 w-4 text-gray-500" />
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            required
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <button type="button" className="text-gray-400 absolute h-full right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                              <EyeOff />
                            ) : (
                              <Eye />
                            )}
                          </button>
                        </div>

                      </div>

                      <div className="flex items-start space-x-2 mt-4">
                        <Checkbox
                          id="terms"
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                          className="mt-1"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
                          I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms of Use</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                        disabled={isSubmitting || !agreeTerms}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating account...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Create account
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>

                    <div className="mt-8 text-center md:hidden">
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
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
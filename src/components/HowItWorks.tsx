import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, BadgeCheck, Search, Zap, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/state";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HowItWorks = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  const steps = [
    {
      title: "Sign Up",
      description: "Create your free account with your student email",
      icon: <UserPlus className="h-5 w-5" />,
      color: "from-purple-500/10 to-purple-600/10"
    },
    {
      title: "Verify",
      description: "Confirm your student status instantly",
      icon: <BadgeCheck className="h-5 w-5" />,
      color: "from-blue-500/10 to-blue-600/10"
    },
    {
      title: "Browse",
      description: "Discover thousands of exclusive deals",
      icon: <Search className="h-5 w-5" />,
      color: "from-emerald-500/10 to-emerald-600/10"
    },
    {
      title: "Save",
      description: "Use your discounts and save money",
      icon: <Zap className="h-5 w-5" />,
      color: "from-amber-500/10 to-amber-600/10"
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Shared background canvas */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"
        style={{
          y: yBg,
          opacity: opacityBg
        }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-5" />
      </motion.div>

      <section
        ref={sectionRef}
        id="how-it-works"
        className="relative pt-24 pb-16 md:pt-32 md:pb-24"
      >
        <div className="container px-4 mx-auto">
          {/* Integrated heading with animated underline */}
          <div className="flex flex-col items-center mb-16 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl mb-4"
            >
              How StudentX Works
              <motion.span
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-gray-600 max-w-2xl mx-auto text-center text-lg md:text-xl"
            >
              Get started in minutes and start saving on everything you need
            </motion.p>
          </div>

          {/* Animated step cards with parallax effect */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "backOut"
                    }
                  }
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className={`bg-transparent bg-background-subtle border border-gray-200/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all h-full overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10" />
                  <CardContent className="relative p-6 md:p-8 flex flex-col items-center text-center h-full">
                    <div className="bg-white/90 p-3 rounded-xl shadow-sm mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-16 md:mt-20 text-center"
            >
              <Button
                onClick={() => window.location.href = "/auth?page=signup"}
                className="bg-brand-primary hover:from-brand-primary/90 hover:bg-brand-primary/80 text-white shadow-2xl hover:shadow-brand-primary/30 px-8 py-6 text-lg font-semibold"
              >
                Join Now & Start Saving
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </div>

      </section>
    </div>
  );
};

export default HowItWorks;
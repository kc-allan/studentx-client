import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state";
import { Cta } from "@/components/ui/cta";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Open an account", description: "Your student email is enough." },
  { title: "Get verified", description: "One check, done once." },
  { title: "Find what fits", description: "Filter by category, campus or kind." },
  { title: "Claim it", description: "Take the code or book the seat." },
];

const HowItWorks = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);

  return (
    <section id="how-it-works" className="w-full bg-neutral-950 py-20 text-white md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
              Four steps, then you're in
            </h2>
          </div>
          <p className="text-base text-neutral-400 md:text-right">
            No waiting list.
            <br className="hidden md:block" /> No subscription.
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const isLast = index === STEPS.length - 1;
            return (
              <li
                key={step.title}
                className={cn(
                  "flex flex-col border-t pt-8",
                  // The last step is where you arrive, so it carries the accent
                  isLast ? "border-brand-primary" : "border-white/25"
                )}
              >
                <span
                  className={cn(
                    "text-6xl font-light leading-none tabular-nums lg:text-7xl",
                    isLast ? "text-brand-primary" : "text-white/25"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        {!isAuthenticated && (
          <div className="mt-16">
            <Cta to="/auth?page=signup" tone="brand">
              Start with step one
            </Cta>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;

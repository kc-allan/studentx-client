import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state";
import { Cta } from "@/components/ui/cta";

const SignUpBanner = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);

  if (isAuthenticated) return null;

  return (
    <section className="w-full bg-neutral-950 py-20 text-white md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
              Your student status is worth more than you're using it for.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-400">
              A minute to set up, nothing to pay. Everything opens once you're
              verified.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Cta to="/auth?page=signup" tone="brand">
              Create your free account
            </Cta>
            <Cta to="/deals" tone="outlineInverted">
              Browse offers
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpBanner;

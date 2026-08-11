import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state";
import { Cta } from "@/components/ui/cta";

/**
 * The closing call to action, lifted so it straddles the seam between the last
 * section and the footer. Rendered by the footer, so every page ends on it.
 */
const SignUpBanner = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);

  if (isAuthenticated) return null;

  return (
    <div className="relative z-10 -mt-12 w-full md:-mt-16">
      <div className="container mx-auto px-4">
        <div className="bg-black text-white p-8 md:p-12 rounded-2xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-semibold leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-4xl">
                Start claiming discounts.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/85">
                A minute to set up, nothing to pay. Everything opens once you're
                verified.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Cta to="/auth?page=signup" tone="contrast">
                Create your free account
              </Cta>
              <Cta to="/deals" tone="outlineInverted">
                Browse offers
              </Cta>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpBanner;

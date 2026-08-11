import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/state";
import { Cta } from "@/components/ui/cta";
import { cn } from "@/lib/utils";
import studentsPortrait from "@/assets/images/students-portrait.webp";

/**
 * The four verbs in the headline are the taxonomy — each one is a way into the
 * catalogue, so the panel below turns them into the navigation itself.
 */
const QUADRANTS = [
  { verb: "Save", detail: "Deals and student pricing", query: "deals" },
  { verb: "Experience", detail: "Events and wellness", query: "experience" },
  { verb: "Learn", detail: "Talks and workshops", query: "workshop" },
  { verb: "Grow", detail: "Internships and gigs", query: "opportunity" },
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const term = searchQuery.trim();
    navigate(term ? `/deals?search=${encodeURIComponent(term)}` : "/deals");
  };

  return (
    <section className="w-full bg-neutral-950 text-white">
      <div className="container mx-auto px-4 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="grid items-stretch gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Statement, search and entry points */}
          <div className="lg:col-span-7">
            <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              Save. Experience. Learn. Grow.
              <span className="mt-2 block text-brand-primary">
                Xclusively for you.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-300">
              Discover exclusive deals, unforgettable experiences, professional
              insights, wellness sessions and opportunities — all in one place,
              designed to help you make the most of your student journey.
            </p>

            <form onSubmit={handleSearch} className="mt-10 max-w-xl">
              <label htmlFor="hero-search" className="sr-only">
                Search StudentX
              </label>
              <div className="flex items-center gap-3 border-b border-white/25 pb-3 transition-colors focus-within:border-white">
                <Search className="h-5 w-5 shrink-0 text-neutral-500" />
                <input
                  id="hero-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search a brand, event or category"
                  className="w-full bg-transparent text-base text-white placeholder-neutral-500 outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 text-sm font-semibold text-white underline-offset-4 hover:underline"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              {isAuthenticated ? (
                <Cta to="/deals" tone="brand">
                  Browse everything on offer
                </Cta>
              ) : (
                <>
                  <Cta to="/auth?page=signup" tone="brand">
                    Create your free account
                  </Cta>
                  <Cta to="/deals" tone="outlineInverted">
                    Look around first
                  </Cta>
                </>
              )}
            </div>

            <p className="mt-8 text-sm text-neutral-500">
              Free for verified students · No payment details needed to join
            </p>
          </div>

          {/* The four verbs, made navigable */}
          <div className="relative flex min-h-[26rem] flex-col overflow-hidden lg:col-span-5">
            <img
              src={studentsPortrait}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            {/* Scrim keeps the labels legible while the photograph still reads */}
            <div className="absolute inset-0 bg-neutral-950/70" />

            <p className="relative border-b border-white/20 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
              Four ways in
            </p>

            <div className="relative grid flex-1 grid-cols-2 grid-rows-2">
              {QUADRANTS.map((quadrant, index) => (
                <Link
                  key={quadrant.verb}
                  to={`/deals?search=${encodeURIComponent(quadrant.query)}`}
                  className={cn(
                    "flex flex-col p-6 transition-colors hover:bg-white/10 focus:outline-none focus-visible:bg-white/10",
                    // Rules on inner edges only, so the four cells read as one cross
                    index % 2 === 0 && "border-r border-white/20",
                    index < 2 && "border-b border-white/20"
                  )}
                >
                  <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {quadrant.verb}
                  </span>
                  <span className="mt-1.5 text-xs leading-relaxed text-neutral-300">
                    {quadrant.detail}
                  </span>
                </Link>
              ))}

              {/* The mark sits where the two rules cross */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-neutral-950 text-xl font-bold leading-none text-brand-primary"
              >
                X
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

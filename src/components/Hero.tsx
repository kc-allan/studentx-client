import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Zap, BookOpen, Coffee, Tag, TrendingUp, Award, ShieldCheck, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/state";

const Hero = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const popularSearches = ["Apple", "Nike", "Spotify", "Adobe", "Uber Eats"];
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);

  return (
    <>

      <section className="relative w-full bg-linear-to-br from-neutral-900 via-neutral-950 to-black text-white overflow-hidden min-h-screen lg:pt-12 pt-20">
        {/* Abstract background with subtle animation */}
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxwYXRoIGQ9Ik0tMTAgLTEwIEwyMCAtMTAgTDIwIDIwIEwtMTAgMjAgWiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] animate-very-slow-pan"></div>
        </div>


        <div className="px-4 md:px-12 py-8 md:py-12 lg:py-16 relative z-10 container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 min-h-[80vh]">
            {/* Left side content */}
            <div className="flex-1 space-y-6 max-w-2xl">
              {/* <div className="inline-flex items-center bg-linear-to-r from-brand-primary to-gray-700 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                <BadgeCheck className="h-4 w-4 mr-2" />
                <span>Student Exclusive Verified</span>
              </div> */}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-brand-primary">X</span>clusive
                <div className="text-transparent bg-clip-text bg-brand-primary">student discounts</div>
                <span>just for you</span>
              </h1>

              <p className="mb-8 text-neutral-300 max-w-2xl leading-relaxed">
                Access <span className="font-semibold text-white">thousands of verified student deals</span> from your favorite brands. Save on software, fashion, food subscriptions, and more with your student status.
              </p>

              {/* Search bar */}
              <div className="relative max-w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const searchUrl = `/deals?search=${encodeURIComponent(searchQuery)}`;
                      window.location.href = searchUrl;
                    }
                  }}
                  type="text"
                  className="block w-full pl-10 pr-4 py-6 bg-white/5 border-neutral-400 rounded-lg text-white ring-0 outline-none placeholder-neutral-400"
                  placeholder="Search for brands or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Button disabled={searchQuery.length < 1} className="bg-brand-primary hover:bg-brand-primary/70 text-white font-medium rounded-lg px-4 py-2">
                    <Link to={`/deals?search=${encodeURIComponent(searchQuery)}`} className="flex items-center gap-2">
                      Search
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-sm text-neutral-400">Popular Searches: </span>
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="text-sm text-neutral-300 hover:text-white px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>

              {/* CTA buttons */}
              {!isAuthenticated && (
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button asChild size="lg" className="bg-linear-to-r from-brand-primary to-brand-primary/70 hover:from-brand-primary/70 hover:to-brand-primary text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-300">
                    <a href="/auth?page=signup">Get Started — It's Free</a>
                  </Button>
                  <Button
                    onClick={() => {
                      const element = document.getElementById("how-it-works");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    asChild
                    size="lg"
                    variant="outline"
                    className="cursor-pointer border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-lg"
                  >
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                      See How It Works
                    </span>
                  </Button>
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Verified student discounts</span>
                  </div>
                  <div className="h-4 w-px bg-white/20"></div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>100% free to use</span>
                  </div>
                </div>

                {/* <div className="flex flex-wrap gap-6 items-center">
                  <img
                    alt="Google"
                    className="h-6 opacity-80 hover:opacity-100 transition-opacity"
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    loading="lazy"
                  />
                  <img
                    alt="Coursera"
                    className="h-8 w-20 opacity-80 hover:opacity-100 transition-opacity"
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZpZXdCb3g9IjAgMCAxMTU1IDE2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiPjxwYXRoIGQ9Ik0xNTkuNzUgODEuNTRjMC00NC40OSAzNi42My04MC40NyA4Mi40My04MC40NyA0Ni4xMiAwIDgyLjc2IDM2IDgyLjc2IDgwLjQ3IDAgNDQuMTYtMzYuNjQgODAuOC04Mi43NiA4MC44LTQ1LjggMC04Mi40My0zNi42OC04Mi40My04MC44em0xMjUuNjEgMGMwLTIyLjI0LTE5LjMtNDEuODctNDMuMTgtNDEuODctMjMuNTUgMC00Mi44NSAxOS42My00Mi44NSA0MS44NyAwIDIyLjU3IDE5LjMgNDIuMiA0Mi44NSA0Mi4yIDIzLjkyIDAgNDMuMTgtMTkuNjMgNDMuMTgtNDIuMnptNzA1LjYzIDEuMzFjMC00OC43NCAzOS41OC04MS43OCA3NS41Ny04MS43OCAyNC41MyAwIDM4LjYgNy41MiA0OC4wOCAyMS45MmwzLjc3LTE5aDM2Ljc5djE1NS40aC0zNi43OWwtNC43NS0xNmMtMTAuNzkgMTEuNzgtMjQuMjEgMTktNDcuMSAxOS0zNS4zMy0uMDUtNzUuNTctMzEuMTMtNzUuNTctNzkuNTR6bTEyNS42MS0uMzNjLS4wOS0yMy41MjctMTkuNDctNDIuODM1LTQzLTQyLjgzNS0yMy41OSAwLTQzIDE5LjQxMS00MyA0M3YuMTY1YzAgMjEuNTkgMTkuMyA0MC44OSA0Mi44NiA0MC44OSAyMy44NSAwIDQzLjE0LTE5LjMgNDMuMTQtNDEuMjJ6TTk0NS43OCAyMlY0aC00MC4yM3YxNTUuMzloNDAuMjNWNzUuNjZjMC0yNS4xOSAxMi40NC0zOC4yNyAzNC0zOC4yNyAxLjQzIDAgMi43OS4xIDQuMTIuMjNMOTkxLjM2LjExYy0yMC45Ny4xMS0zNi4xNyA3LjMtNDUuNTggMjEuODl6bS00MDQuMjcuMDF2LTE4bC00MC4yMy4wOS4zNCAxNTUuMzcgNDAuMjMtLjA5LS4yMi04My43MmMtLjA2LTI1LjE4IDEyLjM1LTM4LjI5IDMzLjkzLTM4LjM0IDEuMzc2LjAwNCAyLjc1Mi4wODEgNC4xMi4yM0w1ODcuMSAwYy0yMSAuMTctMzYuMjIgNy4zOS00NS41OSAyMi4wMXpNMzM4Ljg4IDk5LjJWNC4wMWg0MC4yMlY5NC4zYzAgMTkuOTUgMTEuMTIgMzEuNzMgMzAuNDIgMzEuNzMgMjEuNTkgMCAzNC0xMy4wOSAzNC0zOC4yOFY0LjAxaDQwLjI0djE1NS4zOGgtNDAuMjF2LTE4Yy05LjQ4IDE0LjcyLTI0Ljg2IDIxLjkyLTQ2LjEyIDIxLjkyLTM1Ljk4LjAxLTU4LjU1LTI2LjE2LTU4LjU1LTY0LjExem0zOTEuNzQtMTcuNDhjLjA5LTQzLjUxIDMxLjIzLTgwLjc0IDgwLjYyLTgwLjY1IDQ1LjguMDkgNzguMTEgMzYuNzggNzggODAgLjAxIDQuMjczLS4zMyA4LjU0LTEgMTIuNzZsLTExOC40MS0uMjJjNC41NCAxOC42NSAxOS44OSAzMi4wOSA0My4xMiAzMi4xNCAxNC4wNiAwIDI5LjEyLTUuMTggMzguMy0xNi45NGwyNy40NCAyMmMtMTQuMTEgMTkuOTMtMzkgMzEuNjYtNjUuNDggMzEuNjEtNDYuNzUtLjE2LTgyLjY3LTM1LjIzLTgyLjU5LTgwLjd6bTExOC4xMi0xNi4xNGMtMi4yNi0xNS43LTE4LjU5LTI3Ljg0LTM3Ljg5LTI3Ljg3LTE4LjY1IDAtMzMuNzEgMTEuMDYtMzkuNjMgMjcuNzNsNzcuNTIuMTR6bS0yNjEuNCA1OS45NGwzNS43Ni0xOC43MmM1LjkxIDEyLjgxIDE3LjczIDIwLjM2IDM0LjQ4IDIwLjM2IDE1LjQzIDAgMjEuMzQtNC45MiAyMS4zNC0xMS44MiAwLTI1LTg0LjcxLTkuODUtODQuNzEtNjcgMC0zMS41MiAyNy41OC00OC4yNiA2MS43Mi00OC4yNiAyNS45NCAwIDQ4LjkyIDExLjQ5IDYxLjQgMzIuODNsLTM1LjQ0IDE4Ljc1Yy01LjI1LTEwLjUxLTE1LjEtMTYuNDItMjcuNTgtMTYuNDItMTIuMTQgMC0xOC4wNiA0LjI3LTE4LjA2IDExLjQ5IDAgMjQuMyA4NC43MSA4Ljg3IDg0LjcxIDY3IDAgMzAuMjEtMjQuNjIgNDguNTktNjQuMzUgNDguNTktMzMuODItLjAzLTU3LjQ2LTExLjE5LTY5LjI3LTM2Ljh6TTAgODEuNTRDMCAzNi43MyAzNi42My43NCA4Mi40My43NGMyNy45NDctLjE5NiA1NC4xODIgMTMuNzM3IDY5LjY3IDM3bC0zNC4zNCAxOS45MmE0Mi45NzIgNDIuOTcyIDAgMDAtMzUuMzMtMTguMzJjLTIzLjU1IDAtNDIuODUgMTkuNjMtNDIuODUgNDIuMiAwIDIyLjU3IDE5LjMgNDIuMiA0Mi44NSA0Mi4yYTQyLjUwMiA0Mi41MDIgMCAwMDM2LjMxLTIwbDM0IDIwLjI4Yy0xNS4zMDcgMjMuOTU1LTQxLjkwMiAzOC40MzEtNzAuMzMgMzguMjhDMzYuNjMgMTYyLjM0IDAgMTI1LjY2IDAgODEuNTR6IiBmaWxsPSIjMDA1NkQyIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4="
                    loading="lazy"
                  />
                  <img
                    alt="Udemy"
                    className="h-8 w-16 opacity-80 hover:opacity-100 transition-opacity bg-white p-0.5 rounded"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/2560px-Udemy_logo.svg.png"
                    loading="lazy"
                  />
                  <img
                    alt="Nike"
                    className="h-8 opacity-80 hover:opacity-100 transition-opacity"
                    src="https://cdn.simpleicons.org/nike/white"
                    loading="lazy"
                  />
                  <img
                    alt="Spotify"
                    className="h-6 opacity-80 hover:opacity-100 transition-opacity"
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                    loading="lazy"
                  />
                </div> */}
              </div>
            </div>

            {/* Right side - Benefits cards with images */}
            <div className="flex-1 relative max-w-full lg:mx-0">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"></div>

              <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl px-1 py-2 shadow-2xl border border-white/10 overflow-hidden">
                {/* Quick stats */}
                <div className="hidden relative bg-linear-to-r from-emerald-500/10 to-emerald-600/10 rounded-xl p-6 text-center overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
                  <div className="flex justify-center gap-4 lg:gap-8">
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">10k+</p>
                      <p className="text-sm text-neutral-300">Verified Deals</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">500+</p>
                      <p className="text-sm text-neutral-300">Premium Brands</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">100%</p>
                      <p className="text-sm text-neutral-300">Free Access</p>
                    </div>
                  </div>
                </div>

                {/* Benefit cards with images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6">
                  <BenefitCard
                    image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mdHdhcmUlMjBkaXNjb3VudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    title="Tech & Software"
                    description="Up to 90% off on essential tools"
                    stats="2,340+ deals"
                  />
                  <BenefitCard
                    image="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbiUyMGRpc2NvdW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                    title="Fashion & Apparel"
                    description="Exclusive student pricing"
                    stats="1,850+ deals"
                  />
                  <BenefitCard
                    image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGRpc2NvdW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                    title="Food & Dining"
                    description="Daily meal savings"
                    stats="980+ deals"
                  />
                  <BenefitCard
                    image="https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3MlMjBkaXNjb3VudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    title="Books & Courses"
                    description="Academic essentials"
                    stats="3,120+ deals"
                  />
                </div>

                {/* Trust indicators */}
                <div className="mt-6 mx-2 flex flex-col items-center gap-2 text-sm text-neutral-300 bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-emerald-500/10 rounded-full">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span>All deals verified for students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white opacity-5"></path>
          </svg>
        </div>
      </section>
    </>
  );
};

const BenefitCard = ({ image, title, description, stats }) => (
  <div className="group w-full relative overflow-hidden rounded-xl hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 border border-white/10">
    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/30 z-10"></div>
    <img
      src={image}
      alt={title}
      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
    />
    <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
      <div className="flex justify-between items-end">
        <div>

          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-neutral-300">{description}</p>
        </div>
        {/* <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">{stats}</span> */}
      </div>
    </div>
  </div>
);

export default Hero;
import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, Video, Tag } from "lucide-react";
import axiosInstance from "@/api/axios";
import { Offer, OfferKind } from "@/types/offer";

const DISMISSED_KEY = "announcement_strip_dismissed";

interface AnnouncementStripProps {
    /** Lets the page shift content down while the strip occupies the top of the viewport. */
    onVisibilityChange?: (visible: boolean) => void;
}

/**
 * Thin bar pinned above the header that puts the newest event, or the newest
 * deal when there is no event, in front of every visitor straight away.
 */
const AnnouncementStrip: React.FC<AnnouncementStripProps> = ({ onVisibilityChange }) => {
    const [highlight, setHighlight] = React.useState<Offer | null>(null);
    const [dismissed, setDismissed] = React.useState(false);

    React.useEffect(() => {
        let active = true;

        const fetchHighlight = async () => {
            try {
                const response = await axiosInstance.get("/offer/recommended", {
                    params: { sort: "newest", limit: 20 },
                });
                const offers: Offer[] = response.data?.data || [];
                if (!active || offers.length === 0) return;

                // Events lead, since they are time-bound; otherwise the newest deal
                const newest = offers.find(o => o.offerKind === OfferKind.EVENT) || offers[0];
                if (sessionStorage.getItem(DISMISSED_KEY) === newest.id) return;
                setHighlight(newest);
            } catch {
                // A quiet strip is better than a broken one
            }
        };

        fetchHighlight();
        return () => {
            active = false;
        };
    }, []);

    const visible = !!highlight && !dismissed;

    React.useEffect(() => {
        onVisibilityChange?.(visible);
    }, [visible, onVisibilityChange]);

    if (!visible) return null;

    const isEvent = highlight.offerKind === OfferKind.EVENT;

    const handleDismiss = () => {
        sessionStorage.setItem(DISMISSED_KEY, highlight.id);
        setDismissed(true);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center text-white bg-brand-primary/90 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex items-center justify-between gap-3 h-full">
                <Link
                    to={`/offer/${highlight.id}`}
                    className="flex items-center gap-2 min-w-0 flex-1 group"
                >
                    <span className="hidden sm:flex items-center gap-1.5 shrink-0 text-[11px] font-bold uppercase tracking-wider bg-white/15 rounded-full px-2 py-0.5">
                        {isEvent ? <Video className="h-3 w-3" /> : <Tag className="h-3 w-3" />}
                        {isEvent ? "New event" : "Just added"}
                    </span>
                    <span className="relative flex h-2 w-2 shrink-0 sm:hidden">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    <span className="text-xs sm:text-sm truncate">
                        <span className="font-semibold">{highlight.title}</span>
                        {highlight.merchant?.name && (
                            <span className="text-white/70"> · {highlight.merchant.name}</span>
                        )}
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1 shrink-0 text-xs font-semibold underline-offset-2 group-hover:underline">
                        {isEvent ? "Register" : "View deal"}
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                </Link>

                <button
                    type="button"
                    onClick={handleDismiss}
                    aria-label="Dismiss"
                    className="shrink-0 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
};

export default AnnouncementStrip;

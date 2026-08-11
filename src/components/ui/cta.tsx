import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaTone = "brand" | "ink" | "contrast" | "outline" | "outlineInverted";

const TONES: Record<CtaTone, { shell: string; divider: string }> = {
  brand: {
    shell: "bg-brand-primary text-white hover:bg-brand-primary/90",
    divider: "border-white/30",
  },
  ink: {
    shell: "bg-neutral-900 text-white hover:bg-neutral-700",
    divider: "border-white/25",
  },
  // For sitting on a brand-coloured surface, where a brand button would vanish
  contrast: {
    shell: "bg-white text-neutral-900 hover:bg-neutral-100",
    divider: "border-neutral-900/15",
  },
  outline: {
    shell: "border border-neutral-300 text-neutral-900 hover:border-neutral-900",
    // Tracks the shell's border colour through hover without restating it
    divider: "border-inherit",
  },
  outlineInverted: {
    shell: "border border-white/30 text-white hover:border-white",
    divider: "border-inherit",
  },
};

interface CtaProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: React.ReactNode;
  /** Internal route. */
  to?: string;
  /** External or protocol link, e.g. mailto:. */
  href?: string;
  onClick?: () => void;
  tone?: CtaTone;
  icon?: LucideIcon;
  className?: string;
}

/**
 * The one call-to-action shape on the site: label and action split into two
 * cells by a rule, so the arrow reads as a separate step rather than trailing
 * punctuation.
 */
export const Cta = React.forwardRef<HTMLButtonElement, CtaProps>(({
  children,
  to,
  href,
  onClick,
  tone = "ink",
  icon: Icon = ArrowRight,
  className,
  ...rest
}, ref) => {
  const { shell, divider } = TONES[tone];

  const content = (
    <>
      <span className="px-6 py-4 sm:px-7">{children}</span>
      <span
        aria-hidden
        className={cn("flex items-center self-stretch border-l px-4", divider)}
      >
        <Icon className="h-4 w-4" />
      </span>
    </>
  );

  const classes = cn(
    "group inline-flex items-stretch text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
    shell,
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" ref={ref} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
});
Cta.displayName = "Cta";

interface QuietLinkProps {
  children: React.ReactNode;
  to: string;
  tone?: "light" | "dark";
  className?: string;
}

/** Secondary navigation out of a section — "see all" and its siblings. */
export const QuietLink: React.FC<QuietLinkProps> = ({
  children,
  to,
  tone = "light",
  className,
}) => (
  <Link
    to={to}
    className={cn(
      "group inline-flex items-center gap-3 border-b pb-1 text-sm font-semibold transition-colors",
      tone === "dark"
        ? "border-white/30 text-white hover:border-white"
        : "border-neutral-300 text-neutral-900 hover:border-neutral-900",
      className
    )}
  >
    {children}
    <ArrowRight className="h-4 w-4" />
  </Link>
);

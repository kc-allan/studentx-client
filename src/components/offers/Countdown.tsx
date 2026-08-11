import React from "react";
import { cn } from "@/lib/utils";

const Countdown = ({ endDate, className }: { endDate: Date | string; className?: string }) => {
  const [timeLeft, setTimeLeft] = React.useState("");

  React.useEffect(() => {
    const updateCountdown = () => {
      const diff = new Date(endDate).getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      // Past a day the seconds are noise, so only the near-deadline view counts down live
      setTimeLeft(
        days > 0
          ? `${days}d ${hours}h`
          : hours > 0
            ? `${hours}h ${minutes}m`
            : `${minutes}m ${seconds}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const expired = timeLeft === "Expired";

  return (
    <span
      className={cn(
        "text-sm font-semibold tabular-nums",
        expired ? "text-brand-danger" : "text-neutral-900",
        className
      )}
    >
      {timeLeft}
    </span>
  );
};

export default Countdown;

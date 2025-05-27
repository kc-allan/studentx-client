import React from "react";

const Countdown = ({ endDate }: { endDate: Date }) => {
  const [timeLeft, setTimeLeft] = React.useState('');

  React.useEffect(() => {
	const updateCountdown = () => {
	  const now: any = new Date();
	  const end: any = new Date(endDate);
	  const diff = end - now;

	  if (diff <= 0) {
		setTimeLeft('Expired');
		return;
	  }

	  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	  const minutes = Math.floor((diff / (1000 * 60)) % 60);
	  const seconds = Math.floor((diff / 1000) % 60);

	  const formatted =
		days > 0
		  ? `${days}d ${hours}h ${minutes}m ${seconds}s`
		  : hours > 0
			? `${hours}h ${minutes}m ${seconds}s`
			: `${minutes}m ${seconds}s`;

	  setTimeLeft(formatted);
	};

	updateCountdown();
	const interval = setInterval(updateCountdown, 1000);

	return () => clearInterval(interval);
  }, [endDate]);

  return (
	<div className="text-xs">
	  <span className={`${timeLeft === 'Expired' ? 'text-brand-danger' : 'text-brand-accent'} font-bold`}>
		{timeLeft}
	  </span>
	</div>
  );
}

export default Countdown;
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Star } from 'lucide-react';
import Countdown from './Countdown';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const DICOUNT_TYPES = {
	percentage: 'percentage',
	fixed: 'fixed_amount',
	bogo: 'buy_one_get_one',
	free: 'free',
};

const OfferCard = ({ offer }) => {
	const navigate = useNavigate();

	const formatCurrency = (value, currency) => {
		const locale = window.navigator.language || 'en-US';
		const formatted = new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
			currencyDisplay: 'symbol',
			useGrouping: true,
		}).formatToParts(1)
			.find(x => x.type === "currency")
			.value;
		return formatted + ' ' + value.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
	};

	const sym = (currency, locale) =>
		new Intl.NumberFormat(locale, { style: 'currency', currency })
			.formatToParts(1)
			.find(x => x.type === "currency")
			.value;

	return (
		<div onClick={() => navigate(`/offer/${offer.id}`)} className="bg-white min-w-[90%] md:min-w-[33%] xl:min-w-[25%] rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all overflow-hidden group">
			<div className="relative">
				<div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
					<img
						src={offer.coverImage || 'https://via.placeholder.com/600x400?text=Offer+Image'}
						alt={offer.title}
						className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
					/>
				</div>
				<div className="absolute top-3 left-3 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
					{offer.discountType === DICOUNT_TYPES.percentage
						? `${offer.discountValue}% OFF`
						: offer.discountType === DICOUNT_TYPES.fixed ? `${formatCurrency(offer.discountValue, offer.currency)} OFF`
							: offer.discountType === DICOUNT_TYPES.bogo ? 'Buy 1 Get 1 Free'
								: 'Free'}
				</div>
				<div className="absolute bottom-3 right-3 bg-white/90 text-gray-900 text-xs font-medium px-2 py-1 rounded-full flex items-center">
					<Clock className="h-3 w-3 mr-1" />
					<Countdown endDate={offer.endDate} />
				</div>
			</div>

			<div className="p-5">
				<div className="flex items-center mb-3">
					<div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden mr-3">
						<Avatar>
							<AvatarImage src={offer.merchant.logo} alt={offer.merchant.name} className="w-full h-full object-cover" />
							<AvatarFallback className="bg-gray-200 text-gray-500">
								{offer.merchant.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</div>
					<div>
						<h3 className="font-bold text-lg text-gray-900">{offer.merchant.name}</h3>
						<div className="flex items-center text-xs text-gray-500">
							<Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
							<span>4.8 • {offer.couponLimit} coupons</span>
						</div>
					</div>
				</div>

				<h4 className="text-lg font-semibold text-gray-900 mb-2">{offer.title}</h4>
				<p className="text-sm text-gray-600 mb-4 line-clamp-2">{offer.description}</p>

				{/* Category tag */}
				<div className="inline-flex text-nowrap items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
					{offer.category?.name} <span className={`${!offer.category?.name ? 'hidden' : ''} mx-2`}>•</span> {offer.redemptionType === 'online' ? 'Online' : offer.redemptionType === 'in-store' ? 'In-store' : 'In-Store/Online'}
				</div>
			</div>
		</div>
	)
};

export default OfferCard;
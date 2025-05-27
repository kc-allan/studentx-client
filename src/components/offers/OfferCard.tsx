import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Star } from 'lucide-react';
import Countdown from './Countdown';
import { useNavigate } from 'react-router-dom';

const OfferCard = ({ offer }) => {
	const navigate = useNavigate();

	return (
		<div onClick={() => navigate(`/offer/${offer.id}`)} className="bg-white rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all border border-gray-200 overflow-hidden group">
			<div className="relative">
				<div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
					<img
						src={offer.coverImage}
						alt={offer.title}
						className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
					/>
				</div>
				<div className="absolute top-3 left-3 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
					{offer.discountType === 'PERCENTAGE' ? `${offer.discountValue}% OFF` : `$${offer.discountValue} OFF`}
				</div>
				<div className="absolute bottom-3 right-3 bg-white/90 text-gray-900 text-xs font-medium px-2 py-1 rounded-full flex items-center">
					<Clock className="h-3 w-3 mr-1" />
					<Countdown endDate={offer.endDate} />
				</div>
			</div>

			<div className="p-5">
				<div className="flex items-center mb-3">
					<div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden mr-3">
						<img src={offer.merchant.logo} alt={offer.merchant.name} className="w-full h-full object-cover" />
					</div>
					<div>
						<h3 className="font-bold text-gray-900">{offer.merchant.name}</h3>
						<div className="flex items-center text-xs text-gray-500">
							<Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
							<span>4.8 • {offer.couponLimit} coupons</span>
						</div>
					</div>
				</div>

				<h4 className="text-lg font-semibold text-gray-900 mb-2">{offer.title}</h4>
				<p className="text-sm text-gray-600 mb-4 line-clamp-2">{offer.description}</p>

				{/* <Button onClick={() => navigate(`/offer/${offer.id}`)} className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white">
					Get Deal
				</Button> */}
			</div>
		</div>
	)
};

export default OfferCard;
import { Avatar, Button } from "@mui/material";
import { Star } from "lucide-react";

const OfferCardSkeleton = () => (
	<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
		<div className="h-48 bg-gray-200"></div>
		<div className="p-5">
			<div className="flex items-center mb-3">
				<Avatar className="w-10 h-10 bg-gray-200" />
				<div className="ml-3">
					<div className="h-4 w-24 bg-gray-200 rounded"></div>
					<div className="flex items-center text-xs text-gray-500 mt-1">
						<Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
						<span className="h-3 w-16 bg-gray-200 rounded"></span>
					</div>
				</div>
			</div>
			<div className="h-6 w-full bg-gray-200 rounded mb-2"></div>
			<div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
			<Button disabled className="w-full bg-gray-300 cursor-not-allowed">
				Loading...
			</Button>
		</div>
	</div>
);

export default OfferCardSkeleton;
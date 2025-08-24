import Header from "@/components/Header";
import { RootState } from "@/state";
import { Merchant } from "@/types/user";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface HelpCenterProps {
	merchant: Merchant | null;
}

const HelpCenter: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleIframeLoad = () => {
		setIsLoading(false);
	};

	return (
		<div className="w-full h-screen relative">
			<div className="w-full flex justify-center items-center">
				<Header />
			</div>
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center">
					<p className="text-gray-500">Loading Help Center...</p>
				</div>
			)}

			<iframe
				ref={iframeRef}
				id="article-frame"
				className={`w-full h-full ${isLoading ? 'invisible' : 'visible'}`}
				src="https://studentx-support.tawk.help"
				title="Help Center"
				onLoad={handleIframeLoad}
			/>
		</div>
	);
};

export default HelpCenter;
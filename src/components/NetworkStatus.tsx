import { useEffect, useState } from 'react';

function NetworkStatus() {
	const [online, setOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => setOnline(true);
		const handleOffline = () => setOnline(false);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return (
		<div className='z-50' style={{ padding: '10px', background: online ? '#e0ffe0' : '#ffe0e0', zIndex: 999999 }}>
			{online ? '🟢 You are online' : '🔴 You are offline'}
		</div>
	);
}

export default NetworkStatus;

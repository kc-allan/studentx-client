import React from 'react';
import Avatar from '@mui/material/Avatar';

const getInitials = (fullName) => {
	if (!fullName) return '';
	return fullName
		.split(' ')
		.filter(Boolean)
		.map(name => name[0].toUpperCase())
		.join('');
};

export default function UserAvatar({ src, alt, className }: { src: string; alt: string; className?: string }) {
	const initials = getInitials(alt);

	return (
		<Avatar
			sx={{ width: "100%", height: "100%" }}
			src={src}
			alt={alt}
			className={className}>
			{initials}
		</Avatar>
	);
}

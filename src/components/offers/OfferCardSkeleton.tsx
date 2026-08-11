const OfferCardSkeleton = () => (
	<div className="flex h-full w-full flex-col border border-neutral-200 bg-white">
		<div className="w-full animate-pulse bg-neutral-100" style={{ aspectRatio: 4 / 3 }} />
		<div className="flex flex-1 flex-col p-5">
			<div className="flex items-center gap-2.5">
				<div className="h-7 w-7 animate-pulse rounded-full bg-neutral-100" />
				<div className="h-3 w-24 animate-pulse rounded bg-neutral-100" />
			</div>
			<div className="mt-4 h-5 w-full animate-pulse rounded bg-neutral-100" />
			<div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-neutral-100" />
			<div className="mt-4 h-3 w-full animate-pulse rounded bg-neutral-100" />
			<div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-neutral-100" />
			<div className="mt-5 flex items-end justify-between border-t border-neutral-200 pt-4">
				<div className="space-y-2">
					<div className="h-4 w-20 animate-pulse rounded bg-neutral-100" />
					<div className="h-3 w-28 animate-pulse rounded bg-neutral-100" />
				</div>
				<div className="space-y-2">
					<div className="h-3 w-12 animate-pulse rounded bg-neutral-100" />
					<div className="h-4 w-16 animate-pulse rounded bg-neutral-100" />
				</div>
			</div>
		</div>
	</div>
);

export default OfferCardSkeleton;

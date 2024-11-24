type Props = {
	url: string;
	title: string;
	description: string | null;
	image: string | null;
};

export function Shiori({ url, image, title, description }: Props) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="grid grid-rows-subgrid row-span-5 gap-6 px-4 py-2 bg-yellow-800/5 shadow hover:shadow-md focus:shadow-md duration-100"
		>
			<div className="-mx-4 -mt-2 w-40 h-16 ichimatsu" />
			<div className="-mx-4 w-40 h-28 grid place-items-center">
				{image && (
					<img src={image} alt={`${url} thumbnail`} className="max-h-24" />
				)}
			</div>
			<div className="grid place-items-center border-y border-emerald-900">
				<h2 className="max-w-36 text-emerald-900 text-lg text-center text-balance break-words leading-7 font-bold line-clamp-3">
					{title}
				</h2>
			</div>
			{description ? (
				<p className="text-stone-700 text-sm text-center text-balance line-clamp-2">
					{description}
				</p>
			) : (
				<div />
			)}
			<div className="text-sm text-center line-clamp-1">
				{new URL(url).hostname}
			</div>
		</a>
	);
}

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
			className="grid grid-rows-subgrid row-span-5 w-44 bg-yellow-800/5 shadow hover:shadow-md focus:shadow-md duration-100"
		>
			<article className="grid grid-rows-inherit row-inherit items-center justify-items-center h-full">
				<div className="w-full h-full ichimatsu" />
				{image ? (
					<img src={image} alt={`${url} thumbnail`} className="h-24" />
				) : (
					<div />
				)}
				<h2 className="mx-4 mb-2 border-y border-emerald-900 text-emerald-900 text-xl text-center text-balance leading-8 font-bold line-clamp-3">
					{title}
				</h2>
				{description ? (
					<p className="mx-4 my-2  text-stone-700 text-sm text-center text-balance line-clamp-2">
						{description}
					</p>
				) : (
					<div />
				)}
				<div className="mx-4 my-2 text-sm text-center">
					{new URL(url).hostname}
				</div>
			</article>
		</a>
	);
}

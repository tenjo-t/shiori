import Link from "next/link";
import { Plus } from "lucide-react";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<div>
			{children}
			<div className="fixed right-4 sm:right-8 bottom-4 sm:bottom-8">
				<Link
					href="/private/new"
					title="add bookmark"
					className="flex items-center justify-center w-12 h-12 bg-stone-700 hover:bg-stone-800 focus:bg-stone-800 text-white text-2xl rounded-full duration-100 shadow-lg"
				>
					<Plus />
				</Link>
			</div>
		</div>
	);
}

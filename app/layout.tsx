import HeaderAuth from "../components/header-auth";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Shiori",
	description: "気になったウェブページを整理してまとめたサイトです",
};

function Header() {
	return (
		<header className="w-full border-b">
			<nav className="flex justify-center">
				<div className="w-full max-w-5xl flex justify-between items-center px-5 py-3">
					<div>
						<Link href={"/"} className="text-lg">
							Shiori
						</Link>
					</div>
					<HeaderAuth />
				</div>
			</nav>
		</header>
	);
}

function Footer() {
	return (
		<footer className="w-full border-t mx-auto text-center py-8">
			<p>@tenjo-t</p>
		</footer>
	);
}

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body className="bg-stone-100 text-stone-800">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="w-full flex flex-col gap-12 items-center">
						<Header />
						<div className="max-w-5xl w-full p-4">{children}</div>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}

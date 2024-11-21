import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { Button } from "./ui/button";
import { createClient } from "../utils/supabase/server";
import { signOutAction } from "../app/(auth)/actions";

export default async function AuthButton() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user ? (
		<div className="flex items-center gap-4">
			<Link
				href={"/private"}
				className="p-1 hover:bg-stone-200 focus:bg-stone-200 hover:text-stone-900 focus:text-stone-900 duration-100 rounded-full"
			>
				<CircleUserRound />
			</Link>
			<form action={signOutAction}>
				<Button type="submit" variant={"outline"}>
					Sign out
				</Button>
			</form>
		</div>
	) : (
		<div className="flex gap-2">
			<Button asChild size="sm" variant={"outline"}>
				<Link href="/sign-in">Sign in</Link>
			</Button>
			<Button asChild size="sm" variant={"default"}>
				<Link href="/sign-up">Sign up</Link>
			</Button>
		</div>
	);
}

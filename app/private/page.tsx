import { redirect } from "next/navigation";
import { Shiori } from "../../components/shiori";
import { createClient } from "../../utils/supabase/server";

export default async function Page() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	const { data } = await supabase.from("bookmark").select();

	return (
		<main className="flex-1 w-full flex flex-col gap-8">
			<h1 className="font-bold text-4xl mb-4">Bookmark</h1>
			<div className="grid grid-rows-shiori grid-cols-shiori gap-4 justify-center">
				{data?.map((p) => (
					<Shiori key={p.url} {...p} />
				))}
			</div>
		</main>
	);
}

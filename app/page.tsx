import { Shiori } from "../components/shiori";
import { createClient } from "../utils/supabase/server";

export default async function Index() {
	const supabase = await createClient();
	const { data } = await supabase
		.from("bookmark")
		.select("created_at,url,title,description,image,category");

	return (
		<>
			<main className="flex flex-col gap-8">
				<h1 className="text-5xl font-bold text-center">Shiori</h1>
				<p className="text-center">
					気になったウェブページを整理してまとめたサイトです。
				</p>
				<div className="grid grid-rows-shiori grid-cols-shiori gap-4 justify-center">
					{data?.map((p) => (
						<Shiori key={p.url} {...p} />
					))}
				</div>
			</main>
		</>
	);
}

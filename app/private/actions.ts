"use server";
import { Parser } from "htmlparser2";
import { createClient } from "../../utils/supabase/server";
import { encodedRedirect } from "../../utils/utils";
import { redirect } from "next/navigation";

type Favicon = {
	href: string;
	type?: string;
	size?: number;
};

type OGP = {
	og_title?: string;
	og_description?: string;
	og_image?: string;
	og_site_name?: string;
	og_url?: string;
	title?: string;
	description?: string;
	favicon?: Favicon[];
	canonical?: string;
};

function parseOGP(html: string, url: string) {
	const ogp: OGP = {};
	let isTitle = false;
	const parser = new Parser({
		onopentag(name, attrs) {
			switch (name) {
				case "meta": {
					if ("property" in attrs) {
						switch (attrs.property) {
							case "og:title":
								ogp.og_title = attrs.content;
								return;
							case "og:description":
								ogp.og_description = attrs.content;
								return;
							case "og:image":
								ogp.og_image = attrs.content;
								return;
							case "og:site_name":
								ogp.og_site_name = attrs.content;
								return;
							case "og:url":
								ogp.og_url = attrs.content;
								return;
						}
					}
					if ("name" in attrs) {
						switch (attrs.name) {
							case "description":
								ogp.description = attrs.content;
								return;
						}
					}
					break;
				}
				case "title": {
					isTitle = true;
					break;
				}
				case "link": {
					if ("rel" in attrs) {
						switch (attrs.rel) {
							case "icon":
								if (!ogp.favicon) {
									ogp.favicon = [];
								}
								ogp.favicon.push({
									href: attrs.href,
									type: attrs.type,
									size: attrs.size ? Number.parseInt(attrs.size) : undefined,
								});
								break;
							case "canonical":
								ogp.canonical = attrs.href;
						}
					}
					break;
				}
			}
		},
		ontext(data) {
			if (isTitle) {
				ogp.title = data;
			}
		},
		onclosetag(name, isImplied) {
			isTitle = false;
		},
	});

	parser.write(html);
	parser.end();

	const favicon: { url?: string; type?: string; size?: number } = {};
	if (ogp.favicon) {
		for (const f of ogp.favicon) {
			if (f.type === "image/svg+xml") {
				favicon.url = f.href;
				favicon.size = Number.POSITIVE_INFINITY;
			} else if (f.size) {
				if (!favicon.size) {
					favicon.url = f.href;
					favicon.size = f.size;
				} else if (f.size > favicon.size && f.size < 500) {
					favicon.url = f.href;
					favicon.size = f.size;
				}
			} else if (!favicon.url) {
				favicon.url = f.href;
			}
		}

		if (favicon.url && !favicon.url.startsWith("http")) {
			favicon.url = new URL(favicon.url, url).href;
		}
	}

	return {
		url: ogp.og_url ?? ogp.canonical,
		title: ogp.og_title ?? ogp.title ?? ogp.og_site_name,
		description: ogp.og_description ?? ogp.description,
		image: ogp.og_image ?? favicon.url,
	};
}

export async function addBookmark(formData: FormData) {
	const supabase = await createClient();
	const { data: user, error } = await supabase.auth.getUser();

	if (error) {
		return encodedRedirect("error", "/sign-in", error.message);
	}

	const url = formData.get("url")?.toString();
	const category = formData.get("category")?.toString();

	if (!url || !URL.canParse(url)) {
		return { error: "valid URL are required" };
	}

	const res = await fetch(url);
	if (!res.ok) {
		return encodedRedirect(
			"error",
			"/private/new",
			`${url} status is ${res.status}`,
		);
	}

	const ogp = parseOGP(await res.text(), url);

	{
		const { error } = await supabase.from("bookmark").insert({
			url: ogp.url ?? url,
			title: ogp.title ?? ogp.url ?? url,
			description: ogp.description,
			image: ogp.image,
		});

		if (error) {
			return encodedRedirect("error", "/private/new", error.message);
		}
	}

	return redirect("/private");
}

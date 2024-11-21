import { FormMessage, type Message } from "../../../components/form-message";
import { SubmitButton } from "../../../components/submit-button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { addBookmark } from "../actions";

type Props = {
	searchParams: Promise<Message>;
};

export default async function Page(props: Props) {
	const searchParams = await props.searchParams;

	return (
		<main className="flex flex-col gap-12 items-center">
			<form className="min-w-64 flex flex-col gap-4">
				<h1 className="font-bold text-3xl mb-4">Add bookmark</h1>
				<Label htmlFor="url">URL</Label>
				<Input
					name="url"
					type="url"
					placeholder="https://example.com"
					required
				/>
				<Label>
					<input name="private" type="checkbox" />
					Private
				</Label>
				<SubmitButton formAction={addBookmark}>Add</SubmitButton>
				<FormMessage message={searchParams} />
			</form>
		</main>
	);
}

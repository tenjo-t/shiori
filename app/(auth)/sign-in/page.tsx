import { signInAction } from "../../../app/(auth)/actions";
import { FormMessage, type Message } from "../../../components/form-message";
import { SubmitButton } from "../../../components/submit-button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

type Props = {
	searchParams: Promise<Message>;
};

export default async function Signin(props: Props) {
	const searchParams = await props.searchParams;

	return (
		<form className="flex-1 flex flex-col min-w-64">
			<h1 className="text-3xl font-bold">Sign in</h1>
			<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
				<Label htmlFor="email">Email</Label>
				<Input name="email" placeholder="you@example.com" required />
				<Label htmlFor="password">Password</Label>
				<Input
					type="password"
					name="password"
					placeholder="Your password"
					required
				/>
				<SubmitButton pendingText="Signing In..." formAction={signInAction}>
					Sign in
				</SubmitButton>
				<FormMessage message={searchParams} />
			</div>
		</form>
	);
}

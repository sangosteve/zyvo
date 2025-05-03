// app/(auth)/callback/page.tsx
import { createUserIfNotExists } from "@/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function CallbackPage() {
    const user = await currentUser();

    if (!user) {
        return redirect("/sign-in");
    }

    await createUserIfNotExists({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName ?? undefined,
        lastname: user.firstName ?? undefined,
    });

    // Next: redirect to onboarding or dashboard
    return redirect("/dashboard");
}

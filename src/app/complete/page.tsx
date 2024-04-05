import Navbar from "@/components/UserNav";
import ProfileForm from "@/components/ProfileForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { checkProfileCompletion } from "@/lib/checkProfileCompletion";

export default async function CompletePage() {
  const { protect, userId } = auth();
  protect({ redirectUrl: "/" });
  console.log(userId);

  const isProfileComplete = await checkProfileCompletion(userId!);

  if (isProfileComplete) {
    console.log(isProfileComplete);

    redirect("/");
  }
  return (
    <>
      <Navbar />
      <ProfileForm />
    </>
  );
}

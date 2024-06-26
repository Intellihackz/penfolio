// ManageWorksPage.tsx
import Navbar from "@/components/UserNav";
import WorksManagementSection from "@/components/WorksManagementSection";
import { auth } from "@clerk/nextjs";
import { checkProfileCompletion } from "@/lib/checkProfileCompletion";
import { redirect } from "next/navigation";

export default async function ManageWorksPage() {
  const { protect, userId } = auth();
  protect({ redirectUrl: "/sign-in" });
  console.log(userId);

  const isProfileComplete = await checkProfileCompletion(userId!);

  if (!isProfileComplete) {
    console.log(isProfileComplete);

    redirect("/complete");
  }

  return (
    <>
      <Navbar />
      <WorksManagementSection />
    </>
  );
}

import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import ProfileView from "@/components/Profileview";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  try {
    await dbConnect();

    const user = await User.findOne({ username: params.username });
    console.log(user);

    if (!user) {
      notFound();
    }

    return (
      <>
        <h1>Hello {params.username}</h1>
        <ProfileView user={user} />
      </>
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    notFound();
  }
}

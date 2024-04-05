import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function checkProfileCompletion(userId: string): Promise<boolean> {
  try {
    await dbConnect();
    console.log(userId);

    const user = await User.findOne({ clerk_id: userId });
    console.log(user);

    if (!user) {
      return false; // User not found
    }

    // Check if all required fields are present
    // const isProfileComplete =
    //   user.username && user.bio && user.imageUrl && user.clerk_id;
    // console.log(isProfileComplete);

    return true;
  } catch (error) {
    console.error("Error checking profile completion:", error);
    return false;
  }
}

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkProfileCompletion } from "@/lib/checkProfileCompletion";

const withProfileCheck = (WrappedComponent: React.FC) => {
  const ProfileCheckWrapper: React.FC = (props) => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      const checkProfile = async () => {
        if (user) {
          const isProfileComplete = await checkProfileCompletion(user.id);

          if (!isProfileComplete) {
            // Redirect to the profile completion page
            router.push("/complete");
          }
        }
      };

      checkProfile();
    }, [user, router]);

    return <WrappedComponent {...props} />;
  };

  return ProfileCheckWrapper;
};

export default withProfileCheck;

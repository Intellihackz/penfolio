import GenNav from "@/components/Navbar";
import { SignUp } from "@clerk/nextjs";

/**
 * Default export is a React function component that defines the sign up page.
 *
 * Renders the navigation bar component and a Sign up component from Clerk
 * centered on the page.
 */
export default function Page() {
  return (
    <>
      <GenNav />
      <div className="flex justify-center my-14 ">
        <SignUp />
      </div>
    </>
  );
}

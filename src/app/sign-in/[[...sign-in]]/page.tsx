import GenNav from "@/components/Navbar";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <GenNav />
      <div className="flex justify-center my-16 ">
        <SignIn />
      </div>
    </>
  );
}

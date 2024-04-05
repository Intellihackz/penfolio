"use client";

import { useState } from "react";
import { useUser, auth } from "@clerk/nextjs";
import ProfileCard from "@/components/ProfileCard";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { redirect } from "next/navigation";

const ProfileForm = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handleBioChange = (value: string) => {
    setBio(value);
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          clerk_id: user?.id,
          bio,
          imageUrl: user?.imageUrl,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Handle successful response
        console.log("User created successfully");
        toast({
          variant: "default",
          description: data.message,
        });
        window.location.href = "/";
      } else {
        if (data.error == "User with this Clerk ID already exists") {
          window.location.href = "/";
        }
        toast({
          variant: "destructive",
          description: data.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        // Handle error response
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileCard
      user={{ imageUrl: user?.profileImageUrl || "" }}
      username={username}
      bio={bio}
      onUsernameChange={handleUsernameChange}
      onBioChange={handleBioChange}
      //   onSave={handleSave}
      onSave={handleSave}

      //   isLoading={isLoading}
    />
  );
};

export default ProfileForm;

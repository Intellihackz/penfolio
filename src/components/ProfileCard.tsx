import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TooltipDemo } from "@/components/tootlip";

interface ProfileCardProps {
  user: {
    imageUrl: string;
  };
  username: string;
  bio: string;
  onUsernameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onSave: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  username,
  bio,
  onUsernameChange,
  onBioChange,
  onSave,
}) => {
  return (
    <div className="flex justify-center my-16">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex justify-center items-center ">
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            {" "}
            Complete your profile information.{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2 items-center text-center justify-center">
              <Avatar className="w-24 h-24">
                <AvatarImage alt="Avatar" src={user.imageUrl} />
                <AvatarFallback>PF</AvatarFallback>
              </Avatar>
            </div>
            <div className="p-2 flex gap-2 items-center">
              <Label htmlFor="username">Username </Label>
              <TooltipDemo />
            </div>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              className="min-h-[100px]"
              id="bio"
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) => onBioChange(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onSave}>Save Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileCard;

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { IUserDTO } from "@/shared/api/models/IUser";
import { Dictionary } from "@/shared/types/i18n";
import getInitials from "@/shared/utils/getInitials.utils";
import ProfileSection from "./ProfileSection";

interface ProfileCardProps {
  dict: Dictionary;
  user: IUserDTO;
}

const ProfileCard = ({ dict, user }: ProfileCardProps) => {
  const profileDict = dict.profile;
  const displayName = user.displayName || user.name || "";
  const username = user.username ? `@${user.username}` : "";
  const initials = getInitials(displayName || user.name || "?");

  const fields = [
    {
      id: "display-name",
      label: profileDict.display_name,
      value: displayName,
    },
    {
      id: "username",
      label: profileDict.username,
      value: username,
    },
    {
      id: "email",
      label: profileDict.email,
      value: user.email ?? "",
    },
  ];

  return (
    <ProfileSection>
      <div className="flex items-center gap-4">
        <Avatar className="bg-muted size-16 shrink-0">
          {user.image && <AvatarImage src={user.image} alt="" />}
          <AvatarFallback className="bg-muted text-muted-foreground text-xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="text-foreground truncate text-lg font-bold">
            {displayName}
          </p>
          {username && (
            <p className="text-muted-foreground truncate text-sm">{username}</p>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center justify-between gap-4"
          >
            <Label
              htmlFor={field.id}
              className="text-muted-foreground shrink-0 text-sm font-medium"
            >
              {field.label}
            </Label>
            <Input
              id={field.id}
              readOnly
              value={field.value}
              className="bg-input/50 h-8 max-w-[220px] rounded-full border px-3 text-right text-sm shadow-none"
            />
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="mt-5">
        {profileDict.edit_profile}
      </Button>
    </ProfileSection>
  );
};

export default ProfileCard;

"use client";
import Link from "next/link";
import { Dictionary } from "@/shared/types/i18n";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

interface UserAvatarProps {
  dict: Dictionary;
  user: IUserDTO;
}

const UserAvatar = ({ dict, user }: UserAvatarProps) => {
  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <Avatar className="h-9 w-9 shrink-0">
        {user.image && <AvatarImage src={user.image} alt={user.name} />}
        <AvatarFallback className="bg-accent text-accent-foreground font-semibold text-sm">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold leading-tight truncate">
          {user.name}
        </span>
        <Link
          href={`/profile`}
          className="text-xs text-text-secondary hover:text-accent-text transition-colors duration-150 leading-snug"
        >
          {dict.navbar.view_profile}
        </Link>
      </div>
    </div>
  );
};

export default UserAvatar;

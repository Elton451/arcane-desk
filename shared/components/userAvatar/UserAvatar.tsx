"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { IUserDTO } from "@/shared/api/models/IUser";
import getInitials from "@/shared/utils/getInitials.utils";

interface UserAvatarProps {
  dict: Dictionary;
  user: IUserDTO | null;
}

const UserAvatar = ({ dict, user }: UserAvatarProps) => {
  if (!user) {
    return;
  }

  const initials = getInitials(user.name || "");

  const profileLabel = [user.name, dict.navbar.view_profile]
    .filter(Boolean)
    .join(" — ");

  return (
    <Link
      href="/profile"
      aria-label={profileLabel}
      className={cn(
        "flex items-center gap-3",
        "rounded-none border-t border-b px-3 py-5",
        "transition-colors duration-200 outline-none",
        "hover:bg-secondary/40",
        "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2",
      )}
    >
      <Avatar
        className={cn(
          "h-9 w-9 shrink-0",
          "transition-[box-shadow,transform] duration-200",
          "hover:ring-primary/60 group-hover/avatar:ring-2 hover:scale-[1.03]",
          "hover:shadow-[0_0_18px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]",
        )}
      >
        {user.image && (
          <AvatarImage
            src={user.image}
            alt=""
            className={cn(
              "transition-[filter] duration-200",
              "hover:brightness-110",
            )}
          />
        )}
        <AvatarFallback
          className={cn(
            "bg-accent text-accent-foreground text-sm font-semibold",
            "transition-[filter] duration-200",
            "hover:brightness-110",
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-col">
        <span
          className={cn(
            "truncate text-sm leading-tight font-semibold",
            "transition-colors duration-200",
            "group-hover/avatar:text-accent-text",
          )}
        >
          {user.name}
        </span>
        <span
          className={cn(
            "text-text-secondary text-xs leading-snug",
            "transition-colors duration-150",
            "hover:text-accent-text",
          )}
        >
          {dict.navbar.view_profile}
        </span>
      </div>
    </Link>
  );
};

export default UserAvatar;

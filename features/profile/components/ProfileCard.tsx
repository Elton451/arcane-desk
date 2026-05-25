"use client";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateProfileSchema,
  UpdateProfileData,
} from "@/features/profile/schemas/updateProfile.schema";
import updateProfile from "@/features/profile/actions/updateProfile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProfileCardProps {
  dict: Dictionary;
  user: IUserDTO;
}

const ProfileCard = ({ dict, user }: ProfileCardProps) => {
  const profileDict = dict.profile;
  const router = useRouter();
  const displayName = user.displayName || user.name || "";
  const initials = getInitials(displayName || user.name || "?");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: { displayName },
  });

  const onSubmit = async (data: UpdateProfileData) => {
    const result = await updateProfile(data);

    if (!result.success) {
      toast.error(profileDict.update_error);
      return;
    }

    toast.success(profileDict.update_success);
    reset(data);
    router.refresh();
  };

  const handleCancel = () => reset();

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
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Label
            htmlFor="display-name"
            className="text-muted-foreground shrink-0 text-sm font-medium"
          >
            {profileDict.display_name}
          </Label>
          <Input
            id="display-name"
            {...register("displayName")}
            className="bg-input/50 h-8 max-w-55 rounded-full border px-3 text-right text-sm shadow-none"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Label
            htmlFor="email"
            className="text-muted-foreground shrink-0 text-sm font-medium"
          >
            {profileDict.email}
          </Label>
          <Input
            id="email"
            value={user.email ?? ""}
            readOnly
            className="bg-input/50 text-muted-foreground h-8 max-w-55 rounded-full border px-3 text-right text-sm shadow-none"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <Button type="submit" size="sm" disabled={!isDirty || isSubmitting}>
            {isSubmitting ? profileDict.saving : profileDict.save_profile}
          </Button>

          {isDirty && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {profileDict.cancel}
            </Button>
          )}
        </div>
      </form>
    </ProfileSection>
  );
};

export default ProfileCard;

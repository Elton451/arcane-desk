import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProfileSectionProps {
  children: ReactNode;
  className?: string;
}

const ProfileSection = ({ children, className }: ProfileSectionProps) => {
  return (
    <section
      className={cn(
        "border-border/80 bg-card/60 rounded-xl border p-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)] sm:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default ProfileSection;

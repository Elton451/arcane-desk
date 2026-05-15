"use client";

import { SkeletonBlock } from "@/shared/components/loading/Loading";

interface EntityGridProps {
  isLoading: boolean;
  isEmpty: boolean;
  emptyMessage: string;
  children: React.ReactNode;
}

const SKELETON_COUNT = 6;

const EntityGrid = ({
  isLoading,
  isEmpty,
  emptyMessage,
  children,
}: EntityGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="border-border bg-card rounded-lg border p-5">
            <SkeletonBlock layout="card" />
          </div>
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <p className="text-muted-foreground border-border bg-card rounded-lg border border-dashed px-6 py-10 text-center text-sm">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
};

export default EntityGrid;

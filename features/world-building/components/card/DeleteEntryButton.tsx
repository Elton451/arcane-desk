"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { Dictionary } from "@/shared/types/i18n";

interface DeleteEntryButtonProps {
  dict: Dictionary;
  entryId: number;
  onDelete: (id: number) => void;
  confirmTitle: string;
  confirmDescription: string;
  disabled?: boolean;
}

const DeleteEntryButton = ({
  dict,
  entryId,
  onDelete,
  confirmTitle,
  confirmDescription,
  disabled,
}: DeleteEntryButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive absolute top-3 right-3 size-7"
          aria-label={dict.common.delete}
          disabled={disabled}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{dict.common.cancel}</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => onDelete(entryId)}
          >
            {dict.common.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEntryButton;

"use client";

import Markdown from "react-markdown";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { Button } from "@/shared/components/ui/button";

interface DescriptionCardProps {
  description: string;
  labelExpand: string;
  labelCollapse: string;
}

const NpcDescription = ({
  description,
  labelExpand,
  labelCollapse,
}: DescriptionCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="border-border bg-card mb-4 rounded-lg border p-4">
        <div className="relative">
          <div className={cn("overflow-hidden", !open && "max-h-20")}>
            <Markdown>{description}</Markdown>
          </div>

          {/* fade overlay when collapsed */}
          {!open && (
            <div className="from-card pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t to-transparent" />
          )}
        </div>

        <CollapsibleContent />

        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground mt-2 gap-1.5 px-0 hover:bg-transparent"
          >
            <ChevronDownIcon
              className={cn(
                "size-4 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
            {open ? labelCollapse : labelExpand}
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
};

export default NpcDescription;

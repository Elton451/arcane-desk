"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";

export interface PaginatorProps {
  dict: Dictionary;
  totalNumberOfPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getVisiblePages(
  currentPage: number,
  totalNumberOfPages: number,
): (number | "ellipsis")[] {
  if (totalNumberOfPages <= 7) {
    return Array.from({ length: totalNumberOfPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalNumberOfPages);
  for (let p = currentPage - 1; p <= currentPage + 1; p++) {
    if (p >= 1 && p <= totalNumberOfPages) {
      pages.add(p);
    }
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i];
    const prev = sorted[i - 1];
    if (i > 0 && page - prev > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  }
  return result;
}

export function Paginator({
  dict,
  totalNumberOfPages,
  currentPage,
  onPageChange,
  className,
}: PaginatorProps) {
  if (totalNumberOfPages < 1) {
    return null;
  }

  const safePage = Math.min(Math.max(1, currentPage), totalNumberOfPages);
  const visible = getVisiblePages(safePage, totalNumberOfPages);
  const isFirst = safePage <= 1;
  const isLast = safePage >= totalNumberOfPages;

  const goTo = (page: number) => {
    const next = Math.min(Math.max(1, page), totalNumberOfPages);
    if (next !== safePage) {
      onPageChange(next);
    }
  };

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!isFirst) {
                goTo(safePage - 1);
              }
            }}
            className={cn(isFirst && "pointer-events-none opacity-50")}
            aria-disabled={isFirst}
            text={dict.common.previous}
          />
        </PaginationItem>
        {visible.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goTo(item);
                }}
                isActive={item === safePage}
                aria-label={`Page ${item}`}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!isLast) {
                goTo(safePage + 1);
              }
            }}
            className={cn(isLast && "pointer-events-none opacity-50")}
            aria-disabled={isLast}
            text={dict.common.next}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

type LoadingSize = "sm" | "md" | "lg";
type LoadingVariant = "spinner" | "bars" | "orb" | "skeleton";

interface LoadingProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  label?: string;
  className?: string;
}

interface SkeletonProps {
  className?: string;
  /** Preset layout para contextos comuns */
  layout?: "card" | "list-item" | "text" | "none";
  children?: React.ReactNode;
}

// ── Size maps ────────────────────────────────────────────────────────────────

const spinnerSize: Record<LoadingSize, string> = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const orbSize: Record<
  LoadingSize,
  { outer: string; ring2: string; ring3: string; center: string }
> = {
  sm: {
    outer: "w-8 h-8",
    ring2: "inset-[5px]",
    ring3: "inset-[10px]",
    center: "inset-[14px]",
  },
  md: {
    outer: "w-12 h-12",
    ring2: "inset-[7px]",
    ring3: "inset-[13px]",
    center: "inset-[18px]",
  },
  lg: {
    outer: "w-16 h-16",
    ring2: "inset-[9px]",
    ring3: "inset-[17px]",
    center: "inset-[23px]",
  },
};

const barsHeight: Record<LoadingSize, string> = {
  sm: "h-5",
  md: "h-8",
  lg: "h-12",
};

// ── Sub-components ───────────────────────────────────────────────────────────

function RuneSpinner({
  size = "md",
  className,
}: {
  size?: LoadingSize;
  className?: string;
}) {
  return (
    <div
      className={cn("relative", spinnerSize[size], className)}
      role="status"
      aria-label="Carregando"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-full w-full animate-spin [animation-duration:2.4s]"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-arcane-200"
        />
        <path
          d="M24 4 A20 20 0 0 1 44 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-arcane-500"
        />
        <circle
          cx="24"
          cy="4"
          r="2.5"
          fill="currentColor"
          className="text-arcane-500"
        />
        <circle
          cx="44"
          cy="24"
          r="2.5"
          fill="currentColor"
          className="text-arcane-500"
        />
        <path
          d="M24 14 L28 22 L36 22 L30 27 L32 35 L24 30 L16 35 L18 27 L12 22 L20 22 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-arcane-300/40"
        />
      </svg>
      <span className="bg-background absolute inset-[30%] flex items-center justify-center rounded-full">
        <span className="bg-arcane-500 h-1.5 w-1.5 animate-pulse rounded-full" />
      </span>
    </div>
  );
}

function CrystalBars({
  size = "md",
  className,
}: {
  size?: LoadingSize;
  className?: string;
}) {
  const barVariants = [
    "animation-delay-[0ms]",
    "animation-delay-[150ms]",
    "animation-delay-[300ms]",
    "animation-delay-[450ms]",
    "animation-delay-[600ms]",
  ];

  return (
    <div
      className={cn("flex items-end gap-1", barsHeight[size], className)}
      role="status"
      aria-label="Carregando"
    >
      {barVariants.map((delay, i) => (
        <span
          key={i}
          className={cn(
            "from-arcane-500 to-arcane-300 w-1.5 rounded-t-sm bg-gradient-to-t",
            "animate-[crystal-wave_1.2s_ease-in-out_infinite]",
            delay,
          )}
          style={{ height: "33%" }}
        />
      ))}
    </div>
  );
}

function ArcaneOrb({
  size = "md",
  className,
}: {
  size?: LoadingSize;
  className?: string;
}) {
  const s = orbSize[size];
  return (
    <div
      className={cn("relative", s.outer, className)}
      role="status"
      aria-label="Carregando"
    >
      <span className="border-arcane-500 border-r-arcane-100 absolute inset-0 animate-spin rounded-full border [animation-duration:1s]" />
      <span
        className={cn(
          "border-arcane-300 border-b-arcane-100 absolute animate-spin rounded-full border [animation-direction:reverse] [animation-duration:1.4s]",
          s.ring2,
        )}
      />
      <span
        className={cn(
          "border-arcane-600 absolute animate-spin rounded-full border border-r-transparent [animation-duration:1.8s]",
          s.ring3,
        )}
      />
      <span
        className={cn(
          "bg-arcane-500/20 absolute animate-pulse rounded-full",
          s.center,
        )}
      />
    </div>
  );
}

// ── Skeleton primitives ──────────────────────────────────────────────────────

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="flex w-full items-start gap-3">
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-[55%]" />
        <Skeleton className="h-3 w-[35%]" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[70%]" />
      </div>
    </div>
  );
}

function SkeletonListItem() {
  return (
    <div className="flex w-full items-center gap-3">
      <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-[60%]" />
        <Skeleton className="h-3 w-[40%]" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

function SkeletonText() {
  return (
    <div className="w-full space-y-2">
      <Skeleton className="h-4 w-[80%]" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-[65%]" />
    </div>
  );
}

export function SkeletonBlock({
  className,
  layout = "card",
  children,
}: SkeletonProps) {
  return (
    <div
      className={cn("w-full", className)}
      role="status"
      aria-label="Carregando conteúdo"
    >
      <span className="sr-only">Carregando...</span>
      {layout === "card" && <SkeletonCard />}
      {layout === "list-item" && <SkeletonListItem />}
      {layout === "text" && <SkeletonText />}
      {layout === "none" && children}
    </div>
  );
}

// ── Loading fullscreen / overlay ─────────────────────────────────────────────

interface LoadingOverlayProps {
  label?: string;
  className?: string;
}

export function LoadingOverlay({
  label = "Conjurando...",
  className,
}: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center gap-4",
        "bg-background/80 backdrop-blur-sm",
        className,
      )}
      role="status"
      aria-label={label}
    >
      <ArcaneOrb size="lg" />
      <p className="text-muted-foreground animate-pulse font-serif text-sm italic">
        {label}
      </p>
    </div>
  );
}

// ── Loading section (preenche área do pai) ───────────────────────────────────

interface LoadingSectionProps {
  label?: string;
  className?: string;
  variant?: Exclude<LoadingVariant, "skeleton">;
  size?: LoadingSize;
}

export function LoadingSection({
  label,
  className,
  variant = "orb",
  size = "md",
}: LoadingSectionProps) {
  return (
    <div
      className={cn(
        "flex min-h-[120px] w-full flex-col items-center justify-center gap-3",
        className,
      )}
      role="status"
    >
      {variant === "spinner" && <RuneSpinner size={size} />}
      {variant === "bars" && <CrystalBars size={size} />}
      {variant === "orb" && <ArcaneOrb size={size} />}
      {label && (
        <p className="text-muted-foreground animate-pulse font-serif text-xs italic">
          {label}
        </p>
      )}
    </div>
  );
}

// ── Main export — composable ─────────────────────────────────────────────────

/**
 * Componente genérico de loading do Arcane Desk.
 *
 * @example
 * // Inline spinner pequeno
 * <Loading variant="spinner" size="sm" />
 *
 * @example
 * // Seção de página com label
 * <Loading variant="orb" label="Carregando campanha..." />
 *
 * @example
 * // Skeleton de card
 * <Loading variant="skeleton" />
 */
export function Loading({
  variant = "orb",
  size = "md",
  label,
  className,
}: LoadingProps) {
  if (variant === "skeleton") {
    return <SkeletonBlock layout="card" className={className} />;
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className,
      )}
      role="status"
    >
      {variant === "spinner" && <RuneSpinner size={size} />}
      {variant === "bars" && <CrystalBars size={size} />}
      {variant === "orb" && <ArcaneOrb size={size} />}
      {label && (
        <p className="text-muted-foreground animate-pulse font-serif text-xs italic">
          {label}
        </p>
      )}
    </div>
  );
}

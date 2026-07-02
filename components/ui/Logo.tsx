type Variant = "color" | "white" | "mono";

const SRC: Record<Variant, string> = {
  color: "/logo/logo.svg",
  white: "/logo/logo-white.svg",
  mono: "/logo/logo-mono.svg",
};

const RATIO = 2340 / 1922; // intrinsic logo aspect ratio (crisp vector)

/* The Ventura Builders lockup. `height` drives size; width derives from ratio. */
export function Logo({
  variant = "color",
  height = 56,
  className,
}: {
  variant?: Variant;
  height?: number;
  className?: string;
}) {
  return (
    <img
      src={SRC[variant]}
      alt="Ventura Builders & Developers"
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

type Variant = "color" | "white" | "mono";

const SRC: Record<Variant, string> = {
  color: "/logo/logo-color.png",
  white: "/logo/logo-white.png",
  mono: "/logo/logo-mono.png",
};

/* The Ventura Builders lockup. `height` drives size; width derives from intrinsic ratio. */
export function Logo({
  variant = "color",
  height = 52, // Slightly larger than the original 46 for a more attractive presence
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
      height={height}
      className={className}
      style={{ height, width: "auto", objectFit: "contain" }}
    />
  );
}


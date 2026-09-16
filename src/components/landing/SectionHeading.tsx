interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-start"}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-3 max-w-2xl text-base text-cream/70 sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

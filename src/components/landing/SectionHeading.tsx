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
    <div
      className={
        align === "center"
          ? "flex flex-col items-center gap-6 text-center"
          : "flex flex-col gap-4 text-start"
      }
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="text-display text-balance">{title}</h2>
      {subtitle ? (
        <p
          className={`max-w-2xl text-xl text-muted-foreground ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

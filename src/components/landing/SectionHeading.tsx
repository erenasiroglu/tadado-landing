interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-start"}>
      <h2 className="text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
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

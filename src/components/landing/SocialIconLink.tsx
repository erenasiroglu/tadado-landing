import { buttonVariants } from "@/components/ui/button";
import {
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
} from "@/components/icons/SocialBrandIcons";
import { cn } from "@/lib/utils";

interface SocialIconLinkProps {
  href: string;
  label: string;
  network: "instagram" | "tiktok" | "linkedin" | "productHunt";
  showLabel?: boolean;
  className?: string;
}

const ICONS = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  linkedin: LinkedInIcon,
} as const;

export function SocialIconLink({
  href,
  label,
  network,
  showLabel = false,
  className,
}: SocialIconLinkProps) {
  const Icon = network === "productHunt" ? null : ICONS[network];
  const textOnly = network === "productHunt";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: showLabel || textOnly ? "sm" : "icon",
        }),
        "text-cream/70 hover:text-amber",
        className,
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {showLabel || textOnly ? <span>{label}</span> : null}
    </a>
  );
}

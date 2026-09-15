export type TeamMemberId = "eren" | "nur";

export type MascotVariant = "eren" | "nur" | "base";

export interface TeamMemberMeta {
  id: TeamMemberId;
  mascotVariant: MascotVariant;
  websiteUrl: string;
  tiltDeg: number;
}

export const TEAM_MEMBERS: TeamMemberMeta[] = [
  {
    id: "eren",
    mascotVariant: "eren",
    websiteUrl: "https://erenasiroglu.de/",
    tiltDeg: -1.5,
  },
  {
    id: "nur",
    mascotVariant: "nur",
    websiteUrl: "https://www.nurgunen.com/",
    tiltDeg: 1.5,
  },
];

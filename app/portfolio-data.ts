export interface LinkItem {
  name: string;
  url: string;
  label: string;
}

export interface AppItem {
  name: string;
  icon: string; // Path to image file (e.g., "/icons/app1.png" or "/icons/app1.svg")
  url: string;
}

export interface PortfolioVersion {
  info: {
    name: string;
    bio: string;
    avatar: string; // Path to profile image, emoji, or SVG
  };
  links: LinkItem[];
  apps: AppItem[];
}

export const portfolioVersions: Record<string, PortfolioVersion> = {
  v1: {
    info: {
      name: "Pratik Grv",
      bio: "yo !",
      avatar: "/icons/profile.jpg", // Can be a string, emoji, or path to an image like "/avatar.png"
    },
    links: [
      { name: "X", url: "https://x.com/pratikgrv", label: "X" },
      { name: "Mail", url: "mailto:pratik@example.com", label: "Mail" },
      { name: "GitHub", url: "https://github.com/pratikgrv", label: "GitHub" },
    ],
    apps: [
      { name: "Upmint ai", icon: "/icons/logo.jpg", url: "#" },
    ],
  },
};

// Toggle this to change the active version on the site
export const activeVersion: keyof typeof portfolioVersions = "v1";

export const data = portfolioVersions[activeVersion];

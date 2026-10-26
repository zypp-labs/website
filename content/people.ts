/**
 * Team and advisors.
 * Anything in [square brackets] is a placeholder to be confirmed.
 * Add a portrait with its public path and intrinsic dimensions.
 * Until then the card shows initials.
 */

export type Person = {
  name: string;
  role: string;
  /** One factual line. Keep it to what the person works on. */
  bio: string;
  photo?: { src: string; width: number; height: number };
  links: { label: string; href: string }[];
};

export const team: Person[] = [
  {
    name: "Joshua Idele",
    role: "Founder and CEO",
    bio: "[One line on background and what he works on.]",
    photo: { src: "/team/joshua.png", width: 526, height: 526 },
    links: [
      { label: "X", href: "https://x.com/josh_scriptz" },
      // The username below was supplied as "Codig-With-Josh". The Zypp repo lives under "Coding-With-Josh", so I used that spelling. Please confirm.
      { label: "GitHub", href: "https://github.com/Coding-With-Josh" },
    ],
  },
  {
    name: "Abdulwaheed Abdulramon",
    role: "COO",
    bio: "Leads operations, partnerships and ecosystem development.",
    photo: { src: "/team/rahmm.png", width: 400, height: 400 },
    links: [
      { label: "X", href: "https://x.com/0x_rahmm" },
      { label: "Website", href: "https://rahmm.vercel.app/" },
    ],
  },
  {
    name: "Udoka AM",
    role: "[Role, to confirm]",
    bio: "[One line on background and what he works on.]",
    photo: { src: "/team/udoka.png", width: 958, height: 964 },
    links: [
      { label: "Website", href: "https://udokaam.dev/" },
      { label: "X", href: "https://x.com/Udoka_AM" },
      { label: "GitHub", href: "https://github.com/Udoka-AM" },
    ],
  },
];

/** Hidden on the page while empty. */
export const advisors: { name: string; affiliation: string }[] = [];
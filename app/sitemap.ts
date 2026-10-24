import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { execSync } from "child_process";

function getLastMod() {
  try {
    const result = execSync("git log -1 --format=%cI", { encoding: "utf8" });
    return new Date(result.trim());
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = getLastMod();
  
  return [
    {
      url: SITE_URL,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

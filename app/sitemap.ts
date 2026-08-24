import type { MetadataRoute } from "next";
import { getPublicPaths } from "@/lib/public-routes";
import { getSiteUrl } from "@/lib/site";

function pathPriority(path: string): number {
  if (path === "/") return 1;
  if (path.includes("/temporary-") || path.includes("/learner-driver-insurance")) {
    return 0.8;
  }
  if (path === "/help-center" || path === "/faqs" || path === "/contact-us") {
    return 0.6;
  }
  return 0.4;
}

function pathChangeFrequency(
  path: string
): NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> {
  if (path === "/") return "weekly";
  if (path.includes("/temporary-") || path.includes("/learner-driver-insurance")) {
    return "weekly";
  }
  if (path === "/help-center" || path === "/faqs" || path === "/contact-us") {
    return "monthly";
  }
  return "yearly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return getPublicPaths().map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: pathChangeFrequency(path),
    priority: pathPriority(path),
  }));
}

import { additionalPagesData } from "@/data/additionalPages";
import { insurancePagesData } from "@/data/insurancePages";

const durations = ["hourly", "daily", "weekly", "monthly"] as const;
type Duration = (typeof durations)[number];
type ProductLine = "car" | "van" | "learner";

function isDuration(slug: string): slug is Duration {
  return (durations as readonly string[]).includes(slug);
}

export type ResolvedInsurancePage = {
  title: string;
  description: string;
  image?: string;
  faqs?: Array<{ question: string; answer: string }>;
};

export function resolveInsurancePage(
  line: ProductLine,
  slug: string
): ResolvedInsurancePage | null {
  if (isDuration(slug)) {
    const data = insurancePagesData[line][slug];
    if (!data) return null;
    return {
      title: data.title,
      description: data.description || data.subtitle,
      image: data.heroImagePath || data.imagePath,
      faqs: data.faqs,
    };
  }

  const data = additionalPagesData[slug as keyof typeof additionalPagesData];
  if (!data) return null;
  return {
    title: data.title,
    description: data.description || data.subtitle,
    image: data.heroImagePath || data.imagePath,
    faqs: data.faqs,
  };
}

export function insurancePath(line: ProductLine, slug: string): string {
  if (line === "car") return `/temporary-car-insurance/${slug}`;
  if (line === "van") return `/temporary-van-insurance/${slug}`;
  return `/learner-driver-insurance/${slug}`;
}

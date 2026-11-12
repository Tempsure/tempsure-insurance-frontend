import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description:
    "How TempSure Insurance uses cookies and similar technologies on tempsureinsurance.co.uk.",
  path: "/cookie-policy",
});

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

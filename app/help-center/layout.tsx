import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Help Centre",
  description:
    "TempSure help centre for getting started, policies, certificates, claims, billing and account support for temporary motor insurance.",
  path: "/help-center",
});

export default function HelpCenterLayout({ children }: { children: React.ReactNode }) {
  return children;
}

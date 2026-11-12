import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Complaints",
  description:
    "How to make a complaint to TempSure Insurance, what happens next, and how to escalate if you are not satisfied.",
  path: "/complaints",
});

export default function ComplaintsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

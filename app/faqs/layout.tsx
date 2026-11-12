import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Temporary Insurance FAQs",
  description:
    "Answers about TempSure temporary car, van and learner insurance — quotes, certificates, claims, cancellations, eligibility and payments.",
  path: "/faqs",
  keywords: ["temporary insurance FAQ", "TempSure help", "short term car insurance questions"],
});

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

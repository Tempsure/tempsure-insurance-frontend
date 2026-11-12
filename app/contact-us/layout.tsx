import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact TempSure Insurance",
  description:
    "Contact TempSure Insurance by phone, email or form. Call 08008629255 or email info@tempsureinsurance.co.uk — London office at 5 Brayford Square.",
  path: "/contact-us",
});

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

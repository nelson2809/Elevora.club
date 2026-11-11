import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Chrome } from "@/components/site/Chrome";
import { CurtainFooter } from "@/components/site/CurtainFooter";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elevora.club"),
  title: { default: "Elevora Seoul Spa · Korean bathhouse for women, Chennai", template: "%s · Elevora Seoul Spa" },
  description: site.message,
  keywords: ["Korean spa Chennai", "head spa Chennai", "women only spa Chennai", "jjimjilbang", "Korean body scrub", "K-beauty facial"],
  openGraph: { title: "Elevora Seoul Spa", description: site.message, locale: "en_IN", type: "website", url: "https://www.elevora.club", siteName: "Elevora Seoul Spa" },
};

export const viewport: Viewport = { themeColor: "#f8f5ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <SmoothScroll />
        <Chrome />
        <div className="relative z-0 bg-white">{children}</div>
        <CurtainFooter />
      </body>
    </html>
  );
}

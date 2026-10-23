import type { Metadata } from "next";
import { ibmPlexMono, spaceGrotesk } from "@/styles/fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.scss";

export const metadata: Metadata = {
  title: "NetLave — A forest, before the first tree",
  description:
    "Explore a simulation-driven digital twin of treated-wastewater forestry in Egypt. Reclaimed water, renewable power and explainable irrigation control, built on synthetic site assumptions.",
  openGraph: {
    title: "NetLave — A forest, before the first tree",
    description:
      "Reclaimed water. Renewable power. A forest, simulated. Explore the NetLave digital twin prototype.",
    type: "website",
    locale: "en_US",
    siteName: "NetLave",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

import { StructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/seo";
import { ibmPlexMono, spaceGrotesk } from "@/styles/fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.scss";

export const metadata = pageMetadata(
  "NetLave — Treated-wastewater forestry digital twin",
  "/",
);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <StructuredData />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

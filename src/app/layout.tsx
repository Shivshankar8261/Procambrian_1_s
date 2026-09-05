import type { Metadata } from "next";
import { Familjen_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";

const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://procambrian.ai"),
  title: {
    default: "Procambrian — Rooted in nature, delivered through AI",
    template: "%s — Procambrian",
  },
  description:
    "Procambrian grows routing structure from biological first principles, then differentiates it into intelligence. Structural methods, stated plainly, with limits admitted.",
  openGraph: {
    title: "Procambrian",
    description: "Rooted in nature, delivered through AI.",
    url: "https://procambrian.ai",
    siteName: "Procambrian",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${familjen.variable} ${newsreader.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-strata-ink text-bone antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

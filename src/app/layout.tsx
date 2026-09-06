import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Century Gothic is used wherever the visitor has it — it ships with MS
// Office, so most Windows machines do, but almost no Mac or phone will.
// Poppins is the web stand-in: the same geometric construction, round
// bowls, tall x-height and single-storey 'a' and 'g', with the full
// weight range the type scale needs. Licensing Century Gothic itself as
// a webfont is the only way to guarantee the real face for everyone.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const DESCRIPTION =
  "Procambrian uses AI and data to solve complex sustainability, ESG, climate and environmental intelligence problems for organisations — and states which numbers are measured, modelled or estimated.";

export const metadata: Metadata = {
  metadataBase: new URL("https://procambrian.ai"),
  title: {
    default: "Procambrian — AI and data for sustainability, ESG and climate",
    template: "%s — Procambrian",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "sustainability AI",
    "ESG data",
    "climate intelligence",
    "environmental intelligence",
    "carbon accounting",
    "GHG Protocol",
    "CSRD",
    "ESRS",
    "TCFD",
    "physical climate risk",
    "scope 3 emissions",
  ],
  authors: [{ name: "Procambrian" }],
  openGraph: {
    title: "Procambrian — AI and data for sustainability, ESG and climate",
    description: DESCRIPTION,
    url: "https://procambrian.ai",
    siteName: "Procambrian",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Procambrian — AI and data for sustainability, ESG and climate",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured data so search and AI crawlers get the positioning
// verbatim rather than inferring it from the hero copy.
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Procambrian",
  url: "https://procambrian.ai",
  logo: "https://procambrian.ai/logo.png",
  email: "hello@procambrian.ai",
  description: DESCRIPTION,
  knowsAbout: [
    "Sustainability",
    "ESG reporting",
    "Climate intelligence",
    "Environmental intelligence",
    "Greenhouse gas accounting",
    "Physical climate risk",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${poppins.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationJsonLd),
          }}
        />
      </body>
    </html>
  );
}

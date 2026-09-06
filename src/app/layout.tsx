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
  "Procambrian turns complex environmental risks into audit-ready decisions, actionable strategies and verifiable sustainability disclosures — nature and climate intelligence built for industry.";

export const metadata: Metadata = {
  metadataBase: new URL("https://procambrian.ai"),
  title: {
    default: "Procambrian — Nature and climate intelligence, built for industry",
    template: "%s — Procambrian",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "nature intelligence",
    "climate intelligence",
    "ESG disclosure",
    "BRSR",
    "CSRD",
    "ESRS",
    "TNFD",
    "TCFD",
    "biodiversity reporting",
    "natural capital",
    "agroecology",
    "supply chain resilience",
    "carbon accounting",
    "GHG Protocol",
    "scope 3 emissions",
    "physical climate risk",
    "RAG regulatory intelligence",
  ],
  authors: [{ name: "Procambrian" }],
  openGraph: {
    title: "Procambrian — Nature and climate intelligence, built for industry",
    description: DESCRIPTION,
    url: "https://procambrian.ai",
    siteName: "Procambrian",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Procambrian — Nature and climate intelligence, built for industry",
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
    "Climate resilience intelligence",
    "Agroecology and supply chain intelligence",
    "Biodiversity and natural capital",
    "Regulatory and policy intelligence",
    "ESG disclosure",
    "Greenhouse gas accounting",
    "Physical and transition climate risk",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Climate Resilience Intelligence",
        description:
          "Risk assessments, physical and transition scenario modelling, and adaptation strategy for enterprises and financial portfolios, aligned with TCFD, TNFD and BRSR.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Agroecology & Supply Chain Intelligence",
        description:
          "Nature-positive supply chain analytics, food system vulnerability assessments and smallholder resilience toolkits.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Biodiversity & Nature Capital Intelligence",
        description:
          "TNFD-aligned biodiversity reporting, ecosystem dependency mapping and natural capital valuation frameworks.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "SoftwareApplication",
        name: "IRIS — Integrated Regulatory & Policy Intelligence",
        applicationCategory: "BusinessApplication",
        description:
          "A privacy-first, RAG-powered engine trained on global sustainability frameworks, regional climate policies and internal corporate documents, giving source-cited answers and exact metric retrieval without hallucination.",
      },
    },
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

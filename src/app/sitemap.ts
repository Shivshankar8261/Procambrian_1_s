import type { MetadataRoute } from "next";

const SITE = "https://procambrian.ai";

/**
 * Next serves this at /sitemap.xml.
 *
 * The site is a single document with in-page anchors, so the homepage is
 * the only entry: a sitemap is a list of URLs a crawler should fetch, and
 * every #anchor resolves to this same page. Listing fragments would ask
 * Google to index one page several times over. When the sections become
 * real routes (/products, /about, /team), add them here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

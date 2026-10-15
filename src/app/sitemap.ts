import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://wcl-mortgage-workflow.netlify.app";
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}

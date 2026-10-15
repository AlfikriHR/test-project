import type { Metadata, Viewport } from "next";
import { Manrope, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1528",
  width: "device-width",
  initialScale: 1,
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://wcl-mortgage-workflow.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Workload & Labor-Cost Savings Assessment | White Code Labs",
    template: "%s | White Code Labs",
  },
  description:
    "Estimate the time and labor-cost value your team could recover by improving client onboarding, document collection, and reminder follow-ups.",
  keywords: [
    "workload assessment",
    "labor-cost savings",
    "workflow automation",
    "client onboarding",
    "document collection",
    "White Code Labs",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "White Code Labs",
    title: "Workload & Labor-Cost Savings Assessment | White Code Labs",
    description:
      "Estimate the time and labor-cost value your team could recover by improving client onboarding, document collection, and reminder follow-ups.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workload & Labor-Cost Savings Assessment | White Code Labs",
    description:
      "Estimate the time and labor-cost value your team could recover by improving client onboarding, document collection, and reminder follow-ups.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper font-sans text-ink selection:bg-brand/10 selection:text-brand">
        {children}
      </body>
    </html>
  );
}


import { Header } from "../components/Header";
import { Assumptions } from "../components/Assumptions";
import { Calculator } from "../components/Calculator";

export default function Home() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://wcl-mortgage-workflow.netlify.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Workload & Labor-Cost Savings Assessment",
    description:
      "Estimate the time and labor-cost value your team could recover by improving client onboarding, document collection, and reminder follow-ups.",
    url: siteUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "White Code Labs",
    },
    publisher: {
      "@type": "Organization",
      name: "White Code Labs",
    },
  };

  // Safely serialize JSON by escaping '<'
  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-slate-900 overflow-x-clip max-w-full relative">
      {/* Gentle ambient top gradient */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] opacity-60 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/70 via-indigo-50/40 to-transparent -z-10"
        aria-hidden="true"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      {/* Main Container - centered max-w-[1232px] */}
      <main className="flex-1 mx-auto w-full max-w-[1232px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10 relative">
        <Header />
        <Calculator assumptions={<Assumptions />} />
      </main>

      {/* Minimal muted single-line footer */}
      <footer className="py-6 border-t border-slate-200/80 bg-white/70 backdrop-blur-xs mt-12 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-[1232px] px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 White Code Labs. All rights reserved.</p>
          <p className="text-slate-400">
            Calculations are computed locally in-browser. Illustrative estimate only.
          </p>
        </div>
      </footer>
    </div>
  );
}


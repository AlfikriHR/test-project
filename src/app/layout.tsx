import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workload & Labor-Cost Savings Calculator",
  description:
    "Interactive operational ROI calculator for estimating manual workload hours and labor-cost savings from workflow automation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-50 antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}

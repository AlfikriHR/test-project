import { Calculator } from "../components/Calculator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-clip max-w-full">

      {/* Main Container */}
      <Calculator />

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200/80 bg-white mt-8 text-center text-[11px] text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Built for operational leaders and professional service practices.
          </p>
          <p className="text-slate-500">
            All calculations computed locally in-browser. Zero analytics tracking without explicit consent.
          </p>
        </div>
      </footer>
    </div>
  );
}

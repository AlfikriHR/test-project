import React from "react";

export function Header() {
  return (
    <header className="space-y-4 pt-4 sm:pt-6">
      <div>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C74BC]/5 border border-[#0C74BC]/15 text-[#0C74BC] shadow-xs select-none">
          {/* Authentic Square White Code Labs Vector Logo Mark */}
          <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 38 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0H1.41447H3.02072H37.3544V3.06554V34.2469H35.9399H33.9999H0V31.1993V0ZM3.02072 31.1993H33.9999V3.06554H3.02072V31.1993Z"
              fill="#0C74BC"
            />
            <path
              d="M16.227 9.86394L16.2252 9.86229C15.6885 9.38402 14.8279 9.39265 14.3028 9.88155L7.62872 16.0968C7.10373 16.5857 7.11319 17.3698 7.64987 17.848L7.65173 17.8498C8.18839 18.328 9.04905 18.3193 9.57405 17.8304L16.2482 11.6152C16.7732 11.1263 16.7637 10.3422 16.227 9.86394Z"
              fill="#0C74BC"
            />
            <path
              d="M16.2362 24.151L16.238 24.1493C16.7631 23.6604 16.7535 22.8764 16.2169 22.3981L9.39436 16.318C8.85769 15.8398 7.99704 15.8484 7.47204 16.3374L7.47022 16.3389C6.94523 16.8279 6.95468 17.6119 7.49136 18.0902L14.3139 24.1704C14.8506 24.6486 15.7113 24.6399 16.2362 24.151Z"
              fill="#0C74BC"
            />
            <path
              d="M28.7774 17.852L28.7792 17.8504C29.3159 17.372 29.3254 16.588 28.8003 16.0991L22.1263 9.88381C21.6012 9.3949 20.7405 9.38628 20.2039 9.86455L20.2021 9.8662C19.6654 10.3445 19.6559 11.1285 20.1809 11.6174L26.8551 17.8328C27.38 18.3216 28.2407 18.3302 28.7774 17.852Z"
              fill="#0C74BC"
            />
            <path
              d="M28.9623 16.3419L28.9604 16.3402C28.4354 15.8512 27.5747 15.8426 27.038 16.3208L20.2155 22.401C19.6789 22.8792 19.6694 23.6633 20.1944 24.1521L20.1963 24.1538C20.7212 24.6428 21.5818 24.6514 22.1185 24.1732L28.9411 18.093C29.4778 17.6119 29.4872 16.8307 28.9623 16.3419Z"
              fill="#0C74BC"
            />
          </svg>
          <span className="text-xs font-semibold tracking-wide uppercase">White Code Labs</span>
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold font-display text-slate-900 tracking-tight leading-[1.15]">
        Workload &amp; Labor-Cost<br />
        Savings Assessment
      </h1>
      <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
        Estimate the time and labor-cost value your team could recover by
        improving client onboarding, document collection, and reminder
        follow-ups. It takes only a few minutes.
      </p>
      <p className="text-sm sm:text-base font-semibold text-slate-800">
        The figures below are samples. Enter your own numbers to see an estimate
        for your operation.
      </p>
      <div className="pt-1">
        <div className="inline-flex flex-wrap items-center gap-3 bg-white/80 backdrop-blur-xs border border-slate-200/80 px-3.5 py-2 rounded-xl text-xs text-slate-600 shadow-2xs select-none">
          <span className="inline-flex items-center gap-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0C74BC] text-white text-[11px] font-bold">
              1
            </span>
            <span>Enter your figures</span>
          </span>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0C74BC]/10 text-[#0C74BC] text-[11px] font-bold">
              2
            </span>
            <span>Adjust automation</span>
          </span>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0C74BC]/10 text-[#0C74BC] text-[11px] font-bold">
              3
            </span>
            <span>Review estimate</span>
          </span>
        </div>
      </div>
    </header>
  );
}

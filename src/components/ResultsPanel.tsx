import React from "react";
import {
  CalculationResult,
  formatCurrency,
  formatHours,
} from "../lib/calculate";
import { Card } from "./ui/card";
import { cn } from "../lib/utils";

export interface ResultsPanelProps {
  results: CalculationResult;
  automationPercentage?: number;
  onReset?: () => void;
  isDirty?: boolean;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  results,
  automationPercentage,
  onReset,
  isDirty = false,
}) => {
  const {
    potentialLaborCostValue,
    hoursRecoveredYear,
    weeklyHoursRecovered,
    totalWorkloadHoursYear,
    breakdown,
  } = results;

  const maxBaseline = Math.max(...breakdown.map((b) => b.baselineHours), 1);

  return (
    <Card className="rounded-2xl border border-slate-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-5 sm:p-6 space-y-6 sm:space-y-7 lg:sticky lg:top-8">
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            POTENTIAL ANNUAL LABOR-COST VALUE
          </h2>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              disabled={!isDirty}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-[#0C74BC]/25 shrink-0 select-none",
                isDirty
                  ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 cursor-pointer shadow-2xs"
                  : "border-slate-200/60 bg-slate-50/50 text-slate-400 cursor-not-allowed opacity-60",
              )}
              title={
                isDirty
                  ? "Reset all inputs to default values"
                  : "Inputs match default values"
              }
            >
              <svg
                className="h-3.5 w-3.5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Reset to defaults
            </button>
          )}
        </div>

        <div className="mt-4 mb-3 text-4xl sm:text-[44px] lg:text-5xl font-extrabold font-display text-emerald-600 tabular-nums tracking-tight leading-none">
          {formatCurrency(potentialLaborCostValue)}
        </div>

        <p className="text-xs text-slate-500 leading-relaxed pt-1">
          Potential labor-cost value &amp; capacity recovered • Based on{" "}
          {automationPercentage ?? 60}% automation efficiency and chosen hourly
          rate
        </p>
      </div>

      <div className="border-b border-slate-100 my-1" />

      {/* Middle Section (Secondary Stats) */}
      <div className="space-y-4 py-1">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              ANNUAL RECOVERED
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tabular-nums leading-tight">
              {formatHours(hoursRecoveredYear)}{" "}
              <span className="text-sm font-medium text-slate-500">h/yr</span>
            </div>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              WEEKLY RECOVERED
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tabular-nums leading-tight">
              {formatHours(weeklyHoursRecovered, 1)}{" "}
              <span className="text-sm font-medium text-slate-500">h/wk</span>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            BASELINE WORKLOAD
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tabular-nums leading-tight">
            {formatHours(totalWorkloadHoursYear)}{" "}
            <span className="text-sm font-medium text-slate-500">h/yr</span>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-100 my-1" />

      {/* Bottom Section (Workload Category Breakdown) */}
      <div className="space-y-4 pt-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            WORKLOAD CATEGORY BREAKDOWN
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              Baseline
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#0C74BC]" />
              Recovered
            </span>
          </div>
        </div>

        <div className="space-y-3.5">
          {breakdown.map((item) => {
            const baselinePct =
              maxBaseline > 0
                ? Math.min(
                    100,
                    Math.max(0, (item.baselineHours / maxBaseline) * 100),
                  )
                : 0;
            const recoveredRatio =
              item.baselineHours > 0
                ? Math.min(
                    100,
                    Math.max(
                      0,
                      (item.recoveredHours / item.baselineHours) * 100,
                    ),
                  )
                : 0;

            return (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {item.label}
                  </span>
                  <span className="tabular-nums">
                    <span className="font-bold text-sm sm:text-base text-[#0C74BC]">
                      {formatHours(item.recoveredHours)} h
                    </span>{" "}
                    <span className="text-slate-400">/</span>{" "}
                    <span className="text-slate-500 text-xs sm:text-sm font-medium">
                      {formatHours(item.baselineHours)} h/yr
                    </span>
                  </span>
                </div>

                <div
                  className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 mt-1.5"
                  aria-hidden="true"
                >
                  <div
                    className="h-full rounded-full bg-slate-200 transition-all duration-300 overflow-hidden"
                    style={{ width: `${baselinePct}%` }}
                  >
                    <div
                      className="h-full rounded-full bg-[#0C74BC] transition-all duration-300"
                      style={{ width: `${recoveredRatio}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Estimate updated. Potential annual labor-cost value ${formatCurrency(potentialLaborCostValue)}. Annual recovered ${formatHours(hoursRecoveredYear)} hours. Weekly recovered ${formatHours(weeklyHoursRecovered, 1)} hours. Baseline workload ${formatHours(totalWorkloadHoursYear)} hours.`}
      </div>
    </Card>
  );
};

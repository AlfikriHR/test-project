import React from "react";
import {
  CalculationResult,
  formatCurrency,
  formatHours,
} from "../lib/calculate";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface ResultsPanelProps {
  results: CalculationResult;
  onOpenConsultation?: () => void;
  onReset: () => void;
  isDirty?: boolean;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  results,
  onOpenConsultation,
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

  const maxBaselineHours = Math.max(
    ...breakdown.map((item) => item.baselineHours),
    1,
  );

  return (
    <Card className="p-4 sm:p-5 lg:p-6 space-y-3.5 sm:space-y-4 bg-white border border-slate-200 rounded-md shadow-xs lg:sticky lg:top-8">
      {/* Top Section: Potential Annual Labor-Cost Value & Reset Button */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="border-b border-slate-100 pb-3.5 sm:pb-4 space-y-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-3">
          <div className="min-w-0">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Potential Annual Labor-Cost Value
            </h2>
            <div className="my-0.5 sm:my-1 text-2xl sm:text-3xl font-bold tracking-tight text-emerald-600 tabular-nums leading-tight">
              {formatCurrency(potentialLaborCostValue)}
            </div>
          </div>

          {/* Reset Button (Top Right Pill with exact test classes and cursor-pointer) */}
          <button
            type="button"
            onClick={onReset}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium shadow-xs transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 cursor-pointer shrink-0 self-start sm:self-auto",
              isDirty
                ? "border-blue-300 bg-white text-blue-700 hover:bg-blue-50"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
            )}
            title={
              isDirty
                ? "Reset modified inputs back to default benchmarks"
                : "Reset all inputs back to benchmark default values"
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
        </div>

        <p className="text-xs text-slate-500 leading-relaxed pt-0.5 sm:pt-1">
          Potential labor-cost value &amp; capacity recovered • Based on chosen
          hourly rate and automation efficiency
        </p>
      </div>

      {/* Secondary Stat Items: 2-Row Split (2 / 1) */}
      <div className="grid grid-cols-2 gap-4 sm:gap-x-5 sm:gap-y-4 pt-1 pb-1 min-w-0">
        {/* Row 1, Col 1: Annual Recovered */}
        <div className="space-y-0.5 sm:space-y-1 min-w-0">
          <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
            Annual Recovered
          </span>
          <div className="text-base sm:text-lg font-bold text-slate-900 tabular-nums leading-snug">
            {formatHours(hoursRecoveredYear)}{" "}
            <span className="text-xs font-normal text-slate-500">h/yr</span>
          </div>
        </div>

        {/* Row 1, Col 2: Weekly Recovered */}
        <div className="space-y-0.5 sm:space-y-1 min-w-0">
          <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
            Weekly Recovered
          </span>
          <div className="text-base sm:text-lg font-bold text-slate-900 tabular-nums leading-snug">
            {formatHours(weeklyHoursRecovered, 1)}{" "}
            <span className="text-xs font-normal text-slate-500">h/wk</span>
          </div>
        </div>

        {/* Row 2, Col 1: Baseline Workload */}
        <div className="space-y-0.5 sm:space-y-1 min-w-0">
          <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
            Baseline Workload
          </span>
          <div className="text-base sm:text-lg font-bold text-slate-900 tabular-nums leading-snug">
            {formatHours(totalWorkloadHoursYear)}{" "}
            <span className="text-xs font-normal text-slate-500">h/yr</span>
          </div>
        </div>
      </div>

      {/* Workload Category Breakdown */}
      <div className="border-t border-slate-100 pt-3 sm:pt-3.5">
        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Workload Category Breakdown
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-md bg-slate-300" />
              Baseline
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-md bg-blue-600" />
              Recovered
            </span>
          </div>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {breakdown.map((item) => {
            const baselinePct = Math.min(
              100,
              Math.round((item.baselineHours / maxBaselineHours) * 100),
            );
            const recoveredRatio =
              item.baselineHours > 0
                ? Math.round((item.recoveredHours / item.baselineHours) * 100)
                : 0;

            return (
              <div key={item.id} className="text-xs">
                <div className="flex items-baseline justify-between gap-2 font-medium text-slate-700 mb-1.5">
                  <span className="min-w-0 pr-1 text-xs text-slate-700 leading-normal">
                    {item.label}
                  </span>
                  <span className="shrink-0 tabular-nums text-xs text-right whitespace-nowrap text-slate-900">
                    <span className="font-semibold text-blue-700">
                      {formatHours(item.recoveredHours)} h
                    </span>
                    {" / "}
                    <span className="text-slate-500">
                      {formatHours(item.baselineHours)} h/yr
                    </span>
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-md bg-slate-100">
                  <div
                    className="relative h-full rounded-md bg-slate-200 transition-all duration-300"
                    style={{ width: `${baselinePct}%` }}
                  >
                    <div
                      role="progressbar"
                      aria-valuenow={Math.round(item.recoveredHours)}
                      aria-valuemin={0}
                      aria-valuemax={Math.round(item.baselineHours)}
                      aria-label={`${item.label}: ${formatHours(item.recoveredHours)} hours recovered out of ${formatHours(item.baselineHours)} total hours`}
                      className="h-full rounded-md bg-blue-600 transition-all duration-300"
                      style={{ width: `${recoveredRatio}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action CTA */}
      {onOpenConsultation && (
        <div className="pt-2">
          <Button
            type="button"
            onClick={onOpenConsultation}
            className="w-full justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-md shadow-xs transition-all duration-200 cursor-pointer flex items-center gap-2 group text-sm h-auto"
          >
            <span>Book Strategy Consultation</span>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Button>
          <p className="text-[11px] text-center text-slate-500 mt-2">
            Claim your tailored automation blueprint
          </p>
        </div>
      )}

      {/* Legal compliance disclaimer */}
      <div className="border-t border-slate-100 pt-3">
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Estimates are illustrative and based on user-provided assumptions.
          Actual results depend on workflow, exception rates, software, and
          implementation. No guarantees implied.
        </p>
      </div>
    </Card>
  );
};

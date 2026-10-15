import React from "react";
import { Card } from "./ui/card";

interface AssumptionItem {
  id: string;
  title: string;
  description: string;
}

const ASSUMPTIONS: readonly AssumptionItem[] = [
  {
    id: "additive-phases",
    title: "Independent lifecycle phases",
    description:
      "Onboarding minutes measure initial client setup only. Recurring document requests and chase reminders are tracked separately to avoid double-counting administrative effort across client lifecycles.",
  },
  {
    id: "blended-labor-cost",
    title: "Blended team cost basis",
    description:
      "The hourly rate represents an average blended staff cost across administrative coordinators, case managers, and compliance specialists involved in manual document collection.",
  },
  {
    id: "capacity-not-payroll",
    title: "Capacity value vs. cash savings",
    description:
      "Recovered hours reflect reclaimed team bandwidth that can be reinvested into client service, new business, or backlog reduction—not immediate payroll reductions or cash savings.",
  },
  {
    id: "operational-variability",
    title: "Results reflect real-world variance",
    description:
      "Actual time recovered depends on client technology adoption, file exception rates, legacy portal integrations, and specific workflow design across your operation.",
  },
  {
    id: "annual-distribution",
    title: "Uniform 52-week operating model",
    description:
      "Calculations assume workflow volume is distributed evenly across a 52-week operating year and do not model seasonal peaks, quarterly tax deadlines, or intake surges.",
  },
  {
    id: "scope-boundaries",
    title: "Administrative scope boundaries",
    description:
      "This model evaluates administrative intake, document gathering, and follow-up reminders. It excludes advisory consultations, substantive underwriting, data entry, and compliance approvals.",
  },
] as const;

export function Assumptions() {
  return (
    <Card
      role="region"
      aria-labelledby="assumptions-heading"
      className="rounded-2xl border border-slate-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 space-y-6"
    >
      <div className="space-y-1.5">
        <h2
          id="assumptions-heading"
          className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight"
        >
          Assumptions and limitations
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Operational boundaries, cost modeling principles, and workload guidelines governing this assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-1">
        {ASSUMPTIONS.map((item) => (
          <div
            key={item.id}
            className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 sm:p-5 space-y-1.5 hover:border-slate-300 transition-colors flex flex-col justify-start"
          >
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#0C74BC] shrink-0"
                aria-hidden="true"
              />
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
        <span
          className="font-semibold text-[#0C74BC] select-none text-[13px] leading-none mt-0.5"
          aria-hidden="true"
        >
          ℹ
        </span>
        <p>
          <strong className="text-slate-700 font-medium">Illustrative modeling notice:</strong>{" "}
          This assessment provides sample projections based on user-supplied inputs for operational planning. It does not constitute legal counsel, compliance certification, or a guarantee of realized financial returns.
        </p>
      </div>
    </Card>
  );
}

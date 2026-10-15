"use client";

import React, { useMemo, useState } from "react";
import {
  calculateSavings,
  DEFAULT_INPUTS,
  FIELD_LIMITS,
  formatCurrency,
  formatHours,
  InputKey,
} from "../lib/calculate";
import { Card } from "./ui/card";
import { InputField, normalizeNumericInput } from "./InputField";
import { AutomationSlider } from "./AutomationSlider";
import { ResultsPanel } from "./ResultsPanel";
import { ConsultationModal } from "./ConsultationModal";

interface CalculatorProps {
  assumptions?: React.ReactNode;
}

export const Calculator: React.FC<CalculatorProps> = ({ assumptions }) => {
  const [inputs, setInputs] = useState<Record<InputKey, string | number>>(
    () => ({
      ...DEFAULT_INPUTS,
    })
  );

  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Synchronous recalculation on every input change
  const results = useMemo(() => {
    return calculateSavings(inputs);
  }, [inputs]);

  const handleInputChange = (key: InputKey, val: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: normalizeNumericInput(val),
    }));
  };

  const handleReset = () => {
    setInputs({ ...DEFAULT_INPUTS });
  };

  const isDirty = useMemo(() => {
    const keys = Object.keys(DEFAULT_INPUTS) as InputKey[];
    return keys.some((k) => String(inputs[k]) !== String(DEFAULT_INPUTS[k]));
  }, [inputs]);

  const automationPercentageNum = Number(inputs.automationPercentage) || 0;

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Section 2: Two-column grid */}
      <section
        aria-label="Workflow Assessment Calculator"
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start"
      >
        {/* Left Column: Your workflow figures Card */}
        <Card className="rounded-2xl border border-slate-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-5 sm:p-6 lg:p-7 space-y-6">
          {/* Header of inputs card */}
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900">
              Your workflow figures
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              Client intake, document collection, and reminder follow-ups.
            </p>
          </div>

          {/* Group 1: Client intake & onboarding */}
          <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0C74BC]" />
              Client intake &amp; onboarding
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <InputField
                id="newClients"
                label="New clients per year"
                value={inputs.newClients}
                onChange={(val) => handleInputChange("newClients", val)}
                unit="clients"
                min={FIELD_LIMITS.newClients.min}
                max={FIELD_LIMITS.newClients.max}
                error={results.validations.newClients.error}
                warning={results.validations.newClients.warning}
                helperText="Annual volume of newly onboarded client accounts."
              />

              <InputField
                id="onboardingMinutes"
                label="Minutes per onboarding"
                value={inputs.onboardingMinutes}
                onChange={(val) => handleInputChange("onboardingMinutes", val)}
                unit="min"
                min={FIELD_LIMITS.onboardingMinutes.min}
                max={FIELD_LIMITS.onboardingMinutes.max}
                error={results.validations.onboardingMinutes.error}
                warning={results.validations.onboardingMinutes.warning}
                helperText="Average staff time spent on intake and account setup."
              />
            </div>
          </div>

          {/* Group 2: Document requests & follow-ups */}
          <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0C74BC]" />
              Document requests &amp; follow-ups
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <InputField
                id="activeClients"
                label="Active clients managed"
                value={inputs.activeClients}
                onChange={(val) => handleInputChange("activeClients", val)}
                unit="clients"
                min={FIELD_LIMITS.activeClients.min}
                max={FIELD_LIMITS.activeClients.max}
                error={results.validations.activeClients.error}
                warning={results.validations.activeClients.warning}
                helperText="Total active client relationships maintained."
              />

              <InputField
                id="docRequestsPerClient"
                label="Document requests per client"
                value={inputs.docRequestsPerClient}
                onChange={(val) =>
                  handleInputChange("docRequestsPerClient", val)
                }
                unit="requests"
                min={FIELD_LIMITS.docRequestsPerClient.min}
                max={FIELD_LIMITS.docRequestsPerClient.max}
                error={results.validations.docRequestsPerClient.error}
                warning={results.validations.docRequestsPerClient.warning}
                helperText="Recurring document requests per client each year."
              />

              <InputField
                id="minutesPerDocRequest"
                label="Minutes per document request"
                value={inputs.minutesPerDocRequest}
                onChange={(val) =>
                  handleInputChange("minutesPerDocRequest", val)
                }
                unit="min"
                min={FIELD_LIMITS.minutesPerDocRequest.min}
                max={FIELD_LIMITS.minutesPerDocRequest.max}
                error={results.validations.minutesPerDocRequest.error}
                warning={results.validations.minutesPerDocRequest.warning}
                helperText="Preparing, checking, and filing each request. Leave out follow-up time; it is counted separately."
              />

              <InputField
                id="followUpsPerRequest"
                label="Follow-ups per request"
                value={inputs.followUpsPerRequest}
                onChange={(val) =>
                  handleInputChange("followUpsPerRequest", val)
                }
                unit="per request"
                min={FIELD_LIMITS.followUpsPerRequest.min}
                max={FIELD_LIMITS.followUpsPerRequest.max}
                error={results.validations.followUpsPerRequest.error}
                warning={results.validations.followUpsPerRequest.warning}
                helperText="Average reminders or chase messages sent per request."
              />

              <div className="sm:col-span-1">
                <InputField
                  id="minutesPerFollowUp"
                  label="Minutes per follow-up"
                  value={inputs.minutesPerFollowUp}
                  onChange={(val) =>
                    handleInputChange("minutesPerFollowUp", val)
                  }
                  unit="min"
                  min={FIELD_LIMITS.minutesPerFollowUp.min}
                  max={FIELD_LIMITS.minutesPerFollowUp.max}
                  error={results.validations.minutesPerFollowUp.error}
                  warning={results.validations.minutesPerFollowUp.warning}
                  helperText="Average staff time spent on one follow-up."
                />
              </div>
            </div>
          </div>

          {/* Group 3: Staff cost */}
          <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0C74BC]" />
              Staff cost
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <InputField
                id="hourlyRate"
                label="Fully loaded staff cost per hour"
                value={inputs.hourlyRate}
                onChange={(val) => handleInputChange("hourlyRate", val)}
                prefix="$"
                unit="/ hr"
                min={FIELD_LIMITS.hourlyRate.min}
                max={FIELD_LIMITS.hourlyRate.max}
                error={results.validations.hourlyRate.error}
                warning={results.validations.hourlyRate.warning}
                helperText="Hourly pay plus employment overhead such as benefits and payroll taxes."
              />
            </div>
          </div>

          {/* Group 4: Automation assumption */}
          <AutomationSlider
            id="automationPercentage"
            label="Illustrative automation assumption"
            value={inputs.automationPercentage}
            onChange={(val) =>
              handleInputChange("automationPercentage", val)
            }
            error={results.validations.automationPercentage.error}
            warning={results.validations.automationPercentage.warning}
            helperText="Share of the manual workload above that automation could potentially recover. This is an assumption, not a benchmark."
          />
        </Card>

        {/* Right Column: Results Panel */}
        <ResultsPanel
          results={results}
          automationPercentage={automationPercentageNum}
          onReset={handleReset}
          isDirty={isDirty}
        />
      </section>

      {/* Section 3: Assumptions & Limitations (injected as Server Component) */}
      {assumptions}

      {/* Section 4: Dark Navy CTA Band */}
      <section
        aria-label="Action consultation banner"
        className="rounded-2xl bg-[#0B1528] p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden shadow-xl border border-slate-800"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(12, 116, 188, 0.28), transparent 45%), radial-gradient(circle at 15% 85%, rgba(6, 182, 212, 0.18), transparent 50%), radial-gradient(circle at 50% 50%, rgba(12, 116, 188, 0.12), transparent 60%)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
          {/* Left: Headline & Copy */}
          <div className="max-w-xl space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight">
              Ready to recover those hours?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Discover where manual tasks are slowing you down. Get a tailored
              workflow assessment from White Code Labs.
            </p>
          </div>

          {/* Right: Glass stats card */}
          <div className="w-full lg:max-w-md rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-5 sm:p-6 space-y-4 shadow-inner">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs text-white/70 font-medium">
                  Hours recovered
                </span>
                <div className="mt-1 text-2xl sm:text-3xl font-bold font-display text-white tabular-nums leading-tight">
                  {formatHours(results.hoursRecoveredYear)}
                </div>
                <span className="block text-xs text-white/60 mt-0.5">
                  Hours / Year
                </span>
              </div>

              <div>
                <span className="block text-xs text-emerald-300 font-semibold uppercase tracking-wide">
                  Labor-cost value
                </span>
                <div className="mt-1 text-2xl sm:text-3xl font-bold font-display text-emerald-400 tabular-nums leading-tight">
                  {formatCurrency(results.potentialLaborCostValue)}
                </div>
                <span className="block text-xs text-white/60 mt-0.5">
                  Per Year
                </span>
              </div>
            </div>

            <p className="text-[11px] text-white/70 leading-tight">
              Potential, illustrative estimate based on your inputs. Not a
              verified result.
            </p>

            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="w-full py-3.5 px-6 rounded-full bg-[#0C74BC] hover:bg-[#0A62A0] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0C74BC]"
            >
              Discuss your results
            </button>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        summaryData={{
          potentialLaborCostValue: results.potentialLaborCostValue,
          hoursRecoveredYear: results.hoursRecoveredYear,
          weeklyHoursRecovered: results.weeklyHoursRecovered,
          automationPercentage: automationPercentageNum,
        }}
      />
    </div>
  );
};


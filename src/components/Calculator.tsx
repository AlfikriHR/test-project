"use client";

import React, { useMemo, useState } from "react";
import {
  calculateSavings,
  DEFAULT_INPUTS,
  FIELD_LIMITS,
  InputKey,
} from "../lib/calculate";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { InputField } from "./InputField";
import { AutomationSlider } from "./AutomationSlider";
import { ResultsPanel } from "./ResultsPanel";
import { ConsultationModal } from "./ConsultationModal";

export const Calculator: React.FC = () => {
  // Controlled form state initialized with default values as strings or numbers
  const [inputs, setInputs] = useState<Record<InputKey, string | number>>(
    () => ({
      ...DEFAULT_INPUTS,
    }),
  );

  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Synchronous recalculation on every input change
  const results = useMemo(() => {
    return calculateSavings(inputs);
  }, [inputs]);

  const handleInputChange = (key: InputKey, val: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleReset = () => {
    setInputs({ ...DEFAULT_INPUTS });
  };

  const isDirty = useMemo(() => {
    const keys = Object.keys(DEFAULT_INPUTS) as InputKey[];
    return keys.some((k) => String(inputs[k]) !== String(DEFAULT_INPUTS[k]));
  }, [inputs]);

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Intro Section */}
        <header className="mb-6 sm:mb-8">
          <div className="rounded-md border border-slate-200 bg-white p-3.5 sm:p-4 lg:p-5 shadow-xs flex items-start gap-3 sm:gap-4">
            <div
              aria-hidden="true"
              className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="flex items-center gap-1.5 text-sm sm:text-base font-semibold tracking-tight text-slate-900 leading-snug">
                Savings &amp; Capacity Overview
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-md border border-slate-300 text-[10px] text-slate-600 font-bold"
                  role="img"
                  aria-label="Model Overview"
                  title="Model Overview"
                >
                  i
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                Quantify baseline staff hours spent across client intake,
                document collection, and reminder follow-ups, and model
                potential labor-cost value and capacity recoverable through
                automated workflows.
              </p>
            </div>
          </div>
        </header>

        {/* Main 12-column responsive layout: 7 cols inputs / 5 cols results on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
          {/* Left column: Inputs (7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Card 1: Client Onboarding Operations */}
            <Card>
              <CardHeader>
                <CardTitle>Client Intake &amp; Onboarding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <InputField
                    id="newClients"
                    label="New Clients per Year"
                    value={inputs.newClients}
                    onChange={(val) => handleInputChange("newClients", val)}
                    min={FIELD_LIMITS.newClients.min}
                    max={FIELD_LIMITS.newClients.max}
                    error={results.validations.newClients.error}
                    warning={results.validations.newClients.warning}
                    helperText={
                      results.validations.newClients.helper ||
                      "Annual newly onboarded volume"
                    }
                  />

                  <InputField
                    id="onboardingMinutes"
                    label="Minutes per Onboarding"
                    value={inputs.onboardingMinutes}
                    onChange={(val) =>
                      handleInputChange("onboardingMinutes", val)
                    }
                    min={FIELD_LIMITS.onboardingMinutes.min}
                    max={FIELD_LIMITS.onboardingMinutes.max}
                    error={results.validations.onboardingMinutes.error}
                    warning={results.validations.onboardingMinutes.warning}
                    helperText={
                      results.validations.onboardingMinutes.helper ||
                      "Staff time per new client file"
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Document Requests & Follow-ups */}
            <Card>
              <CardHeader>
                <CardTitle>Document Requests &amp; Follow-ups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <InputField
                    id="activeClients"
                    label="Active Clients Managed"
                    value={inputs.activeClients}
                    onChange={(val) => handleInputChange("activeClients", val)}
                    min={FIELD_LIMITS.activeClients.min}
                    max={FIELD_LIMITS.activeClients.max}
                    error={results.validations.activeClients.error}
                    warning={results.validations.activeClients.warning}
                    helperText={
                      results.validations.activeClients.helper ||
                      "Total active client book"
                    }
                  />

                  <InputField
                    id="docRequestsPerClient"
                    label="Requests per Client / Year"
                    value={inputs.docRequestsPerClient}
                    onChange={(val) =>
                      handleInputChange("docRequestsPerClient", val)
                    }
                    min={FIELD_LIMITS.docRequestsPerClient.min}
                    max={FIELD_LIMITS.docRequestsPerClient.max}
                    error={results.validations.docRequestsPerClient.error}
                    warning={results.validations.docRequestsPerClient.warning}
                    helperText={
                      results.validations.docRequestsPerClient.helper ||
                      "Document campaigns/yr"
                    }
                  />

                  <InputField
                    id="minutesPerDocRequest"
                    label="Minutes per Request"
                    value={inputs.minutesPerDocRequest}
                    onChange={(val) =>
                      handleInputChange("minutesPerDocRequest", val)
                    }
                    min={FIELD_LIMITS.minutesPerDocRequest.min}
                    max={FIELD_LIMITS.minutesPerDocRequest.max}
                    error={results.validations.minutesPerDocRequest.error}
                    warning={results.validations.minutesPerDocRequest.warning}
                    helperText={
                      results.validations.minutesPerDocRequest.helper ||
                      "Preparation & intake review"
                    }
                  />

                  <InputField
                    id="followUpsPerRequest"
                    label="Follow-ups per Request"
                    value={inputs.followUpsPerRequest}
                    onChange={(val) =>
                      handleInputChange("followUpsPerRequest", val)
                    }
                    min={FIELD_LIMITS.followUpsPerRequest.min}
                    max={FIELD_LIMITS.followUpsPerRequest.max}
                    error={results.validations.followUpsPerRequest.error}
                    warning={results.validations.followUpsPerRequest.warning}
                    helperText={
                      results.validations.followUpsPerRequest.helper ||
                      "Average chase messages sent"
                    }
                  />

                  <InputField
                    id="minutesPerFollowUp"
                    label="Minutes per Follow-up"
                    value={inputs.minutesPerFollowUp}
                    onChange={(val) =>
                      handleInputChange("minutesPerFollowUp", val)
                    }
                    min={FIELD_LIMITS.minutesPerFollowUp.min}
                    max={FIELD_LIMITS.minutesPerFollowUp.max}
                    error={results.validations.minutesPerFollowUp.error}
                    warning={results.validations.minutesPerFollowUp.warning}
                    helperText={
                      results.validations.minutesPerFollowUp.helper ||
                      "Drafting, sending, tracking status"
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Economic Assumptions & Automation Scope */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Labor Economics &amp; Automation Assumption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-start">
                  <InputField
                    id="hourlyRate"
                    label="Blended Hourly Rate"
                    value={inputs.hourlyRate}
                    onChange={(val) => handleInputChange("hourlyRate", val)}
                    prefix="$"
                    min={FIELD_LIMITS.hourlyRate.min}
                    max={FIELD_LIMITS.hourlyRate.max}
                    error={results.validations.hourlyRate.error}
                    warning={results.validations.hourlyRate.warning}
                    helperText={
                      results.validations.hourlyRate.helper ||
                      "Fully loaded staff cost"
                    }
                  />

                  <AutomationSlider
                    id="automationPercentage"
                    label="Automation Assumption (%)"
                    value={inputs.automationPercentage}
                    onChange={(val) =>
                      handleInputChange("automationPercentage", val)
                    }
                    error={results.validations.automationPercentage.error}
                    warning={results.validations.automationPercentage.warning}
                    helperText={
                      results.validations.automationPercentage.helper ||
                      "Illustrative estimate, not an industry benchmark"
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Results Panel (5 columns on desktop) */}
          <div className="lg:col-span-5">
            <ResultsPanel
              results={results}
              onOpenConsultation={() => setIsConsultationOpen(true)}
              onReset={handleReset}
              isDirty={isDirty}
            />
          </div>
        </div>
      </main>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        summaryData={{
          potentialLaborCostValue: results.potentialLaborCostValue,
          hoursRecoveredYear: results.hoursRecoveredYear,
          weeklyHoursRecovered: results.weeklyHoursRecovered,
          automationPercentage: Number(inputs.automationPercentage) || 0,
        }}
      />
    </div>
  );
};

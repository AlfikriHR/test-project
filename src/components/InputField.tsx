import React from "react";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";

export interface SliderRangeConfig {
  min: number;
  mid: number;
  max: number;
  step: number;
  tickUnit?: string;
  tickPrefix?: string;
}

export const UI_SLIDER_RANGES: Record<string, SliderRangeConfig> = {
  newClients: { min: 10, mid: 255, max: 500, step: 5 },
  onboardingMinutes: { min: 5, mid: 90, max: 180, step: 1, tickUnit: "min" },
  activeClients: { min: 50, mid: 1275, max: 2500, step: 25 },
  docRequestsPerClient: { min: 1, mid: 12, max: 24, step: 1 },
  minutesPerDocRequest: { min: 1, mid: 30, max: 60, step: 1, tickUnit: "min" },
  followUpsPerRequest: { min: 0, mid: 5, max: 10, step: 1 },
  minutesPerFollowUp: { min: 1, mid: 10, max: 20, step: 1, tickUnit: "min" },
  hourlyRate: { min: 15, mid: 82, max: 150, step: 1, tickPrefix: "$" },
  automationPercentage: { min: 0, mid: 50, max: 100, step: 1, tickUnit: "%" },
};

export interface InputFieldProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  unit?: string;
  prefix?: string;
  helperText?: string;
  error?: string;
  warning?: string;
  min?: number;
  max?: number;
  step?: number | string;
  placeholder?: string;
  tooltip?: string;
  sliderConfig?: SliderRangeConfig;
}

export function normalizeNumericInput(value: string): string {
  const cleaned = value.replace(/-/g, "").replace(/,/g, ".").trim();
  if (cleaned === "" || cleaned === "NaN") {
    return "0";
  }
  if (/^0\d/.test(cleaned)) {
    return cleaned.replace(/^0+(?=\d)/, "");
  }
  return cleaned;
}

function formatTick(val: number, config?: SliderRangeConfig): string {
  const formattedNum = val.toLocaleString("en-US");
  if (config?.tickPrefix) {
    return `${config.tickPrefix}${formattedNum}`;
  }
  if (config?.tickUnit) {
    return `${formattedNum} ${config.tickUnit}`;
  }
  return formattedNum;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  unit,
  prefix,
  helperText,
  error,
  warning,
  step,
  placeholder,
  sliderConfig,
}) => {
  const config =
    sliderConfig ||
    UI_SLIDER_RANGES[id] || {
      min: 0,
      mid: 50,
      max: 100,
      step: 1,
    };

  const sliderMin = config.min;
  const sliderMax = config.max;
  const sliderMid = config.mid;
  const sliderStep = config.step;

  // Determine numeric value for slider
  const rawNum = typeof value === "number" ? value : Number(value);
  const numericVal = Number.isFinite(rawNum) ? rawNum : sliderMin;

  // Visual thumb clamping: values typed above max or below min clamp visually to slider bounds
  const clampedSliderVal = Math.min(sliderMax, Math.max(sliderMin, numericVal));
  const rangeSpan = sliderMax - sliderMin;
  const fillPct =
    rangeSpan > 0
      ? Math.min(
          100,
          Math.max(0, ((clampedSliderVal - sliderMin) / rangeSpan) * 100)
        )
      : 0;

  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const warningId = `${id}-warning`;

  const describedBy = [
    error ? errorId : null,
    warning && !error ? warningId : null,
    helperText && !error ? helperId : null,
  ]
    .filter(Boolean)
    .join(" ");

  const hasError = Boolean(error);

  const effectiveStep = step ?? config.step ?? 1;
  const isInteger = Number.isInteger(Number(effectiveStep));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      onChange("");
      return;
    }
    const normalized = normalizeNumericInput(raw);
    if (isInteger && normalized.includes(".")) {
      onChange(normalized.split(".")[0] || "0");
      return;
    }
    onChange(normalized);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "-" ||
      e.key === "Minus" ||
      e.key === "+" ||
      e.key === "e" ||
      e.key === "E"
    ) {
      e.preventDefault();
      return;
    }
    if (isInteger && (e.key === "." || e.key === "," || e.key === "Decimal")) {
      e.preventDefault();
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col">
      {/* Top row: Label on left, compact input box on right */}
      <div className="flex items-center justify-between gap-3 min-h-[2.75rem]">
        <Label
          htmlFor={`${id}-input`}
          className="text-xs sm:text-[13px] font-medium text-slate-800 cursor-pointer leading-snug line-clamp-2 pr-1"
        >
          {label}
        </Label>

        {/* Compact input box with prefix/suffix */}
        <div
          className={cn(
            "flex items-center rounded-lg border bg-white px-2.5 py-1 transition-all shadow-2xs shrink-0",
            hasError
              ? "border-danger ring-1 ring-danger/30"
              : "border-slate-200 hover:border-slate-300 focus-within:border-[#0C74BC] focus-within:ring-2 focus-within:ring-[#0C74BC]/20"
          )}
        >
          {prefix && (
            <span className="text-xs sm:text-sm font-medium text-slate-500 mr-1 select-none">
              {prefix}
            </span>
          )}
          <input
            id={`${id}-input`}
            name={id}
            type="number"
            inputMode={isInteger ? "numeric" : "decimal"}
            step={effectiveStep}
            value={value}
            onKeyDown={handleInputKeyDown}
            onFocus={(e) => {
              const target = e.currentTarget;
              target.select();
            }}
            onChange={handleInputChange}
            placeholder={placeholder}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={describedBy || undefined}
            className="w-16 sm:w-20 text-right text-sm font-semibold text-slate-900 bg-transparent outline-none tabular-nums"
          />
          {unit && (
            <span className="text-xs sm:text-sm text-slate-500 ml-1.5 select-none whitespace-nowrap">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Second row: Range slider with synchronized value and --fill percentage */}
      <div className="relative flex items-center h-10 w-full mt-1">
        <input
          id={id}
          type="range"
          className="range w-full"
          min={sliderMin}
          max={sliderMax}
          step={sliderStep}
          value={clampedSliderVal}
          onChange={handleSliderChange}
          style={{ "--fill": `${fillPct}%` } as React.CSSProperties}
          aria-label={`${label} slider`}
          aria-valuemin={sliderMin}
          aria-valuemax={sliderMax}
          aria-valuenow={numericVal}
        />
      </div>

      {/* Third row: Min/mid/max ticks row */}
      <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums select-none -mt-1 mb-1.5 px-0.5">
        <span>{formatTick(sliderMin, config)}</span>
        <span>{formatTick(sliderMid, config)}</span>
        <span>{formatTick(sliderMax, config)}</span>
      </div>

      {/* Fourth row: Helper text, error/warning messages */}
      <div className="min-h-[1.25rem] text-xs">
        {error ? (
          <p
            id={errorId}
            className="font-medium text-danger text-[11px]"
            role="alert"
          >
            {error}
          </p>
        ) : warning ? (
          <p id={warningId} className="font-medium text-amber-700 text-[11px]">
            {warning}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-slate-500 text-[11px] leading-tight">
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
};



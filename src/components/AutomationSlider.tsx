import React from "react";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import { normalizeNumericInput } from "./InputField";

interface AutomationSliderProps {
  id: string;
  label?: string;
  value: number | string;
  onChange: (value: string) => void;
  helperText?: string;
  error?: string;
  warning?: string;
}

export const AutomationSlider: React.FC<AutomationSliderProps> = ({
  id,
  label = "Illustrative automation assumption",
  value,
  onChange,
  helperText = "Share of the manual workload above that automation could potentially recover. This is an assumption, not a benchmark.",
  error,
  warning,
}) => {
  const rawNum = typeof value === "number" ? value : Number(value);
  const numericVal = Number.isFinite(rawNum) ? rawNum : 0;
  const clampedVal = Math.min(100, Math.max(0, numericVal));

  const labelId = `${id}-label`;
  const errorId = `${id}-error`;
  const warningId = `${id}-warning`;
  const helperId = `${id}-helper`;

  const describedBy = [
    error ? errorId : null,
    warning && !error ? warningId : null,
    helperText && !error ? helperId : null,
  ]
    .filter(Boolean)
    .join(" ");

  const hasError = Boolean(error);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      onChange("");
      return;
    }
    onChange(normalizeNumericInput(raw));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "Minus") {
      e.preventDefault();
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="rounded-xl bg-[#0C74BC]/[0.03] border border-[#0C74BC]/20 p-4 sm:p-5 space-y-3 shadow-xs">
      {/* Top row: Label and compact percentage input */}
      <div className="flex items-center justify-between gap-2 min-h-9">
        <Label
          id={labelId}
          htmlFor={`${id}-input`}
          className="text-xs font-bold text-[#0C74BC] uppercase tracking-wider cursor-pointer flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-[#0C74BC]" />
          {label}
        </Label>

        {/* Compact percentage box */}
        <div
          className={cn(
            "flex items-center rounded-lg border bg-white px-2.5 py-1 transition-all shadow-2xs shrink-0",
            hasError
              ? "border-danger ring-1 ring-danger/30"
              : "border-[#0C74BC]/30 hover:border-[#0C74BC]/60 focus-within:border-[#0C74BC] focus-within:ring-2 focus-within:ring-[#0C74BC]/20"
          )}
        >
          <input
            id={`${id}-input`}
            name={id}
            type="number"
            inputMode="numeric"
            min={0}
            max={100}
            step={1}
            value={value}
            onKeyDown={handleInputKeyDown}
            onFocus={(e) => {
              const target = e.currentTarget;
              target.select();
            }}
            onChange={handleInputChange}
            aria-labelledby={labelId}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={describedBy || undefined}
            className="w-12 sm:w-14 text-right text-sm font-semibold text-slate-900 bg-transparent outline-none tabular-nums"
          />
          <span className="text-xs sm:text-sm font-medium text-slate-500 ml-1 select-none">
            %
          </span>
        </div>
      </div>

      {/* Second row: Range slider with --fill */}
      <div className="relative flex items-center h-10 w-full mt-1">
        <input
          id={id}
          type="range"
          className="range w-full"
          min={0}
          max={100}
          step={1}
          value={clampedVal}
          onChange={handleSliderChange}
          style={{ "--fill": `${clampedVal}%` } as React.CSSProperties}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={numericVal}
        />
      </div>

      {/* Third row: Ticks */}
      <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums select-none -mt-1 mb-1.5 px-0.5">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>

      {/* Fourth row: Helper & Messages */}
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
          <p id={helperId} className="text-slate-600 text-[11px] leading-tight">
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
};


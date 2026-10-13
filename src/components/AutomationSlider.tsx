import React from "react";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { normalizeNumericInput } from "./InputField";

interface AutomationSliderProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  helperText?: string;
  error?: string;
  warning?: string;
}

export const AutomationSlider: React.FC<AutomationSliderProps> = ({
  id,
  label,
  value,
  onChange,
  helperText,
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
    onChange(normalizeNumericInput(e.target.value));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "Minus") {
      e.preventDefault();
    }
  };

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/40 p-3.5 sm:p-4 lg:p-5 shadow-2xs">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Label id={labelId} htmlFor={id} className="text-xs font-semibold text-slate-900 cursor-pointer">
            {label}
          </Label>
          {helperText && !error && (
            <p id={helperId} className="text-[11px] text-slate-600">
              {helperText}
            </p>
          )}
        </div>

        {/* Synchronized numeric input */}
        <div className="flex items-center gap-1 self-start sm:self-auto">
          <Input
            id={`${id}-number`}
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
              requestAnimationFrame(() => {
                target.select();
              });
            }}
            onChange={handleInputChange}
            aria-labelledby={labelId}
            aria-label="Automation percentage input"
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={describedBy || undefined}
            className={cn(
              "h-8 w-14 sm:w-16 rounded-md border border-slate-200 bg-white px-1.5 sm:px-2 py-0.5 text-right text-xs font-semibold tabular-nums shadow-2xs focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20",
              hasError && "border-red-400 focus:border-red-500 focus:ring-red-500/20"
            )}
          />
          <span className="text-xs font-medium text-slate-700">%</span>
        </div>
      </div>

      {/* Error & Warning Messages */}
      {(error || warning) && (
        <div className="mt-1 text-xs">
          {error && (
            <p id={errorId} className="font-medium text-red-600 text-[11px]" role="alert">
              {error}
            </p>
          )}
          {warning && !error && (
            <p id={warningId} className="font-medium text-amber-700 text-[11px]">
              {warning}
            </p>
          )}
        </div>
      )}

      <div className="mt-3">
        <Slider
          id={id}
          className="relative flex h-4 w-full touch-none select-none items-center cursor-pointer"
          value={[clampedVal]}
          onValueChange={(vals) => onChange(String(vals[0]))}
          min={0}
          max={100}
          step={1}
          aria-label={label}
        />
      </div>
    </div>
  );
};


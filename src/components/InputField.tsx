import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";

interface InputFieldProps {
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
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;
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
  min,
  max,
  step = 1,
  placeholder,
  tooltip,
  onWheel,
}) => {
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const warningId = `${id}-warning`;
  const unitId = `${id}-unit`;

  const describedBy = [
    unit ? unitId : null,
    error ? errorId : null,
    warning && !error ? warningId : null,
    helperText && !error ? helperId : null,
  ]
    .filter(Boolean)
    .join(" ");

  const hasError = Boolean(error);

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    // Blur on scroll so mouse wheel doesn't change the numeric value
    e.currentTarget.blur();
    onWheel?.(e);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <Label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </Label>
        {tooltip && (
          <span className="text-xs text-slate-500" title={tooltip}>
            {tooltip}
          </span>
        )}
      </div>

      <div className="relative flex rounded-md shadow-2xs min-w-0">
        {prefix && (
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-200 bg-slate-50/80 px-2.5 sm:px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap shrink-0">
            {prefix}
          </span>
        )}

        <Input
          id={id}
          name={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "Minus") {
              e.preventDefault();
            }
          }}
          onChange={(e) => onChange(e.target.value.replace(/-/g, ""))}
          onWheel={handleWheel}
          placeholder={placeholder}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={describedBy || undefined}
          className={cn(
            "min-w-0 tabular-nums text-base sm:text-sm px-3 sm:px-3.5 focus:relative focus:z-10",
            prefix ? "rounded-l-none" : "rounded-l-md",
            unit ? "rounded-r-none" : "rounded-r-md",
            hasError && "border-red-400 focus:border-red-500 focus:ring-red-500/10"
          )}
        />

        {unit && (
          <span
            id={unitId}
            className="inline-flex items-center rounded-r-md border border-l-0 border-slate-200 bg-slate-50/80 px-2.5 sm:px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap shrink-0"
          >
            {unit}
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="mt-0.5 flex flex-col gap-0.5 text-xs">
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
        {helperText && !error && (
          <p id={helperId} className="text-slate-500 text-[11px] truncate" title={helperText}>
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};


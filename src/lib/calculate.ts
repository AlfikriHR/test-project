export interface CalculatorInputs {
  newClients: number | string;
  onboardingMinutes: number | string;
  activeClients: number | string;
  docRequestsPerClient: number | string;
  minutesPerDocRequest: number | string;
  followUpsPerRequest: number | string;
  minutesPerFollowUp: number | string;
  hourlyRate: number | string;
  automationPercentage: number | string;
}

export type InputKey = keyof CalculatorInputs;

export interface FieldValidation {
  sanitizedValue: number;
  error?: string;
  warning?: string;
  helper?: string;
}

export interface CalculationBreakdownItem {
  id: string;
  label: string;
  baselineHours: number;
  recoveredHours: number;
}

export interface CalculationResult {
  onboardingHoursYear: number;
  docRequestHoursYear: number;
  followUpHoursYear: number;
  totalWorkloadHoursYear: number;
  hoursRecoveredYear: number;
  weeklyHoursRecovered: number;
  potentialLaborCostValue: number;
  breakdown: CalculationBreakdownItem[];
  validations: Record<InputKey, FieldValidation>;
  hasErrors: boolean;
}

export const DEFAULT_INPUTS: Record<InputKey, number> = {
  newClients: 120,
  onboardingMinutes: 45,
  activeClients: 500,
  docRequestsPerClient: 4,
  minutesPerDocRequest: 8,
  followUpsPerRequest: 2,
  minutesPerFollowUp: 5,
  hourlyRate: 30,
  automationPercentage: 60,
};

export const FIELD_LIMITS: Record<InputKey, { min: number; max: number; label: string }> = {
  newClients: { min: 0, max: 100000, label: "New clients per year" },
  onboardingMinutes: { min: 0, max: 10000, label: "Minutes per onboarding" },
  activeClients: { min: 0, max: 100000, label: "Active clients managed" },
  docRequestsPerClient: { min: 0, max: 1000, label: "Document requests per client/year" },
  minutesPerDocRequest: { min: 0, max: 10000, label: "Minutes per document request" },
  followUpsPerRequest: { min: 0, max: 100, label: "Follow-ups per document request" },
  minutesPerFollowUp: { min: 0, max: 10000, label: "Minutes per follow-up" },
  hourlyRate: { min: 0, max: 10000, label: "Blended hourly rate ($/hr)" },
  automationPercentage: { min: 0, max: 100, label: "Estimated automation potential (%)" },
};

export function parseAndValidateField(
  key: InputKey,
  rawVal: number | string | undefined | null
): FieldValidation {
  const limits = FIELD_LIMITS[key];

  if (rawVal === undefined || rawVal === null || (typeof rawVal === "string" && rawVal.trim() === "")) {
    return {
      sanitizedValue: 0,
      helper: "Treated as 0",
    };
  }

  const num = typeof rawVal === "number" ? rawVal : Number(rawVal);

  if (Number.isNaN(num)) {
    return {
      sanitizedValue: 0,
      error: "Please enter a valid number",
    };
  }

  if (!Number.isFinite(num)) {
    return {
      sanitizedValue: 0,
      error: "Please enter a valid finite number",
    };
  }

  if (num < limits.min) {
    return {
      sanitizedValue: 0,
      error: "Value cannot be negative (treated as 0)",
    };
  }

  if (num > limits.max) {
    return {
      sanitizedValue: num,
      warning: `Value exceeds typical range (max: ${limits.max.toLocaleString()})`,
    };
  }

  return {
    sanitizedValue: num,
    ...(key === "automationPercentage"
      ? { helper: "Illustrative estimate, not an industry benchmark" }
      : {}),
  };
}

export function calculateSavings(inputs: Partial<CalculatorInputs>): CalculationResult {
  const validations = {} as Record<InputKey, FieldValidation>;
  let hasErrors = false;

  const keys = Object.keys(DEFAULT_INPUTS) as InputKey[];

  for (const key of keys) {
    const rawValue = inputs[key] !== undefined ? inputs[key] : DEFAULT_INPUTS[key];
    const validation = parseAndValidateField(key, rawValue);
    validations[key] = validation;
    if (validation.error) {
      hasErrors = true;
    }
  }

  const newClients = validations.newClients.sanitizedValue;
  const onboardingMinutes = validations.onboardingMinutes.sanitizedValue;
  const activeClients = validations.activeClients.sanitizedValue;
  const docRequestsPerClient = validations.docRequestsPerClient.sanitizedValue;
  const minutesPerDocRequest = validations.minutesPerDocRequest.sanitizedValue;
  const followUpsPerRequest = validations.followUpsPerRequest.sanitizedValue;
  const minutesPerFollowUp = validations.minutesPerFollowUp.sanitizedValue;
  const hourlyRate = validations.hourlyRate.sanitizedValue;
  const automationPercentage = Math.min(100, Math.max(0, validations.automationPercentage.sanitizedValue));

  // Formulas
  // Safe division constants: 60 minutes per hour, 52 weeks per year
  const onboardingHoursYear = (newClients * onboardingMinutes) / 60;
  const docRequestHoursYear = (activeClients * docRequestsPerClient * minutesPerDocRequest) / 60;
  const followUpHoursYear =
    (activeClients * docRequestsPerClient * followUpsPerRequest * minutesPerFollowUp) / 60;

  const totalWorkloadHoursYear = onboardingHoursYear + docRequestHoursYear + followUpHoursYear;

  const automationFactor = automationPercentage / 100;
  const hoursRecoveredYear = totalWorkloadHoursYear * automationFactor;
  const weeklyHoursRecovered = hoursRecoveredYear / 52;
  const potentialLaborCostValue = hoursRecoveredYear * hourlyRate;

  const breakdown: CalculationBreakdownItem[] = [
    {
      id: "onboarding",
      label: "Client Onboarding",
      baselineHours: onboardingHoursYear,
      recoveredHours: onboardingHoursYear * automationFactor,
    },
    {
      id: "docRequests",
      label: "Document Requests & Review",
      baselineHours: docRequestHoursYear,
      recoveredHours: docRequestHoursYear * automationFactor,
    },
    {
      id: "followUps",
      label: "Chasing & Follow-ups",
      baselineHours: followUpHoursYear,
      recoveredHours: followUpHoursYear * automationFactor,
    },
  ];

  return {
    onboardingHoursYear,
    docRequestHoursYear,
    followUpHoursYear,
    totalWorkloadHoursYear,
    hoursRecoveredYear,
    weeklyHoursRecovered,
    potentialLaborCostValue,
    breakdown,
    validations,
    hasErrors,
  };
}

export function formatCurrency(amount: number): string {
  if (Number.isNaN(amount) || !Number.isFinite(amount)) return "$0";
  const rounded = Math.round(amount);
  return "$" + rounded.toLocaleString("en-US");
}

export function formatHours(hours: number, decimals: number = 0): string {
  const safeHours = Number.isNaN(hours) || !Number.isFinite(hours) ? 0 : hours;
  return safeHours.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

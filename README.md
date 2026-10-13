# Workload & Labor-Cost Savings Calculator

An enterprise-grade operational ROI assessment calculator built with Next.js (App Router), TypeScript, and Tailwind CSS. It enables operations managers and professional services leaders to calculate manual hours spent on onboarding, recurring document collection, and reminder overhead—quantifying immediate labor-cost capacity recoverable through workflow automation.

---

## 1. Getting Started & Setup

### Prerequisites

- Node.js 18.18+ or 20+ (Node.js 22 LTS recommended)
- `pnpm` (or `npm` / `yarn`)

### Installation

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

### Running Automated Unit Tests

```bash
pnpm test
```

Runs the full Vitest suite covering default benchmark references, boundary edge cases, input sanitization, and component interactions.

### Production Build & Linting

```bash
pnpm run lint
pnpm run build
```

---

## 2. Calculation Logic & Architecture

The calculation engine is isolated in a pure, testable TypeScript library at `src/lib/calculate.ts`.

### Mathematical Formulas

1. **Client Onboarding Hours / Year**:
   $$\text{Onboarding Hours} = \frac{\text{newClients} \times \text{onboardingMinutes}}{60}$$

2. **Document Request Hours / Year**:
   $$\text{Doc Request Hours} = \frac{\text{activeClients} \times \text{docRequestsPerClient} \times \text{minutesPerDocRequest}}{60}$$

3. **Follow-Up & Reminder Hours / Year**:
   $$\text{Follow-Up Hours} = \frac{\text{activeClients} \times \text{docRequestsPerClient} \times \text{followUpsPerRequest} \times \text{minutesPerFollowUp}}{60}$$

4. **Total Baseline Workload**:
   $$\text{Total Hours} = \text{Onboarding Hours} + \text{Doc Request Hours} + \text{Follow-Up Hours}$$

5. **Capacity Recovered / Year**:
   $$\text{Hours Recovered} = \text{Total Hours} \times \left( \frac{\text{automationPercentage}}{100} \right)$$

6. **Weekly Capacity Recovered**:
   $$\text{Weekly Recovered} = \frac{\text{Hours Recovered}}{52}$$

7. **Potential Annual Labor-Cost Value**:
   $$\text{Labor-Cost Savings} = \text{Hours Recovered} \times \text{hourlyRate}$$

### Benchmark Default Verification

With standard default values:

- New clients / yr = 120, Onboarding time = 45 min
- Active clients = 500, Requests / client = 4, Minutes / request = 8 min
- Follow-ups / request = 2, Minutes / follow-up = 5 min
- Blended rate = $30/hr, Automation potential = 60%

Reference outputs:

- **Baseline Manual Workload**: 690 h/yr
  - Onboarding: 90 h/yr
  - Document Requests: 266.67 h/yr
  - Follow-ups: 333.33 h/yr
- **Annual Hours Recovered**: 414 h/yr
- **Weekly Hours Recovered**: 8.0 h/wk (rounded to 1 decimal place)
- **Potential Labor-Cost Value**: $12,420 (whole dollar formatted)

---

## 3. Key UX Decisions & Design System

- **Clean Enterprise B2B Palette**:
  - Restrained enterprise color system utilizing Slate (`slate-50` to `slate-900`), Enterprise Blue (`blue-600`, `blue-700`), and subtle Emerald accents (`emerald-600`, `emerald-50`) for positive savings highlights.
  - Zero purple/violet/indigo hues and zero emojis throughout the UI.
- **Distraction-Free Single-Page Layout**:
  - Removed top global navbar header to provide an immediate, distraction-free single-page calculator experience focused entirely on ROI assessment.
- **Radix UI Primitives (the upstream React foundation for Reka UI)**:
  - Built with `@radix-ui/react-slider` (`Slider.Root`, `Slider.Track`, `Slider.Range`, `Slider.Thumb`) for accessible, tactile automation rate adjustments.
  - Built with `@radix-ui/react-dialog` (`Dialog.Root`, `Dialog.Portal`, `Dialog.Overlay`, `Dialog.Content`, `Dialog.Title`, `Dialog.Close`) for accessible focus-trapped consultation modal dialogs.
- **Tabular Numerics (`tabular-nums`)**:
  - All real-time changing numbers use monospace tabular numeral spacing to prevent horizontal layout jiggle during typing or slider dragging.
- **12-Column Responsive Layout**:
  - Desktop view presents a 7-column input workflow alongside a 5-column sticky summary panel (`lg:sticky lg:top-8`), keeping real-time metrics in focus while scrolling down lengthy input configurations.
  - Mobile layout cleanly stacks inputs above the output visualization with touch-optimized controls and full viewport support (320px+).
- **Dual-Control Automation Slider**:
  - Provides synchronized slider and direct numeric input, featuring accessible quick-preset jump targets (0% Manual, 25%, 50% Mid, 60% Benchmark, 75%, 100% Full).
- **Strict Negative Input Prevention & Defensive Validation**:
  - Numeric inputs intercept the minus sign on keydown (`-` or `Minus` keys blocked) and strip minus characters on paste/change, completely disallowing negative values while displaying clean validation feedback.
  - Empty or blank inputs are safely parsed as 0 with inline contextual notice ("Treated as 0") without throwing `NaN` or crashing.
  - Extremely large inputs (e.g. >100,000 clients) display advisory warnings while maintaining numeric precision.
- **Accessible Modal Interaction**:
  - The "Talk to us" consultation modal manages focus automatically on open, traps escape keypresses, supports backdrop dismissal, and conforms to WCAG AA `role="dialog"`.

---

## 4. Assumptions and Limitations

- **Annual Uniformity**: Calculations assume uniform client distribution across a 52-week operating calendar without modeling seasonal peaks (e.g. tax season compressions).
- **Constant Blended Labor Rate**: Assumes a single blended rate across all three workflow categories rather than varying rates for junior coordinators versus senior managers.
- **Independent Task Execution**: Assumes onboarding, document requests, and follow-ups are linear and additive.
- **Illustrative Model**: Estimates illustrate potential operational capacity and do not constitute legal or contractual performance guarantees.

---

## 5. What Would Be Improved With Another Day

1. **Role-Tiered Rate Modeling**: Allow specifying discrete labor rates by team tier (e.g. administrative staff at $24/hr, senior account leads at $65/hr).
2. **Exportable Executive PDF & CSV**: One-click generation of branded executive summary reports with customized client logos and timestamped calculation breakdowns.
3. **URL State Synchronization**: Encode calculation inputs in URL search query parameters (e.g., `?clients=150&rate=35`) to facilitate link sharing among leadership teams.
4. **CRM & Calendar Webhooks**: Connect the consultation modal to HubSpot or Salesforce webhooks for real-time lead ingestion.
5. **Scenario Comparison**: Side-by-side comparison mode contrasting "Conservative (40%)" vs. "Target (60%)" vs. "Aggressive (80%)" automation phases.

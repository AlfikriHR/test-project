import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { formatCurrency, formatHours } from "../lib/calculate";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  summaryData: {
    potentialLaborCostValue: number;
    hoursRecoveredYear: number;
    weeklyHoursRecovered: number;
    automationPercentage: number;
  };
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  summaryData,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = React.useCallback(() => {
    setName("");
    setEmail("");
    setCompany("");
    setNotes("");
    setSubmitted(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogContent>
        {submitted ? (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-recover-soft text-text-recover">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <DialogTitle className="mt-4 text-xl font-bold font-display text-ink">
              Consultation Request Received
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted">
              Thank you,{" "}
              <span className="font-semibold text-ink">
                {name || "there"}
              </span>
              . A workflow specialist will reach out to{" "}
              <span className="font-semibold text-ink">{email}</span>{" "}
              within 1 business day with a tailored automation blueprint.
            </DialogDescription>

            <div className="mt-6 rounded-xl bg-paper border border-line/60 p-4 text-left text-xs text-muted">
              <p className="font-semibold text-ink">
                Summary of assessment values:
              </p>
              <ul className="mt-1.5 space-y-1">
                <li>
                  • Potential labor-cost value:{" "}
                  {formatCurrency(summaryData.potentialLaborCostValue)}/year
                </li>
                <li>
                  • Hours recovered:{" "}
                  {formatHours(summaryData.hoursRecoveredYear)} h/year (
                  {formatHours(summaryData.weeklyHoursRecovered, 1)} h/week)
                </li>
                <li>
                  • Target automation: {summaryData.automationPercentage}%
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <DialogClose asChild>
                <button
                  type="button"
                  className="w-full rounded-full bg-[#0C74BC] hover:bg-[#0A62A0] text-white px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0C74BC]"
                >
                  Close
                </button>
              </DialogClose>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <DialogTitle className="mt-2 text-xl font-bold font-display tracking-tight text-ink sm:text-2xl">
                Schedule a Workflow Review
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs text-muted sm:text-sm">
                Discuss how to realize{" "}
                <span className="font-semibold text-ink">
                  {formatCurrency(summaryData.potentialLaborCostValue)}
                </span>{" "}
                in annual labor capacity with our team.
              </DialogDescription>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <Label
                  htmlFor="modal-name"
                  className="block text-xs font-semibold text-ink mb-1"
                >
                  Full Name <span className="text-danger">*</span>
                </Label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="block w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-[#0C74BC] focus:ring-2 focus:ring-[#0C74BC]/20 transition-colors"
                />
              </div>

              <div>
                <Label
                  htmlFor="modal-email"
                  className="block text-xs font-semibold text-ink mb-1"
                >
                  Work Email <span className="text-danger">*</span>
                </Label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="block w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-[#0C74BC] focus:ring-2 focus:ring-[#0C74BC]/20 transition-colors"
                />
              </div>

              <div>
                <Label
                  htmlFor="modal-company"
                  className="block text-xs font-semibold text-ink mb-1"
                >
                  Company Name <span className="text-danger">*</span>
                </Label>
                <input
                  id="modal-company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Financial Partners"
                  className="block w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-[#0C74BC] focus:ring-2 focus:ring-[#0C74BC]/20 transition-colors"
                />
              </div>

              <div>
                <Label
                  htmlFor="modal-notes"
                  className="block text-xs font-semibold text-ink mb-1"
                >
                  Current Workflow Bottleneck (Optional)
                </Label>
                <textarea
                  id="modal-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g., high document chasing overhead during peak season..."
                  className="block w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-[#0C74BC] focus:ring-2 focus:ring-[#0C74BC]/20 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#0C74BC] hover:bg-[#0A62A0] px-4 py-3 text-sm font-semibold text-white shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0C74BC]"
                >
                  Confirm Consultation Request
                </button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};


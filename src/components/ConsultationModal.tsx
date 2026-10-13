import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
            <div className="py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <DialogTitle className="mt-4 text-xl font-bold text-slate-900">
                Consultation Request Received
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-slate-600">
                Thank you, <span className="font-semibold text-slate-900">{name || "there"}</span>.
                A workflow specialist will reach out to{" "}
                <span className="font-semibold text-slate-900">{email}</span> within 1 business day
                with a tailored automation blueprint.
              </DialogDescription>

              <div className="mt-6 rounded-md bg-slate-50 p-4 text-left text-xs text-slate-700">
                <p className="font-semibold text-slate-900">Summary of assessment values:</p>
                <ul className="mt-1.5 space-y-1">
                  <li>• Potential labor-cost value: {formatCurrency(summaryData.potentialLaborCostValue)}/year</li>
                  <li>• Hours recovered: {formatHours(summaryData.hoursRecoveredYear)} h/year ({formatHours(summaryData.weeklyHoursRecovered, 1)} h/week)</li>
                  <li>• Target automation: {summaryData.automationPercentage}%</li>
                </ul>
              </div>

              <div className="mt-6">
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="w-full rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 cursor-pointer h-auto"
                  >
                    Close
                  </Button>
                </DialogClose>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  Workflow Consultation
                </span>
                <DialogTitle className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Schedule a Workflow Review
                </DialogTitle>
                <DialogDescription className="mt-1 text-xs text-slate-600 sm:text-sm">
                  Discuss how to realize{" "}
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(summaryData.potentialLaborCostValue)}
                  </span>{" "}
                  in annual labor capacity with our engineering team.
                </DialogDescription>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="modal-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="modal-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="block w-full rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>

                <div>
                  <Label htmlFor="modal-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="modal-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="block w-full rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>

                <div>
                  <Label htmlFor="modal-company" className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="modal-company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Financial Partners"
                    className="block w-full rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>

                <div>
                  <Label htmlFor="modal-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Workflow Bottleneck (Optional)
                  </Label>
                  <textarea
                    id="modal-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g., high document chasing overhead during tax season..."
                    className="block w-full rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 cursor-pointer h-auto"
                  >
                    Confirm Consultation Request
                  </Button>
                  <p className="mt-2 text-center text-[11px] text-slate-500">
                    No automated email will be triggered in this preview environment.
                  </p>
                </div>
              </form>
            </div>
      )}
      </DialogContent>
    </Dialog>
  );
};


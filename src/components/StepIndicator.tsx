import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <ol className="mb-10 flex items-center">
      {steps.map((label, i) => {
        const isDone = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition ${
                  isDone
                    ? "border-pine bg-pine text-paper"
                    : isCurrent
                      ? "border-pine text-pine"
                      : "border-line text-ink/40"
                }`}
              >
                {isDone ? <Check size={15} /> : i + 1}
              </div>
              <span className={`whitespace-nowrap text-[11px] sm:text-xs ${isCurrent ? "text-ink" : "text-ink/45"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-3 h-px flex-1 ${isDone ? "bg-pine" : "bg-line"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

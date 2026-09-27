import { Loader2, CheckCircle2, AlertCircle, type LucideIcon } from "lucide-react";
import type { OrderStatus } from "../types";

interface StatusConfig {
  label: string;
  classes: string;
  icon: LucideIcon;
  spin?: boolean;
}

const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  processing: { label: "Processing", classes: "bg-gold/15 text-clay", icon: Loader2, spin: true },
  confirmed: { label: "Confirmed", classes: "bg-pine/10 text-pine-dark", icon: CheckCircle2 },
  failed: { label: "Failed", classes: "bg-red-100 text-red-700", icon: AlertCircle },
};

interface StatusBadgeProps {
  status: OrderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.classes}`}
    >
      <Icon size={12} className={config.spin ? "animate-spin" : ""} />
      {config.label}
    </span>
  );
}

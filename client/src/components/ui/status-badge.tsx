import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Truck, Package, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { 
          label: "신규 주문", 
          icon: Clock, 
          className: "bg-success/10 text-success hover:bg-success/20" 
        };
      case "accepted":
        return { 
          label: "수락됨", 
          icon: CheckCircle, 
          className: "bg-primary/10 text-primary hover:bg-primary/20" 
        };
      case "picked_up":
        return { 
          label: "픽업 완료", 
          icon: Package, 
          className: "bg-secondary/10 text-secondary hover:bg-secondary/20" 
        };
      case "in_transit":
        return { 
          label: "이동 중", 
          icon: Truck, 
          className: "bg-warning/10 text-warning hover:bg-warning/20" 
        };
      case "delivered":
        return { 
          label: "완료", 
          icon: CheckCircle, 
          className: "bg-success/10 text-success hover:bg-success/20" 
        };
      case "cancelled":
        return { 
          label: "취소됨", 
          icon: XCircle, 
          className: "bg-destructive/10 text-destructive hover:bg-destructive/20" 
        };
      default:
        return { 
          label: "알 수 없음", 
          icon: Clock, 
          className: "bg-muted/10 text-muted-foreground" 
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge 
      variant="secondary"
      className={cn(
        "px-3 py-1 font-medium rounded-full",
        config.className,
        className
      )}
      data-testid={`status-badge-${status}`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
}

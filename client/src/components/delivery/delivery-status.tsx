import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DeliveryStatusProps {
  status: "pending" | "accepted" | "picked_up" | "in_transit" | "delivered" | "cancelled";
  className?: string;
}

export default function DeliveryStatus({ status, className }: DeliveryStatusProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "대기 중", variant: "secondary" as const };
      case "accepted":
        return { label: "수락됨", variant: "default" as const };
      case "picked_up":
        return { label: "픽업 완료", variant: "default" as const };
      case "in_transit":
        return { label: "이동 중", variant: "secondary" as const };
      case "delivered":
        return { label: "배송 완료", variant: "secondary" as const };
      case "cancelled":
        return { label: "취소됨", variant: "destructive" as const };
      default:
        return { label: "알 수 없음", variant: "secondary" as const };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant}
      className={cn(className)}
      data-testid={`status-${status}`}
    >
      {config.label}
    </Badge>
  );
}

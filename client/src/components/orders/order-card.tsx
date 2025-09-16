import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";
import { MapPin, Clock, Route, X, Check } from "lucide-react";
import type { Order } from "@shared/schema";

interface OrderCardProps {
  order: Order;
  onAccept: () => void;
  onReject: () => void;
  isLoading?: boolean;
}

export default function OrderCard({ order, onAccept, onReject, isLoading }: OrderCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <StatusBadge status={order.status} />
          <div className="text-right">
            <div className="text-lg font-bold text-primary" data-testid={`text-order-fee-${order.id}`}>
              ₩{parseFloat(order.fee).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">예상 수익</div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-success mr-2" />
            <span className="text-sm" data-testid={`text-pickup-${order.id}`}>
              픽업: {order.pickupLocation}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-destructive mr-2" />
            <span className="text-sm" data-testid={`text-delivery-${order.id}`}>
              배송: {order.deliveryLocation}
            </span>
          </div>
          {order.estimatedTime && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground">
                예상 시간: {order.estimatedTime}분
              </span>
            </div>
          )}
          {order.distance && (
            <div className="flex items-center">
              <Route className="w-4 h-4 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground">
                거리: {order.distance}km
              </span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="destructive" 
            className="flex-1"
            onClick={onReject}
            disabled={isLoading}
            data-testid={`button-reject-${order.id}`}
          >
            <X className="w-4 h-4 mr-2" />
            거절
          </Button>
          <Button 
            className="flex-1"
            onClick={onAccept}
            disabled={isLoading}
            data-testid={`button-accept-${order.id}`}
          >
            <Check className="w-4 h-4 mr-2" />
            수락
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

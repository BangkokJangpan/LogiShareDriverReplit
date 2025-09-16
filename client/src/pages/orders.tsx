import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderCard from "@/components/orders/order-card";
import StatusBadge from "@/components/ui/status-badge";
import { RefreshCw } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Order, OrderWithEarnings } from "@shared/schema";

export default function Orders() {
  const driverId = "driver@logishare.com"; // In real app, get from auth context
  const { toast } = useToast();

  const { data: pendingOrders = [], isLoading: pendingLoading, refetch } = useQuery<Order[]>({
    queryKey: ["/api/orders/pending"],
  });

  const { data: driverOrders = [] } = useQuery<OrderWithEarnings[]>({
    queryKey: ["/api/drivers", driverId, "orders"],
  });

  const acceptOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const response = await apiRequest("POST", `/api/orders/${orderId}/accept`, { driverId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders/pending"] });
      queryClient.invalidateQueries({ queryKey: ["/api/drivers", driverId, "orders"] });
      toast({
        title: "주문 수락 완료",
        description: "새로운 배송이 할당되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "주문 수락 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const rejectOrder = (orderId: string) => {
    toast({
      title: "주문 거절",
      description: "주문을 거절했습니다.",
    });
  };

  const completedOrders = driverOrders.filter(order => order.status === "delivered");

  return (
    <div className="p-4 space-y-4" data-testid="orders-content">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">신규 주문</h2>
        <Button 
          size="sm" 
          onClick={() => refetch()}
          disabled={pendingLoading}
          data-testid="button-refresh-orders"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          새로고침
        </Button>
      </div>

      {/* Pending Orders */}
      {pendingLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : pendingOrders.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">현재 배정 가능한 주문이 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        pendingOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onAccept={() => acceptOrderMutation.mutate(order.id)}
            onReject={() => rejectOrder(order.id)}
            isLoading={acceptOrderMutation.isPending}
          />
        ))
      )}

      {/* Completed Deliveries */}
      {completedOrders.length > 0 && (
        <div className="pt-4 border-t border-border">
          <h3 className="text-lg font-semibold mb-3">완료된 배송</h3>
          <div className="space-y-3">
            {completedOrders.map((order) => (
              <Card key={order.id} className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium" data-testid={`text-completed-order-${order.id}`}>
                        주문번호: {order.orderNumber}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.pickupLocation} → {order.deliveryLocation}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        완료시간: {order.completedAt ? new Date(order.completedAt).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : ''}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-success" data-testid={`text-completed-fee-${order.id}`}>
                        ₩{parseFloat(order.fee).toLocaleString()}
                      </div>
                      <StatusBadge status="delivered" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

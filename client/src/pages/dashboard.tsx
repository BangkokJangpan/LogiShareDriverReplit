import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";
import DeliveryStatus from "@/components/delivery/delivery-status";
import { Camera, Check, Navigation, Pause, Headphones } from "lucide-react";
import type { DriverProfile, OrderWithEarnings } from "@shared/schema";

export default function Dashboard() {
  const driverId = "driver@logishare.com"; // In real app, get from auth context

  const { data: profile, isLoading: profileLoading } = useQuery<DriverProfile>({
    queryKey: ["/api/drivers", driverId, "profile"],
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery<OrderWithEarnings[]>({
    queryKey: ["/api/drivers", driverId, "orders"],
  });

  const currentOrder = orders.find(order => order.status === "in_transit" || order.status === "accepted");
  const todayDeliveries = orders.filter(order => 
    order.status === "delivered" && 
    order.completedAt && 
    new Date(order.completedAt).toDateString() === new Date().toDateString()
  ).length;

  const todayEarnings = orders
    .filter(order => 
      order.status === "delivered" && 
      order.completedAt && 
      new Date(order.completedAt).toDateString() === new Date().toDateString()
    )
    .reduce((sum, order) => sum + parseFloat(order.fee), 0);

  if (profileLoading || ordersLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-40 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4" data-testid="dashboard-content">
      {/* Driver Status Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">운전자 상태</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-success font-medium">온라인</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="today-deliveries">
                {todayDeliveries}
              </div>
              <div className="text-sm text-muted-foreground">오늘 배송</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary" data-testid="today-earnings">
                ₩{todayEarnings.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">오늘 수익</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Interface */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-lg">현재 배송 경로</h3>
            <p className="text-sm text-muted-foreground">다음 배송지까지 약 8분 소요</p>
          </div>
          {/* Map container with route visualization */}
          <div className="map-container h-48 relative" data-testid="map-container">
            <div className="delivery-route"></div>
            {/* Current location marker */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg">
              <div className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-75"></div>
            </div>
            {/* Destination marker */}
            <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-destructive rounded-full border-2 border-white shadow-lg"></div>
          </div>
          <div className="p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">서울시 강남구 역삼동</div>
                <div className="text-sm text-muted-foreground">다음 배송지</div>
              </div>
              <Button className="px-4 py-2" data-testid="button-navigation">
                <Navigation className="w-4 h-4 mr-2" />
                길안내
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Delivery Card */}
      {currentOrder && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">현재 배송</h3>
              <StatusBadge status={currentOrder.status} />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium" data-testid="text-order-number">
                    주문번호: {currentOrder.orderNumber}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    픽업: {currentOrder.pickupLocation}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    배송: {currentOrder.deliveryLocation}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary" data-testid="text-order-fee">
                    ₩{parseFloat(currentOrder.fee).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">배송비</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="default" 
                  className="flex-1 bg-success hover:bg-success/90"
                  data-testid="button-upload-photo"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  사진 업로드
                </Button>
                <Button className="flex-1" data-testid="button-complete-delivery">
                  <Check className="w-4 h-4 mr-2" />
                  배송 완료
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="p-4 h-auto flex-col space-y-2"
          data-testid="button-break"
        >
          <Pause className="w-6 h-6 text-muted-foreground" />
          <span className="font-medium">휴식</span>
        </Button>
        <Button 
          variant="outline" 
          className="p-4 h-auto flex-col space-y-2"
          data-testid="button-support"
        >
          <Headphones className="w-6 h-6 text-muted-foreground" />
          <span className="font-medium">고객센터</span>
        </Button>
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, User, Star, CircleHelp, LogOut } from "lucide-react";
import type { DriverProfile } from "@shared/schema";

export default function Profile() {
  const driverId = "driver@logishare.com"; // In real app, get from auth context

  const { data: profile, isLoading } = useQuery<DriverProfile>({
    queryKey: ["/api/drivers", driverId, "profile"],
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">프로필을 불러올 수 없습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4" data-testid="profile-content">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">드라이버 프로필</h2>
        <Button size="sm" data-testid="button-edit-profile">
          <Edit className="w-4 h-4 mr-2" />
          편집
        </Button>
      </div>

      {/* Driver Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            {/* Driver profile image placeholder */}
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold" data-testid="text-driver-name">
                {profile.name}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="text-driver-phone">
                {profile.phone}
              </p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2" data-testid="text-driver-rating">
                  {profile.rating} (128개 리뷰)
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary" data-testid="text-total-deliveries">
                {profile.totalDeliveries}
              </div>
              <div className="text-sm text-muted-foreground">총 배송 수</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary" data-testid="text-completion-rate">
                {profile.completionRate}%
              </div>
              <div className="text-sm text-muted-foreground">완료율</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      {profile.vehicle && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">차량 정보</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">차량 번호</span>
                <span className="font-medium" data-testid="text-license-plate">
                  {profile.vehicle.licensePlate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">차량 모델</span>
                <span className="font-medium" data-testid="text-vehicle-model">
                  {profile.vehicle.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">적재량</span>
                <span className="font-medium" data-testid="text-vehicle-capacity">
                  {profile.vehicle.capacity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">보험 만료일</span>
                <span className="font-medium text-success" data-testid="text-insurance-expiry">
                  {profile.vehicle.insuranceExpiry}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* License Information */}
      {profile.license && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">면허 정보</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">운전면허</span>
                <span className="font-medium" data-testid="text-license-type">
                  {profile.license.licenseType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">면허 번호</span>
                <span className="font-medium" data-testid="text-license-number">
                  {profile.license.licenseNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">발급일</span>
                <span className="font-medium" data-testid="text-license-issue-date">
                  {profile.license.issueDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">갱신일</span>
                <span className="font-medium text-warning" data-testid="text-license-renewal-date">
                  {profile.license.renewalDate}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">설정</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>푸시 알림</span>
              <Switch defaultChecked data-testid="switch-push-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <span>자동 주문 수락</span>
              <Switch data-testid="switch-auto-accept" />
            </div>
            <div className="flex items-center justify-between">
              <span>음성 안내</span>
              <Switch defaultChecked data-testid="switch-voice-guidance" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          data-testid="button-help-support"
        >
          <CircleHelp className="w-5 h-5 mr-2" />
          도움말 및 지원
        </Button>
        <Button 
          variant="destructive" 
          className="w-full justify-start"
          data-testid="button-logout"
        >
          <LogOut className="w-5 h-5 mr-2" />
          로그아웃
        </Button>
      </div>
    </div>
  );
}

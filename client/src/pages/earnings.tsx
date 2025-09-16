import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import type { Earning } from "@shared/schema";

export default function Earnings() {
  const driverId = "driver@logishare.com"; // In real app, get from auth context
  const [period, setPeriod] = useState("weekly");

  const { data: earnings = [], isLoading } = useQuery<Earning[]>({
    queryKey: ["/api/drivers-by-email", driverId, "earnings", period],
  });

  // Calculate weekly totals (mock data for display)
  const weeklyTotal = 420000;
  const totalDeliveries = 67;

  // Mock daily data
  const dailyData = [
    { date: "오늘 (3월 15일)", deliveries: 12, amount: 84000, change: "+12.5%" },
    { date: "어제 (3월 14일)", deliveries: 15, amount: 95500, change: null },
    { date: "3월 13일", deliveries: 9, amount: 71000, change: null },
  ];

  // Mock payment history
  const paymentHistory = [
    { period: "3월 8일 - 3월 14일", amount: 580000, status: "지급 완료" },
    { period: "3월 1일 - 3월 7일", amount: 632500, status: "지급 완료" },
  ];

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4" data-testid="earnings-content">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">수익 현황</h2>
        <Select value={period} onValueChange={setPeriod} data-testid="select-period">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">이번 주</SelectItem>
            <SelectItem value="lastweek">지난 주</SelectItem>
            <SelectItem value="monthly">이번 달</SelectItem>
            <SelectItem value="lastmonth">지난 달</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2" data-testid="text-weekly-total">
              ₩{weeklyTotal.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">이번 주 총 수익</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-secondary mb-2" data-testid="text-total-deliveries">
              {totalDeliveries}
            </div>
            <div className="text-sm text-muted-foreground">완료된 배송</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Breakdown */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">일별 수익</h3>
          <div className="space-y-3">
            {dailyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div>
                  <div className="font-medium" data-testid={`text-daily-date-${index}`}>
                    {day.date}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {day.deliveries}건 배송 완료
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary" data-testid={`text-daily-amount-${index}`}>
                    ₩{day.amount.toLocaleString()}
                  </div>
                  {day.change && (
                    <div className="text-sm text-success">{day.change}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">결제 내역</h3>
          <div className="space-y-3">
            {paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium">주간 정산</div>
                  <div className="text-sm text-muted-foreground" data-testid={`text-payment-period-${index}`}>
                    {payment.period}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-success" data-testid={`text-payment-amount-${index}`}>
                    ₩{payment.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{payment.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

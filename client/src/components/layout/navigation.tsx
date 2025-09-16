import { Gauge, List, DollarSign, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: "dashboard" | "orders" | "earnings" | "profile") => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "dashboard", label: "대시보드", icon: Gauge },
    { id: "orders", label: "주문목록", icon: List },
    { id: "earnings", label: "수익", icon: DollarSign },
    { id: "profile", label: "프로필", icon: UserCog },
  ] as const;

  return (
    <nav className="bg-card border-b border-border sticky top-16 z-40">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-1 py-3 px-4 text-center font-medium transition-colors border-b-2",
                isActive
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              data-testid={`tab-${tab.id}`}
            >
              <Icon className="w-4 h-4 mx-auto mb-1" />
              <div className="text-xs">{tab.label}</div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

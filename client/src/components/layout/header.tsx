import { Truck, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Truck className="w-6 h-6" />
          <h1 className="text-xl font-bold">LogiShare 운전자</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right text-sm">
            <div className="font-medium" data-testid="text-driver-name-header">김민수</div>
            <div className="opacity-90" data-testid="text-driver-status">온라인</div>
          </div>
          <Button 
            size="icon" 
            variant="secondary" 
            className="bg-primary-foreground/10 hover:bg-primary-foreground/20"
            data-testid="button-user-menu"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

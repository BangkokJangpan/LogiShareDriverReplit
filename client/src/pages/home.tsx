import { useState } from "react";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import Dashboard from "./dashboard";
import Orders from "./orders";
import Earnings from "./earnings";
import Profile from "./profile";

type TabType = "dashboard" | "orders" | "earnings" | "profile";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
      case "earnings":
        return <Earnings />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}

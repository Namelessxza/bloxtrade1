import React, { useState } from "react";
import {
  Home,
  TrendingUp,
  Package,
  Users,
  Settings,
  HelpCircle,
  Lock,
  Gamepad2,
  Trophy,
  Coins,
  ShoppingBag,
  Activity,
  Dribbble,
  MoonStar,
} from "lucide-react";
import { SidebarScrollArea } from "@/components/ui/scroll-area";
import { theme } from "@/config/theme";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  count?: number;
  locked?: boolean;
}

export const AppSidebar: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"games" | "sports">("games");
  const [selectedCategory, setSelectedCategory] = useState("home");

  // Add shimmer animation style
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const gameCategories: NavItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "trades", label: "Trading", icon: Activity, count: 3 },
    { id: "teams", label: "Team Up", icon: Users },
    { id: "rewards", label: "Events", icon: Trophy },
    { id: "inventory", label: "My Trades", icon: Package },
    { id: "trending", label: "Pet Sniper", icon: MoonStar, count: 24 },
  ];

  const sportCategories: NavItem[] = [
    { id: "football", label: "Football", icon: Trophy },
    { id: "basketball", label: "Basketball", icon: Activity },
    { id: "esports", label: "Esports", icon: Gamepad2 },
    { id: "tennis", label: "Tennis", icon: Trophy },
  ];

  const currentCategories =
    activeMode === "games" ? gameCategories : sportCategories;

  return (
    <div
      className="flex flex-col h-full bg-[#0c1321]"
      style={{
        backgroundColor: "#0c1321",
      }}
    >
      {/* Mode Toggle */}
      <div className="p-4 bg-[#0c1321]">
        <div className="flex p-1.5 rounded-full bg-[#09101d]">
          <ModeButton
            active={activeMode === "games"}
            onClick={() => setActiveMode("games")}
            label="Games"
            icon={Gamepad2}
          />
          <ModeButton
            active={activeMode === "sports"}
            onClick={() => setActiveMode("sports")}
            label="Sport"
            icon={Dribbble}
            locked
          />
        </div>
      </div>
      {/* Navigation Items with Container */}
      <SidebarScrollArea className="flex-1 px-1 bg-[#0C1321] relative">
        <div className="p-3 space-y-1.5 rounded-xl ml-0 mr-1 mt-2 bg-[#09101D]">
          {currentCategories.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              selected={selectedCategory === item.id}
              onClick={() => !item.locked && setSelectedCategory(item.id)}
            />
          ))}
        </div>
      </SidebarScrollArea>
      {/* Bottom Actions */}
      <div className="p-3 space-y-1.5 rounded-xl ml-0 mr-1 mb-2 bg-[#09101D]">
        <NavItem
          item={{ id: "help", label: "Help Center", icon: HelpCircle }}
          selected={false}
          onClick={() => {}}
        />
        <NavItem
          item={{ id: "settings", label: "Settings", icon: Settings }}
          selected={false}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

const ModeButton: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string | React.ElementType;
  locked?: boolean;
}> = ({ active, onClick, label, icon, locked }) => {
  const Icon = typeof icon === "string" ? null : icon;
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className="flex-1 px-4 py-2 rounded-full transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      style={{
        background: active
          ? "linear-gradient(135deg, #67e8f9, #06b6d4, #0891b2)"
          : "transparent",
        color: active ? "#FFFFFF" : "#64748B",
        opacity: locked ? 0.4 : 1,
        cursor: locked ? "not-allowed" : "pointer",
        border: active ? "1px solid #67e8f9" : "none",
        boxShadow: active ? "inset 0 4px 8px rgba(0,0,0,0.3)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!active && !locked) {
          e.currentTarget.style.backgroundColor = "rgba(0, 212, 255, 0.08)";
          e.currentTarget.style.color = "#94A3B8";
        }
      }}
      onMouseLeave={(e) => {
        if (!active && !locked) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#64748B";
        }
      }}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span className="font-semibold text-sm">{label}</span>
      {locked && <Lock className="h-3 w-3 ml-1" />}
    </button>
  );
};

const NavItem: React.FC<{
  item: NavItem;
  selected: boolean;
  onClick: () => void;
}> = ({ item, selected, onClick }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      disabled={item.locked}
      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden"
      style={{
        background: item.id === "trending" 
          ? selected
            ? "linear-gradient(135deg, rgba(184, 80, 231, 0.3), rgba(245, 155, 243, 0.25))"
            : "linear-gradient(135deg, rgba(184, 80, 231, 0.15), rgba(245, 155, 243, 0.12))"
          : selected 
            ? "rgba(30, 41, 59, 0.5)" 
            : "transparent",
        color: item.id === "trending"
          ? selected 
            ? "#FFFFFF"
            : "#F59BF3"
          : selected
            ? theme.colors.text.primary
            : theme.colors.text.secondary,
        opacity: item.locked ? 0.5 : 1,
        cursor: item.locked ? "not-allowed" : "pointer",
        borderLeft: item.id === "trending"
          ? selected 
            ? "3px solid #F59BF3"
            : "3px solid rgba(245, 155, 243, 0.6)"
          : selected
            ? "3px solid #06b6d4"
            : "3px solid transparent",
        borderTop: item.id === "trending" ? "1px solid rgba(245, 155, 243, 0.2)" : "1px solid transparent",
        borderRight: item.id === "trending" ? "1px solid rgba(245, 155, 243, 0.2)" : "1px solid transparent",
        borderBottom: item.id === "trending" ? "1px solid rgba(245, 155, 243, 0.2)" : "1px solid transparent",
        borderRadius: "12px",
      }}
      onMouseEnter={(e) => {
        if (!selected && !item.locked) {
          if (item.id === "trending") {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(184, 80, 231, 0.25), rgba(245, 155, 243, 0.2))";
            e.currentTarget.style.borderLeft = "3px solid rgba(245, 155, 243, 0.8)";
          } else {
            e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.3)";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!selected && !item.locked) {
          if (item.id === "trending") {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(184, 80, 231, 0.15), rgba(245, 155, 243, 0.12))";
            e.currentTarget.style.borderLeft = "3px solid rgba(245, 155, 243, 0.6)";
          } else {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }
      }}
    >
      <div className="flex items-center gap-3 relative z-10">
        <Icon className="h-5 w-5" />
        <span className="font-medium text-sm">{item.label}</span>
      </div>
      {item.count && (
        <span
          className="text-xs px-2 py-0.5 rounded-full font-bold relative z-10"
          style={{
            backgroundColor: item.id === "trending"
              ? selected
                ? "#FFFFFF"
                : "rgba(245, 155, 243, 0.9)"
              : selected
                ? theme.colors.primary.full
                : theme.colors.primary["200"],
            color: item.id === "trending"
              ? selected
                ? "#B850E7"
                : "#FFFFFF"
              : theme.colors.text.primary,
            border: item.id === "trending" ? "1px solid rgba(245, 155, 243, 0.3)" : "none",
            minWidth: "20px",
            textAlign: "center",
          }}
        >
          {item.count}
        </span>
      )}
      {item.locked && <Lock className="h-4 w-4 relative z-10" />}
    </button>
  );
};

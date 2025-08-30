import { useState } from "react";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  Settings, 
  Shield, 
  History, 
  CreditCard,
  Info,
  Trophy,
  Timer,
  Target,
  DollarSign,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export default function ProfileUser() {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState("overview");

  // Demo data for "test" user
  const userData = {
    username: username || "test",
    displayName: "Devon Lane",
    avatar: "/api/placeholder/80/80",
    reputation: {
      score: "400"
    },
    stats: {
      totalTrades: "70k",
      totalItems: "1.07m", 
      totalValue: "209,450",
      topRating: "100k",
      bestDeal: "1,232",
      memberSince: "2y 5m 12d",
      lastSeen: "2 hours ago"
    },
    isVerified: false
  };

  const favoriteItems = [
    {
      id: 1,
      name: "Legendary Sword Pack",
      image: "/api/placeholder/120/80",
      value: 169.43,
      isPositive: true
    },
    {
      id: 2,
      name: "Dragon Armor Set",
      image: "/api/placeholder/120/80", 
      value: 779.58,
      isPositive: true
    },
    {
      id: 3,
      name: "Speed Boost Collection",
      image: "/api/placeholder/120/80",
      value: 630.44,
      isPositive: true
    },
    {
      id: 4,
      name: "Royal Cosmetic Bundle",
      image: "/api/placeholder/120/80",
      value: 913.65,
      isPositive: true
    }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "trades", label: "Trade History", icon: History },
    { id: "transactions", label: "Transactions History", icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <div className="bg-[#1e293b] px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-lg text-slate-300 mb-2">Hello, {userData.displayName}</h1>
          </div>
          
          <div className="flex items-start justify-between">
            {/* Profile Info */}
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userData.avatar} alt={userData.username} />
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white text-2xl font-bold">
                  {userData.displayName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">{userData.displayName}</h2>
                </div>
                <div className="text-slate-400 text-sm space-y-1">
                  <div>
                    <span>Reputation</span>
                    <div className="text-white font-medium">{userData.reputation.score}</div>
                  </div>
                  <div>
                    <span>Last seen</span>
                    <div className="text-green-400 font-medium">{userData.stats.lastSeen}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Display */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-12 text-center">
                <div className="text-3xl font-bold text-cyan-400">{userData.stats.totalTrades}</div>
                <div className="text-3xl font-bold text-blue-400">{userData.stats.totalItems}</div>
                <div className="text-3xl font-bold text-green-400">{userData.stats.totalValue}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-12 text-center">
                <div className="text-2xl font-bold text-purple-400">{userData.stats.topRating}</div>
                <div className="text-2xl font-bold text-yellow-400">{userData.stats.bestDeal}</div>
                <div className="text-xl font-medium text-slate-300">{userData.stats.memberSince}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#1e293b] border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-500 text-white"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                  data-testid={`tab-${tab.id}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Account Verification */}
            <Card className="bg-[#4c1d95]/20 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Info className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Verify account</h3>
                      <p className="text-slate-400 text-sm">
                        Complete the verification process to confirm your identity and access premium trading features.
                      </p>
                    </div>
                  </div>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2"
                    data-testid="button-verify-start"
                  >
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Favorite Items */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Favorite items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteItems.map((item) => (
                  <Card key={item.id} className="bg-[#1e293b] border-slate-700/50 overflow-hidden">
                    <div className="aspect-video bg-slate-800 relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="text-white font-medium text-sm mb-2 line-clamp-2">
                        {item.name}
                      </h4>
                      <div className="text-xs text-slate-400 mb-1">Value</div>
                      <div className={`flex items-center gap-1 text-sm font-bold ${
                        item.isPositive ? "text-green-400" : "text-red-400"
                      }`}>
                        {item.isPositive ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        {item.value.toFixed(0)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab !== "overview" && (
          <div className="text-center py-16">
            <div className="text-slate-400 text-lg">
              {tabs.find(t => t.id === activeTab)?.label} content coming soon...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
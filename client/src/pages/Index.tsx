import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea, ChatScrollArea, SidebarScrollArea } from "@/components/ui/scroll-area";
import {
  Gamepad2,
  Star,
  TrendingUp,
  Users,
  MessageCircle,
  Send,
  Search,
  Bell,
  Lock,
  Clock,
  ShoppingCart,
  Wallet,
  User,
  CreditCard,
  HeadphonesIcon,
  Smile,
  FileText,
  Grid3x3,
  Trophy,
  Zap,
  Heart,
  Home,
  X,
  Check,
} from "lucide-react";

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  avatar?: string;
  timestamp: Date;
  isAdmin?: boolean;
}

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [activeMode, setActiveMode] = useState<"games" | "sport">("games");
  const [activeChatTab, setActiveChatTab] = useState("friends");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      username: "Manager",
      message: "What JB equivalent to money?",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "🎯",
    },
    {
      id: "2",
      username: "Manager",
      message:
        "please do not believe those who contact you from other webs/apps. if you encounter problems, please contact Live Support",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "🎯",
    },
    {
      id: "3",
      username: "Manager",
      message: "being empty doesnt feel sucks anymore",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "😭",
    },
    {
      id: "4",
      username: "Manager",
      message: "lol...its well for eyes....u know whats my meant? 😍 lol",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "🤤",
    },
    {
      id: "5",
      username: "Manager",
      message: "ban",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "🛡️",
      isAdmin: true,
    },
    {
      id: "6",
      username: "Manager",
      message:
        "HIRING: Looking for someone to take care of me financially. full time only.",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "💰",
    },
    {
      id: "7",
      username: "Manager",
      message: "congrats",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "💡",
    },
    {
      id: "8",
      username: "Manager",
      message: "My payment not completed",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "🚫",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers] = useState(122);

  const gameCategories = [
    { id: "home", label: "Home", icon: Home, count: 45 },
    { id: "live", label: "Trading", icon: Users, count: 45 },
    { id: "private", label: "Private Servers", icon: Gamepad2, count: 20 },
    { id: "events", label: "Events", icon: Star },
    { id: "petsniper", label: "Pet Sniper", icon: Grid3x3 },
  ];

  const sportCategories = [
    { id: "all-sports", label: "All Sports", icon: Grid3x3, count: 89 },
    { id: "football", label: "Football", icon: Trophy, count: 32 },
    { id: "basketball", label: "Basketball", icon: Zap, count: 18 },
    { id: "tennis", label: "Tennis", icon: Star, count: 15 },
    { id: "esports", label: "Esports", icon: Gamepad2, count: 24 },
    { id: "live-betting", label: "Live Betting", icon: Users, count: 12 },
    { id: "favorites-sport", label: "Favorites", icon: Heart, count: 3 },
  ];

  const currentCategories =
    activeMode === "games" ? gameCategories : sportCategories;

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        username: "You",
        message: newMessage,
        timestamp: new Date(),
        avatar: "ME",
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen bg-[#050810] flex flex-col w-full overflow-hidden relative">
      {/* Modern animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-emerald-500/5 animate-pulse" />
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 40%),
                         radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 40%),
                         radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 40%)`
      }} />
      {/* Modern Glass Header */}
      <header className="h-[70px] backdrop-blur-xl bg-white/[0.02] border-b border-white/[0.05] flex items-center px-6 w-full z-20 relative">
        {/* Modern Logo */}
        <div className="flex items-center gap-2 w-1/4 justify-start ml-8">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <TrendingUp className="h-6 w-6 text-white relative z-10" />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            GameXchange
          </span>
        </div>

        {/* Modern Glass Search */}
        <div className="flex justify-center w-1/2 -ml-16">
          <div className="relative w-3/4 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
            <Input
              placeholder="Search items, skins, collectibles..."
              className="w-full pl-12 pr-4 py-3 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl text-white placeholder:text-slate-400 focus:bg-white/[0.05] focus:border-cyan-400/50 transition-all duration-300 h-12 hover:bg-white/[0.04]"
              data-testid="input-search"
            />
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-4 w-1/4 justify-end mr-4">
          {/* Modern Glass Notification */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm border border-white/[0.05] transition-all duration-300"
            data-testid="button-notifications"
          >
            <Bell className="h-4 w-4 text-slate-300 hover:text-white" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
          </Button>

          {/* Modern Glass Cart */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm border border-white/[0.05] transition-all duration-300"
            data-testid="button-cart"
          >
            <ShoppingCart className="h-4 w-4 text-slate-300 hover:text-white" />
          </Button>

          

          {/* Modern Glass Components Button */}
          <Link href="/components">
            <Button
              className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 border border-white/10"
              data-testid="button-components"
            >
              <Grid3x3 className="h-3 w-3" />
              Components
            </Button>
          </Link>

          {/* Modern Glowing Profile Button */}
          <button
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-bold rounded-xl flex items-center gap-2 px-5 py-2.5 text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 relative overflow-hidden group border border-white/10"
            data-testid="button-profile"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <User className="h-4 w-4 relative z-10" />
            <span className="relative z-10">Profile</span>
          </button>
        </div>
      </header>
      {/* Content Row */}
      <div className="flex flex-row flex-1 min-h-0">
        {/* Modern Glass Sidebar */}
        <div className="w-[275px] flex flex-col flex-shrink-0 bg-white/[0.02] backdrop-blur-xl border-r border-white/[0.05] relative">
          {/* Modern Toggle Switch */}
          <div className="px-2 py-6">
            <div className="flex rounded-2xl p-1.5 relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.08]">
              <button
                onClick={() => setActiveMode("games")}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 px-4 py-2 text-sm flex-1 shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105"
              >
                <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
                <span>SAB</span>
              </button>
              <button
                disabled
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 text-slate-500 cursor-not-allowed relative opacity-40 bg-white/[0.02]"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center relative">
                  <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                    <Lock className="h-1.5 w-1.5 text-white" />
                  </div>
                </div>
                <span>GAG</span>
              </button>
            </div>
          </div>

          {/* Game Categories */}
          <SidebarScrollArea className="flex-1 px-2 py-4">
            {/* Section Header */}
            <div className="px-2 py-1 mb-3">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {activeMode === "games" ? "Steal A Brainrot" : "Grow A Garden"}
              </h3>
            </div>
            <div className="space-y-2">
              {currentCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                        : "hover:bg-white/[0.03] text-slate-400 hover:text-white border border-transparent hover:border-white/[0.05]"
                    }`}
                    data-testid={`button-category-${category.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span className="font-bold">{category.label}</span>
                    </div>
                    <span className="text-xs opacity-60">{category.count}</span>
                  </button>
                );
              })}
            </div>
          </SidebarScrollArea>

          {/* Bottom Actions */}
          <div className="p-3 space-y-2 from-[#0a1628] to-[#0f1a2e] mt-[15px] mb-[15px] rounded-t-xl bg-[#09101d]">
            <div className="rounded-lg p-3 space-y-2 bg-[#0c1321]">
              <Button
                className="w-full justify-center gap-3 bg-slate-700/60 hover:bg-slate-600/60 text-slate-300 hover:text-white text-sm rounded-lg font-bold"
                data-testid="button-buy-crypto"
              >
                <CreditCard className="h-4 w-4" />
                Buy crypto
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 text-sm rounded-lg"
                data-testid="button-support"
              >
                <HeadphonesIcon className="h-4 w-4" />
                Support
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Main Content */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="min-h-full px-6 py-6 bg-transparent relative">
              {/* Trading Bonus Container */}
              <div className="relative overflow-hidden rounded-3xl p-6 mb-6 min-h-[200px] backdrop-blur-sm border border-white/[0.08] shadow-2xl" style={{background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.1)), url("/vca.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                
                
                
                <div className="relative z-10 h-full flex items-center justify-between">
                  {/* Left Content */}
                  <div className="flex-1 max-w-4xl ml-[60px]">
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-2xl">
                      <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">TRADE WITH</span>
                    </h2>
                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-2xl">
                      <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">$5000 BONUS</span>
                    </h3>
                    <p className="text-2xl lg:text-3xl font-black mb-6 drop-shadow-xl">
                      <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">+ FREE ITEMS!</span>
                    </p>
                    
                    {/* Timer Section */}
                    <div className="mb-6">
                      <p className="text-base font-semibold text-sky-100 mb-3 uppercase tracking-wider">
                        TIME LEFT
                      </p>
                      <div className="flex gap-4">
                        <div className="relative bg-white/[0.08] backdrop-blur-md rounded-2xl px-10 py-4 min-w-[120px] text-center border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300 group">
                          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative text-2xl font-black text-white drop-shadow-lg">09</div>
                        </div>
                        <div className="relative bg-white/[0.08] backdrop-blur-md rounded-2xl px-10 py-4 min-w-[120px] text-center border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300 group">
                          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative text-2xl font-black text-white drop-shadow-lg">11</div>
                        </div>
                        <div className="relative bg-white/[0.08] backdrop-blur-md rounded-2xl px-10 py-4 min-w-[120px] text-center border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300 group">
                          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative text-2xl font-black text-white drop-shadow-lg">44</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Claim Button */}
                    <button
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-bold rounded-xl border border-white/20 flex items-center gap-2 px-20 py-4 text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative z-10">CLAIM BONUS</span>
                    </button>
                  </div>
                  
                  
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Modern Glass Chat Panel */}
        <div className="w-[396px] bg-transparent flex flex-col flex-shrink-0 relative">
          {/* Glass Chat Container */}
          <div className="flex flex-col h-full bg-white/[0.02] backdrop-blur-xl border-l border-white/[0.05]">
            {/* Modern Chat Tabs */}
            <div className="p-3 border-b border-white/[0.05]">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveChatTab("chat")}
                  className={`flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-all duration-300 whitespace-nowrap ${
                    activeChatTab === "chat"
                      ? "text-white border-cyan-400 drop-shadow-lg"
                      : "text-slate-500 border-transparent hover:text-slate-300"
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Global Chat
                </button>
                <button
                  onClick={() => setActiveChatTab("messages")}
                  className={`flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-all duration-300 whitespace-nowrap ${
                    activeChatTab === "messages"
                      ? "text-white border-cyan-400 drop-shadow-lg"
                      : "text-slate-500 border-transparent hover:text-slate-300"
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Messages
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center shadow-lg shadow-orange-500/30 animate-pulse">
                    4
                  </span>
                </button>
                <button
                  onClick={() => setActiveChatTab("friends")}
                  className={`flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-all duration-300 whitespace-nowrap ${
                    activeChatTab === "friends"
                      ? "text-white border-purple-400 drop-shadow-lg"
                      : "text-slate-500 border-transparent hover:text-slate-300"
                  }`}
                >
                  <User className="h-4 w-4" />
                  Trades
                </button>
              </div>
            </div>

            {/* Content Area */}
            <ChatScrollArea className="flex-1 px-3 py-2">
              {activeChatTab === "friends" && (
                <div className="space-y-4">
                  {/* Friend Requests */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Friend Request (2)</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">W</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Wingwon</div>
                            <div className="text-xs text-green-400">Online</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="w-7 h-7 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center">
                            <X className="h-4 w-4 text-white" />
                          </button>
                          <button className="w-7 h-7 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">J</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Jacob Clark 89</div>
                            <div className="text-xs text-green-400">Online</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="w-7 h-7 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center">
                            <X className="h-4 w-4 text-white" />
                          </button>
                          <button className="w-7 h-7 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Online Friends */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Online (4)</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 hover:bg-slate-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">C</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Cyber pilot</div>
                            <div className="text-xs text-blue-400">Playing Tiki Runner 2</div>
                          </div>
                        </div>
                        <button className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600 rounded-lg flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-slate-400" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-2 hover:bg-slate-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">F</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Future Saruman_</div>
                            <div className="text-xs text-green-400">Online</div>
                          </div>
                        </div>
                        <button className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600 rounded-lg flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Offline Friends */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Offline (12)</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 hover:bg-slate-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center opacity-60">
                            <span className="text-white text-sm font-bold">A</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-400">Anchovy King</div>
                            <div className="text-xs text-slate-500">Offline</div>
                          </div>
                        </div>
                        <button className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600 rounded-lg flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-slate-400" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-2 hover:bg-slate-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center opacity-60">
                            <span className="text-white text-sm font-bold">A</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-400">Alan Frost</div>
                            <div className="text-xs text-slate-500">Offline</div>
                          </div>
                        </div>
                        <button className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600 rounded-lg flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeChatTab === "chat" && (
                <div className="space-y-3">
                  {chatMessages.map((msg, index) => {
                    return (
                      <div
                        key={msg.id}
                        className="flex gap-3 items-start hover:bg-white/[0.02] rounded-lg p-2 transition-all duration-200"
                        data-testid={`message-${msg.id}`}
                      >
                        <div className="relative flex-shrink-0">
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium shadow-lg shadow-cyan-500/20">
                            {msg.avatar}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-[#94a3b8]">
                              {msg.username}
                            </span>
                            {msg.isAdmin && (
                              <span className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-bold">
                                ADMIN
                              </span>
                            )}
                            <div className="flex items-center gap-1 ml-auto">
                              <span className="text-xs text-gray-400">
                                2s ago
                              </span>
                              <MessageCircle className="h-3 w-3 text-gray-400" />
                            </div>
                          </div>
                          <div className="rounded-lg px-3 py-2 inline-block max-w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.05]">
                            <p className="text-sm text-white/90 leading-relaxed break-words">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeChatTab === "messages" && (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                  <div className="text-slate-400">No messages yet</div>
                </div>
              )}
            </ChatScrollArea>

            {/* Modern Glass Chat Input */}
            {activeChatTab === "chat" && (
              <div className="p-3 border-t border-white/[0.05]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="relative"
                >
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Your message"
                    className="w-full h-10 px-4 pr-12 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-lg text-white placeholder:text-gray-500 focus:bg-white/[0.05] focus:border-cyan-400/50 text-sm transition-all duration-300"
                    data-testid="input-chat-message"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-lg w-6 h-6 p-0 flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all duration-300"
                    data-testid="button-send-message"
                  >
                    <Send className="h-3 w-3 text-white" />
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

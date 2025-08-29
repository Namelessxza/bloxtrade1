import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeMode, setActiveMode] = useState<"games" | "sport">("games");
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
    { id: "live", label: "Trading", icon: Users, count: 45 },
    { id: "Private", label: "Private Servers", icon: Gamepad2, count: 20 },
    { id: "events", label: "Events", icon: Star },
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
    <div className="h-screen bg-gradient-to-br from-[#0a1628] via-[#0f1629] to-[#142447] flex flex-col w-full overflow-hidden">
      {/* Global Header */}
      <header className="h-16 backdrop-blur-sm flex items-center px-6 from-[#0a1628] to-[#0f1a2e] w-full z-10 shadow-lg bg-[#081834]">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2 w-1/4 justify-start ml-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
            Bloxtrade
          </span>
        </div>

        {/* Center Section - Search */}
        <div className="flex justify-center w-1/2 -ml-16">
          <div className="relative w-3/4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search items, skins, collectibles..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800/30 rounded-xl text-slate-200 placeholder:text-slate-400 focus:bg-slate-700/30 transition-all h-12 backdrop-blur-sm"
              data-testid="input-search"
            />
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-4 w-1/4 justify-end mr-4">
          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/60"
            data-testid="button-notifications"
          >
            <Bell className="h-4 w-4 text-slate-400 hover:text-white" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          </Button>

          {/* Shopping Cart */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/60"
            data-testid="button-cart"
          >
            <ShoppingCart className="h-4 w-4 text-slate-400 hover:text-white" />
          </Button>

          {/* Wallet Balance */}
          <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-lg">
            <Wallet className="h-4 w-4 text-slate-400" />
            <span
              className="text-white font-semibold"
              data-testid="text-wallet-balance"
            >
              $2,485
            </span>
          </div>

          {/* Profile Button */}
          <Button
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
            data-testid="button-profile"
          >
            <User className="h-3 w-3" />
            Profile
          </Button>
        </div>
      </header>
      {/* Content Row */}
      <div className="flex flex-row flex-1 min-h-0">
        {/* Left Sidebar - Navigation */}
        <div className="w-[220px] flex flex-col flex-shrink-0 bg-[#01112d]">
          {/* Games/Sport Toggle */}
          <div className="px-4 py-6 bg-[#01112d]">
            <div className="flex bg-slate-800/40 rounded-xl p-1.5 relative border border-slate-700/30">
              <div
                className={`absolute top-1.5 left-1.5 h-9 rounded-lg bg-gradient-to-r transition-all duration-300 ease-in-out shadow-lg ${
                  activeMode === "games"
                    ? "from-blue-600 to-cyan-500 w-[calc(50%-6px)] translate-x-0"
                    : "from-slate-600 to-slate-500 w-[calc(50%-6px)] translate-x-full"
                }`}
              />
              <button
                onClick={() => setActiveMode("games")}
                className={`relative z-10 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 flex-1 min-w-0 ${
                  activeMode === "games"
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="truncate">SAB</span>
              </button>
              <button
                disabled
                className="relative z-10 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 flex-1 min-w-0 text-slate-600 cursor-not-allowed"
              >
                <Lock className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">GAG</span>
              </button>
            </div>
          </div>

          {/* Game Categories */}
          <ScrollArea className="relative overflow-hidden flex-1 px-2 py-4 bg-[#01112d]">
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-blue-500/40 to-cyan-500/30 text-blue-300 shadow-lg shadow-blue-500/20 border-l-4 border-l-blue-400"
                        : "hover:bg-slate-800/60 text-slate-400 hover:text-blue-400"
                    }`}
                    data-testid={`button-category-${category.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{category.label}</span>
                    </div>
                    <span className="text-xs opacity-60">{category.count}</span>
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          {/* Bottom Actions */}
          <div className="p-3 space-y-2 from-[#0a1628] to-[#0f1a2e] mt-[15px] mb-[15px] rounded-t-xl bg-[#01112d]">
            <Button
              className="w-full justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm rounded-lg font-semibold"
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Main Content */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="min-h-full px-3 py-2 bg-transparent relative">
              {/* Promotional Banner */}
              <div className="relative overflow-hidden rounded-2xl min-h-[200px] mb-16">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(/vca.jpg)'
                  }}
                ></div>
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="relative p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    {/* Left box */}
                    <div className="flex items-center space-x-3 rounded-lg px-5 py-4 bg-gradient-to-r from-[#a12bd4] via-[#142447] to-[#142447] shadow-md">
                      <div className="flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-br from-[#c041f3] to-[#6f2be3]">
                        <Lock className="w-5 h-5 text-white opacity-90" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] text-white/90 font-medium">Unlock in 7 days</span>
                        <span className="text-[17px] font-extrabold text-white">$200,44</span>
                      </div>
                    </div>

                    {/* Right box */}
                    <div className="flex items-center space-x-3 rounded-lg px-5 py-4 bg-[#142447] shadow-md">
                      <Clock className="w-5 h-5 text-green-400" />
                      <div className="flex flex-col">
                        <span className="text-[15px] text-white/90 font-medium">02:34:00</span>
                        <span className="text-[17px] font-extrabold text-white">$200,44</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      className="buy-crypto-button"
                      data-testid="button-sign-up"
                    >Enter Giveaway</button>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">i</span>
                      </div>
                      <span>How do vault rewards work?</span>
                    </div>
                  </div>
                </div>
              </div>


              

            </div>
          </ScrollArea>
        </div>

        {/* Right Panel */}
        <div className="w-[280px] bg-transparent flex flex-col flex-shrink-0 relative">
          {/* Chat - no longer needs top positioning since header is global */}
          <div className="flex flex-col h-full bg-gradient-to-b from-[#0a1832] to-[#081426] rounded-2xl border border-slate-700/30 shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-[#0d1f40]/90 to-[#1a2847]/90 backdrop-blur-lg border-b border-slate-600/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400/30 to-emerald-500/30 flex items-center justify-center ring-2 ring-green-400/20">
                    <MessageCircle className="h-4 w-4 text-green-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      Live Chat
                    </span>
                    <span className="text-xs text-slate-400">
                      Community discussion
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-300 font-medium">
                      {onlineUsers} online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="relative flex-1 px-4 py-4 max-h-[calc(100vh-180px)] overflow-y-auto">
              <div className="space-y-4">
                {chatMessages.map((msg, index) => {
                  return (
                    <div
                      key={msg.id}
                      className="flex gap-3 items-start p-3 rounded-xl bg-slate-800/20 border border-slate-700/10 hover:bg-slate-800/30 transition-all duration-200"
                      data-testid={`message-${msg.id}`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-blue-400/20">
                          {msg.avatar}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-white">
                            {msg.username}
                          </span>
                          {msg.isAdmin && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                              ADMIN
                            </span>
                          )}
                          <div className="flex items-center gap-1 ml-auto">
                            <span className="text-xs text-slate-400 font-medium">
                              2s ago
                            </span>
                          </div>
                        </div>
                        <div className="rounded-xl px-4 py-3 bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-slate-600/20 backdrop-blur-sm max-w-full">
                          <p className="text-sm text-slate-100 leading-relaxed break-words">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Chat Controls */}
            <div className="p-4 bg-gradient-to-r from-[#0d1f40]/50 to-[#1a2847]/50 backdrop-blur-lg border-t border-slate-600/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-3 items-center"
              >
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 h-12 px-4 bg-slate-800/40 rounded-xl text-white placeholder:text-slate-400 focus:bg-slate-700/50 text-sm border border-slate-600/20 focus:border-blue-400/40 transition-all backdrop-blur-sm"
                  data-testid="input-chat-message"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl w-12 h-12 p-0 flex items-center justify-center shadow-lg ring-2 ring-blue-400/20 hover:ring-blue-400/40 transition-all"
                  data-testid="button-send-message"
                >
                  <Send className="h-5 w-5 text-white" />
                </Button>
              </form>
              <div className="flex items-center gap-2 mt-3 pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-700/30 transition-all border border-slate-600/20 hover:border-slate-500/30"
                >
                  <FileText className="h-3 w-3" />
                  Rules
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-700/30 transition-all border border-slate-600/20 hover:border-slate-500/30"
                >
                  <Smile className="h-3 w-3" />
                  Emoji
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

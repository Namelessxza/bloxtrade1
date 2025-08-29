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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


interface GameTile {
  id: string;
  name: string;
  value: string;
  username: string;
  icon: string;
  gradient: string;
}

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

  const gameTiles: GameTile[] = [
    {
      id: "1",
      name: "Player",
      value: "+60.4$",
      username: "Mas***ew",
      icon: "🍬",
      gradient: "bg-gradient-to-b from-orange-400 to-red-500"
    },
    {
      id: "2",
      name: "Player",
      value: "+100$",
      username: "Mas***ew",
      icon: "🍎",
      gradient: "bg-gradient-to-b from-green-400 to-emerald-500"
    },
    {
      id: "3",
      name: "Player",
      value: "+1300$",
      username: "Mas***ew",
      icon: "🍭",
      gradient: "bg-gradient-to-b from-pink-400 to-rose-500"
    },
    {
      id: "4",
      name: "Player",
      value: "+234$",
      username: "Mas***ew",
      icon: "🎪",
      gradient: "bg-gradient-to-b from-yellow-400 to-orange-500"
    },
    {
      id: "5",
      name: "Player",
      value: "+90$",
      username: "Mas***ew",
      icon: "❤️",
      gradient: "bg-gradient-to-b from-red-400 to-pink-500"
    },
    {
      id: "6",
      name: "Player",
      value: "+40K",
      username: "Mas***ew",
      icon: "💎",
      gradient: "bg-gradient-to-b from-purple-400 to-indigo-500"
    },
    {
      id: "7",
      name: "Player",
      value: "+40K",
      username: "Mas***ew",
      icon: "🎯",
      gradient: "bg-gradient-to-b from-blue-400 to-cyan-500"
    },
    {
      id: "8",
      name: "Player",
      value: "+34.4K",
      username: "Mas***ew",
      icon: "🏆",
      gradient: "bg-gradient-to-b from-amber-400 to-yellow-500"
    },
    {
      id: "9",
      name: "Player",
      value: "+400$",
      username: "Mas***ew",
      icon: "💰",
      gradient: "bg-gradient-to-b from-emerald-400 to-green-500"
    },
    {
      id: "10",
      name: "Player",
      value: "+2400$",
      username: "Mas***ew",
      icon: "🎁",
      gradient: "bg-gradient-to-b from-teal-400 to-blue-500"
    },
    {
      id: "11",
      name: "Player",
      value: "+160$",
      username: "Mas***ew",
      icon: "🍀",
      gradient: "bg-gradient-to-b from-lime-400 to-green-500"
    },
    {
      id: "12",
      name: "Player",
      value: "+130$",
      username: "Mas***ew",
      icon: "⭐",
      gradient: "bg-gradient-to-b from-violet-400 to-purple-500"
    }
  ];

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
    <div className="h-screen bg-background flex flex-col w-full overflow-hidden">
      {/* Global Header */}
      <header className="h-16 backdrop-blur-sm flex items-center px-6 bg-[#0a1628] border-b border-slate-800/30 w-full z-10">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2 w-1/4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
            Bloxtrade
          </span>
        </div>

        {/* Center Section - Search */}
        <div className="flex justify-center w-1/2">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search items, skins, collectibles..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 h-12"
              data-testid="input-search"
            />
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-4 w-1/4 justify-end">
          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 rounded-full hover:bg-slate-700/50"
            data-testid="button-notifications"
          >
            <Bell className="h-4 w-4 text-slate-400 hover:text-white" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          </Button>

          {/* Shopping Cart */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 rounded-full hover:bg-slate-700/50"
            data-testid="button-cart"
          >
            <ShoppingCart className="h-4 w-4 text-slate-400 hover:text-white" />
          </Button>

          {/* Wallet Balance */}
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg">
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
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm"
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
        <div className="w-[220px] bg-[#0a1628] flex flex-col flex-shrink-0">
          {/* Games/Sport Toggle */}
          <div className="p-4 bg-[#0a1628] border-b border-slate-800/30">
            <div className="flex bg-slate-800/50 rounded-full p-1 relative">
              <div
                className={`absolute top-1 left-1 h-8 rounded-full bg-gradient-to-r transition-all duration-300 ease-in-out ${
                  activeMode === "games"
                    ? "from-blue-600 to-cyan-500 w-[calc(50%-4px)] translate-x-0"
                    : "from-slate-600 to-slate-500 w-[calc(50%-4px)] translate-x-full"
                }`}
              />
              <button
                onClick={() => setActiveMode("games")}
                className={`relative z-10 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex-1 min-w-0 ${
                  activeMode === "games"
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="truncate">SAB</span>
              </button>
              <button
                disabled
                className="relative z-10 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex-1 min-w-0 text-slate-600 cursor-not-allowed"
              >
                <Lock className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">GAG</span>
              </button>
            </div>
          </div>

          {/* Game Categories */}
          <ScrollArea className="flex-1 px-2 py-4 bg-transparent">
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
                        ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-l-2 border-blue-500"
                        : "hover:bg-slate-800/50 text-slate-400 hover:text-blue-400"
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
          <div className="p-2 space-y-1 bg-[#0a1628] border-t border-slate-800/30 mt-[15px] mb-[15px]">
            <Button
              className="w-full justify-start gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm"
              data-testid="button-buy-crypto"
            >
              <CreditCard className="h-4 w-4" />
              Buy crypto
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-slate-400 hover:text-white hover:bg-slate-800/50 text-sm"
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
            <div className="min-h-full px-3 py-2 bg-[#0f1629] relative">
              {/* Promotional Banner */}
              <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 min-h-[200px] mb-16">
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
                    <Button
                      size="lg"
                      className="hover:bg-[#12b23f] text-white font-semibold px-10 py-3 rounded-md shadow-md w-fit bg-[#109edb]"
                      data-testid="button-sign-up"
                    >Enter Giveaway</Button>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">i</span>
                      </div>
                      <span>How do vault rewards work?</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Tiles Row - Overlapping bottom of banner */}
              <div className="absolute left-3 right-3 z-10" style={{ top: '170px' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-2 ml-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50 bg-black/20 backdrop-blur-sm"
                      onClick={() => {
                        const container = document.getElementById('game-tiles-container');
                        if (container) {
                          container.scrollBy({ left: -200, behavior: 'smooth' });
                        }
                      }}
                      data-testid="button-scroll-left"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50 bg-black/20 backdrop-blur-sm"
                      onClick={() => {
                        const container = document.getElementById('game-tiles-container');
                        if (container) {
                          container.scrollBy({ left: 200, behavior: 'smooth' });
                        }
                      }}
                      data-testid="button-scroll-right"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div
                  id="game-tiles-container"
                  className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {gameTiles.map((tile) => (
                    <div
                      key={tile.id}
                      className={`flex-shrink-0 w-12 h-16 rounded-md ${tile.gradient} p-1.5 cursor-pointer hover:scale-105 transition-transform shadow-md relative`}
                      data-testid={`tile-game-${tile.id}`}
                    >
                      <div className="flex flex-col items-center justify-center text-center h-full">
                        <div
                          className="text-sm mb-0.5"
                          data-testid={`img-tile-${tile.id}`}
                        >
                          {tile.icon}
                        </div>
                        <h4
                          className="text-[6px] font-medium text-white leading-none mb-0.5 truncate w-full"
                          data-testid={`text-tile-name-${tile.id}`}
                        >
                          {tile.name}
                        </h4>
                        <div
                          className="text-[6px] font-bold text-white mb-0.5"
                          data-testid={`text-tile-value-${tile.id}`}
                        >
                          {tile.value}
                        </div>
                        <div
                          className="text-[5px] text-white/90 truncate w-full"
                          data-testid={`text-tile-username-${tile.id}`}
                        >
                          {tile.username}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "all"
                      ? "bg-pink-600 text-white hover:bg-pink-700"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                  data-testid="tab-all-games"
                >
                  🎮 All games
                </Button>
                <Button
                  variant={selectedCategory === "slots" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("slots")}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "slots"
                      ? "bg-pink-600 text-white hover:bg-pink-700"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                  data-testid="tab-slot-games"
                >
                  🎰 Slot games
                </Button>
                <Button
                  variant={selectedCategory === "roulette" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("roulette")}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "roulette"
                      ? "bg-pink-600 text-white hover:bg-pink-700"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                  data-testid="tab-roulette"
                >
                  🎯 Roulette
                </Button>
                <Button
                  variant={selectedCategory === "popular" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("popular")}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "popular"
                      ? "bg-pink-600 text-white hover:bg-pink-700"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                  data-testid="tab-popular"
                >
                  🔥 Popular
                </Button>
                <Button
                  variant={selectedCategory === "card" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("card")}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "card"
                      ? "bg-pink-600 text-white hover:bg-pink-700"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                  data-testid="tab-card-games"
                >
                  🃏 Card games
                </Button>
                <Button
                  variant={selectedCategory === "top" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("top")}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "top"
                      ? "bg-pink-600 text-white hover:bg-pink-700"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                  data-testid="tab-top-games"
                >
                  🏆 Top games
                </Button>
                <Button
                  variant={selectedCategory === "favorites" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("favorites")}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "favorites"
                      ? "bg-pink-600 text-white hover:bg-pink-700"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                  data-testid="tab-favorites"
                >
                  ⭐ Favorites
                </Button>
              </div>

              </div>

            </div>
          </ScrollArea>
        </div>

        {/* Right Panel */}
        <div className="w-[280px] bg-[#0a1628] flex flex-col flex-shrink-0 relative">
          {/* Chat - no longer needs top positioning since header is global */}
          <div className="flex flex-col bg-[#0a1628] h-full">
            {/* Chat Header */}
            <div className="p-2 bg-[#0f1a2e]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageCircle className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    Online chat
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400 font-medium">
                    {onlineUsers}
                  </span>
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border border-slate-900 flex items-center justify-center text-xs">
                      👨
                    </div>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border border-slate-900 flex items-center justify-center text-xs">
                      👩
                    </div>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-teal-500 border border-slate-900 flex items-center justify-center text-xs">
                      👤
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 px-3 py-2 bg-[#0a1628] max-h-[calc(100vh-120px)] overflow-y-auto">
              <div className="space-y-3">
                {chatMessages.map((msg, index) => {
                  return (
                    <div
                      key={msg.id}
                      className="flex gap-3 items-start"
                      data-testid={`message-${msg.id}`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
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
                        <div className="bg-slate-800/40 rounded-lg px-3 py-2 inline-block max-w-full">
                          <p className="text-sm text-white leading-relaxed break-words">
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
            <div className="p-3 bg-[#0f1a2e] border-t border-slate-700/30">
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
                  placeholder="Your message"
                  className="flex-1 h-12 px-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder:text-gray-400 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-sm"
                  data-testid="input-chat-message"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl w-12 h-12 p-0 flex items-center justify-center"
                  data-testid="button-send-message"
                >
                  <Send className="h-5 w-5 text-white" />
                </Button>
              </form>
              <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-700/30">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white p-2"
                >
                  <FileText className="h-3 w-3" />
                  Rules
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white p-2"
                >
                  <Smile className="h-3 w-3" />
                  Emojies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  Gamepad2,
  Trophy,
  Crown,
  Star,
  Heart,
  Diamond,
  Coins,
  Gift,
  Zap,
  Flame,
  TrendingUp,
  Users,
  MessageCircle,
  Send,
  Search,
  ChevronRight,
  Play,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Home,
  Grid3x3,
  Layers,
  BarChart3,
  Settings,
  HelpCircle,
  CreditCard,
  HeadphonesIcon,
  Image,
  Smile,
  FileText,
  Bell,
  Lock,
  Check,
  ShoppingCart,
  Wallet,
  User,
} from "lucide-react";

interface GameCard {
  id: string;
  title: string;
  category: string;
  image: string;
  value?: string;
  isHot?: boolean;
  isNew?: boolean;
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

  const gameCategories = [
    { id: "live", label: "Trading", icon: Users, count: 45 },
    { id: "Private", label: "Private Servers", icon: Gamepad2, count: 20 },
    { id: "events", label: "Events", icon: Star },
    { id: "petsniper", label: "Pet Sniper", icon: Dice6 },
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

  const topGames: GameCard[] = [
    {
      id: "1",
      title: "Sweet Bonanza",
      category: "Slots",
      image: "🍬",
      value: "+60.43",
    },
    {
      id: "2",
      title: "Gates of Olympus",
      category: "Slots",
      image: "⚡",
      value: "+100.8",
    },
    {
      id: "3",
      title: "Wolf Gold",
      category: "Slots",
      image: "🐺",
      value: "+130.02",
    },
    {
      id: "4",
      title: "Book of Dead",
      category: "Slots",
      image: "📚",
      value: "+234.5",
    },
    {
      id: "5",
      title: "Crazy Time",
      category: "Live",
      image: "🎯",
      value: "+90.3",
      isHot: true,
    },
    {
      id: "6",
      title: "Mega Moolah",
      category: "Jackpot",
      image: "🦁",
      value: "+170.05",
    },
    {
      id: "7",
      title: "Starburst",
      category: "Slots",
      image: "⭐",
      value: "+240.02",
    },
    {
      id: "8",
      title: "Fire Joker",
      category: "Classic",
      image: "🔥",
      value: "+40.02",
      isNew: true,
    },
  ];

  const slotGames: GameCard[] = [
    {
      id: "s1",
      title: "Dog House",
      category: "Slots",
      image: "🐕",
      isHot: true,
    },
    {
      id: "s2",
      title: "Big Bass Splash",
      category: "Fishing",
      image: "🎣",
      isNew: true,
    },
    { id: "s3", title: "Hot Triple Sevens", category: "Classic", image: "7️⃣" },
    { id: "s4", title: "Crank It Up", category: "Music", image: "🎵" },
    { id: "s5", title: "Juicy Fruits", category: "Fruits", image: "🍉" },
    { id: "s6", title: "Sky Bounty", category: "Adventure", image: "☁️" },
  ];

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
            <div className="min-h-full px-3 py-2 space-y-3 bg-[#0f1629]">
              {/* Promotional Banner */}
              <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 min-h-[200px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(/vca.jpg)'
                  }}
                ></div>
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="relative p-5 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    {/* Purple box with spotlight */}
                    <div className="relative">
                      {/* Purple spotlight effect on left side */}
                      <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-purple-500/50 rounded-full blur-xl"></div>
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-purple-400/60 rounded-full blur-lg"></div>
                      <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-purple-300/70 rounded-full blur-md"></div>
                      
                      {/* Main purple box */}
                      <div className="relative bg-[#1a2847] rounded-xl px-3 py-2 flex items-start gap-2 min-w-[140px]">
                        <div className="w-6 h-6 bg-purple-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                          <Lock className="h-3 w-3 text-purple-300" />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-[10px] text-gray-300 mb-0.5">Prize Pool</div>
                          <div className="text-sm font-bold text-white">$50,000 RBX</div>
                        </div>
                      </div>
                    </div>

                    {/* Orange timer box */}
                    <div className="bg-[#2a1810] rounded-xl px-3 py-2 flex items-start gap-2 min-w-[120px]">
                      <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-[10px] text-gray-300 mb-0.5">Ending in</div>
                        <div className="text-sm font-bold text-orange-400">02:34:21</div>
                      </div>
                    </div>

                    {/* Green box */}
                    <div className="bg-[#0e3a2e] rounded-xl px-3 py-2 flex items-start gap-2 min-w-[120px]">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-[10px] text-gray-300 mb-0.5">Entries</div>
                        <div className="text-sm font-bold text-white">1,247</div>
                      </div>
                    </div>
                  </div>

                  {/* Enter giveaway button and info */}
                  <div className="flex flex-col gap-3">
                    <Button
                      size="sm"
                      className="bg-[#00d563] hover:bg-[#00c055] text-white font-bold py-2 px-8 rounded-xl text-sm w-fit"
                      data-testid="button-enter-giveaway"
                    >
                      Enter giveaway
                    </Button>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <div className="w-4 h-4 bg-gray-600/30 rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-gray-300">i</span>
                      </div>
                      <span>How do giveaways work?</span>
                    </div>
                  </div>
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

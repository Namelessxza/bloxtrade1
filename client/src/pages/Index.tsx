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
    { id: "all", label: "All Games", icon: Grid3x3, count: 145 },
    { id: "casino", label: "Casino", icon: Crown, count: 48 },
    { id: "roulette", label: "Roulette", icon: Dice6, count: 12 },
    { id: "slots", label: "Slots", icon: Diamond, count: 67 },
    { id: "popular", label: "Popular", icon: Flame, count: 24 },
    { id: "crash", label: "Crush", icon: TrendingUp, count: 8 },
    { id: "live", label: "Live Games", icon: Users, count: 15 },
    { id: "favorites", label: "Favorites", icon: Heart, count: 0 },
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

  const currentCategories = activeMode === "games" ? gameCategories : sportCategories;

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
    <div className="min-h-screen bg-background flex flex-row w-full">
      {/* Left Sidebar - Navigation */}
      <div className="w-[220px] bg-[#0a1628] flex flex-col flex-shrink-0 h-screen">
        {/* Logo */}
        <div className="p-4 bg-[#0a1628] border-b border-slate-800/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              FIRE<span className="text-red-500">🔥</span>GO
            </span>
          </div>
          
          {/* Games/Sport Toggle */}
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
                activeMode === "games" ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Gamepad2 className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Games</span>
            </button>
            <button
              onClick={() => setActiveMode("sport")}
              className={`relative z-10 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex-1 min-w-0 ${
                activeMode === "sport" ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Trophy className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Sport</span>
            </button>
          </div>
        </div>

        {/* Game Categories */}
        <ScrollArea className="flex-1 px-2 py-4 bg-transparent">
          {/* Section Header */}
          <div className="px-2 py-1 mb-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {activeMode === "games" ? "ALL GAMES" : "ALL SPORTS"}
            </h3>
          </div>
          <div className="space-y-1">
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
        <div className="p-3 space-y-2 bg-[#0a1628] border-t border-slate-800/30">
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
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Top Navigation Bar */}
        <header className="h-16 backdrop-blur-sm flex items-center justify-between px-6 bg-[#0a1628] border-b border-slate-800/30">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search items, skins, collectibles..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 h-12"
              data-testid="input-search"
            />
          </div>
          
          {/* Right Side Balance */}
          <div className="flex items-center gap-2 ml-6">
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg">
              <Wallet className="h-4 w-4 text-slate-400" />
              <span className="text-white font-semibold" data-testid="text-wallet-balance">
                $2,485
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8 bg-[#0f1629]">
            {/* Promotional Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-pink-900/40 border border-blue-500/30">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-xl" />
              </div>
              <div className="relative p-8 flex items-center justify-between">
                <div className="space-y-4 max-w-md">
                  <h1 className="text-3xl font-bold text-white leading-tight">
                    <span className="block text-white text-lg font-medium mb-2">
                      SIGN UP & GET REWARD UP TO
                    </span>
                    <span className="text-4xl bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                      $20 000 and
                    </span>
                    <span className="block text-3xl text-white mt-1">
                      20 FreeSpins
                    </span>
                  </h1>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-8 py-3 rounded-full"
                    data-testid="button-claim-now"
                  >
                    Claim now
                  </Button>
                </div>
                <div className="hidden lg:block relative">
                  <div className="text-8xl" data-testid="img-wizard">
                    🧙‍♂️
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl scale-150" />
                </div>
              </div>
            </div>

            {/* Top Games Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Flame className="h-5 w-5 text-orange-500" />
                  🔥 Fire games
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-cyan-400 hover:text-white text-sm"
                  data-testid="button-view-all-games"
                >
                  🎯 Hot games
                  <div className="flex items-center gap-1 ml-2">
                    <Dice1 className="h-3 w-3" />
                    <Dice2 className="h-3 w-3" />
                  </div>
                  ⭐ Roulette
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-5 lg:grid-cols-10 gap-3">
                {topGames.map((game) => (
                  <div
                    key={game.id}
                    className="group relative overflow-hidden hover:scale-105 transition-transform cursor-pointer bg-slate-800/60 hover:bg-slate-700/60 rounded-lg border border-slate-700/50 hover:border-orange-500/50"
                    data-testid={`card-game-${game.id}`}
                  >
                    <div className="aspect-square flex flex-col items-center justify-center p-3 relative">
                      {game.isHot && (
                        <Badge
                          className="absolute top-2 right-2 bg-red-500 text-white text-xs"
                          data-testid={`badge-hot-${game.id}`}
                        >
                          HOT
                        </Badge>
                      )}
                      {game.isNew && (
                        <Badge
                          className="absolute top-2 right-2 bg-green-500 text-white text-xs"
                          data-testid={`badge-new-${game.id}`}
                        >
                          NEW
                        </Badge>
                      )}
                      <div
                        className="text-2xl mb-1"
                        data-testid={`img-game-${game.id}`}
                      >
                        {game.image}
                      </div>
                      <p
                        className="text-xs text-white font-medium text-center leading-tight"
                        data-testid={`text-game-title-${game.id}`}
                      >
                        {game.title}
                      </p>
                      {game.value && (
                        <p
                          className="text-xs text-green-400 font-semibold mt-1"
                          data-testid={`text-game-value-${game.id}`}
                        >
                          {game.value}
                        </p>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Roulette Section */}
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Dice6 className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Roulette</h3>
                  <Badge className="bg-purple-600 text-white text-xs ml-auto">
                    12 🎯
                  </Badge>
                </div>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-800/40 to-pink-800/40 flex items-center justify-center mb-3">
                  <div className="text-4xl" data-testid="img-roulette">
                    🎰
                  </div>
                </div>
              </div>

              {/* Crash Section */}
              <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl border border-orange-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-orange-400" />
                  <h3 className="text-lg font-bold text-white">Crash</h3>
                  <Badge className="bg-orange-600 text-white text-xs ml-auto">
                    8 🔥
                  </Badge>
                </div>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-orange-800/40 to-red-800/40 flex items-center justify-center mb-3">
                  <div className="text-4xl" data-testid="img-crash">
                    🚀
                  </div>
                </div>
              </div>
              
              {/* Mines Section */}
              <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl border border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Diamond className="h-5 w-5 text-green-400" />
                  <h3 className="text-lg font-bold text-white">Mines</h3>
                  <Badge className="bg-slate-600 text-white text-xs ml-auto">
                    Coming soon
                  </Badge>
                </div>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-green-800/40 to-teal-800/40 flex items-center justify-center mb-3">
                  <div className="text-4xl" data-testid="img-mines">
                    💎
                  </div>
                </div>
              </div>
            </div>

            {/* Slot Games Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Diamond className="h-5 w-5 text-purple-500" />
                  🎰 Slot games
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-cyan-400 hover:text-white text-sm"
                  data-testid="button-view-all-slots"
                >
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
                {slotGames.map((game) => (
                  <div
                    key={game.id}
                    className="group overflow-hidden hover:scale-105 transition-transform cursor-pointer bg-slate-800/60 hover:bg-slate-700/60 rounded-lg border border-slate-700/50 hover:border-orange-500/50"
                    data-testid={`card-slot-${game.id}`}
                  >
                    <div className="aspect-[4/5] relative p-3 flex flex-col items-center justify-center">
                      {game.isHot && (
                        <Badge
                          className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 py-0"
                          data-testid={`badge-slot-hot-${game.id}`}
                        >
                          HOT
                        </Badge>
                      )}
                      {game.isNew && (
                        <Badge
                          className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0"
                          data-testid={`badge-slot-new-${game.id}`}
                        >
                          NEW
                        </Badge>
                      )}
                      <div
                        className="text-3xl mb-2"
                        data-testid={`img-slot-${game.id}`}
                      >
                        {game.image}
                      </div>
                      <h4
                        className="text-xs font-bold text-white text-center leading-tight"
                        data-testid={`text-slot-title-${game.id}`}
                      >
                        {game.title}
                      </h4>
                      <p
                        className="text-xs text-slate-400 text-center mt-1"
                        data-testid={`text-slot-category-${game.id}`}
                      >
                        {game.category}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      {/* Right Panel */}
      <div className="w-[280px] bg-[#0a1628] flex flex-col flex-shrink-0 h-screen">
        {/* Top Section with Profile and Controls */}
        <div className="p-4 bg-[#0a1628]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 rounded-full hover:bg-slate-700/50"
                data-testid="button-notifications-right"
              >
                <Bell className="h-4 w-4 text-slate-400 hover:text-white" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              </Button>
              
              {/* Shopping Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="p-2 rounded-full hover:bg-slate-700/50"
                data-testid="button-cart-right"
              >
                <ShoppingCart className="h-4 w-4 text-slate-400 hover:text-white" />
              </Button>
            </div>
            
            {/* Profile Button */}
            <Button
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm"
              data-testid="button-profile-right"
            >
              <User className="h-3 w-3" />
              Profile
            </Button>
          </div>
        </div>

        {/* Chat Header */}
        <div className="p-3 bg-[#0f1a2e]">
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
        <ScrollArea className="flex-1 px-3 py-2 bg-[#0a1628]">
          <div className="space-y-3">
            {chatMessages.map((msg, index) => {
              const avatarColors = [
                "border-orange-400 bg-orange-900/30",
                "border-blue-400 bg-blue-900/30", 
                "border-green-400 bg-green-900/30",
                "border-purple-400 bg-purple-900/30",
                "border-pink-400 bg-pink-900/30",
                "border-yellow-400 bg-yellow-900/30",
                "border-red-400 bg-red-900/30"
              ];
              return (
                <div
                  key={msg.id}
                  className="p-2 rounded-lg transition-all hover:bg-slate-800/30 bg-slate-800/20"
                  data-testid={`message-${msg.id}`}
                >
                  <div className="flex gap-2 items-start">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 ${avatarColors[index % avatarColors.length]}`}
                      >
                        {msg.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-cyan-400">
                          {msg.username}
                        </span>
                        {msg.isAdmin && (
                          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-1 py-0.5 rounded font-bold">
                            ADMIN
                          </span>
                        )}
                        <span className="text-xs text-slate-500 ml-auto">
                          2 min ago
                        </span>
                      </div>
                      <p className="text-xs text-white leading-relaxed break-words">
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
        <div className="p-3 bg-[#0f1a2e]">
          <div className="flex items-center gap-2 mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 py-1 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-full border border-slate-600/50"
            >
              <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center mr-1">
                <Image className="h-2 w-2 text-white" />
              </div>
              GIF
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 py-1 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-full border border-slate-600/50"
            >
              <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center mr-1">
                <Smile className="h-2 w-2 text-white" />
              </div>
              Emoji
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 py-1 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-full border border-slate-600/50"
            >
              <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center mr-1">
                <FileText className="h-2 w-2 text-white" />
              </div>
              Rules
            </Button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-3"
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Send a message"
              className="flex w-full border py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1 border-[#2a3441] text-slate-300 placeholder:text-slate-500 rounded-full h-11 px-4 bg-[#0e234a]"
              data-testid="input-chat-message"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-full w-11 h-11 p-0 flex items-center justify-center"
              data-testid="button-send-message"
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <Send className="h-3 w-3 text-blue-500" />
              </div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

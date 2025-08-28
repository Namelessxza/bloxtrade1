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
      message: "please do not believe those who contact you from other webs/apps. if you encounter problems, please contact Live Support",
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
      message: "HIRING: Looking for someone to take care of me financially. full time only.",
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
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Navigation */}
      <div className="w-[240px] bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Flame className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FIREGO
            </span>
          </div>
        </div>

        {/* Game Categories */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {gameCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary/10 text-primary border-l-4 border-primary"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
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
        <div className="p-4 border-t border-border space-y-2">
          <Button
            className="w-full justify-start gap-2 bg-primary/10 hover:bg-primary/20 text-primary"
            data-testid="button-buy-crypto"
          >
            <CreditCard className="h-4 w-4" />
            Buy Crypto
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            data-testid="button-support"
          >
            <HeadphonesIcon className="h-4 w-4" />
            Support
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Coins className="h-4 w-4 text-primary" />
              <span className="font-semibold" data-testid="text-balance">
                19,390
              </span>
              <Badge
                variant="secondary"
                className="ml-2"
                data-testid="badge-balance-change"
              >
                +5.1%
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              data-testid="button-daily-bonus"
            >
              <Gift className="h-4 w-4 mr-2" />
              Daily Bonus
            </Button>
            <Link href="/dashboard">
              <Button
                size="sm"
                variant="outline"
                data-testid="button-dashboard"
              >
                Dashboard
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            {/* Promotional Banner */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse" />
              <div className="relative p-8 flex items-center justify-between">
                <div className="space-y-4 max-w-md">
                  <div className="flex items-center gap-2">
                    <Badge
                      className="bg-secondary text-secondary-foreground"
                      data-testid="badge-limited-time"
                    >
                      Limited Time
                    </Badge>
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                  <h1 className="text-4xl font-bold">
                    <span
                      className="block text-foreground"
                      data-testid="text-signup-heading"
                    >
                      SIGN UP & GET REWARDS UP TO
                    </span>
                    <span
                      className="text-5xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                      data-testid="text-reward-amount"
                    >
                      $20,000
                    </span>
                    <span
                      className="block text-2xl text-foreground mt-2"
                      data-testid="text-freespins"
                    >
                      and 20 FreeSpins
                    </span>
                  </h1>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-lg px-8"
                    data-testid="button-claim-now"
                  >
                    Claim Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl" />
                    <div className="relative text-8xl" data-testid="img-wizard">
                      🧙‍♂️
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Top Games Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Flame className="h-6 w-6 text-primary" />
                  Hot Games
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  data-testid="button-view-all-games"
                >
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {topGames.map((game) => (
                  <Card
                    key={game.id}
                    className="group relative overflow-hidden hover:scale-105 transition-transform cursor-pointer bg-card/50 border-border/50 hover:border-primary/50"
                    data-testid={`card-game-${game.id}`}
                  >
                    <div className="aspect-square flex flex-col items-center justify-center p-4 relative">
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
                        className="text-4xl mb-2"
                        data-testid={`img-game-${game.id}`}
                      >
                        {game.image}
                      </div>
                      <p
                        className="text-xs font-medium text-center"
                        data-testid={`text-game-title-${game.id}`}
                      >
                        {game.title}
                      </p>
                      {game.value && (
                        <p
                          className="text-xs text-primary font-semibold mt-1"
                          data-testid={`text-game-value-${game.id}`}
                        >
                          {game.value}
                        </p>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Category Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Roulette Section */}
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Dice6 className="h-5 w-5 text-primary" />
                      Roulette
                    </h3>
                    <Badge
                      variant="secondary"
                      data-testid="badge-roulette-count"
                    >
                      12 games
                    </Badge>
                  </div>
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="text-6xl" data-testid="img-roulette">
                      🎰
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
                    data-testid="button-play-roulette"
                  >
                    Play Now
                  </Button>
                </div>
              </Card>

              {/* Crash Section */}
              <Card className="bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                      Crash
                    </h3>
                    <Badge variant="secondary" data-testid="badge-crash-count">
                      8 games
                    </Badge>
                  </div>
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-6xl" data-testid="img-crash">
                      🚀
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-secondary to-accent"
                    data-testid="button-play-crash"
                  >
                    Play Now
                  </Button>
                </div>
              </Card>
            </div>

            {/* Slot Games Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Diamond className="h-6 w-6 text-primary" />
                  Slot Games
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  data-testid="button-view-all-slots"
                >
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {slotGames.map((game) => (
                  <Card
                    key={game.id}
                    className="group overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                    data-testid={`card-slot-${game.id}`}
                  >
                    <div className="aspect-[4/5] relative bg-gradient-to-b from-card to-card/50">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        {game.isHot && (
                          <Badge
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs"
                            data-testid={`badge-slot-hot-${game.id}`}
                          >
                            HOT
                          </Badge>
                        )}
                        {game.isNew && (
                          <Badge
                            className="absolute top-2 right-2 bg-green-500 text-white text-xs"
                            data-testid={`badge-slot-new-${game.id}`}
                          >
                            NEW
                          </Badge>
                        )}
                        <div
                          className="text-6xl mb-3"
                          data-testid={`img-slot-${game.id}`}
                        >
                          {game.image}
                        </div>
                        <h4
                          className="font-bold text-center"
                          data-testid={`text-slot-title-${game.id}`}
                        >
                          {game.title}
                        </h4>
                        <p
                          className="text-xs text-muted-foreground"
                          data-testid={`text-slot-category-${game.id}`}
                        >
                          {game.category}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="sm"
                          className="bg-white/90 text-primary hover:bg-white"
                          data-testid={`button-play-slot-${game.id}`}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Play
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Right Chat Panel */}
      <div className="w-[280px] bg-slate-900 border-l border-slate-700/50 flex flex-col">
        {/* Balance Display */}
        <div className="p-3 border-b border-slate-700/50 bg-slate-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">$90.4</span>
            <span className="text-slate-400">$500</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-white font-medium">$500 left</span>
            <Button size="sm" className="bg-gradient-to-r from-secondary to-primary text-white px-4 py-1 text-xs h-7">
              Deposit
            </Button>
          </div>
        </div>
        
        {/* Chat Header */}
        <div className="p-3 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                <MessageCircle className="h-3 w-3 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-foreground">Online chat</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">{onlineUsers}</span>
              <div className="flex -space-x-1 ml-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border border-background flex items-center justify-center text-xs">
                  👨
                </div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border border-background flex items-center justify-center text-xs">
                  👩
                </div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-teal-500 border border-background flex items-center justify-center text-xs">
                  👤
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-2 bg-slate-900" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          <div className="space-y-2">
            {chatMessages.map((msg, index) => {
              const isHighlighted = msg.isAdmin || index === 1; // Admin message gets highlighted background
              return (
                <div
                  key={msg.id}
                  className="p-3"
                  data-testid={`message-${msg.id}`}
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base overflow-hidden border-2 ${
                        index === 0 ? 'border-orange-400 bg-gradient-to-br from-orange-500 to-red-600' :
                        index === 1 ? 'border-blue-400 bg-gradient-to-br from-blue-500 to-indigo-600' :
                        index === 2 ? 'border-blue-400 bg-gradient-to-br from-blue-500 to-purple-600' :
                        index === 3 ? 'border-orange-400 bg-gradient-to-br from-orange-500 to-yellow-600' :
                        index === 4 ? 'border-blue-400 bg-gradient-to-br from-blue-500 to-cyan-600' :
                        index === 5 ? 'border-orange-400 bg-gradient-to-br from-orange-500 to-red-600' :
                        index === 6 ? 'border-yellow-400 bg-gradient-to-br from-yellow-500 to-orange-600' :
                        'border-red-400 bg-gradient-to-br from-red-500 to-pink-600'
                      }`}>
                        {msg.avatar}
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-slate-300">
                          {msg.username}
                        </span>
                        {msg.isAdmin && (
                          <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs px-2 py-0.5 rounded-md font-bold">
                            admin
                          </span>
                        )}
                        <span className="text-xs text-slate-400 ml-auto">
                          3:32 AM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 ml-12">
                    <div className={`p-3 rounded-2xl transition-all ${
                      isHighlighted 
                        ? 'bg-slate-700/70' 
                        : 'bg-slate-800/40 hover:bg-slate-800/60'
                    }`}>
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
        <div className="border-t border-border/30 bg-card/50">
          <div className="flex items-center justify-center gap-4 p-3 border-b border-border/20">
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <span className="text-xs">📷</span>
              <span className="text-xs">GIF</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
              <span className="text-xs">😊</span>
              <span className="text-xs">Emoji</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 flex items-center gap-1">
              <span className="text-xs">📋</span>
              <span className="text-xs">Rules</span>
            </Button>
          </div>
          <div className="p-3">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Send a message"
                className="flex-1 bg-muted/30 border-border/50 text-sm h-9"
                data-testid="input-chat-message"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 w-9 h-9 p-0"
                data-testid="button-send-message"
              >
                <Send className="h-3 w-3" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Bell, Package, Star, Clock, ArrowUpCircle, MessageSquare, Settings, Gamepad2, Gift, Zap, Trophy, Crown, Sparkles, Heart, ChevronLeft, BarChart3, User, Target, TrendingUp, Users, CheckCircle, Coins, Flame, Award, BookOpen, Play } from "lucide-react";
import { Link } from "wouter";

interface DashboardStats {
  totalTrades: number;
  completedTrades: number;
  activeTrades: number;
  reputation: number;
  badges: Array<{
    id: string;
    badgeType: string;
    badgeName: string;
    earnedAt: string;
  }>;
}

interface RecentTrade {
  id: string;
  title: string;
  game: string;
  status: string;
  lastBumped: string;
  bumpCount: number;
  createdAt: string;
}

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    enabled: isAuthenticated,
  });

  const { data: recentTrades, isLoading: tradesLoading } = useQuery<RecentTrade[]>({
    queryKey: ["/api/dashboard/recent-trades"],
    enabled: isAuthenticated,
  });

  const { data: notifications } = useQuery<any[]>({
    queryKey: ["/api/notifications", { unread: "true" }],
    enabled: isAuthenticated,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gaming-bg flex items-center justify-center">
        <div className="gaming-card p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "account", label: "My Account", icon: User },
    { id: "trades", label: "My Trades", icon: Package },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gaming-bg">
      {/* Header */}
      <div className="border-b border-border/20 bg-gaming-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2" data-testid="button-go-back">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Go Back</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">
                My Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="gaming-button-secondary"
                data-testid="button-notifications"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {notifications && (notifications as any[]).length > 0 && (
                  <Badge variant="destructive" className="ml-2 px-1 min-w-[1.25rem] h-5">
                    {(notifications as any[]).length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-72 bg-gaming-card/40 border-r border-border/20 p-6 backdrop-blur-sm">
          <div className="mb-8">
            {/* User Profile Card */}
            <Card className="gaming-card border-border/20 bg-gradient-to-br from-primary/10 to-secondary/10 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/30">
                    <AvatarImage src={(user as any)?.profileImageUrl} alt={(user as any)?.firstName || "User"} />
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                      {(user as any)?.firstName?.[0] || (user as any)?.username?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {(user as any)?.firstName || (user as any)?.username || "Trader"}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-muted-foreground">Level 1 Trader</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>XP Progress</span>
                        <span>25/100</span>
                      </div>
                      <Progress value={25} className="h-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-sm font-medium text-muted-foreground mb-4">NAVIGATION</h3>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all ${
                      activeSection === item.id
                        ? "bg-primary/20 text-primary border border-primary/30 shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                    }`}
                    data-testid={`sidebar-${item.id}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Daily Challenge Card */}
            <Card className="gaming-card border-border/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 mt-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <h4 className="text-sm font-semibold text-foreground">Daily Challenge</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Create your first trade today!</p>
                <Progress value={0} className="h-2 mb-2" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">0/1 completed</span>
                  <Badge variant="secondary" className="text-xs">+50 XP</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-gaming-bg via-gaming-bg to-primary/5">
          <div className="max-w-6xl mx-auto p-6">
            {activeSection === "overview" && (
              <div className="space-y-4">
                {/* Welcome Header - Compact */}
                <Card className="gaming-card border-border/20 bg-gradient-to-r from-primary/15 via-secondary/8 to-accent/15">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-1">
                          Welcome back, {(user as any)?.firstName || (user as any)?.username || "Trader"}! 🎮
                        </h2>
                        <p className="text-sm text-muted-foreground mb-2">Ready to level up your trading game?</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="text-xs font-medium">25 XP</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span className="text-xs font-medium">0 day streak</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-3xl">🚀</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Main Content Grid - Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Left Column - Main Actions & Checklist */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Primary Action - Compact */}
                    <Card className="gaming-card border-border/20 bg-gradient-to-br from-primary/10 to-secondary/10 hover:scale-[1.01] transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Package className="h-7 w-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground mb-1">Start Your Trading Journey!</h3>
                            <p className="text-sm text-muted-foreground mb-3">Create your first trade and earn 50 XP</p>
                            <Link href="/create-trade">
                              <Button className="gaming-button-primary" data-testid="button-create-trade">
                                <Zap className="h-4 w-4 mr-2" />
                                Create Your First Trade
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <Link href="/my-trades">
                        <Card className="gaming-card border-border/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
                          <CardContent className="p-4 text-center">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                              <Gamepad2 className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="text-sm font-semibold text-foreground mb-1">My Trades</h4>
                            <p className="text-xs text-muted-foreground">Manage listings</p>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/messages">
                        <Card className="gaming-card border-border/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
                          <CardContent className="p-4 text-center">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                              <MessageSquare className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="text-sm font-semibold text-foreground mb-1">Messages</h4>
                            <p className="text-xs text-muted-foreground">Chat with traders</p>
                          </CardContent>
                        </Card>
                      </Link>

                      <Card className="gaming-card border-border/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <CardContent className="p-4 text-center">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">Learn Trading</h4>
                          <p className="text-xs text-muted-foreground">Tips & tutorials</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Stats Cards - Compact */}
                    <div className="grid grid-cols-4 gap-3">
                      <Card className="gaming-card border-border/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                        <CardContent className="p-3 text-center">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-2">
                            <Package className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-lg font-bold text-foreground" data-testid="text-total-trades">
                            {statsLoading ? "..." : stats?.totalTrades || "0"}
                          </p>
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="text-xs text-primary">Start now!</p>
                        </CardContent>
                      </Card>

                      <Card className="gaming-card border-border/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                        <CardContent className="p-3 text-center">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-2">
                            <TrendingUp className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-lg font-bold text-foreground" data-testid="text-active-trades">
                            {statsLoading ? "..." : stats?.activeTrades || "0"}
                          </p>
                          <p className="text-xs text-muted-foreground">Active</p>
                          <p className="text-xs text-green-500">Ready!</p>
                        </CardContent>
                      </Card>

                      <Card className="gaming-card border-border/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
                        <CardContent className="p-3 text-center">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-2">
                            <Trophy className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-lg font-bold text-foreground" data-testid="text-completed-trades">
                            {statsLoading ? "..." : stats?.completedTrades || "0"}
                          </p>
                          <p className="text-xs text-muted-foreground">Done</p>
                          <p className="text-xs text-yellow-500">First win!</p>
                        </CardContent>
                      </Card>

                      <Card className="gaming-card border-border/20 bg-gradient-to-br from-pink-500/10 to-red-500/10">
                        <CardContent className="p-3 text-center">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mx-auto mb-2">
                            <Star className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-lg font-bold text-foreground" data-testid="text-reputation">
                            L1
                          </p>
                          <p className="text-xs text-muted-foreground">Level</p>
                          <p className="text-xs text-pink-500">Growing!</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Activity */}
                    <Card className="gaming-card border-border/20">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">Recent Activity</CardTitle>
                          </div>
                          <Link href="/my-trades">
                            <Button variant="outline" size="sm" className="gaming-button-secondary" data-testid="link-view-all-trades">
                              View All
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {tradesLoading ? (
                          <div className="space-y-3">
                            {[...Array(2)].map((_, i) => (
                              <div key={i} className="animate-pulse flex items-center space-x-3">
                                <div className="h-8 w-8 bg-muted rounded-full"></div>
                                <div className="flex-1 space-y-1">
                                  <div className="h-3 bg-muted rounded w-3/4"></div>
                                  <div className="h-2 bg-muted rounded w-1/2"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : recentTrades && recentTrades.length > 0 ? (
                          <div className="space-y-3">
                            {recentTrades.slice(0, 3).map((trade) => (
                              <div
                                key={trade.id}
                                className="flex items-center space-x-3 p-3 rounded-lg border border-border/10 hover:bg-muted/5 transition-colors"
                                data-testid={`trade-item-${trade.id}`}
                              >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                  <Package className="h-4 w-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-foreground truncate">{trade.title}</h4>
                                  <p className="text-xs text-muted-foreground">{trade.game}</p>
                                </div>
                                <Badge variant={trade.status === "active" ? "default" : "secondary"} className="text-xs">
                                  {trade.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <h4 className="text-sm font-medium text-foreground mb-1">No activity yet</h4>
                            <p className="text-xs text-muted-foreground mb-3">Create your first trade to get started</p>
                            <Link href="/create-trade">
                              <Button size="sm" className="gaming-button-primary" data-testid="button-create-first-trade">
                                Create Trade
                              </Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Column - Checklist & Community */}
                  <div className="space-y-4">
                    {/* Getting Started Checklist - Compact */}
                    <Card className="gaming-card border-border/20">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <CardTitle className="text-lg">Getting Started</CardTitle>
                        </div>
                        <CardDescription className="text-xs">Complete steps to level up!</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/10 bg-muted/5">
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-primary">1</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground">Complete profile</h4>
                            <p className="text-xs text-muted-foreground">Add picture & bio</p>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge variant="secondary" className="text-xs">+25 XP</Badge>
                            <Button variant="outline" size="sm" className="gaming-button-secondary text-xs px-2 py-1">
                              Start
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-primary/30 bg-primary/5">
                          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white">2</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground">Create first trade</h4>
                            <p className="text-xs text-muted-foreground">List an item to trade</p>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge className="bg-primary/20 text-primary text-xs">+50 XP</Badge>
                            <Link href="/create-trade">
                              <Button size="sm" className="gaming-button-primary text-xs px-2 py-1">
                                Do It!
                              </Button>
                            </Link>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/10 bg-muted/5 opacity-60">
                          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-muted-foreground">3</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-muted-foreground">Complete first trade</h4>
                            <p className="text-xs text-muted-foreground">Finish a trade deal</p>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge variant="outline" className="text-xs">+100 XP</Badge>
                            <Button variant="outline" size="sm" disabled className="text-xs px-2 py-1">
                              Locked
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/10 bg-muted/5 opacity-60">
                          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-muted-foreground">4</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-muted-foreground">Join community</h4>
                            <p className="text-xs text-muted-foreground">Follow other traders</p>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge variant="outline" className="text-xs">+25 XP</Badge>
                            <Button variant="outline" size="sm" disabled className="text-xs px-2 py-1">
                              Locked
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Community Highlights - Compact */}
                    <Card className="gaming-card border-border/20">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">Community</CardTitle>
                        </div>
                        <CardDescription className="text-xs">See what's trending!</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-border/10">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                            <Trophy className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground">🎉 1K Trades!</h4>
                            <p className="text-xs text-muted-foreground">Monthly milestone reached</p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-500 text-xs">Hot</Badge>
                        </div>

                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-border/10">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground">✨ Epic Trade</h4>
                            <p className="text-xs text-muted-foreground">Rare CS:GO skin deal</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">New</Badge>
                        </div>

                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-yellow-500/5 to-orange-500/5 border border-border/10">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                            <Award className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground">🏆 Top Trader</h4>
                            <p className="text-xs text-muted-foreground">@ProGamer2024 wins!</p>
                          </div>
                          <Badge variant="outline" className="text-xs">Week</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Trading Tip - Compact */}
                    <Card className="gaming-card border-border/20 bg-gradient-to-br from-accent/8 to-primary/8">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                          <Play className="h-5 w-5 text-accent" />
                          <CardTitle className="text-lg">Trading Tip</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-start space-x-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                            <Zap className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground mb-1">💡 Check item conditions!</h4>
                            <p className="text-xs text-muted-foreground">Always verify authenticity before trading. This builds community trust!</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "account" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">My Account</h2>
                </div>

                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="text-foreground">
                          {(user as any)?.firstName || (user as any)?.username || "User"}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="gaming-button-secondary">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-foreground">
                          {(user as any)?.email || "Not provided"}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="gaming-button-secondary">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle>Trading Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {stats?.totalTrades || 0}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Trades</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {stats?.completedTrades || 0}
                        </p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {stats?.reputation || 0}
                        </p>
                        <p className="text-sm text-muted-foreground">Reputation</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {stats?.badges?.length || 0}
                        </p>
                        <p className="text-sm text-muted-foreground">Badges</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "trades" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">My Trades</h2>
                    <p className="text-muted-foreground">Manage your trading activity</p>
                  </div>
                  <Link href="/create-trade">
                    <Button className="gaming-button-primary" data-testid="button-create-trade">
                      <Package className="h-4 w-4 mr-2" />
                      Create Trade
                    </Button>
                  </Link>
                </div>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">This will redirect you to the full trades page</p>
                  <Link href="/my-trades">
                    <Button className="gaming-button-primary mt-4" data-testid="button-go-to-trades">
                      Go to My Trades
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {activeSection === "messages" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Messages</h2>
                  <p className="text-muted-foreground">Chat with other traders</p>
                </div>
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Messages Coming Soon</h3>
                  <p className="text-muted-foreground">Direct messaging with other traders will be available soon!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
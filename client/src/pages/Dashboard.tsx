import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Package, Star, Clock, ArrowUpCircle, MessageSquare, Settings, Gamepad2, Gift, Zap, Trophy, Crown, Sparkles, Heart, ChevronLeft, BarChart3, User } from "lucide-react";
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
        <div className="w-64 bg-gaming-card/30 border-r border-border/20 p-6">
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">SETTINGS</h3>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                    }`}
                    data-testid={`sidebar-${item.id}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-8">
            {activeSection === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
                  <p className="text-muted-foreground">Welcome back, {(user as any)?.firstName || (user as any)?.username || "Trader"}!</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="gaming-card border-border/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Trades</p>
                          <p className="text-2xl font-bold text-foreground" data-testid="text-total-trades">
                            {statsLoading ? "..." : stats?.totalTrades || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="gaming-card border-border/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active Trades</p>
                          <p className="text-2xl font-bold text-foreground" data-testid="text-active-trades">
                            {statsLoading ? "..." : stats?.activeTrades || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="gaming-card border-border/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <p className="text-2xl font-bold text-foreground" data-testid="text-completed-trades">
                            {statsLoading ? "..." : stats?.completedTrades || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="gaming-card border-border/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                          <Star className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Reputation</p>
                          <p className="text-2xl font-bold text-foreground" data-testid="text-reputation">
                            {statsLoading ? "..." : stats?.reputation || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-foreground">Quick Actions</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/create-trade">
                      <Button className="gaming-button-primary w-full h-20 flex flex-col space-y-2" data-testid="button-create-trade">
                        <Package className="h-6 w-6" />
                        <span>Create Trade</span>
                      </Button>
                    </Link>
                    <Link href="/my-trades">
                      <Button variant="outline" className="gaming-button-secondary w-full h-20 flex flex-col space-y-2" data-testid="button-my-trades">
                        <Gamepad2 className="h-6 w-6" />
                        <span>My Trades</span>
                      </Button>
                    </Link>
                    <Link href="/messages">
                      <Button variant="outline" className="gaming-button-secondary w-full h-20 flex flex-col space-y-2" data-testid="button-messages">
                        <MessageSquare className="h-6 w-6" />
                        <span>Messages</span>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-foreground">Recent Activity</h3>
                    <Link href="/my-trades">
                      <Button variant="outline" size="sm" className="gaming-button-secondary" data-testid="link-view-all-trades">
                        View All
                      </Button>
                    </Link>
                  </div>
                  <Card className="gaming-card border-border/20">
                    <CardContent className="p-6">
                      {tradesLoading ? (
                        <div className="space-y-4">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse flex items-center space-x-4">
                              <div className="h-10 w-10 bg-muted rounded-full"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-muted rounded w-3/4"></div>
                                <div className="h-3 bg-muted rounded w-1/2"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : recentTrades && recentTrades.length > 0 ? (
                        <div className="space-y-4">
                          {recentTrades.map((trade) => (
                            <div
                              key={trade.id}
                              className="flex items-center space-x-4 p-4 rounded-lg border border-border/10 hover:bg-muted/5 transition-colors"
                              data-testid={`trade-item-${trade.id}`}
                            >
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                <Package className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{trade.title}</h4>
                                <p className="text-sm text-muted-foreground">{trade.game}</p>
                              </div>
                              <Badge variant={trade.status === "active" ? "default" : "secondary"}>
                                {trade.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h4 className="text-lg font-medium text-foreground mb-2">No trades yet</h4>
                          <p className="text-muted-foreground mb-4">Start your first trade to see activity here</p>
                          <Link href="/create-trade">
                            <Button className="gaming-button-primary" data-testid="button-create-first-trade">
                              Create Trade
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
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
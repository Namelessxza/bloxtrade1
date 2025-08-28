import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Bell, TrendingUp, Users, Package, Star, Clock, ArrowUpCircle, MessageSquare, Settings } from "lucide-react";
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

  const completionRate = stats ? (stats.completedTrades / Math.max(stats.totalTrades, 1)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gaming-bg">
      {/* Header */}
      <div className="border-b border-border/20 bg-gaming-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-primary/30">
                <AvatarImage src={(user as any)?.profileImageUrl} alt={(user as any)?.firstName || "User"} />
                <AvatarFallback className="bg-primary/20 text-primary font-bold">
                  {(user as any)?.firstName?.[0] || (user as any)?.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome back, {(user as any)?.firstName || (user as any)?.username || "Trader"}!
                </h1>
                <p className="text-muted-foreground">Your trading dashboard</p>
              </div>
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
              <Link href="/settings">
                <Button variant="ghost" size="sm" data-testid="link-settings">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="gaming-card border-border/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary" data-testid="text-total-trades">
                {statsLoading ? "..." : stats?.totalTrades || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.activeTrades || 0} currently active
              </p>
            </CardContent>
          </Card>

          <Card className="gaming-card border-border/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent" data-testid="text-completion-rate">
                {statsLoading ? "..." : `${Math.round(completionRate)}%`}
              </div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="gaming-card border-border/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reputation</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500" data-testid="text-reputation">
                {statsLoading ? "..." : stats?.reputation || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.badges?.length || 0} badges earned
              </p>
            </CardContent>
          </Card>

          <Card className="gaming-card border-border/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary" data-testid="text-active-trades">
                {statsLoading ? "..." : stats?.activeTrades || 0}
              </div>
              <Link href="/create-trade">
                <Button size="sm" className="mt-2 gaming-button-primary" data-testid="button-create-trade">
                  Create New
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Trades */}
          <div className="lg:col-span-2">
            <Card className="gaming-card border-border/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Trades</CardTitle>
                    <CardDescription>Your latest trading activity</CardDescription>
                  </div>
                  <Link href="/my-trades">
                    <Button variant="outline" size="sm" data-testid="link-view-all-trades">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {tradesLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : recentTrades && recentTrades.length > 0 ? (
                  <div className="space-y-4">
                    {recentTrades.map((trade) => (
                      <div
                        key={trade.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border/10 hover:bg-muted/5 transition-colors"
                        data-testid={`trade-item-${trade.id}`}
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{trade.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {trade.game}
                            </Badge>
                            <Badge 
                              variant={trade.status === "active" ? "default" : "outline"}
                              className="text-xs"
                            >
                              {trade.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <ArrowUpCircle className="h-3 w-3 mr-1" />
                              {trade.bumpCount}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(trade.lastBumped).toLocaleDateString()}
                            </div>
                          </div>
                          {trade.status === "active" && (
                            <Button size="sm" variant="ghost" data-testid={`button-bump-${trade.id}`}>
                              <ArrowUpCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No trades yet</p>
                    <Link href="/create-trade">
                      <Button className="gaming-button-primary" data-testid="button-create-first-trade">
                        Create Your First Trade
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Notifications */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="gaming-card border-border/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/create-trade">
                  <Button className="w-full gaming-button-primary" data-testid="button-quick-create-trade">
                    <Package className="h-4 w-4 mr-2" />
                    Create Trade
                  </Button>
                </Link>
                <Link href="/my-trades">
                  <Button variant="outline" className="w-full gaming-button-secondary" data-testid="button-quick-my-trades">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Manage Trades
                  </Button>
                </Link>
                <Link href="/messages">
                  <Button variant="outline" className="w-full gaming-button-secondary" data-testid="button-quick-messages">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Badges */}
            {stats?.badges && stats.badges.length > 0 && (
              <Card className="gaming-card border-border/20">
                <CardHeader>
                  <CardTitle>Your Badges</CardTitle>
                  <CardDescription>Achievements you've unlocked</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {stats.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="text-center p-3 rounded-lg border border-border/10 bg-muted/5"
                        data-testid={`badge-${badge.badgeType}`}
                      >
                        <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                        <p className="text-xs font-medium">{badge.badgeName}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bump Status */}
            <Card className="gaming-card border-border/20">
              <CardHeader>
                <CardTitle>Bump Status</CardTitle>
                <CardDescription>Keep your trades visible</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-2xl font-bold text-accent mb-2" data-testid="text-available-bumps">
                    {stats?.activeTrades || 0}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Trades ready to bump
                  </p>
                  <Link href="/my-trades">
                    <Button size="sm" className="gaming-button-primary" data-testid="button-bump-trades">
                      <ArrowUpCircle className="h-4 w-4 mr-2" />
                      Bump Trades
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
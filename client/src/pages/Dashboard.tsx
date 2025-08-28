import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Package, Star, Clock, ArrowUpCircle, MessageSquare, Settings, Gamepad2, Gift, Zap, Trophy, Crown, Sparkles, Heart } from "lucide-react";
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

  // Remove complex calculations for younger audience

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
        {/* Fun Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="gaming-card border-border/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 group cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Create Trade</h3>
              <p className="text-sm text-muted-foreground mb-4">Start trading your awesome items!</p>
              <Link href="/create-trade">
                <Button className="gaming-button-primary w-full" data-testid="button-create-trade">
                  <Zap className="h-4 w-4 mr-2" />
                  Let's Trade!
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="gaming-card border-border/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 group cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">My Games</h3>
              <p className="text-sm text-muted-foreground mb-4">Check out your collection!</p>
              <Link href="/my-trades">
                <Button variant="outline" className="gaming-button-secondary w-full" data-testid="button-my-trades">
                  <Star className="h-4 w-4 mr-2" />
                  View Collection
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="gaming-card border-border/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 group cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Messages</h3>
              <p className="text-sm text-muted-foreground mb-4">Chat with other traders!</p>
              <Link href="/messages">
                <Button variant="outline" className="gaming-button-secondary w-full" data-testid="button-messages">
                  <Heart className="h-4 w-4 mr-2" />
                  Let's Chat!
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Fun Stuff */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Recent Trades */}
          <Card className="gaming-card border-border/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">My Cool Trades</CardTitle>
                    <CardDescription>Check out what you've been up to!</CardDescription>
                  </div>
                </div>
                <Link href="/my-trades">
                  <Button variant="outline" size="sm" className="gaming-button-secondary" data-testid="link-view-all-trades">
                    <Sparkles className="h-4 w-4 mr-1" />
                    See All
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
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border/10 hover:bg-muted/5 transition-colors bg-gradient-to-r from-transparent to-primary/5"
                      data-testid={`trade-item-${trade.id}`}
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                        <Gamepad2 className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{trade.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                            {trade.game}
                          </Badge>
                          {trade.status === "active" && (
                            <Badge className="text-xs bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300">
                              ✨ Active
                            </Badge>
                          )}
                        </div>
                      </div>
                      {trade.status === "active" && (
                        <Button size="sm" variant="ghost" className="hover:bg-primary/10" data-testid={`button-bump-${trade.id}`}>
                          <ArrowUpCircle className="h-4 w-4 text-primary" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Ready to Trade?</h3>
                  <p className="text-muted-foreground mb-4">Start your first trade and have fun!</p>
                  <Link href="/create-trade">
                    <Button className="gaming-button-primary" data-testid="button-create-first-trade">
                      <Zap className="h-4 w-4 mr-2" />
                      Let's Start Trading!
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Achievements & Fun Stuff */}
          <div className="space-y-6">
            {/* Achievements */}
            {stats?.badges && stats.badges.length > 0 ? (
              <Card className="gaming-card border-border/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Your Achievements</CardTitle>
                      <CardDescription>Look what you've earned!</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="text-center p-3 rounded-lg border border-border/10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 hover:scale-105 transition-transform duration-200"
                        data-testid={`badge-${badge.badgeType}`}
                      >
                        <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                        <p className="text-xs font-medium">{badge.badgeName}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="gaming-card border-border/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Achievements</CardTitle>
                      <CardDescription>Start trading to earn cool badges!</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 text-white opacity-50" />
                    </div>
                    <p className="text-sm text-muted-foreground">Complete trades to unlock awesome badges!</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Boost */}
            {stats?.activeTrades && stats.activeTrades > 0 && (
              <Card className="gaming-card border-border/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Boost Your Trades</CardTitle>
                      <CardDescription>Make them more visible!</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-emerald-400 mb-2" data-testid="text-available-bumps">
                      {stats?.activeTrades || 0}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      trades ready for a boost! ⚡
                    </p>
                    <Link href="/my-trades">
                      <Button className="gaming-button-primary w-full" data-testid="button-bump-trades">
                        <ArrowUpCircle className="h-4 w-4 mr-2" />
                        Boost Now!
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
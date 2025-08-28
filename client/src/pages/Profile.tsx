import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Settings,
  Shield,
  Crown
} from "lucide-react";
import { Link } from "wouter";

export default function Profile() {
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

  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    enabled: isAuthenticated,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gaming-bg flex items-center justify-center">
        <div className="gaming-card p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const completionRate = stats ? (stats.completedTrades / Math.max(stats.totalTrades, 1)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gaming-bg">
      {/* Header */}
      <div className="border-b border-border/20 bg-gaming-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-4 border-primary/30">
                <AvatarImage src={(user as any)?.profileImageUrl} alt={(user as any)?.firstName || "User"} />
                <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                  {(user as any)?.firstName?.[0] || (user as any)?.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold text-foreground">
                    {(user as any)?.firstName || (user as any)?.username || "Trader"}
                  </h1>
                  {(user as any)?.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  @{(user as any)?.username || "user"} • Member since {new Date((user as any)?.joinDate || Date.now()).toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{stats?.reputation || 0} reputation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">{Math.round(completionRate)}% completion rate</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/settings">
                <Button variant="outline" className="gaming-button-secondary" data-testid="button-edit-profile">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trading Stats */}
            <Card className="gaming-card border-border/20">
              <CardHeader>
                <CardTitle>Trading Statistics</CardTitle>
                <CardDescription>Your trading performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/5 border border-border/10">
                    <div className="text-2xl font-bold text-primary" data-testid="stat-total-trades">
                      {stats?.totalTrades || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Trades</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/5 border border-border/10">
                    <div className="text-2xl font-bold text-green-500" data-testid="stat-completed-trades">
                      {stats?.completedTrades || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/5 border border-border/10">
                    <div className="text-2xl font-bold text-primary" data-testid="stat-active-trades">
                      {stats?.activeTrades || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/5 border border-border/10">
                    <div className="text-2xl font-bold text-yellow-500" data-testid="stat-reputation">
                      {stats?.reputation || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">Reputation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="gaming-card border-border/20">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest trading actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/10">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Joined GameXchange</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date((user as any)?.joinDate || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>More activity will appear as you start trading</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card className="gaming-card border-border/20">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                {stats?.badges && stats.badges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {stats.badges.map((badge: any) => (
                      <div
                        key={badge.id}
                        className="text-center p-3 rounded-lg border border-border/10 bg-muted/5"
                        data-testid={`badge-${badge.badgeType}`}
                      >
                        <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                        </div>
                        <p className="text-xs font-medium">{badge.badgeName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(badge.earnedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-sm text-muted-foreground">No badges earned yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Complete trades to start earning achievements!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card className="gaming-card border-border/20">
              <CardHeader>
                <CardTitle>Trust & Safety</CardTitle>
                <CardDescription>Your account status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Account Verified</span>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500">
                    Verified
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Completion Rate</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{Math.round(completionRate)}%</span>
                  </div>
                </div>
                
                {(user as any)?.isPremium && (
                  <>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Premium Member</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="gaming-card border-border/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/create-trade">
                  <Button className="w-full gaming-button-primary" data-testid="button-create-trade">
                    Create New Trade
                  </Button>
                </Link>
                <Link href="/my-trades">
                  <Button variant="outline" className="w-full gaming-button-secondary" data-testid="button-my-trades">
                    View My Trades
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="outline" className="w-full gaming-button-secondary" data-testid="button-settings">
                    Account Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
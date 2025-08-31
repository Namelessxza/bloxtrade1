import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { theme } from "@/config/theme";
import { MainLayout } from '@/components/layout/MainLayout';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { ChatPanel } from '@/components/layout/ChatPanel';

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

  const { data: stats } = useQuery<{
    totalTrades: number;
    activeTrades: number;
    completedTrades: number;
    reputation: number;
    badges?: any[];
  }>({
    queryKey: ["/api/dashboard/stats"],
    enabled: isAuthenticated,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <MainLayout
        header={<AppHeader />}
        sidebar={<AppSidebar />}
        rightPanel={<ChatPanel />}
      >
        <div className="h-full flex items-center justify-center bg-[#09101D]">
          <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: '#0c1321' }}>
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const completionRate = stats ? (stats.completedTrades / Math.max(stats.totalTrades, 1)) * 100 : 0;

  return (
    <MainLayout
      header={<AppHeader />}
      sidebar={<AppSidebar />}
      rightPanel={<ChatPanel />}
    >
      <div className="h-full px-6 py-6 bg-[#09101D]">
        {/* Header */}
        <div className="rounded-2xl mb-6 p-6" style={{ backgroundColor: '#12182B' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-4" style={{ borderColor: theme.colors.primary[300] }}>
                <AvatarImage src={(user as any)?.profileImageUrl} alt={(user as any)?.firstName || "User"} />
                <AvatarFallback className="font-bold text-xl" style={{ backgroundColor: theme.colors.primary[200], color: theme.colors.primary.full }}>
                  {(user as any)?.firstName?.[0] || (user as any)?.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold text-white">
                    {(user as any)?.firstName || (user as any)?.username || "Trader"}
                  </h1>
                  {(user as any)?.isPremium && (
                    <Badge 
                      className="text-white font-bold px-2.5 py-0.5"
                      style={{
                        background: "linear-gradient(to bottom right, #B850E7, #F59BF3)",
                        border: "1px solid #F59BF3",
                      }}
                    >
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-gray-400">
                  @{(user as any)?.username || "user"} • Member since {new Date((user as any)?.joinDate || Date.now()).toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-300">{stats?.reputation || 0} reputation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-300">{Math.round(completionRate)}% completion rate</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/settings">
                <button
                  className="px-4 py-2 rounded-xl text-sm font-bold transition-all text-white flex items-center"
                  style={{
                    background: "linear-gradient(to bottom right, #B850E7, #F59BF3)",
                    border: "1px solid #F59BF3",
                    boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3)",
                  }}
                  data-testid="button-edit-profile"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trading Stats */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#0c1321' }}>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">Trading Statistics</h3>
                <p className="text-sm text-gray-400">Your trading performance overview</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#12182B' }}>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.primary.full }} data-testid="stat-total-trades">
                    {stats?.totalTrades || 0}
                  </div>
                  <p className="text-sm text-gray-400">Total Trades</p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#12182B' }}>
                  <div className="text-2xl font-bold text-green-500" data-testid="stat-completed-trades">
                    {stats?.completedTrades || 0}
                  </div>
                  <p className="text-sm text-gray-400">Completed</p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#12182B' }}>
                  <div className="text-2xl font-bold text-blue-500" data-testid="stat-active-trades">
                    {stats?.activeTrades || 0}
                  </div>
                  <p className="text-sm text-gray-400">Active</p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#12182B' }}>
                  <div className="text-2xl font-bold text-yellow-500" data-testid="stat-reputation">
                    {stats?.reputation || 0}
                  </div>
                  <p className="text-sm text-gray-400">Reputation</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#0c1321' }}>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">Recent Activity</h3>
                <p className="text-sm text-gray-400">Your latest trading actions</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-xl" style={{ backgroundColor: '#12182B' }}>
                  <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.colors.accent.green + "20" }}>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Joined GameXchange</p>
                    <p className="text-xs text-gray-400">
                      {new Date((user as any)?.joinDate || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50 text-gray-500" />
                  <p className="text-gray-400">More activity will appear as you start trading</p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#0c1321' }}>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">Achievements</h3>
                <p className="text-sm text-gray-400">Badges you've earned</p>
              </div>
              {stats?.badges && stats.badges.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {stats.badges.map((badge: any) => (
                    <div
                      key={badge.id}
                      className="text-center p-3 rounded-xl"
                      style={{ backgroundColor: '#12182B' }}
                      data-testid={`badge-${badge.badgeType}`}
                    >
                      <div className="h-8 w-8 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.colors.accent.yellow + "20" }}>
                        <Trophy className="h-4 w-4 text-yellow-500" />
                      </div>
                      <p className="text-xs font-medium text-white">{badge.badgeName}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(badge.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50 text-gray-500" />
                  <p className="text-sm text-gray-400">No badges earned yet</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Complete trades to start earning achievements!
                  </p>
                </div>
              )}
            </div>

            {/* Trust & Safety */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#0c1321' }}>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">Trust & Safety</h3>
                <p className="text-sm text-gray-400">Your account status</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-300">Account Verified</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="text-green-500 border-green-500"
                  >
                    Verified
                  </Badge>
                </div>
                
                <div className="h-px bg-gray-800" />
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-300">Completion Rate</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 rounded-full h-2" style={{ backgroundColor: '#12182B' }}>
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-300">{Math.round(completionRate)}%</span>
                  </div>
                </div>
                
                {(user as any)?.isPremium && (
                  <>
                    <div className="h-px bg-gray-800" />
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-300">Premium Member</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#0c1321' }}>
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/create-trade">
                  <button
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-white"
                    style={{
                      background: "linear-gradient(to bottom right, #B850E7, #F59BF3)",
                      border: "1px solid #F59BF3",
                      boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3)",
                    }}
                    data-testid="button-create-trade"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    Create New Trade
                  </button>
                </Link>
                <Link href="/my-trades">
                  <button
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{
                      backgroundColor: '#12182B',
                      color: theme.colors.text.primary,
                    }}
                    data-testid="button-my-trades"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1a2133';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#12182B';
                    }}
                  >
                    View My Trades
                  </button>
                </Link>
                <Link href="/settings">
                  <button
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{
                      backgroundColor: '#12182B',
                      color: theme.colors.text.primary,
                    }}
                    data-testid="button-settings"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1a2133';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#12182B';
                    }}
                  >
                    Account Settings
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
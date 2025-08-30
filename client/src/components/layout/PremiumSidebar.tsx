import React from 'react';
import { 
  Trophy, TrendingUp, Gamepad2, Crown, Diamond, 
  Star, Zap, Gift, Target, Sparkles, Coins,
  BarChart3, Users, Settings, HelpCircle, LogOut
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  color?: string;
  glow?: boolean;
}

export const PremiumSidebar: React.FC = () => {
  const mainMenu: MenuItem[] = [
    { id: 'featured', label: 'Featured', icon: Star, color: 'text-yellow-500', glow: true },
    { id: 'slots', label: 'Slots', icon: Diamond, badge: 'HOT', color: 'text-purple-500' },
    { id: 'live', label: 'Live Casino', icon: Zap, color: 'text-red-500' },
    { id: 'sports', label: 'Sports', icon: Trophy, color: 'text-blue-500' },
    { id: 'esports', label: 'Esports', icon: Gamepad2, color: 'text-green-500' },
    { id: 'tournaments', label: 'Tournaments', icon: Crown, badge: 'NEW', color: 'text-amber-500' },
    { id: 'rewards', label: 'Rewards', icon: Gift, color: 'text-pink-500' },
  ];
  
  const quickLinks: MenuItem[] = [
    { id: 'leaderboard', label: 'Leaderboard', icon: BarChart3 },
    { id: 'refer', label: 'Refer & Earn', icon: Users },
    { id: 'vip', label: 'VIP Club', icon: Crown },
    { id: 'promotions', label: 'Promotions', icon: Sparkles },
  ];
  
  const bottomMenu: MenuItem[] = [
    { id: 'help', label: 'Help Center', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900 border-r border-white/5">
      {/* Daily Bonus Card */}
      <div className="p-4">
        <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-4 border border-purple-500/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-purple-400" />
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Daily Bonus</span>
            </div>
            <div className="text-2xl font-black text-white mb-1">50% Bonus</div>
            <div className="text-xs text-gray-400 mb-3">On your first deposit today!</div>
            <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-bold text-sm hover:scale-105 transition-transform">
              Claim
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="py-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-2">
            Games
          </div>
          {mainMenu.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
          
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mt-6 mb-2">
            Quick Links
          </div>
          {quickLinks.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </ScrollArea>
      
      {/* User Stats */}
      <div className="p-4 border-t border-white/5">
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl p-3 border border-amber-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Level Progress</span>
            <span className="text-xs font-bold text-amber-500">Level 12</span>
          </div>
          <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" style={{ width: '65%' }} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">6,500 XP</span>
            <span className="text-xs text-gray-500">10,000 XP</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Menu */}
      <div className="p-3 border-t border-white/5">
        {bottomMenu.map((item) => (
          <MenuItem key={item.id} item={item} compact />
        ))}
      </div>
    </div>
  );
};

const MenuItem: React.FC<{ item: MenuItem; compact?: boolean }> = ({ item, compact }) => {
  const Icon = item.icon;
  
  return (
    <button
      className={`w-full flex items-center justify-between ${compact ? 'px-3 py-2' : 'px-3 py-2.5'} rounded-lg transition-all group hover:bg-white/5 relative`}
    >
      {item.glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg blur-sm" />
      )}
      
      <div className="relative flex items-center gap-3">
        <Icon className={`h-5 w-5 ${item.color || 'text-gray-400'} group-hover:scale-110 transition-transform`} />
        <span className={`${compact ? 'text-sm' : 'text-sm font-medium'} text-gray-300 group-hover:text-white transition-colors`}>
          {item.label}
        </span>
      </div>
      
      {item.badge && (
        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
          item.badge === 'HOT' 
            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
        }`}>
          {item.badge}
        </span>
      )}
    </button>
  );
};
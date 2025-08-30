import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { theme } from '@/config/theme';

export const DashboardView: React.FC = () => {
  return (
    <ScrollArea className="h-full">
      <div className="min-h-full px-6 py-6">
        {/* Featured Games Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
            Featured Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <GameCard key={i} />
            ))}
          </div>
        </div>
        
        {/* Active Trades Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
            Active Trades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <TradeCard key={i} />
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <ActivityItem key={i} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

const GameCard: React.FC = () => {
  return (
    <div 
      className="rounded-xl overflow-hidden transition-transform hover:scale-105 cursor-pointer"
      style={{
        backgroundColor: theme.colors.background.card,
        boxShadow: theme.shadows.md,
      }}
    >
      <div 
        className="h-40 bg-gradient-to-br from-blue-500 to-purple-600"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2" style={{ color: theme.colors.text.primary }}>
          Game Title
        </h3>
        <p className="text-sm mb-3" style={{ color: theme.colors.text.secondary }}>
          Action RPG • 1.2K players
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold" style={{ color: theme.colors.accent.green }}>
            24 items available
          </span>
          <button 
            className="px-3 py-1 rounded-lg text-sm font-medium transition-all"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.accent.blue})`,
              color: theme.colors.text.primary,
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

const TradeCard: React.FC = () => {
  return (
    <div 
      className="rounded-xl p-4 transition-all hover:scale-[1.02] cursor-pointer"
      style={{
        backgroundColor: theme.colors.background.card,
        boxShadow: theme.shadows.md,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span 
          className="text-xs px-2 py-1 rounded-full font-semibold"
          style={{
            backgroundColor: theme.colors.accent.green + '20',
            color: theme.colors.accent.green,
          }}
        >
          Active
        </span>
        <span className="text-xs" style={{ color: theme.colors.text.muted }}>
          2 hours ago
        </span>
      </div>
      <h3 className="font-bold mb-2" style={{ color: theme.colors.text.primary }}>
        Trading CS:GO Knife
      </h3>
      <p className="text-sm mb-3" style={{ color: theme.colors.text.secondary }}>
        Looking for AWP Dragon Lore or equivalent value
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.secondary.full})`,
            }}
          />
          <span className="text-sm" style={{ color: theme.colors.text.secondary }}>
            User123
          </span>
        </div>
        <button 
          className="text-sm font-medium"
          style={{ color: theme.colors.primary.full }}
        >
          View Trade →
        </button>
      </div>
    </div>
  );
};

const ActivityItem: React.FC = () => {
  return (
    <div 
      className="flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-white/[0.02]"
      style={{
        backgroundColor: theme.colors.background.card,
      }}
    >
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.secondary.full})`,
        }}
      >
        <span className="text-white font-bold">A</span>
      </div>
      <div className="flex-1">
        <p className="text-sm" style={{ color: theme.colors.text.primary }}>
          <span className="font-semibold">Alex</span> completed a trade with <span className="font-semibold">John</span>
        </p>
        <p className="text-xs" style={{ color: theme.colors.text.muted }}>
          5 minutes ago
        </p>
      </div>
      <button 
        className="text-sm"
        style={{ color: theme.colors.primary.full }}
      >
        View
      </button>
    </div>
  );
};
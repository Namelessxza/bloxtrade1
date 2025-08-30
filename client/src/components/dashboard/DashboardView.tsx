import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { theme } from "@/config/theme";

export const DashboardView: React.FC = () => {
  return (
    <ScrollArea className="h-full" viewportClassName="bg-[#0F1218]">
      <div className="min-h-full px-6 py-6 bg-[#111113]">
        {/* Featured Games Section */}
        <div className="mb-8">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: theme.colors.text.primary }}
          >
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
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: theme.colors.text.primary }}
          >
            Pet Sniper
          </h2>
          <div className="relative">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <TradeCard key={i} />
              ))}
            </div>

            {/* Premium Lock Overlay */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(184, 80, 231, 0.4) 30%, rgba(184, 80, 231, 0.7) 100%)",
                backdropFilter: "blur(2px)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center pointer-events-auto">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: "linear-gradient(135deg, #B850E7, #F59BF3)",
                      boxShadow: "0 0 30px rgba(184, 80, 231, 0.4)",
                    }}
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Premium Trades
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 max-w-xs mx-auto">
                    Unlock premium to view all active trades
                  </p>
                  <button
                    className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                    style={{
                      background: 'linear-gradient(to bottom right, #B850E7, #F59BF3)',
                      border: '1px solid #F59BF3',
                      boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3)',
                      color: '#FFFFFF',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "inset 0 4px 8px rgba(0,0,0,0.3), 0 4px 12px rgba(184, 80, 231, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "inset 0 4px 8px rgba(0,0,0,0.3)";
                    }}
                  >
                    Upgrade to Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: theme.colors.text.primary }}
          >
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
      className="rounded-2xl overflow-hidden transition-all cursor-pointer group"
      style={{
        background: theme.gradients.card,
        border: `1px solid ${theme.colors.border.subtle}`,
        boxShadow: theme.shadows.md,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = theme.shadows.lg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = theme.shadows.md;
      }}
    >
      <div
        className="h-40"
        style={{
          background: theme.gradients.accent,
        }}
      />
      <div className="p-4" style={{ backgroundColor: "#161618" }}>
        <h3
          className="font-bold text-lg mb-2"
          style={{ color: theme.colors.text.primary }}
        >
          Game Title
        </h3>
        <p
          className="text-sm mb-3"
          style={{ color: theme.colors.text.secondary }}
        >
          Action RPG • 1.2K players
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-sm font-semibold"
            style={{ color: theme.colors.accent.green }}
          >
            24 items available
          </span>
          <button
            className="px-4 py-2 rounded-xl text-sm font-bold transition-colors bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white border border-cyan-300"
            style={{
              boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
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
      className="rounded-2xl p-4 transition-all cursor-pointer"
      style={{
        background: theme.gradients.card,
        border: `1px solid ${theme.colors.border.subtle}`,
        boxShadow: theme.shadows.md,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.background.hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.background.card;
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs px-2.5 py-1 rounded-full font-bold"
          style={{
            backgroundColor: theme.colors.accent.green + "20",
            color: theme.colors.accent.green,
          }}
        >
          Active in Server
        </span>
        <span className="text-xs" style={{ color: theme.colors.text.muted }}>
          20 Seconds Ago
        </span>
      </div>
      <h3
        className="font-bold mb-2"
        style={{ color: theme.colors.text.primary }}
      >
        Dragon Cannelloni
      </h3>
      <p
        className="text-sm mb-3"
        style={{ color: theme.colors.text.secondary }}
      >
        Server Count: 5/8
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.secondary.full})`,
            }}
          />
          <span
            className="text-sm"
            style={{ color: theme.colors.text.secondary }}
          >
            Shrekblox1411
          </span>
        </div>
        <button
          className="text-sm font-bold px-3 py-1.5 rounded-xl transition-colors bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white border border-cyan-300"
          style={{
            boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          Join Server
        </button>
      </div>
    </div>
  );
};

const ActivityItem: React.FC = () => {
  return (
    <div
      className="flex items-center gap-4 p-3 rounded-xl transition-colors"
      style={{
        backgroundColor: theme.colors.background.card,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.background.hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.background.card;
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
        style={{
          backgroundColor: theme.colors.primary.full,
        }}
      >
        <span className="text-white font-bold">A</span>
      </div>
      <div className="flex-1">
        <p className="text-sm" style={{ color: theme.colors.text.primary }}>
          <span className="font-semibold">Alex</span> completed a trade with{" "}
          <span className="font-semibold">John</span>
        </p>
        <p className="text-xs" style={{ color: theme.colors.text.muted }}>
          5 minutes ago
        </p>
      </div>
      <button
        className="text-sm font-bold px-3 py-1 rounded-xl transition-colors bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white border border-cyan-300"
        style={{
          boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.9";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        View
      </button>
    </div>
  );
};

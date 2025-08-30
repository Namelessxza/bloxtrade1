import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy, Flame, Star, Zap, Gift, Crown, Gem, Coins } from 'lucide-react';

export const PremiumDashboard: React.FC = () => {
  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <ScrollArea className="h-full">
        <div className="min-h-full">
          {/* Hero Welcome Section */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-pink-500/10" />
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
            
            <div className="relative px-8 py-12">
              <div className="flex items-center justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full">
                      <span className="text-xs font-bold text-black uppercase tracking-wider">Welcome Bonus</span>
                    </div>
                    <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
                  </div>
                  
                  <h1 className="text-5xl font-black mb-4">
                    <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                      Welcome to GameXchange
                    </span>
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Your gateway to exciting rewards!
                  </p>
                  
                  <div className="flex gap-4">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl font-bold text-black text-lg overflow-hidden transition-all hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative flex items-center gap-2">
                        <Gift className="h-5 w-5" />
                        Claim Bonus
                      </span>
                    </button>
                    
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-bold text-white text-lg border border-white/20 hover:bg-white/20 transition-all">
                      Learn More
                    </button>
                  </div>
                </div>
                
                {/* Decorative Slot Machine */}
                <div className="hidden lg:block relative">
                  <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl animate-pulse opacity-50 blur-2xl" />
                    <div className="relative bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-3xl p-6 shadow-2xl">
                      <div className="bg-black/20 rounded-2xl p-4">
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {['🍒', '💎', '7️⃣', '💎', '🍒', '7️⃣', '7️⃣', '7️⃣', '💎'].map((emoji, i) => (
                            <div key={i} className="bg-white/90 rounded-lg p-3 text-2xl text-center shadow-inner">
                              {emoji}
                            </div>
                          ))}
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-black text-white mb-2">JACKPOT!</div>
                          <div className="text-yellow-300 font-bold">$5,000 BONUS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Live Bets Section */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="h-6 w-6 text-orange-500 animate-pulse" />
              <h2 className="text-2xl font-bold text-white">Live Bets</h2>
              <div className="ml-auto flex gap-2">
                {['All', 'Casino', 'Sports', 'Esports'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      tab === 'All' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { game: 'Mega Fortune', bet: '109.5K', multi: '109.5K', color: 'from-purple-600 to-pink-600' },
                { game: 'Sweet Bonanza', bet: '109.5K', multi: '109.5K', color: 'from-blue-600 to-cyan-600' },
                { game: 'Gates of Olympus', bet: '109.5K', multi: '109.5K', color: 'from-green-600 to-emerald-600' },
                { game: 'Book of Dead', bet: '109.5K', multi: '109.5K', color: 'from-orange-600 to-red-600' },
              ].map((item, i) => (
                <LiveBetCard key={i} {...item} />
              ))}
            </div>
          </div>
          
          {/* Featured Games Grid */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-3 mb-6">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-white">Featured Games</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <GameCard key={i} index={i} />
              ))}
            </div>
          </div>
          
          {/* Daily Bonus Card */}
          <div className="px-8 py-8">
            <div className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 rounded-3xl p-8 border border-purple-500/20 relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
              </div>
              
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2">Daily Bonus</h3>
                  <p className="text-gray-300 mb-6">Earn 50% bonus on your first deposit today!</p>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-white hover:scale-105 transition-transform">
                    Claim Now
                  </button>
                </div>
                <div className="text-8xl">🎁</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

const LiveBetCard: React.FC<{ game: string; bet: string; multi: string; color: string }> = ({ 
  game, bet, multi, color 
}) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"
        style={{ backgroundImage: `linear-gradient(to right, ${color.replace('from-', '').replace('to-', ', ')})` }}
      />
      <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} animate-pulse`} />
          <span className="text-xs text-gray-400 uppercase tracking-wider">Live</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Game</span>
            <span className="text-sm font-bold text-white">{game}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Bet</span>
            <span className="text-sm font-bold text-green-400">${bet}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Multi</span>
            <span className="text-sm font-bold text-yellow-400">{multi}x</span>
          </div>
        </div>
        
        <button className="w-full mt-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white transition-all">
          View
        </button>
      </div>
    </div>
  );
};

const GameCard: React.FC<{ index: number }> = ({ index }) => {
  const colors = [
    'from-purple-600 to-pink-600',
    'from-blue-600 to-cyan-600', 
    'from-green-600 to-emerald-600',
    'from-orange-600 to-red-600',
    'from-yellow-600 to-amber-600',
    'from-indigo-600 to-purple-600',
  ];
  
  const icons = [Trophy, Crown, Gem, Star, Zap, Coins];
  const Icon = icons[index % icons.length];
  const color = colors[index % colors.length];
  
  return (
    <div className="group relative cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-50 blur-xl transition-all duration-300"
        style={{ backgroundImage: `linear-gradient(to right, ${color.replace('from-', '').replace('to-', ', ')})` }}
      />
      <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all hover:scale-105">
        <div className={`h-32 bg-gradient-to-br ${color} p-4 flex items-center justify-center`}>
          <Icon className="h-12 w-12 text-white/80" />
        </div>
        <div className="p-3">
          <h3 className="font-bold text-white text-sm mb-1">Game Title</h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Provider</span>
            <div className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-orange-500" />
              <span className="text-xs text-orange-500 font-bold">Hot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
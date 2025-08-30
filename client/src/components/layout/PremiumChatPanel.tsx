import React, { useState } from 'react';
import { MessageCircle, Send, Trophy, TrendingUp, Users, ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  amount?: number;
  multiplier?: number;
  game?: string;
  type: 'message' | 'win' | 'bet';
  timestamp: string;
}

export const PremiumChatPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'winners' | 'highrollers'>('chat');
  const [newMessage, setNewMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('english');
  
  const channels = [
    { id: 'english', label: 'English', flag: '🇺🇸', online: 1234 },
    { id: 'spanish', label: 'Español', flag: '🇪🇸', online: 567 },
    { id: 'russian', label: 'Русский', flag: '🇷🇺', online: 890 },
    { id: 'vip', label: 'VIP', flag: '👑', online: 42, locked: false },
  ];
  
  const messages: ChatMessage[] = [
    {
      id: '1',
      username: 'CryptoKing',
      message: 'Just hit a massive win on Sweet Bonanza! 🎰',
      type: 'message',
      timestamp: '2m ago',
    },
    {
      id: '2',
      username: 'LuckyAce',
      message: '',
      amount: 5420.50,
      multiplier: 1250,
      game: 'Gates of Olympus',
      type: 'win',
      timestamp: '3m ago',
    },
    {
      id: '3',
      username: 'HighRoller',
      message: 'Who\'s playing the tournament tonight?',
      type: 'message',
      timestamp: '5m ago',
    },
    {
      id: '4',
      username: 'DiamondHands',
      message: '',
      amount: 10000,
      game: 'Crazy Time',
      type: 'bet',
      timestamp: '7m ago',
    },
  ];
  
  const winners = [
    { username: 'MegaWinner', amount: 125000, game: 'Mega Moolah', multiplier: 5000 },
    { username: 'FortuneSeeker', amount: 85420, game: 'Book of Dead', multiplier: 3500 },
    { username: 'GoldRush', amount: 62300, game: 'Bonanza', multiplier: 2800 },
    { username: 'LuckyStrike', amount: 45600, game: 'Dead or Alive', multiplier: 2200 },
  ];
  
  const highrollers = [
    { username: 'WhaleAlert', totalBet: 250000, wins: 42, losses: 18 },
    { username: 'BigSpender', totalBet: 185000, wins: 38, losses: 22 },
    { username: 'VIPPlayer', totalBet: 142000, wins: 35, losses: 25 },
    { username: 'HighStakes', totalBet: 98000, wins: 31, losses: 19 },
  ];
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900/95 via-slate-900 to-slate-900 border-l border-white/5">
      {/* Channel Selector */}
      <div className="p-3 border-b border-white/5">
        <button className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
          <div className="flex items-center gap-2">
            <span className="text-lg">{channels.find(c => c.id === selectedChannel)?.flag}</span>
            <div className="text-left">
              <div className="text-sm font-medium text-white">
                {channels.find(c => c.id === selectedChannel)?.label}
              </div>
              <div className="text-xs text-green-400">
                {channels.find(c => c.id === selectedChannel)?.online} online
              </div>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      </div>
      
      {/* Tabs */}
      <div className="px-3 pt-3">
        <div className="flex gap-2">
          <TabButton
            active={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
            icon={<MessageCircle className="h-4 w-4" />}
            label="Chat"
          />
          <TabButton
            active={activeTab === 'winners'}
            onClick={() => setActiveTab('winners')}
            icon={<Trophy className="h-4 w-4" />}
            label="Winners"
            pulse
          />
          <TabButton
            active={activeTab === 'highrollers'}
            onClick={() => setActiveTab('highrollers')}
            icon={<TrendingUp className="h-4 w-4" />}
            label="High Rollers"
          />
        </div>
      </div>
      
      {/* Content */}
      <ScrollArea className="flex-1 px-3 py-3">
        {activeTab === 'chat' && (
          <div className="space-y-2">
            {messages.map((msg) => (
              <MessageItem key={msg.id} message={msg} />
            ))}
          </div>
        )}
        
        {activeTab === 'winners' && (
          <div className="space-y-2">
            {winners.map((winner, i) => (
              <WinnerItem key={i} {...winner} rank={i + 1} />
            ))}
          </div>
        )}
        
        {activeTab === 'highrollers' && (
          <div className="space-y-2">
            {highrollers.map((player, i) => (
              <HighRollerItem key={i} {...player} rank={i + 1} />
            ))}
          </div>
        )}
      </ScrollArea>
      
      {/* Input */}
      {activeTab === 'chat' && (
        <div className="p-3 border-t border-white/5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNewMessage('');
            }}
            className="relative"
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="pr-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0 h-7 w-7 bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Send className="h-3 w-3" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  pulse?: boolean;
}> = ({ active, onClick, icon, label, pulse }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
        active
          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30'
          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
      }`}
    >
      {pulse && !active && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      )}
      {icon}
      {label}
    </button>
  );
};

const MessageItem: React.FC<{ message: ChatMessage }> = ({ message }) => {
  if (message.type === 'win') {
    return (
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-bold text-green-400">{message.username} won!</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{message.game}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">${message.amount?.toLocaleString()}</span>
            <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-full font-bold">
              {message.multiplier}x
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  if (message.type === 'bet') {
    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-3 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-blue-400">{message.username}</span>
            <span className="text-xs text-gray-400 ml-2">placed a bet</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">${message.amount?.toLocaleString()}</div>
            <div className="text-xs text-gray-400">{message.game}</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex gap-2 p-2 rounded-lg hover:bg-white/5 transition-all">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
        {message.username[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-purple-400">{message.username}</span>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
        <p className="text-sm text-gray-300 break-words">{message.message}</p>
      </div>
    </div>
  );
};

const WinnerItem: React.FC<{
  username: string;
  amount: number;
  game: string;
  multiplier: number;
  rank: number;
}> = ({ username, amount, game, multiplier, rank }) => {
  const rankColors = ['text-yellow-500', 'text-gray-400', 'text-amber-600', 'text-gray-500'];
  const rankIcons = ['🥇', '🥈', '🥉', '🏅'];
  
  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-500/5 to-amber-500/5 rounded-lg border border-yellow-500/10">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{rankIcons[rank - 1]}</span>
        <div>
          <div className="font-bold text-white">{username}</div>
          <div className="text-xs text-gray-400">{game}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-green-400">${amount.toLocaleString()}</div>
        <div className="text-xs text-yellow-500">{multiplier}x</div>
      </div>
    </div>
  );
};

const HighRollerItem: React.FC<{
  username: string;
  totalBet: number;
  wins: number;
  losses: number;
  rank: number;
}> = ({ username, totalBet, wins, losses, rank }) => {
  const winRate = ((wins / (wins + losses)) * 100).toFixed(1);
  
  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg border border-purple-500/10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
          {rank}
        </div>
        <div>
          <div className="font-bold text-white">{username}</div>
          <div className="text-xs text-gray-400">Win rate: {winRate}%</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-purple-400">${totalBet.toLocaleString()}</div>
        <div className="text-xs text-gray-400">{wins}W / {losses}L</div>
      </div>
    </div>
  );
};
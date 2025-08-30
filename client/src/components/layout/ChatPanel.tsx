import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, User, X, Check, MoreVertical, Heart, Reply, Smile } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { theme } from '@/config/theme';

interface Message {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: string;
  isAdmin?: boolean;
  reactions?: { emoji: string; count: number }[];
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'playing' | 'away';
  game?: string;
  lastSeen?: string;
}

export const ChatPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'messages' | 'trades'>('chat');
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages] = useState<Message[]>([
    {
      id: '1',
      username: 'Manager',
      avatar: 'M',
      message: 'What JB equivalent to money?',
      timestamp: '5s ago',
      reactions: [{ emoji: '🤔', count: 3 }],
    },
    {
      id: '2',
      username: 'Manager',
      avatar: 'M',
      message: 'please do not believe those who contact you from other ranks/apps. If you encounter problems, please contact Live Support',
      timestamp: '5s ago',
      reactions: [{ emoji: '⚠️', count: 5 }, { emoji: '👍', count: 2 }],
    },
    {
      id: '3',
      username: 'Manager',
      avatar: 'M',
      message: 'being empty does not make anymore',
      timestamp: '5s ago',
    },
    {
      id: '4',
      username: 'Manager',
      avatar: 'M',
      message: 'lol..its well for a yes...u know whats my meant? 😂 lol',
      timestamp: '5s ago',
      reactions: [{ emoji: '😂', count: 8 }],
    },
    {
      id: '5',
      username: 'Manager',
      avatar: 'M',
      message: 'ban',
      timestamp: '5s ago',
      isAdmin: true,
      reactions: [{ emoji: '🔨', count: 1 }],
    },
    {
      id: '6',
      username: 'Manager',
      avatar: 'M',
      message: 'HIRING: Looking for someone to take care of me financially. Full time only.',
      timestamp: '5s ago',
      reactions: [{ emoji: '💰', count: 12 }, { emoji: '😅', count: 7 }],
    },
  ]);
  
  const [friends] = useState<Friend[]>([
    { id: '1', name: 'Wingwon', avatar: 'W', status: 'online', lastSeen: 'Active now' },
    { id: '2', name: 'Jacob Clark 89', avatar: 'J', status: 'online', lastSeen: 'Active now' },
    { id: '3', name: 'Cyber pilot', avatar: 'C', status: 'playing', game: 'Tiki Runner 2' },
    { id: '4', name: 'Future Saruman_', avatar: 'F', status: 'away', lastSeen: '5m ago' },
    { id: '5', name: 'Anchovy King', avatar: 'A', status: 'offline', lastSeen: '2h ago' },
    { id: '6', name: 'Alan Frost', avatar: 'A', status: 'offline', lastSeen: '1d ago' },
  ]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [newMessage]);
  
  const sendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  const getStatusColor = (status: Friend['status']) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'playing': return '#3b82f6';
      case 'away': return '#eab308';
      case 'offline': return '#64748b';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status: Friend['status']) => {
    switch (status) {
      case 'online': return '●';
      case 'playing': return '▶';
      case 'away': return '◐';
      case 'offline': return '○';
      default: return '○';
    }
  };
  
  return (
    <div className="flex flex-col h-full relative overflow-hidden" style={{
      background: `linear-gradient(180deg, ${theme.colors.background.secondary} 0%, ${theme.colors.background.primary} 100%)`,
    }}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${theme.colors.primary.full} 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, ${theme.colors.secondary.full} 0%, transparent 50%)`,
        }} />
      </div>

      {/* Tabs with enhanced styling */}
      <div className="relative z-10 p-4" style={{
        background: `linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)`,
        borderBottom: `1px solid ${theme.colors.border.subtle}`,
      }}>
        <div className="flex gap-2">
          <TabButton
            active={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
            label="Global Chat"
            icon={<MessageCircle className="h-4 w-4" />}
            count={messages.length}
          />
          <TabButton
            active={activeTab === 'messages'}
            onClick={() => setActiveTab('messages')}
            label="Messages"
            icon={<MessageCircle className="h-4 w-4" />}
            badge={4}
            badgeType="notification"
          />
          <TabButton
            active={activeTab === 'trades'}
            onClick={() => setActiveTab('trades')}
            label="Friends"
            icon={<User className="h-4 w-4" />}
            count={friends.filter(f => f.status === 'online').length}
          />
        </div>

        {/* Active users indicator */}
        {activeTab === 'chat' && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex -space-x-2">
              {friends.slice(0, 3).map((friend) => (
                <div key={friend.id} 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.secondary.full})`,
                    color: theme.colors.text.primary,
                    border: `2px solid ${theme.colors.background.secondary}`,
                  }}
                >
                  {friend.avatar}
                </div>
              ))}
            </div>
            <span className="text-xs" style={{ color: theme.colors.text.tertiary }}>
              {friends.filter(f => f.status === 'online').length} active • {messages.length} messages today
            </span>
          </div>
        )}
      </div>
      
      {/* Content Area with improved styling */}
      <ScrollArea className="flex-1 px-4 py-3 relative z-10">
        {activeTab === 'chat' && (
          <div className="space-y-4">
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl animate-pulse"
                style={{ backgroundColor: theme.colors.background.hover }}
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs" style={{ color: theme.colors.text.muted }}>
                  Someone is typing...
                </span>
              </div>
            )}

            {messages.map((msg, index) => (
              <MessageItem key={msg.id} message={msg} isLast={index === messages.length - 1} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        {activeTab === 'messages' && (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="relative mb-4">
              <div className="absolute inset-0 animate-pulse rounded-full"
                style={{
                  background: `radial-gradient(circle, ${theme.colors.primary.full}20 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                }}
              />
              <MessageCircle className="h-16 w-16 relative" style={{
                color: theme.colors.text.muted,
              }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.text.primary }}>
              No messages yet
            </h3>
            <p className="text-sm text-center max-w-[200px]" style={{ color: theme.colors.text.tertiary }}>
              Start a conversation with your friends to see messages here
            </p>
          </div>
        )}
        
        {activeTab === 'trades' && (
          <div className="space-y-6">
            {/* Friend Requests Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold" style={{ color: theme.colors.text.primary }}>
                  Friend Requests
                </h3>
                <span className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: theme.colors.accent.orange + '20',
                    color: theme.colors.accent.orange,
                  }}
                >
                  2 pending
                </span>
              </div>
              <div className="space-y-2">
                {friends.slice(0, 2).map((friend) => (
                  <FriendRequest key={friend.id} friend={friend} />
                ))}
              </div>
            </div>
            
            {/* Online Friends Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold" style={{ color: theme.colors.text.primary }}>
                  Online Friends
                </h3>
                <span className="text-xs" style={{ color: theme.colors.text.tertiary }}>
                  {friends.filter(f => f.status !== 'offline').length} online
                </span>
              </div>
              <div className="space-y-2">
                {friends.filter(f => f.status !== 'offline').map((friend) => (
                  <FriendItem key={friend.id} friend={friend} />
                ))}
              </div>
            </div>
            
            {/* Offline Friends Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold" style={{ color: theme.colors.text.primary }}>
                  Offline
                </h3>
                <span className="text-xs" style={{ color: theme.colors.text.tertiary }}>
                  {friends.filter(f => f.status === 'offline').length} offline
                </span>
              </div>
              <div className="space-y-2 opacity-60">
                {friends.filter(f => f.status === 'offline').map((friend) => (
                  <FriendItem key={friend.id} friend={friend} />
                ))}
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
      
      {/* Enhanced Input Area */}
      {activeTab === 'chat' && (
        <div className="relative z-10 p-4" style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.02) 100%)`,
          borderTop: `1px solid ${theme.colors.border.subtle}`,
        }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="relative"
          >
            <div className="flex gap-2">
              <button
                type="button"
                className="p-2 rounded-lg transition-all hover:scale-110"
                style={{
                  backgroundColor: theme.colors.background.hover,
                  color: theme.colors.text.tertiary,
                }}
              >
                <Smile className="h-5 w-5" />
              </button>
              
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 h-11 px-4 rounded-xl transition-all"
                style={{
                  backgroundColor: theme.colors.background.primary,
                  border: `1px solid ${theme.colors.border.light}`,
                  color: theme.colors.text.primary,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.primary.full;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.colors.primary.full}20`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.light;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              
              <button
                type="submit"
                className="px-5 h-11 rounded-xl font-semibold transition-all relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.accent.blue})`,
                  color: theme.colors.text.primary,
                  boxShadow: `0 4px 15px ${theme.colors.primary.full}40, inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.1)`,
                  border: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = `0 6px 20px ${theme.colors.primary.full}50, inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -2px 0 rgba(0, 0, 0, 0.15)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 15px ${theme.colors.primary.full}40, inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.1)`;
                }}
              >
                <Send className="h-4 w-4 mr-2 inline" />
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  badgeType?: 'notification' | 'count';
  count?: number;
}> = ({ active, onClick, label, icon, badge, badgeType = 'count', count }) => {
  return (
    <button
      onClick={onClick}
      className="relative px-4 py-2 rounded-xl transition-all font-medium text-sm"
      style={{
        backgroundColor: active ? theme.colors.primary.full + '20' : 'transparent',
        color: active ? theme.colors.primary.full : theme.colors.text.tertiary,
        border: `1px solid ${active ? theme.colors.primary.full + '40' : 'transparent'}`,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = theme.colors.background.hover;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <div className="flex items-center gap-2">
        {icon}
        {label}
        {count !== undefined && (
          <span className="text-xs opacity-60">({count})</span>
        )}
        {badge && badgeType === 'notification' && (
          <span 
            className="absolute -top-1 -right-1 text-xs rounded-full px-1.5 py-0.5 min-w-[20px] h-[20px] flex items-center justify-center font-bold"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.accent.orange}, ${theme.colors.accent.red})`,
              color: theme.colors.text.primary,
              boxShadow: `0 2px 8px ${theme.colors.accent.red}60`,
            }}
          >
            {badge}
          </span>
        )}
      </div>
    </button>
  );
};

const MessageItem: React.FC<{ message: Message; isLast?: boolean }> = ({ message, isLast }) => {
  const [showActions, setShowActions] = useState(false);
  
  return (
    <div 
      className="group flex gap-3 items-start p-3 rounded-xl transition-all relative"
      style={{
        backgroundColor: showActions ? theme.colors.background.hover : 'transparent',
      }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar with online indicator */}
      <div className="relative">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-transform group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.secondary.full})`,
            color: theme.colors.text.primary,
            boxShadow: `0 4px 12px ${theme.colors.primary.full}30`,
          }}
        >
          {message.avatar}
        </div>
        {isLast && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full"
            style={{
              backgroundColor: theme.colors.accent.green,
              border: `2px solid ${theme.colors.background.secondary}`,
            }}
          />
        )}
      </div>
      
      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm" style={{ color: theme.colors.text.primary }}>
            {message.username}
          </span>
          {message.isAdmin && (
            <span 
              className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent.red}, ${theme.colors.accent.orange})`,
                color: theme.colors.text.primary,
              }}
            >
              Admin
            </span>
          )}
          <span className="text-xs ml-auto" style={{ color: theme.colors.text.muted }}>
            {message.timestamp}
          </span>
        </div>
        
        <div 
          className="rounded-xl px-4 py-2.5 inline-block max-w-full transition-all"
          style={{
            backgroundColor: theme.colors.background.primary,
            border: `1px solid ${theme.colors.border.subtle}`,
            color: theme.colors.text.primary,
          }}
        >
          <p className="text-sm leading-relaxed break-words">
            {message.message}
          </p>
        </div>
        
        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex gap-2 mt-2">
            {message.reactions.map((reaction, idx) => (
              <button
                key={idx}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all hover:scale-110"
                style={{
                  backgroundColor: theme.colors.background.hover,
                  border: `1px solid ${theme.colors.border.subtle}`,
                }}
              >
                <span>{reaction.emoji}</span>
                <span style={{ color: theme.colors.text.secondary }}>{reaction.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Quick Actions */}
      {showActions && (
        <div className="absolute right-3 top-3 flex gap-1 animate-fadeIn">
          <button 
            className="p-1.5 rounded-lg transition-all hover:scale-110"
            style={{
              backgroundColor: theme.colors.background.primary,
              color: theme.colors.text.tertiary,
            }}
          >
            <Reply className="h-3 w-3" />
          </button>
          <button 
            className="p-1.5 rounded-lg transition-all hover:scale-110"
            style={{
              backgroundColor: theme.colors.background.primary,
              color: theme.colors.text.tertiary,
            }}
          >
            <Heart className="h-3 w-3" />
          </button>
          <button 
            className="p-1.5 rounded-lg transition-all hover:scale-110"
            style={{
              backgroundColor: theme.colors.background.primary,
              color: theme.colors.text.tertiary,
            }}
          >
            <MoreVertical className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

const FriendRequest: React.FC<{ friend: Friend }> = ({ friend }) => {
  const getStatusColor = (status: Friend['status']) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'playing': return '#3b82f6';
      case 'away': return '#eab308';
      case 'offline': return '#64748b';
      default: return '#64748b';
    }
  };

  return (
    <div 
      className="flex items-center justify-between p-3 rounded-xl transition-all hover:scale-[1.02]"
      style={{ 
        background: `linear-gradient(135deg, ${theme.colors.background.hover}, transparent)`,
        border: `1px solid ${theme.colors.border.subtle}`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div 
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.secondary.full}, ${theme.colors.accent.pink})`,
              color: theme.colors.text.primary,
            }}
          >
            {friend.avatar}
          </div>
          <div 
            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full"
            style={{
              backgroundColor: getStatusColor(friend.status),
              border: `2px solid ${theme.colors.background.secondary}`,
            }}
          />
        </div>
        <div>
          <div className="font-medium text-sm" style={{ color: theme.colors.text.primary }}>
            {friend.name}
          </div>
          <div className="text-xs" style={{ color: theme.colors.text.secondary }}>
            Wants to be friends
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
          style={{ 
            backgroundColor: theme.colors.accent.red + '20',
            color: theme.colors.accent.red,
          }}
        >
          <X className="h-4 w-4" />
        </button>
        <button 
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
          style={{ 
            backgroundColor: theme.colors.accent.green + '20',
            color: theme.colors.accent.green,
          }}
        >
          <Check className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const FriendItem: React.FC<{ friend: Friend }> = ({ friend }) => {
  const getStatusColor = (status: Friend['status']) => {
    switch (status) {
      case 'online': return theme.colors.accent.green;
      case 'playing': return theme.colors.accent.blue;
      case 'away': return theme.colors.accent.yellow;
      case 'offline': return theme.colors.text.muted;
      default: return theme.colors.text.muted;
    }
  };

  return (
    <div 
      className="flex items-center justify-between p-3 rounded-xl transition-all hover:scale-[1.01] cursor-pointer"
      style={{
        backgroundColor: friend.status === 'offline' ? 'transparent' : theme.colors.background.hover,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.background.active;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = friend.status === 'offline' ? 'transparent' : theme.colors.background.hover;
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all"
            style={{
              background: friend.status === 'offline' 
                ? `linear-gradient(135deg, ${theme.colors.text.muted}, ${theme.colors.text.tertiary})`
                : `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.secondary.full})`,
              color: theme.colors.text.primary,
            }}
          >
            {friend.avatar}
          </div>
          <div 
            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-[8px]"
            style={{
              backgroundColor: getStatusColor(friend.status),
              border: `2px solid ${theme.colors.background.secondary}`,
              color: theme.colors.text.primary,
            }}
          >
            {getStatusIcon(friend.status)}
          </div>
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm" style={{ 
            color: friend.status === 'offline' ? theme.colors.text.tertiary : theme.colors.text.primary 
          }}>
            {friend.name}
          </div>
          <div className="text-xs" style={{ color: theme.colors.text.secondary }}>
            {friend.status === 'playing' && friend.game 
              ? `Playing ${friend.game}`
              : friend.lastSeen || friend.status}
          </div>
        </div>
      </div>
      <button 
        className="p-2 rounded-lg transition-all hover:scale-110"
        style={{ 
          backgroundColor: 'transparent',
          color: theme.colors.text.tertiary,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.colors.background.primary;
          e.currentTarget.style.color = theme.colors.primary.full;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = theme.colors.text.tertiary;
        }}
      >
        <MessageCircle className="h-4 w-4" />
      </button>
    </div>
  );
};

// Helper function for status
const getStatusIcon = (status: Friend['status']) => {
  switch (status) {
    case 'online': return '';
    case 'playing': return '▶';
    case 'away': return '';
    case 'offline': return '';
    default: return '';
  }
};
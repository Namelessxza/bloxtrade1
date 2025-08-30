import React, { useState } from 'react';
import { MessageCircle, Send, User, X, Check } from 'lucide-react';
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
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'playing';
  game?: string;
}

export const ChatPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'messages' | 'trades'>('chat');
  const [newMessage, setNewMessage] = useState('');
  
  const [messages] = useState<Message[]>([
    {
      id: '1',
      username: 'Manager',
      avatar: 'M',
      message: 'What JB equivalent to money?',
      timestamp: '5s ago',
    },
    {
      id: '2',
      username: 'Manager',
      avatar: 'M',
      message: 'please do not believe those who contact you from other ranks/apps. If you encounter problems, please contact Live Support',
      timestamp: '5s ago',
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
    },
    {
      id: '5',
      username: 'Manager',
      avatar: 'M',
      message: 'ban',
      timestamp: '5s ago',
      isAdmin: true,
    },
    {
      id: '6',
      username: 'Manager',
      avatar: 'M',
      message: 'HIRING: Looking for someone to take care of me financially. Full time only.',
      timestamp: '5s ago',
    },
  ]);
  
  const [friends] = useState<Friend[]>([
    { id: '1', name: 'Wingwon', avatar: 'W', status: 'online' },
    { id: '2', name: 'Jacob Clark 89', avatar: 'J', status: 'online' },
    { id: '3', name: 'Cyber pilot', avatar: 'C', status: 'playing', game: 'Tiki Runner 2' },
    { id: '4', name: 'Future Saruman_', avatar: 'F', status: 'online' },
    { id: '5', name: 'Anchovy King', avatar: 'A', status: 'offline' },
    { id: '6', name: 'Alan Frost', avatar: 'A', status: 'offline' },
  ]);
  
  const sendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };
  
  return (
    <div className="flex flex-col h-full" style={{
      backgroundColor: theme.colors.background.secondary,
    }}>
      {/* Tabs */}
      <div className="p-3" style={{
        borderBottom: `1px solid ${theme.colors.border.subtle}`,
      }}>
        <div className="flex gap-6">
          <TabButton
            active={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
            label="Global Chat"
            icon={<MessageCircle className="h-4 w-4" />}
          />
          <TabButton
            active={activeTab === 'messages'}
            onClick={() => setActiveTab('messages')}
            label="Messages"
            icon={<MessageCircle className="h-4 w-4" />}
            badge={4}
          />
          <TabButton
            active={activeTab === 'trades'}
            onClick={() => setActiveTab('trades')}
            label="Trades"
            icon={<User className="h-4 w-4" />}
          />
        </div>
      </div>
      
      {/* Content */}
      <ScrollArea className="flex-1 px-3 py-2">
        {activeTab === 'chat' && (
          <div className="space-y-3">
            {messages.map((msg) => (
              <MessageItem key={msg.id} message={msg} />
            ))}
          </div>
        )}
        
        {activeTab === 'messages' && (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 mx-auto mb-3" style={{
              color: theme.colors.text.muted,
            }} />
            <div style={{ color: theme.colors.text.tertiary }}>
              No messages yet
            </div>
          </div>
        )}
        
        {activeTab === 'trades' && (
          <div className="space-y-4">
            {/* Friend Requests */}
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{
                color: theme.colors.text.primary,
              }}>
                Friend Request (2)
              </h3>
              <div className="space-y-2">
                {friends.slice(0, 2).map((friend) => (
                  <FriendRequest key={friend.id} friend={friend} />
                ))}
              </div>
            </div>
            
            {/* Online Friends */}
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{
                color: theme.colors.text.primary,
              }}>
                Online ({friends.filter(f => f.status !== 'offline').length})
              </h3>
              <div className="space-y-2">
                {friends.filter(f => f.status !== 'offline').map((friend) => (
                  <FriendItem key={friend.id} friend={friend} />
                ))}
              </div>
            </div>
            
            {/* Offline Friends */}
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{
                color: theme.colors.text.primary,
              }}>
                Offline ({friends.filter(f => f.status === 'offline').length})
              </h3>
              <div className="space-y-2">
                {friends.filter(f => f.status === 'offline').map((friend) => (
                  <FriendItem key={friend.id} friend={friend} />
                ))}
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
      
      {/* Input */}
      {activeTab === 'chat' && (
        <div className="p-3" style={{
          borderTop: `1px solid ${theme.colors.border.subtle}`,
        }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="relative"
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Your message"
              className="pr-12"
              style={{
                backgroundColor: theme.colors.background.primary,
                border: `1px solid ${theme.colors.border.light}`,
                color: theme.colors.text.primary,
              }}
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0 h-6 w-6"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.accent.blue})`,
              }}
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
  label: string;
  icon: React.ReactNode;
  badge?: number;
}> = ({ active, onClick, label, icon, badge }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm font-medium pb-2 transition-all"
      style={{
        color: active ? theme.colors.text.primary : theme.colors.text.tertiary,
        borderBottom: `2px solid ${active ? theme.colors.primary.full : 'transparent'}`,
      }}
    >
      {icon}
      {label}
      {badge && (
        <span 
          className="text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.accent.orange}, ${theme.colors.accent.red})`,
            color: theme.colors.text.primary,
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className="flex gap-3 items-start p-2 rounded-lg transition-all hover:bg-white/[0.02]">
      <div 
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.secondary.full})`,
          color: theme.colors.text.primary,
        }}
      >
        {message.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold" style={{
            color: theme.colors.text.secondary,
          }}>
            {message.username}
          </span>
          {message.isAdmin && (
            <span 
              className="text-xs px-1.5 py-0.5 rounded text-[10px] font-bold"
              style={{
                backgroundColor: theme.colors.accent.red,
                color: theme.colors.text.primary,
              }}
            >
              ADMIN
            </span>
          )}
          <span className="text-xs ml-auto" style={{
            color: theme.colors.text.muted,
          }}>
            {message.timestamp}
          </span>
        </div>
        <div 
          className="rounded-lg px-3 py-2 inline-block max-w-full"
          style={{
            backgroundColor: theme.colors.background.primary,
            color: theme.colors.text.primary,
          }}
        >
          <p className="text-sm leading-relaxed break-words">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
};

const FriendRequest: React.FC<{ friend: Friend }> = ({ friend }) => {
  return (
    <div 
      className="flex items-center justify-between p-2 rounded-lg"
      style={{ backgroundColor: theme.colors.background.primary }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.secondary.full}, ${theme.colors.accent.pink})`,
            color: theme.colors.text.primary,
          }}
        >
          <span className="text-sm font-bold">{friend.avatar}</span>
        </div>
        <div>
          <div className="text-sm font-medium" style={{ color: theme.colors.text.primary }}>
            {friend.name}
          </div>
          <div className="text-xs" style={{ color: theme.colors.accent.green }}>
            Online
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.colors.accent.red }}
        >
          <X className="h-4 w-4 text-white" />
        </button>
        <button 
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.colors.accent.green }}
        >
          <Check className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
};

const FriendItem: React.FC<{ friend: Friend }> = ({ friend }) => {
  return (
    <div 
      className="flex items-center justify-between p-2 rounded-lg transition-all hover:bg-white/[0.02]"
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.secondary.full})`,
            color: theme.colors.text.primary,
            opacity: friend.status === 'offline' ? 0.6 : 1,
          }}
        >
          <span className="text-sm font-bold">{friend.avatar}</span>
        </div>
        <div>
          <div className="text-sm font-medium" style={{ 
            color: friend.status === 'offline' ? theme.colors.text.tertiary : theme.colors.text.primary 
          }}>
            {friend.name}
          </div>
          <div className="text-xs" style={{ 
            color: friend.status === 'offline' 
              ? theme.colors.text.muted 
              : friend.status === 'playing' 
                ? theme.colors.accent.blue 
                : theme.colors.accent.green 
          }}>
            {friend.status === 'playing' && friend.game 
              ? `Playing ${friend.game}`
              : friend.status === 'offline' 
                ? 'Offline'
                : 'Online'}
          </div>
        </div>
      </div>
      <button 
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ 
          backgroundColor: theme.colors.background.hover,
        }}
      >
        <MessageCircle className="h-4 w-4" style={{ color: theme.colors.text.tertiary }} />
      </button>
    </div>
  );
};
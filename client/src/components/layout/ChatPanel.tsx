import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Hash } from 'lucide-react';
import { theme } from '@/config/theme';

interface Message {
  id: number;
  username: string;
  message: string;
  timestamp: string;
  avatar: string;
  isAdmin?: boolean;
}

export const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: 'jognwatson',
      message: 'Congratulations 🔥🔥🔥🔥',
      timestamp: '1m ago',
      avatar: 'J',
    },
    {
      id: 2,
      username: 'amador',
      message: 'play safe bro',
      timestamp: '3m ago',
      avatar: 'A',
      isAdmin: true,
    },
    {
      id: 3,
      username: 'jognwatson',
      message: 'nice hit ❤️',
      timestamp: '5m ago',
      avatar: 'J',
    },
    {
      id: 4,
      username: 'jognwatson',
      message: 'Best of luck',
      timestamp: '7m ago',
      avatar: 'J',
    },
    {
      id: 5,
      username: 'jognwatson',
      message: 'Congratulations 🔥🔥🔥🔥',
      timestamp: '10m ago',
      avatar: 'J',
    },
    {
      id: 6,
      username: '@cookiechip',
      message: 'congratulations big win today good luck',
      timestamp: '12m ago',
      avatar: 'C',
    },
    {
      id: 7,
      username: 'jognwatson',
      message: 'Hi, everyone',
      timestamp: '15m ago',
      avatar: 'J',
    },
    {
      id: 8,
      username: 'jognwatson',
      message: 'Play safe and sound good luck',
      timestamp: '18m ago',
      avatar: 'J',
    },
    {
      id: 9,
      username: 'amador',
      message: 'play safe bro',
      timestamp: '20m ago',
      avatar: 'A',
      isAdmin: true,
    },
    {
      id: 10,
      username: 'jognwatson',
      message: 'enjoy dear good yat',
      timestamp: '22m ago',
      avatar: 'J',
    },
    {
      id: 11,
      username: 'jognwatson',
      message: 'No luck today',
      timestamp: '25m ago',
      avatar: 'J',
    },
    {
      id: 12,
      username: 'jognwatson',
      message: "I'm doing good 🔥",
      timestamp: '28m ago',
      avatar: 'J',
    },
    {
      id: 13,
      username: '@cookiechip',
      message: 'Good 🔥',
      timestamp: '30m ago',
      avatar: 'C',
    },
    {
      id: 14,
      username: 'jognwatson',
      message: 'Congratulations 🔥🔥🔥🔥',
      timestamp: '32m ago',
      avatar: 'J',
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        username: 'You',
        message: newMessage,
        timestamp: 'now',
        avatar: 'Y',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };
  
  return (
    <div className="flex flex-col h-full" style={{ 
      backgroundColor: theme.colors.background.secondary,
    }}>
      {/* Simple Header */}
      <div className="px-4 py-3 flex items-center gap-2" style={{
        borderBottom: `1px solid ${theme.colors.border.subtle}`,
      }}>
        <Hash className="h-5 w-5" style={{ color: theme.colors.text.muted }} />
        <span className="font-semibold" style={{ color: theme.colors.text.primary }}>
          Chat
        </span>
        <button 
          className="ml-auto px-3 py-1 rounded-lg text-xs font-medium transition-colors"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: theme.colors.text.secondary,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          Rules
        </button>
      </div>
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-0.5">
          {messages.map((msg, index) => (
            <MessageItem 
              key={msg.id} 
              message={msg}
              isFirst={index === 0 || messages[index - 1].username !== msg.username}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input Area */}
      <div className="p-4" style={{
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
            placeholder="Enter your message..."
            className="pr-12 h-10 rounded-lg text-sm"
            style={{
              backgroundColor: theme.colors.background.primary,
              border: `1px solid ${theme.colors.border.light}`,
              color: theme.colors.text.primary,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = theme.colors.border.medium;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = theme.colors.border.light;
            }}
          />
          
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded transition-colors"
            style={{
              color: newMessage.trim() ? theme.colors.primary.full : theme.colors.text.muted,
            }}
            onMouseEnter={(e) => {
              if (newMessage.trim()) {
                e.currentTarget.style.color = theme.colors.primary['300'];
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = newMessage.trim() ? theme.colors.primary.full : theme.colors.text.muted;
            }}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

const MessageItem: React.FC<{ 
  message: Message; 
  isFirst: boolean;
}> = ({ message, isFirst }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="group flex gap-3 items-start py-0.5 px-3 rounded transition-colors"
      style={{
        backgroundColor: hovered ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
        marginTop: isFirst ? '0.75rem' : '0',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar or timestamp */}
      <div className="w-10 flex-shrink-0">
        {isFirst ? (
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
            style={{
              backgroundColor: getAvatarColor(message.username),
              color: theme.colors.text.primary,
            }}
          >
            {message.avatar}
          </div>
        ) : (
          <span 
            className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: theme.colors.text.muted }}
          >
            {message.timestamp}
          </span>
        )}
      </div>
      
      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {isFirst && (
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="font-medium text-sm" style={{ 
              color: getUsernameColor(message.username)
            }}>
              {message.username}
            </span>
            {message.isAdmin && (
              <span 
                className="text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold"
                style={{
                  backgroundColor: theme.colors.secondary.full,
                  color: theme.colors.text.primary,
                }}
              >
                Admin
              </span>
            )}
            <span className="text-xs" style={{ color: theme.colors.text.muted }}>
              {message.timestamp}
            </span>
          </div>
        )}
        <div className="text-sm break-words" style={{ color: theme.colors.text.primary }}>
          {message.message}
        </div>
      </div>
    </div>
  );
};

// Helper functions for consistent colors
const getAvatarColor = (username: string) => {
  const colors = [
    '#5865F2', // Discord blurple
    '#57F287', // Green
    '#FEE75C', // Yellow
    '#EB459E', // Pink
    '#ED4245', // Red
    '#3BA55C', // Dark green
  ];
  
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

const getUsernameColor = (username: string) => {
  if (username.startsWith('@')) {
    return '#EB459E'; // Pink for special users
  }
  
  const colors = [
    '#FFFFFF', // White
    '#949CF7', // Light purple
    '#5DADE2', // Light blue
    '#48C9B0', // Teal
    '#F39C12', // Orange
  ];
  
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};
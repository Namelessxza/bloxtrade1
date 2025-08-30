import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Hash, ChevronDown, Smile } from 'lucide-react';
import { theme } from '@/config/theme';

interface Message {
  id: number;
  username: string;
  message: string;
  timestamp: string;
  avatar: string;
  avatarNumber?: string;
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
      avatarNumber: '11',
    },
    {
      id: 2,
      username: 'amador',
      message: 'play safe bro',
      timestamp: '1m ago',
      avatar: 'A',
      avatarNumber: '42',
      isAdmin: true,
    },
    {
      id: 3,
      username: 'jognwatson',
      message: 'nice Hit ❤️',
      timestamp: '1m ago',
      avatar: 'J',
      avatarNumber: '11',
    },
    {
      id: 4,
      username: 'jognwatson',
      message: 'Best of luck',
      timestamp: '1m ago',
      avatar: 'J',
      avatarNumber: '11',
    },
    {
      id: 5,
      username: 'jognwatson',
      message: 'Congratulations 🔥🔥🔥🔥',
      timestamp: '1m ago',
      avatar: 'J',
      avatarNumber: '11',
    },
    {
      id: 6,
      username: '@cookiechip',
      message: 'congratulations big win today good luck',
      timestamp: '1m ago',
      avatar: 'C',
      avatarNumber: '3',
    },
    {
      id: 7,
      username: 'jognwatson',
      message: 'Hi, everyone',
      timestamp: '1m ago',
      avatar: 'J',
      avatarNumber: '38',
    },
    {
      id: 8,
      username: 'jognwatson',
      message: 'Play safe and sound good luck',
      timestamp: '1m ago',
      avatar: 'J',
      avatarNumber: '38',
    },
    {
      id: 9,
      username: 'amador',
      message: 'play safe bro',
      timestamp: '1m ago',
      avatar: 'A',
      avatarNumber: '42',
      isAdmin: true,
    },
    {
      id: 10,
      username: 'jognwatson',
      message: 'enjoy dear good yat',
      timestamp: '1m ago',
      avatar: 'J',
      avatarNumber: '44',
    },
    {
      id: 11,
      username: 'jognwatson',
      message: 'No luck today',
      timestamp: '1m ago',
      avatar: 'J',
      avatarNumber: '11',
    },
    {
      id: 12,
      username: 'jognwatson',
      message: "I'm doing good 🔥",
      timestamp: '1m ago',
      avatar: 'J',
      avatarNumber: '11',
    },
    {
      id: 13,
      username: '@cookiechip',
      message: 'Good 🔥',
      timestamp: '1m ago',
      avatar: 'C',
      avatarNumber: '3',
    },
    {
      id: 14,
      username: 'jognwatson',
      message: 'Congratulations 🔥🔥🔥🔥',
      timestamp: '1m ago',
      avatar: 'J',
      avatarNumber: '44',
    },
    {
      id: 15,
      username: 'jognwatson',
      message: 'Dropping what ?',
      timestamp: '1m ago',
      avatar: 'J',
      avatarNumber: '11',
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
        avatarNumber: '1',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };
  
  return (
    <div className="flex flex-col h-full" style={{ 
      backgroundColor: '#0a0e1a',
    }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{
        backgroundColor: '#0a0e1a',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
      }}>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-full" style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
            boxShadow: '0 0 15px rgba(0, 212, 255, 0.25)',
          }}>
            <Hash className="h-4 w-4 text-white" style={{ strokeWidth: 2.5 }} />
          </div>
          <span className="text-white font-bold text-lg" style={{
            letterSpacing: '-0.01em',
          }}>
            Chat
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="relative px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #2a3142 0%, #1f2433 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
            }}
            onMouseEnter={(e) => {
              const spotlight = e.currentTarget.querySelector('.spotlight') as HTMLElement;
              if (spotlight) {
                spotlight.style.opacity = '1';
              }
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              const spotlight = e.currentTarget.querySelector('.spotlight') as HTMLElement;
              if (spotlight) {
                spotlight.style.opacity = '0.6';
              }
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
            }}
          >
            <div 
              className="spotlight absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                opacity: 0.6,
                transition: 'opacity 0.3s ease',
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>Rules</span>
          </button>
          
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: 'linear-gradient(180deg, #2a3142 0%, #1f2433 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.background = 'linear-gradient(180deg, #303645 0%, #252938 100%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.background = 'linear-gradient(180deg, #2a3142 0%, #1f2433 100%)';
            }}
          >
            <ChevronDown className="h-5 w-5" style={{ color: '#ffffff', strokeWidth: 2 }} />
          </button>
        </div>
      </div>
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-2">
          {messages.map((msg) => (
            <MessageItem 
              key={msg.id} 
              message={msg}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input Area */}
      <div className="px-3 pb-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="relative"
        >
          <div className="relative flex items-center">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter your message..."
              className="w-full h-10 rounded-lg text-sm pl-4 pr-20"
              style={{
                backgroundColor: '#1a1f2e',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                color: '#9ca3af',
                fontSize: '13px',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.placeholder = 'Type a message...';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.placeholder = 'Enter your message...';
              }}
            />
            
            <div className="absolute right-1 flex items-center gap-1">
              <button
                type="button"
                className="p-1.5 rounded-md transition-colors"
                style={{
                  color: '#6b7280',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#9ca3af';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                <Smile className="h-5 w-5" />
              </button>
              
              <button
                type="submit"
                className="p-1.5 rounded-md transition-all"
                style={{
                  backgroundColor: newMessage.trim() ? '#fbbf24' : 'transparent',
                  color: newMessage.trim() ? '#000' : '#6b7280',
                }}
                onMouseEnter={(e) => {
                  if (newMessage.trim()) {
                    e.currentTarget.style.backgroundColor = '#f59e0b';
                  }
                }}
                onMouseLeave={(e) => {
                  if (newMessage.trim()) {
                    e.currentTarget.style.backgroundColor = '#fbbf24';
                  }
                }}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const MessageItem: React.FC<{ 
  message: Message;
}> = ({ message }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="flex gap-2.5 items-start px-2 py-1.5 rounded-lg transition-colors"
      style={{
        backgroundColor: hovered ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar with number */}
      <div className="relative flex-shrink-0">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: getAvatarColor(message.username, message.avatarNumber),
            color: '#ffffff',
            fontSize: '14px',
          }}
        >
          {message.avatar}
        </div>
        {message.avatarNumber && (
          <div 
            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: '#1a1f2e',
              border: '1.5px solid #0a0e1a',
            }}
          >
            <span style={{
              color: '#6b7280',
              fontSize: '8px',
              fontWeight: '600',
            }}>
              {message.avatarNumber}
            </span>
          </div>
        )}
      </div>
      
      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm" style={{ 
            color: '#9ca3af',
            fontWeight: '500',
            fontSize: '13px',
          }}>
            {message.username}
          </span>
          {message.isAdmin && (
            <span 
              className="px-2 py-0.5 rounded text-[10px] font-semibold"
              style={{
                backgroundColor: '#8b5cf6',
                color: '#ffffff',
              }}
            >
              Admin
            </span>
          )}
          <span className="text-xs ml-auto" style={{ 
            color: '#4b5563',
            fontSize: '11px',
          }}>
            {message.timestamp}
          </span>
        </div>
        <div className="text-sm break-words" style={{ 
          color: message.username.startsWith('@') ? '#ec4899' : '#e5e7eb',
          fontSize: '13px',
          fontWeight: '400',
          lineHeight: '1.4',
        }}>
          {message.message}
        </div>
      </div>
    </div>
  );
};

// Helper function for avatar colors
const getAvatarColor = (username: string, number?: string) => {
  // Use specific colors based on patterns seen in the reference
  if (username === 'amador') {
    return 'linear-gradient(135deg, #a855f7, #7c3aed)'; // Purple gradient
  }
  
  if (username.startsWith('@')) {
    return 'linear-gradient(135deg, #ec4899, #db2777)'; // Pink gradient
  }
  
  // Different colors based on the number
  const colors = [
    'linear-gradient(135deg, #f97316, #ea580c)', // Orange
    'linear-gradient(135deg, #ef4444, #dc2626)', // Red
    'linear-gradient(135deg, #06b6d4, #0891b2)', // Cyan
    'linear-gradient(135deg, #10b981, #059669)', // Green
    'linear-gradient(135deg, #8b5cf6, #7c3aed)', // Purple
    'linear-gradient(135deg, #3b82f6, #2563eb)', // Blue
    'linear-gradient(135deg, #f59e0b, #d97706)', // Amber
    'linear-gradient(135deg, #ec4899, #db2777)', // Pink
  ];
  
  let hash = 0;
  const str = username + (number || '');
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};
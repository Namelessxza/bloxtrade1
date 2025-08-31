import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Hash, ChevronDown, Smile } from 'lucide-react';

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
      username: '@proking',
      message: 'oh is he😄 betting more in one bet than I betted in total my crypto life😄',
      timestamp: '12:09 AM',
      avatar: '🎭',
    },
    {
      id: 2,
      username: '@playerda',
      message: 'keep rolling 😄😄💪',
      timestamp: '12:09 AM',
      avatar: '🎮',
      isAdmin: true,
    },
    {
      id: 3,
      username: '@wooper',
      message: 'he used 87 site i think',
      timestamp: '12:09 AM',
      avatar: '🎯',
    },
    {
      id: 4,
      username: '@mang',
      message: 'mirror site or coco rush site',
      timestamp: '12:09 AM',
      avatar: '🎲',
    },
    {
      id: 5,
      username: '@eaw03',
      message: 'awesome played 😊',
      timestamp: '12:09 AM',
      avatar: '🎪',
    },
    {
      id: 6,
      username: '@nick7389',
      message: 'congratulations 👏👏',
      timestamp: '12:09 AM',
      avatar: '🎨',
      isAdmin: true,
    },
    {
      id: 7,
      username: '@caspros',
      message: '@john wtf how u guys are pro at keno gmmm🔥🔥🔥😂',
      timestamp: '12:09 AM',
      avatar: '🎯',
    },
    {
      id: 8,
      username: '@stopjowk',
      message: 'les go gogog hits more buddy',
      timestamp: '12:09 AM',
      avatar: '🎭',
    },
    {
      id: 9,
      username: '@ow0659',
      message: 'wow thats crazy hit. congrats',
      timestamp: '12:09 AM',
      avatar: '🎮',
    },
    {
      id: 10,
      username: '@kittybad',
      message: 'where is the 21k fd',
      timestamp: '12:09 AM',
      avatar: '🎲',
    },
    {
      id: 11,
      username: '@huirjw1',
      message: 'wlcm to the chat',
      timestamp: '12:09 AM',
      avatar: '🎯',
    },
    {
      id: 12,
      username: '@12fjdk1',
      message: 'congratulations 👏👏',
      timestamp: '12:09 AM',
      avatar: '🚀',
    },
    {
      id: 13,
      username: '@amazingdealer',
      message: 'oh is he😄 betting more in one bet',
      timestamp: '12:09 AM',
      avatar: '🎭',
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
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        avatar: '👤',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ 
      backgroundColor: '#0c1321',
    }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between bg-[#12182B]" style={{
        backgroundColor: '#0F1520',
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
      <div className="px-4 pb-4 pt-2">
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
              placeholder="Enter your message"
              className="flex border-input px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full h-12 rounded-xl text-sm pl-5 pr-24 border-0"
              style={{
                backgroundColor: '#141A28',
                color: '#9ca3af',
                fontSize: '14px',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = '#1a2132';
                e.currentTarget.style.outline = 'none';
                e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = '#141A28';
                e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.3)';
              }}
            />

            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#9ca3af';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                <Smile className="h-5 w-5" />
              </button>

              <button
                type="submit"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{
                  backgroundColor: '#00D4FF',
                  color: '#0A0F1C',
                  boxShadow: '0 2px 8px rgba(0, 212, 255, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#00B8E6';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#00D4FF';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 212, 255, 0.3)';
                }}
              >
                <Send className="h-4 w-4" style={{ marginLeft: '1px', strokeWidth: 2.5 }} />
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
      className="px-2 py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header row with avatar, username, admin badge, and timestamp */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: getAvatarColor(message.username),
              fontSize: '14px',
            }}
          >
            {message.avatar}
          </div>
          
          {/* Username and admin badge */}
          <div className="flex items-baseline gap-1.5">
            <span style={{ 
              color: '#9ca3af',
              fontWeight: '500',
              fontSize: '12px',
              letterSpacing: '-0.01em',
            }}>
              {message.username}
            </span>
            {message.isAdmin && (
              <span 
                style={{
                  background: '#FBBF24',
                  color: '#000000',
                  fontSize: '9px',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  padding: '1px 6px',
                  borderRadius: '3px',
                  display: 'inline-block',
                  lineHeight: '1.3',
                }}
              >
                ADMIN
              </span>
            )}
          </div>
        </div>
        
        {/* Timestamp */}
        <span style={{ 
          color: '#4b5563',
          fontSize: '10px',
        }}>
          {message.timestamp}
        </span>
      </div>
      
      {/* Message bubble */}
      <div className="flex items-start gap-2 mb-1">
        <div className="flex-1">
          <div 
            className="inline-block px-3 py-2 rounded-xl bg-[#13192D]"
            style={{ 
              backgroundColor: '#13192D',
              maxWidth: '85%',
            }}
          >
            <span style={{ 
              color: '#d1d5db',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '1.4',
              wordBreak: 'break-word',
            }}>
              {message.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for avatar colors
const getAvatarColor = (username: string) => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  ];

  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};
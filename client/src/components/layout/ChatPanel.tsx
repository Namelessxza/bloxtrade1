import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Hash, ChevronDown } from 'lucide-react';
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
      message: 'nice Hit ❤️',
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
    {
      id: 15,
      username: 'jognwatson',
      message: 'Dropping what ?',
      timestamp: '35m ago',
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
      backgroundColor: '#1a1f2e',
      borderRadius: '12px',
      margin: '8px',
    }}>
      {/* Header with rounded corners */}
      <div className="px-4 py-3 flex items-center gap-3" style={{
        backgroundColor: '#0f1318',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{
          background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        }}>
          <Hash className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-base" style={{ 
          color: '#ffffff',
          fontFamily: 'Greycliff CF',
        }}>
          Chat
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button 
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1"
            style={{
              backgroundColor: '#2b3544',
              color: '#a0aec0',
              fontFamily: 'Greycliff CF',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#323c4d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2b3544';
            }}
          >
            Rules
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      {/* Messages Area with padding */}
      <ScrollArea className="flex-1 px-3 py-3">
        <div className="space-y-3">
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input Area with rounded corners */}
      <div className="px-4 py-3" style={{
        backgroundColor: '#0f1318',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
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
              className="pr-12 h-11 rounded-full text-sm pl-4"
              style={{
                backgroundColor: '#2b3544',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontFamily: 'Greycliff CF',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.backgroundColor = '#323c4d';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.backgroundColor = '#2b3544';
              }}
            />
            
            <button
              type="submit"
              className="absolute right-1 p-2 rounded-full transition-all flex items-center justify-center"
              style={{
                backgroundColor: newMessage.trim() ? '#fbbf24' : '#2b3544',
                width: '36px',
                height: '36px',
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
              <Send className="h-4 w-4" style={{
                color: newMessage.trim() ? '#0f1318' : '#6b7280',
              }} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MessageBubble: React.FC<{ 
  message: Message;
}> = ({ message }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="flex gap-3 items-start transition-all"
      style={{
        transform: hovered ? 'translateX(2px)' : 'translateX(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar */}
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
        style={{
          background: getAvatarGradient(message.username),
          color: '#ffffff',
          fontFamily: 'Greycliff CF',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        {message.avatar}
      </div>
      
      {/* Message Bubble */}
      <div 
        className="flex-1 rounded-2xl px-4 py-2.5 max-w-[85%]"
        style={{
          backgroundColor: '#2b3544',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sm" style={{ 
            color: getUsernameColor(message.username),
            fontFamily: 'Greycliff CF',
          }}>
            {message.username}
          </span>
          {message.isAdmin && (
            <span 
              className="text-[10px] px-2 py-0.5 rounded-full font-bold"
              style={{
                backgroundColor: '#8b5cf6',
                color: '#ffffff',
                fontFamily: 'Greycliff CF',
              }}
            >
              Admin
            </span>
          )}
          <span className="text-xs ml-auto" style={{ 
            color: '#6b7280',
            fontFamily: 'Greycliff CF',
          }}>
            {message.timestamp}
          </span>
        </div>
        <div className="text-sm break-words" style={{ 
          color: '#e5e7eb',
          fontFamily: 'Greycliff CF',
          lineHeight: '1.5',
        }}>
          {message.message}
        </div>
      </div>
    </div>
  );
};

// Helper functions for avatar gradients
const getAvatarGradient = (username: string) => {
  const gradients = [
    'linear-gradient(135deg, #667eea, #764ba2)', // Purple
    'linear-gradient(135deg, #f093fb, #f5576c)', // Pink
    'linear-gradient(135deg, #4facfe, #00f2fe)', // Blue
    'linear-gradient(135deg, #43e97b, #38f9d7)', // Green
    'linear-gradient(135deg, #fa709a, #fee140)', // Yellow-pink
    'linear-gradient(135deg, #30cfd0, #330867)', // Dark blue
    'linear-gradient(135deg, #a8edea, #fed6e3)', // Light blue-pink
    'linear-gradient(135deg, #ff9a9e, #fecfef)', // Light pink
  ];
  
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return gradients[Math.abs(hash) % gradients.length];
};

const getUsernameColor = (username: string) => {
  if (username.startsWith('@')) {
    return '#f472b6'; // Pink for special users
  }
  
  if (username === 'amador') {
    return '#fbbf24'; // Yellow for specific user
  }
  
  const colors = [
    '#ffffff', // White
    '#93c5fd', // Light blue
    '#a78bfa', // Light purple
    '#86efac', // Light green
    '#fde68a', // Light yellow
    '#fca5a5', // Light red
  ];
  
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Shield, Globe } from 'lucide-react';

interface Message {
  id: number;
  username: string;
  message: string;
  timestamp: string;
  avatar: string;
}

export const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: 'MarieJane',
      message: 'Anybody home',
      timestamp: '2s ago',
      avatar: '👤',
    },
    {
      id: 2,
      username: 'MarieJane',
      message: 'still paying?',
      timestamp: '2s ago',
      avatar: '👤',
    },
    {
      id: 3,
      username: 'MarieJane',
      message: 'hey i reported a bug the other day that whenever i win a raffle my balance jumps up to over 240 i think its just a visual bug but it will still happening should i recontact them or is it being worked on?',
      timestamp: '2s ago',
      avatar: '👤',
    },
    {
      id: 4,
      username: 'ZEUS',
      message: 'Anybody home',
      timestamp: '2s ago',
      avatar: '🎮',
    },
    {
      id: 5,
      username: 'ZEUS',
      message: '@queenlarralou the devs are aware of that bug',
      timestamp: '2s ago',
      avatar: '🎮',
    },
    {
      id: 6,
      username: 'MarieJane',
      message: 'good luck ixi',
      timestamp: '2s ago',
      avatar: '👤',
    },
    {
      id: 7,
      username: 'MarieJane',
      message: 'im glad they bought raffles back i enjoyed it at christmas shame there isnt a missions pass again though',
      timestamp: '3s ago',
      avatar: '👤',
    },
    {
      id: 8,
      username: 'MarieJane',
      message: 'embdy have good aff for this site?',
      timestamp: '4s ago',
      avatar: '👤',
    },
    {
      id: 9,
      username: 'MarieJane',
      message: 'You can join the discord linked below check support check out self-promotion',
      timestamp: '2s ago',
      avatar: '👤',
    },
    {
      id: 10,
      username: 'MarieJane',
      message: 'no affiliate code, promotion from other site user custom site socials promotion in the live stream',
      timestamp: '2s ago',
      avatar: '👤',
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
        avatar: '👤',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ 
      backgroundColor: '#0D0E24',
    }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{
        backgroundColor: '#0D0E24',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            FREE RAIN
          </span>
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-lg">$90,000</span>
            <span className="text-green-400 font-bold text-lg">67</span>
          </div>
        </div>

        <button 
          className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
          style={{
            background: 'linear-gradient(90deg, #00ff88 0%, #00cc88 100%)',
            color: '#000000',
          }}
        >
          Join
        </button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
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
      <div className="px-3 pb-3 pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="relative"
        >
          <div className="relative flex items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Your message"
              className="flex-1 h-10 rounded-lg text-sm pl-4 pr-4 border-0"
              style={{
                backgroundColor: '#161730',
                color: '#9ca3af',
                fontSize: '13px',
              }}
            />

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                style={{
                  backgroundColor: '#1C214A',
                  color: '#9ca3af',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#252B5C';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1C214A';
                }}
              >
                <Shield className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                style={{
                  backgroundColor: '#1C214A',
                  color: '#9ca3af',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#252B5C';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1C214A';
                }}
              >
                <Globe className="h-5 w-5" />
              </button>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-center gap-1 mt-3">
          <span className="text-xs" style={{ color: '#4a4d6b' }}>Activate</span>
          <span className="text-xs" style={{ color: '#7c7fa0' }}>+</span>
          <span className="text-xs" style={{ color: '#4a4d6b' }}>Go to</span>
          <span className="text-xs" style={{ color: '#7c7fa0' }}>Settings</span>
        </div>

        <button
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Send className="h-5 w-5 text-white" style={{ marginLeft: '2px' }} />
        </button>
      </div>
    </div>
  );
};

const MessageItem: React.FC<{ 
  message: Message;
}> = ({ message }) => {
  return (
    <div className="flex items-start gap-2.5 px-2 py-1.5">
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
      
      {/* Message content */}
      <div className="flex-1 min-w-0">
        {/* Username and timestamp row */}
        <div className="flex items-baseline gap-2 mb-0.5">
          <span style={{ 
            color: '#9ca3af',
            fontSize: '12px',
            fontWeight: '500',
          }}>
            {message.username}
          </span>
          <span style={{ 
            color: '#4a4d6b',
            fontSize: '10px',
          }}>
            {message.timestamp}
          </span>
        </div>
        
        {/* Message bubble */}
        <div 
          className="inline-block rounded-lg px-3 py-1.5"
          style={{ 
            backgroundColor: '#1C214A',
            maxWidth: '100%',
          }}
        >
          <span style={{ 
            color: '#e5e7eb',
            fontSize: '13px',
            lineHeight: '1.5',
            wordBreak: 'break-word',
          }}>
            {message.message}
          </span>
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
  ];

  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};
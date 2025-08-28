import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Smile, Image as ImageIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  avatar: string;
  isManager?: boolean;
  isAdmin?: boolean;
}

interface RightSideChatPanelProps {
  isLoggedIn?: boolean;
}

const RightSideChatPanel = ({ isLoggedIn = false }: RightSideChatPanelProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      username: "Manager",
      message: "What JB equivalent to money?",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manager1",
      isManager: true
    },
    {
      id: "2",
      username: "Manager", 
      message: "please do not believe those who contact you from other webs/apps. If you encounter problems, please contact Live Support",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manager2",
      isManager: true
    },
    {
      id: "3",
      username: "Manager",
      message: "being empty doesnt feel sucks anymore",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manager3",
      isManager: true
    },
    {
      id: "4",
      username: "Manager",
      message: "lol...its well for eyes....u know whats my meant? 😉 lol",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manager4",
      isManager: true
    },
    {
      id: "5",
      username: "Manager",
      message: "ban",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manager5",
      isManager: true,
      isAdmin: true
    },
    {
      id: "6",
      username: "Manager",
      message: "HIRING: Looking for someone to take care of me financially, full time only.",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manager6",
      isManager: true
    },
    {
      id: "7",
      username: "Manager",
      message: "congrats",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manager7",
      isManager: true
    },
    {
      id: "8",
      username: "Manager",
      message: "My payment not completed",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manager8",
      isManager: true
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && isLoggedIn && message.length <= 200) {
      const newMessage: Message = {
        id: Date.now().toString(),
        username: "You",
        message: message.trim(),
        timestamp: new Date(),
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return "now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hr ago`;
    return date.toLocaleDateString();
  };

  const onlineUsers = [
    { id: "1", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1" },
    { id: "2", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2" },
    { id: "3", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user3" },
  ];

  return (
    <div className="w-[320px] h-full bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-5 w-5 text-blue-400" />
          <h3 className="font-medium text-white text-sm">Online chat</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium">122</span>
          <div className="flex -space-x-2">
            {onlineUsers.map((user) => (
              <Avatar key={user.id} className="h-6 w-6 border-2 border-slate-800">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xs">U</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-900">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <div className="relative flex-shrink-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback className="text-xs bg-slate-700 text-white">
                  {msg.username[0]}
                </AvatarFallback>
              </Avatar>
              {msg.isManager && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm font-medium ${msg.isManager ? 'text-blue-400' : 'text-gray-300'}`}>
                  {msg.username}
                </span>
                {msg.isAdmin && (
                  <Badge className="text-xs px-2 py-0 h-5 bg-red-600 hover:bg-red-600 text-white">
                    ADMIN
                  </Badge>
                )}
                <span className="text-xs text-gray-500">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <div className="text-sm text-gray-200 break-words leading-relaxed">
                {msg.message}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-700 p-3 bg-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-slate-700 px-2">
            <ImageIcon className="h-4 w-4 mr-1" />
            GIF
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-slate-700 px-2">
            <Smile className="h-4 w-4 mr-1" />
            Emoji
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-slate-700 px-2">
            <FileText className="h-4 w-4 mr-1" />
            Rules
          </Button>
        </div>
        
        {!isLoggedIn ? (
          <div className="relative">
            <Input
              placeholder="Send a message"
              disabled
              className="bg-slate-700 border-slate-600 text-gray-400 pr-12"
            />
            <div className="absolute inset-0 bg-slate-700/80 rounded-md flex items-center justify-center">
              <span className="text-sm text-gray-400 font-medium">
                Login to Chat
              </span>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send a message"
              maxLength={200}
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || message.length > 200}
              size="icon"
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSideChatPanel;
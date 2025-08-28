import { useState, useRef, useEffect } from "react";
import { Minimize2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
}

interface LiveChatSidebarProps {
  isLoggedIn?: boolean;
}

const LiveChatSidebar = ({ isLoggedIn = false }: LiveChatSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
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
        username: "You", // This would come from user context
        message: message.trim(),
        timestamp: new Date()
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
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <>
      {/* Toggle Button - Fixed position */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gaming-purple hover:bg-gaming-purple/80 text-white rounded-full w-14 h-14 shadow-lg gaming-text-glow"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-gaming-card border-l border-border/20 shadow-2xl z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20 bg-gaming-card/50 backdrop-blur-sm">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-gaming-purple" />
            Community Chat
          </h3>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 h-[calc(100vh-140px)]">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gaming-cyan">
                    {msg.username}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <div className="text-sm text-foreground bg-muted/20 rounded-lg p-2 break-words">
                  {msg.message}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border/20 p-4">
          {!isLoggedIn ? (
            <div className="relative">
              <Input
                placeholder="Login to chat..."
                disabled
                className="pr-12 bg-muted/50"
              />
              <div className="absolute inset-0 bg-muted/80 rounded-md flex items-center justify-center">
                <span className="text-sm text-muted-foreground font-medium">
                  Login to Chat
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  maxLength={200}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || message.length > 200}
                  size="icon"
                  className="gaming-button-primary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Press Enter to send</span>
                <span className={message.length > 180 ? 'text-warning' : ''}>
                  {message.length}/200
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default LiveChatSidebar;
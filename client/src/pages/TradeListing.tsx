import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Send, Flag, Shield, Clock, MessageCircle, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TradeMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: Date;
  isOnline: boolean;
}

interface TradeItem {
  id: string;
  title: string;
  image: string;
  rarity: string;
  game: string;
  category: string;
  description: string;
  requirements: string;
  player: {
    username: string;
    avatar: string;
    level: number;
    isOnline: boolean;
    reputation: number;
    tradesCompleted: number;
  };
}

const TradeListing = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<TradeMessage[]>([]);
  const [isLoggedIn] = useState(false); // This would come from auth context
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock trade item data - in a real app, this would be fetched based on ID
  const tradeItem: TradeItem = {
    id: id || "1",
    title: "Cyberpunk Assault Rifle X-7",
    image: "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?w=400&h=300&fit=crop",
    rarity: "Legendary",
    game: "Steal A brainrot",
    category: "Weapons",
    description: "Rare assault rifle with cybernetic enhancements. Perfect condition, never used in PvP combat. Comes with all original attachments and custom paint job.",
    requirements: "Looking for: Epic+ armor pieces, preferably from Dragon's Quest. Will consider multiple rare items for trade.",
    player: {
      username: "CyberNinja_X",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja",
      level: 47,
      isOnline: true,
      reputation: 4.8,
      tradesCompleted: 127
    }
  };

  // Mock messages
  const mockMessages: TradeMessage[] = [
    {
      id: "1",
      userId: "trader1",
      username: "CyberNinja_X",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja",
      message: "This rifle is in perfect condition. Happy to provide more screenshots if needed!",
      timestamp: new Date(Date.now() - 3600000),
      isOnline: true
    },
    {
      id: "2",
      userId: "user2",
      username: "DragonHunter_99",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DragonHunter",
      message: "I have a Dragon Lord Chest Plate (Epic) and Dragon Greaves (Rare). Would you be interested?",
      timestamp: new Date(Date.now() - 1800000),
      isOnline: false
    },
    {
      id: "3",
      userId: "trader1",
      username: "CyberNinja_X",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja",
      message: "That sounds interesting! Can you send screenshots of both items?",
      timestamp: new Date(Date.now() - 900000),
      isOnline: true
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && isLoggedIn) {
      const message: TradeMessage = {
        id: Date.now().toString(),
        userId: "currentUser",
        username: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
        message: newMessage.trim(),
        timestamp: new Date(),
        isOnline: true
      };
      setMessages(prev => [...prev, message]);
      setNewMessage("");
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
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 24) {
      return date.toLocaleDateString();
    } else if (diffHours >= 1) {
      return `${diffHours}h ago`;
    } else if (diffMins >= 1) {
      return `${diffMins}m ago`;
    } else {
      return 'Just now';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythic': return 'bg-gaming-purple/20 text-gaming-purple gaming-text-glow';
      case 'Legendary': return 'bg-yellow-500/20 text-yellow-400 gaming-text-glow';
      case 'Epic': return 'bg-gaming-cyan/20 text-gaming-cyan gaming-text-glow';
      default: return 'bg-gaming-green/20 text-gaming-green';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="responsive-container py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trade Details Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trader Profile */}
            <div className="gaming-card p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={tradeItem.player.avatar} />
                  <AvatarFallback>{tradeItem.player.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-foreground">{tradeItem.player.username}</h3>
                    <div className={`w-3 h-3 rounded-full ${tradeItem.player.isOnline ? 'bg-success' : 'bg-muted-foreground/30'}`} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Level {tradeItem.player.level}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Reputation</div>
                  <div className="font-semibold text-gaming-cyan">{tradeItem.player.reputation}/5.0</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Trades</div>
                  <div className="font-semibold">{tradeItem.player.tradesCompleted}</div>
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="gaming-card p-6">
              <img 
                src={tradeItem.image} 
                alt={tradeItem.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-3">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{tradeItem.title}</h2>
                  <p className="text-sm text-muted-foreground">{tradeItem.game}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={`${getRarityColor(tradeItem.rarity)} border-0`}>
                    {tradeItem.rarity}
                  </Badge>
                  <Badge variant="outline" className="border-border/30">
                    {tradeItem.category}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{tradeItem.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Trade Requirements</h4>
                  <p className="text-sm text-muted-foreground">{tradeItem.requirements}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Discussion Thread */}
          <div className="lg:col-span-2">
            <div className="gaming-card h-[600px] flex flex-col">
              {/* Thread Header */}
              <div className="border-b border-border/20 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-gaming-purple" />
                    Trade Discussion
                  </h3>
                  <Button variant="outline" size="sm" className="text-warning border-warning/30 hover:bg-warning/10">
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex space-x-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.username.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{message.username}</span>
                        <div className={`w-2 h-2 rounded-full ${message.isOnline ? 'bg-success' : 'bg-muted-foreground/30'}`} />
                        <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                      </div>
                      <div className="text-sm text-foreground bg-muted/20 rounded-lg p-3 break-words">
                        {message.message}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-border/20 p-4">
                {!isLoggedIn ? (
                  <div className="relative">
                    <Textarea
                      placeholder="Login to join the discussion..."
                      disabled
                      className="pr-12 bg-muted/50 resize-none"
                      rows={2}
                    />
                    <div className="absolute inset-0 bg-muted/80 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <Shield className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground font-medium">
                          Login to join the discussion
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 resize-none"
                        rows={2}
                        maxLength={500}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="gaming-button-primary self-end"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Press Enter to send, Shift+Enter for new line</span>
                      <span className={newMessage.length > 450 ? 'text-warning' : ''}>
                        {newMessage.length}/500
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Safety Notice */}
            <div className="mt-4 p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning mb-1">Trading Safety</p>
                  <p className="text-muted-foreground">
                    Always verify items before trading. Use secure trading methods and report suspicious activity.
                    Never share personal information or payment details outside the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TradeListing;
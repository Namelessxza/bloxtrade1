// Type definitions for the application

export interface User {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  level?: number;
  balance?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Game {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  playerCount: number;
  itemCount: number;
  description?: string;
}

export interface TradeItem {
  id: string;
  name: string;
  game: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  value: number;
  imageUrl?: string;
  owner: string;
}

export interface Trade {
  id: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  offeredBy: User;
  offeredTo?: User;
  offeredItems: TradeItem[];
  requestedItems: TradeItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  message: string;
  timestamp: Date;
  isAdmin?: boolean;
  channelId?: string;
}

export interface Notification {
  id: string;
  type: 'trade' | 'message' | 'system' | 'achievement';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: any;
}
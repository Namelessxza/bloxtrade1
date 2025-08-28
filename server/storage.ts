import {
  users,
  trades,
  notifications,
  messages,
  tradeOffers,
  userBadges,
  type User,
  type UpsertUser,
  type Trade,
  type InsertTrade,
  type Notification,
  type InsertNotification,
  type Message,
  type InsertMessage,
  type TradeOffer,
  type InsertTradeOffer,
  type UserBadge,
  type InsertUserBadge,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, count, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Dashboard operations
  getUserStats(userId: string): Promise<{
    totalTrades: number;
    completedTrades: number;
    activeTrades: number;
    reputation: number;
    badges: UserBadge[];
  }>;
  
  // Trade operations
  createTrade(trade: InsertTrade): Promise<Trade>;
  getUserTrades(userId: string, status?: string): Promise<Trade[]>;
  getActiveTrades(limit?: number): Promise<Trade[]>;
  updateTrade(id: string, updates: Partial<Trade>): Promise<Trade | undefined>;
  bumpTrade(id: string, userId: string): Promise<Trade | undefined>;
  
  // Notification operations
  createNotification(notification: InsertNotification): Promise<Notification>;
  getUserNotifications(userId: string, unreadOnly?: boolean): Promise<Notification[]>;
  markNotificationRead(id: string): Promise<void>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getUserMessages(userId: string): Promise<Message[]>;
  getTradeMessages(tradeId: string): Promise<Message[]>;
  markMessageRead(id: string): Promise<void>;
  
  // Trade offer operations
  createTradeOffer(offer: InsertTradeOffer): Promise<TradeOffer>;
  getTradeOffers(tradeId: string): Promise<TradeOffer[]>;
  updateTradeOfferStatus(id: string, status: string): Promise<TradeOffer | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
  
  // Dashboard operations
  async getUserStats(userId: string): Promise<{
    totalTrades: number;
    completedTrades: number;
    activeTrades: number;
    reputation: number;
    badges: UserBadge[];
  }> {
    const user = await this.getUser(userId);
    if (!user) {
      return {
        totalTrades: 0,
        completedTrades: 0,
        activeTrades: 0,
        reputation: 0,
        badges: [],
      };
    }
    
    const [activeTradesCount] = await db
      .select({ count: count() })
      .from(trades)
      .where(and(eq(trades.creatorId, userId), eq(trades.status, "active")));
    
    const badges = await db
      .select()
      .from(userBadges)
      .where(eq(userBadges.userId, userId));
    
    return {
      totalTrades: user.totalTrades || 0,
      completedTrades: user.completedTrades || 0,
      activeTrades: activeTradesCount.count,
      reputation: user.reputation || 0,
      badges,
    };
  }
  
  // Trade operations
  async createTrade(trade: InsertTrade): Promise<Trade> {
    const [newTrade] = await db.insert(trades).values(trade).returning();
    return newTrade;
  }
  
  async getUserTrades(userId: string, status?: string): Promise<Trade[]> {
    const conditions = [eq(trades.creatorId, userId)];
    if (status) {
      conditions.push(eq(trades.status, status));
    }
    
    return await db
      .select()
      .from(trades)
      .where(and(...conditions))
      .orderBy(desc(trades.createdAt));
  }
  
  async getActiveTrades(limit = 20): Promise<Trade[]> {
    return await db
      .select()
      .from(trades)
      .where(eq(trades.status, "active"))
      .orderBy(desc(trades.lastBumped))
      .limit(limit);
  }
  
  async updateTrade(id: string, updates: Partial<Trade>): Promise<Trade | undefined> {
    const [updatedTrade] = await db
      .update(trades)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(trades.id, id))
      .returning();
    return updatedTrade;
  }
  
  async bumpTrade(id: string, userId: string): Promise<Trade | undefined> {
    const [trade] = await db
      .update(trades)
      .set({
        lastBumped: new Date(),
        bumpCount: sql`${trades.bumpCount} + 1`,
        updatedAt: new Date(),
      })
      .where(and(eq(trades.id, id), eq(trades.creatorId, userId)))
      .returning();
    return trade;
  }
  
  // Notification operations
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db
      .insert(notifications)
      .values(notification)
      .returning();
    return newNotification;
  }
  
  async getUserNotifications(userId: string, unreadOnly = false): Promise<Notification[]> {
    const conditions = [eq(notifications.userId, userId)];
    if (unreadOnly) {
      conditions.push(eq(notifications.isRead, false));
    }
    
    return await db
      .select()
      .from(notifications)
      .where(and(...conditions))
      .orderBy(desc(notifications.createdAt));
  }
  
  async markNotificationRead(id: string): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id));
  }
  
  // Message operations
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
  
  async getUserMessages(userId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(or(eq(messages.senderId, userId), eq(messages.receiverId, userId)))
      .orderBy(desc(messages.createdAt));
  }
  
  async getTradeMessages(tradeId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.tradeId, tradeId))
      .orderBy(desc(messages.createdAt));
  }
  
  async markMessageRead(id: string): Promise<void> {
    await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id));
  }
  
  // Trade offer operations
  async createTradeOffer(offer: InsertTradeOffer): Promise<TradeOffer> {
    const [newOffer] = await db.insert(tradeOffers).values(offer).returning();
    return newOffer;
  }
  
  async getTradeOffers(tradeId: string): Promise<TradeOffer[]> {
    return await db
      .select()
      .from(tradeOffers)
      .where(eq(tradeOffers.tradeId, tradeId))
      .orderBy(desc(tradeOffers.createdAt));
  }
  
  async updateTradeOfferStatus(id: string, status: string): Promise<TradeOffer | undefined> {
    const [updatedOffer] = await db
      .update(tradeOffers)
      .set({ status })
      .where(eq(tradeOffers.id, id))
      .returning();
    return updatedOffer;
  }
}

export const storage = new DatabaseStorage();

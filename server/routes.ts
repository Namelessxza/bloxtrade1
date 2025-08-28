import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertTradeSchema, insertNotificationSchema, insertMessageSchema, insertTradeOfferSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Dashboard routes
  app.get('/api/dashboard/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  app.get('/api/dashboard/recent-trades', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const trades = await storage.getUserTrades(userId);
      res.json(trades.slice(0, 5)); // Return last 5 trades
    } catch (error) {
      console.error("Error fetching recent trades:", error);
      res.status(500).json({ message: "Failed to fetch recent trades" });
    }
  });

  // Trade routes
  app.get('/api/trades', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const trades = await storage.getActiveTrades(limit);
      res.json(trades);
    } catch (error) {
      console.error("Error fetching trades:", error);
      res.status(500).json({ message: "Failed to fetch trades" });
    }
  });

  app.get('/api/trades/my', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const status = req.query.status as string;
      const trades = await storage.getUserTrades(userId, status);
      res.json(trades);
    } catch (error) {
      console.error("Error fetching user trades:", error);
      res.status(500).json({ message: "Failed to fetch user trades" });
    }
  });

  app.post('/api/trades', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tradeData = insertTradeSchema.parse({
        ...req.body,
        creatorId: userId,
      });
      const trade = await storage.createTrade(tradeData);
      res.json(trade);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        console.error("Error creating trade:", error);
        res.status(500).json({ message: "Failed to create trade" });
      }
    }
  });

  app.post('/api/trades/:id/bump', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tradeId = req.params.id;
      const trade = await storage.bumpTrade(tradeId, userId);
      if (!trade) {
        return res.status(404).json({ message: "Trade not found or unauthorized" });
      }
      res.json(trade);
    } catch (error) {
      console.error("Error bumping trade:", error);
      res.status(500).json({ message: "Failed to bump trade" });
    }
  });

  app.patch('/api/trades/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tradeId = req.params.id;
      
      // Verify ownership
      const existingTrade = await storage.getUserTrades(userId);
      const ownsTrade = existingTrade.some(trade => trade.id === tradeId);
      if (!ownsTrade) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const trade = await storage.updateTrade(tradeId, req.body);
      if (!trade) {
        return res.status(404).json({ message: "Trade not found" });
      }
      res.json(trade);
    } catch (error) {
      console.error("Error updating trade:", error);
      res.status(500).json({ message: "Failed to update trade" });
    }
  });

  // Notification routes
  app.get('/api/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const unreadOnly = req.query.unread === 'true';
      const notifications = await storage.getUserNotifications(userId, unreadOnly);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.patch('/api/notifications/:id/read', isAuthenticated, async (req: any, res) => {
    try {
      const notificationId = req.params.id;
      await storage.markNotificationRead(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  // Message routes
  app.get('/api/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const messages = await storage.getUserMessages(userId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.get('/api/messages/trade/:tradeId', isAuthenticated, async (req: any, res) => {
    try {
      const tradeId = req.params.tradeId;
      const messages = await storage.getTradeMessages(tradeId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching trade messages:", error);
      res.status(500).json({ message: "Failed to fetch trade messages" });
    }
  });

  app.post('/api/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const messageData = insertMessageSchema.parse({
        ...req.body,
        senderId: userId,
      });
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Failed to create message" });
      }
    }
  });

  // Trade offer routes
  app.get('/api/trades/:tradeId/offers', isAuthenticated, async (req: any, res) => {
    try {
      const tradeId = req.params.tradeId;
      const offers = await storage.getTradeOffers(tradeId);
      res.json(offers);
    } catch (error) {
      console.error("Error fetching trade offers:", error);
      res.status(500).json({ message: "Failed to fetch trade offers" });
    }
  });

  app.post('/api/trades/:tradeId/offers', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tradeId = req.params.tradeId;
      const offerData = insertTradeOfferSchema.parse({
        ...req.body,
        tradeId,
        offererId: userId,
      });
      const offer = await storage.createTradeOffer(offerData);
      res.json(offer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        console.error("Error creating trade offer:", error);
        res.status(500).json({ message: "Failed to create trade offer" });
      }
    }
  });

  app.patch('/api/offers/:id/status', isAuthenticated, async (req: any, res) => {
    try {
      const offerId = req.params.id;
      const { status } = req.body;
      const offer = await storage.updateTradeOfferStatus(offerId, status);
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }
      res.json(offer);
    } catch (error) {
      console.error("Error updating offer status:", error);
      res.status(500).json({ message: "Failed to update offer status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

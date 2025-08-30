// API service layer for all backend communications

const API_BASE_URL = '/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  }

  // User endpoints
  async getUser(userId: string) {
    return this.request(`/users/${userId}`);
  }

  async updateUser(userId: string, data: any) {
    return this.request(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Trade endpoints
  async getTrades(params?: any) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/trades${query}`);
  }

  async createTrade(data: any) {
    return this.request('/trades', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTrade(tradeId: string, data: any) {
    return this.request(`/trades/${tradeId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteTrade(tradeId: string) {
    return this.request(`/trades/${tradeId}`, {
      method: 'DELETE',
    });
  }

  // Inventory endpoints
  async getInventory(userId: string) {
    return this.request(`/users/${userId}/inventory`);
  }

  async getMarketplace(params?: any) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/marketplace${query}`);
  }

  // Chat endpoints
  async getMessages(channelId: string, limit = 50) {
    return this.request(`/chat/${channelId}/messages?limit=${limit}`);
  }

  async sendMessage(channelId: string, message: string) {
    return this.request(`/chat/${channelId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Game endpoints
  async getGames() {
    return this.request('/games');
  }

  async getGameItems(gameId: string) {
    return this.request(`/games/${gameId}/items`);
  }

  // Notification endpoints
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationRead(notificationId: string) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'POST',
    });
  }

  // Stats endpoints
  async getStats() {
    return this.request('/stats');
  }

  async getLeaderboard(type = 'trades') {
    return this.request(`/leaderboard/${type}`);
  }
}

export const api = new ApiService();
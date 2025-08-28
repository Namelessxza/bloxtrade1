import { useState } from "react";
import { TrendingUp, Users, DollarSign, Package, Filter, Grid3X3, List } from "lucide-react";
import Header from "@/components/Header";
import GameItemCard from "@/components/GameItemCard";
import StatsCard from "@/components/StatsCard";
import LiveChatSidebar from "@/components/LiveChatSidebar";
import SearchBar from "@/components/SearchBar";
import QuickFilters from "@/components/QuickFilters";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Placeholder images for game items
const item1 = "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?w=400&h=300&fit=crop";
const item2 = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";
const item3 = "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop";
const item4 = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop";
const item5 = "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop";
const item6 = "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=300&fit=crop";

const gameItems = [
  {
    id: "1",
    title: "Cyberpunk Assault Rifle X-7",
    image: item1,
    currentPrice: 89.99,
    originalPrice: 129.99,
    discount: 31,
    rarity: "Legendary" as const,
    game: "Steal A brainrot",
    category: "Weapons",
    isOnSale: true,
    isTrending: true,
    player: {
      username: "CyberNinja_X",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja",
      level: 47,
      isOnline: true
    }
  },
  {
    id: "2", 
    title: "Crystal Mystique Staff",
    image: item2,
    currentPrice: 156.50,
    rarity: "Epic" as const,
    game: "Grow A garden",
    category: "Magic Items",
    isTrending: false,
    player: {
      username: "MysticMage_92",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MysticMage",
      level: 33,
      isOnline: false
    }
  },
  {
    id: "3",
    title: "Dragon Lord Armor Set",
    image: item3,
    currentPrice: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rarity: "Mythic" as const,
    game: "Dragon's Quest",
    category: "Armor",
    isOnSale: true,
    player: {
      username: "DragonSlayer_001",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DragonSlayer",
      level: 89,
      isOnline: true
    }
  },
  {
    id: "4",
    title: "Neon Drift Hoverboard",
    image: item4,
    currentPrice: 67.00,
    rarity: "Rare" as const,
    game: "Velocity Racing",
    category: "Vehicles",
    isTrending: true,
    player: {
      username: "SpeedDemon_77",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SpeedDemon",
      level: 25,
      isOnline: true
    }
  },
  {
    id: "5",
    title: "Celestial Wing Pack",
    image: item5,
    currentPrice: 199.99,
    rarity: "Mythic" as const,
    game: "Angel Wars",
    category: "Cosmetics",
    player: {
      username: "AngelicWarrior",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AngelicWarrior",
      level: 62,
      isOnline: false
    }
  },
  {
    id: "6",
    title: "Frost Blade Legendary",
    image: item6,
    currentPrice: 134.99,
    originalPrice: 159.99,
    discount: 16,
    rarity: "Legendary" as const,
    game: "Ice Kingdom",
    category: "Weapons",
    isOnSale: true,
    player: {
      username: "IceQueen_2024",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=IceQueen",
      level: 55,
      isOnline: true
    }
  },
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ itemType: "all", rarity: "all", verifiedOnly: false });
  const itemsPerPage = 20;
  const totalItems = gameItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when sorting
  };
  
  const handleRowClick = (itemId: string) => {
    window.location.href = `/trade/${itemId}`;
  };
  
  const handleSendOffer = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    // TODO: Check if user is logged in, if not prompt login
    console.log('Send offer for item:', itemId);
  };
  
  // Paginate items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = gameItems.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="responsive-container py-4 sm:py-6 lg:py-8">
        {/* Hero Section */}
        <section className="mb-8 lg:mb-12">
          <div className="text-center space-y-4 mb-6 lg:mb-8">
            <h1 className="gradient-text-improved gaming-text-glow">
              GameXchange Marketplace
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Trade, collect, and discover rare gaming items from your favorite games. 
              Join thousands of gamers in the ultimate digital marketplace.
            </p>
          </div>
          
          {/* Quick Stats - Temporarily Hidden */}
          {/* 
          <div className="responsive-grid-4 mb-6 lg:mb-8">
            <StatsCard
              title="Total Items"
              value="12,547"
              subtitle="Active listings"
              icon={<Package className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Active Traders"
              value="8,293"
              subtitle="This month"
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Volume Traded"
              value="$2.4M"
              subtitle="Last 30 days"
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: 23, isPositive: true }}
            />
            <StatsCard
              title="Trending Games"
              value="147"
              subtitle="Popular today"
              icon={<TrendingUp className="h-5 w-5" />}
              trend={{ value: 5, isPositive: true }}
            />
          </div>
          */}
        </section>

        {/* Marketplace Section */}
        <section>
          <div className="space-y-6">
            {/* Header with Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-foreground">Featured Marketplace</h2>
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {/* Filters and Sort */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <QuickFilters onFiltersChange={handleFiltersChange} />
              
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-40 bg-gaming-card border-border/30">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="recently-bumped">Recently Bumped</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rarity">Rarity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="grid" className="space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gaming-button-secondary">
                  All Games
                </Button>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Steal A brainrot
                </Button>
                <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                  Grow A garden
                </Button>
                <Button variant="ghost" size="sm" className="hidden lg:inline-flex">
                  Dragon's Quest
                </Button>
              </div>
              
              <TabsList className="bg-gaming-card border border-border/50 self-start sm:self-auto">
                <TabsTrigger value="grid" className="data-[state=active]:bg-primary/20">
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="data-[state=active]:bg-primary/20">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid">
              {(() => {
                // Group items by rarity tier and create battle entries
                const rarityTiers = ['Mythic', 'Legendary', 'Epic', 'Rare'];
                const groupedItems = rarityTiers.reduce((acc, rarity) => {
                  acc[rarity] = paginatedItems.filter(item => item.rarity === rarity);
                  return acc;
                }, {} as Record<string, typeof paginatedItems>);

                // Create battle entries by grouping players together
                const createBattleEntries = (items: typeof paginatedItems) => {
                  const battleEntries = [];
                  let currentBattle = [];
                  
                  for (let i = 0; i < items.length; i++) {
                    currentBattle.push(items[i]);
                    
                    // Create battle entry when we have 2-4 players or reached end
                    if (currentBattle.length >= 3 || i === items.length - 1) {
                      const totalCost = currentBattle.reduce((sum, item) => sum + (item.currentPrice || 0), 0);
                      battleEntries.push({
                        id: `battle-${i}`,
                        players: currentBattle,
                        totalCost,
                        itemCount: currentBattle.length
                      });
                      currentBattle = [];
                    }
                  }
                  
                  return battleEntries;
                };

                return (
                  <div className="space-y-6">
                    {rarityTiers.map(rarity => {
                      const tierItems = groupedItems[rarity];
                      if (tierItems.length === 0) return null;

                      const battleEntries = createBattleEntries(tierItems);

                      return (
                        <div key={rarity} className="gaming-card border border-border/20 rounded-lg overflow-hidden">
                          {/* Tier Header */}
                          <div className={`px-6 py-4 border-b border-border/20 ${
                            rarity === 'Mythic' ? 'bg-gaming-purple/10' :
                            rarity === 'Legendary' ? 'bg-yellow-500/10' :
                            rarity === 'Epic' ? 'bg-gaming-cyan/10' :
                            'bg-gaming-green/10'
                          }`}>
                            <div className="flex items-center justify-between">
                              <h3 className={`text-lg font-bold ${
                                rarity === 'Mythic' ? 'text-gaming-purple gaming-text-glow' :
                                rarity === 'Legendary' ? 'text-yellow-400 gaming-text-glow' :
                                rarity === 'Epic' ? 'text-gaming-cyan gaming-text-glow' :
                                'text-gaming-green'
                              }`}>
                                {rarity}
                              </h3>
                              <span className="text-sm text-muted-foreground font-medium">
                                {tierItems.length} {tierItems.length === 1 ? 'item' : 'items'}
                              </span>
                            </div>
                          </div>

                          {/* Battle Entries */}
                          <div className="divide-y divide-border/10">
                            {battleEntries.map((battle) => (
                              <div 
                                key={battle.id} 
                                className="p-6 cursor-pointer hover:bg-muted/5 transition-colors"
                                onClick={() => console.log('View battle:', battle.id)}
                              >
                                <div className="flex items-center gap-6">
                                  {/* Left: Player Avatars */}
                                  <div className="flex items-center space-x-2 min-w-[160px]">
                                    {battle.players.map((player, index) => (
                                      <div key={player.id} className="relative">
                                        <img 
                                          src={player.player.avatar} 
                                          alt={`${player.player.username} avatar`}
                                          className="w-10 h-10 rounded-full object-cover border-2 border-border/20 flex-shrink-0"
                                          style={{ marginLeft: index > 0 ? '-8px' : '0' }}
                                        />
                                        {player.player.isOnline && (
                                          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-success border-2 border-background" />
                                        )}
                                      </div>
                                    ))}
                                    <div className="text-xs text-muted-foreground ml-2">
                                      {battle.players.length}/{battle.players.length}
                                    </div>
                                  </div>

                                  {/* Center: Item Collection */}
                                  <div className="flex-1 flex items-center gap-3">
                                    {battle.players.map((item, index) => (
                                      <div key={item.id} className="flex items-center gap-2">
                                        <img 
                                          src={item.image} 
                                          alt={item.title}
                                          className="w-12 h-12 rounded-lg object-cover border border-border/20"
                                        />
                                        {index < battle.players.length - 1 && (
                                          <div className="text-muted-foreground">+</div>
                                        )}
                                      </div>
                                    ))}
                                  </div>

                                  {/* Right: Battle Cost & Button */}
                                  <div className="flex items-center gap-4 min-w-[200px] justify-end">
                                    <div className="text-right">
                                      <div className="text-lg font-bold text-foreground">
                                        ${battle.totalCost.toFixed(2)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        Battle cost
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        Unboxed: ${(battle.totalCost * 1.1).toFixed(2)}
                                      </div>
                                    </div>
                                    <Button 
                                      className="gaming-button-primary"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        console.log('View battle:', battle.id);
                                      }}
                                    >
                                      View battle
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </TabsContent>

            <TabsContent value="list">
              {(() => {
                // Group items by rarity tier and create battle entries
                const rarityTiers = ['Mythic', 'Legendary', 'Epic', 'Rare'];
                const groupedItems = rarityTiers.reduce((acc, rarity) => {
                  acc[rarity] = paginatedItems.filter(item => item.rarity === rarity);
                  return acc;
                }, {} as Record<string, typeof paginatedItems>);

                // Create battle entries by grouping players together
                const createBattleEntries = (items: typeof paginatedItems) => {
                  const battleEntries = [];
                  let currentBattle = [];
                  
                  for (let i = 0; i < items.length; i++) {
                    currentBattle.push(items[i]);
                    
                    // Create battle entry when we have 2-4 players or reached end
                    if (currentBattle.length >= 3 || i === items.length - 1) {
                      const totalCost = currentBattle.reduce((sum, item) => sum + (item.currentPrice || 0), 0);
                      battleEntries.push({
                        id: `battle-${i}`,
                        players: currentBattle,
                        totalCost,
                        itemCount: currentBattle.length
                      });
                      currentBattle = [];
                    }
                  }
                  
                  return battleEntries;
                };

                return (
                  <div className="space-y-6">
                    {rarityTiers.map(rarity => {
                      const tierItems = groupedItems[rarity];
                      if (tierItems.length === 0) return null;

                      const battleEntries = createBattleEntries(tierItems);

                      return (
                        <div key={rarity} className="gaming-card border border-border/20 rounded-lg overflow-hidden">
                          {/* Tier Header */}
                          <div className={`px-6 py-4 border-b border-border/20 ${
                            rarity === 'Mythic' ? 'bg-gaming-purple/10' :
                            rarity === 'Legendary' ? 'bg-yellow-500/10' :
                            rarity === 'Epic' ? 'bg-gaming-cyan/10' :
                            'bg-gaming-green/10'
                          }`}>
                            <div className="flex items-center justify-between">
                              <h3 className={`text-lg font-bold ${
                                rarity === 'Mythic' ? 'text-gaming-purple gaming-text-glow' :
                                rarity === 'Legendary' ? 'text-yellow-400 gaming-text-glow' :
                                rarity === 'Epic' ? 'text-gaming-cyan gaming-text-glow' :
                                'text-gaming-green'
                              }`}>
                                {rarity}
                              </h3>
                              <span className="text-sm text-muted-foreground font-medium">
                                {tierItems.length} {tierItems.length === 1 ? 'item' : 'items'}
                              </span>
                            </div>
                          </div>

                          {/* Battle Entries */}
                          <div className="space-y-3 lg:space-y-4 p-4">
                            {battleEntries.map((battle) => (
                              <div 
                                key={battle.id} 
                                className="gaming-card p-4 lg:p-6 cursor-pointer hover:bg-muted/10 transition-colors"
                                onClick={() => console.log('View battle:', battle.id)}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                  {/* Left: Player Avatars */}
                                  <div className="flex items-center space-x-2 min-w-[140px]">
                                    {battle.players.map((player, index) => (
                                      <div key={player.id} className="relative">
                                        <img 
                                          src={player.player.avatar} 
                                          alt={`${player.player.username} avatar`}
                                          className="w-8 h-8 rounded-full object-cover border-2 border-border/20 flex-shrink-0"
                                          style={{ marginLeft: index > 0 ? '-6px' : '0' }}
                                        />
                                        {player.player.isOnline && (
                                          <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-success border border-background" />
                                        )}
                                      </div>
                                    ))}
                                    <div className="text-xs text-muted-foreground ml-2">
                                      {battle.players.length}/{battle.players.length}
                                    </div>
                                  </div>

                                  {/* Center: Item Collection */}
                                  <div className="flex-1 flex items-center gap-2 flex-wrap">
                                    {battle.players.map((item, index) => (
                                      <div key={item.id} className="flex items-center gap-1">
                                        <img 
                                          src={item.image} 
                                          alt={item.title}
                                          className="w-10 h-10 rounded object-cover border border-border/20"
                                        />
                                        {index < battle.players.length - 1 && (
                                          <div className="text-muted-foreground text-sm">+</div>
                                        )}
                                      </div>
                                    ))}
                                  </div>

                                  {/* Right: Battle Cost & Button */}
                                  <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[180px]">
                                    <div className="text-right">
                                      <div className="text-lg font-bold text-foreground">
                                        ${battle.totalCost.toFixed(2)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        Battle cost
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        Unboxed: ${(battle.totalCost * 1.1).toFixed(2)}
                                      </div>
                                    </div>
                                    <Button 
                                      size="sm"
                                      className="gaming-button-primary"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        console.log('View battle:', battle.id);
                                      }}
                                    >
                                      View battle
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>
      
      {/* Live Chat Sidebar */}
      <LiveChatSidebar isLoggedIn={false} />
    </div>
  );
};

export default Index;
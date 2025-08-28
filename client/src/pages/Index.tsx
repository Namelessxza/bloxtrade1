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
                // Define exact tier structure from reference image
                const battleTiers = [
                  { name: 'NORMAL', items: paginatedItems.slice(0, 1) },
                  { name: 'INVERSE', items: paginatedItems.slice(1, 3) },
                  { name: 'TERMINAL', items: paginatedItems.slice(3, 5) }
                ];

                return (
                  <div className="space-y-4">
                    {battleTiers.map((tier, tierIndex) => {
                      if (tier.items.length === 0) return null;

                      return (
                        <div key={tier.name} className="rounded-xl overflow-hidden">
                          {/* Battle Entry - Exact Reference Design */}
                          <div 
                            className={`relative p-6 ${
                              tier.name === 'NORMAL' ? 'bg-gradient-to-r from-purple-600/20 via-purple-500/15 to-purple-600/20' :
                              tier.name === 'INVERSE' ? 'bg-gradient-to-r from-purple-600/20 via-purple-500/15 to-purple-600/20' :
                              'bg-gradient-to-r from-red-600/20 via-red-500/15 to-red-600/20'
                            } backdrop-blur-sm border border-white/10`}
                          >
                            {/* Tier Label - Top Left */}
                            <div className="absolute top-4 left-6">
                              <span className="text-xs font-bold text-white/60 tracking-wider">
                                {tier.name}
                              </span>
                            </div>

                            {/* Item Count - Top Right */}
                            <div className="absolute top-4 right-6">
                              <span className="text-sm font-medium text-white/80">
                                {tier.items.length}/6
                              </span>
                            </div>

                            <div className="flex items-center gap-8 mt-6">
                              {/* Left: Player Avatars */}
                              <div className="flex items-center space-x-1">
                                {tier.items.map((item, index) => (
                                  <div key={item.id} className="relative">
                                    <img 
                                      src={item.player.avatar} 
                                      alt={item.player.username}
                                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                                    />
                                    {/* X separator between avatars */}
                                    {index < tier.items.length - 1 && (
                                      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                                        <span className="text-white/40 text-sm font-bold">×</span>
                                      </div>
                                    )}
                                  </div>
                                ))}

                              </div>

                              {/* Center: 6-Slot Item Grid */}
                              <div className="flex-1 flex items-center justify-center">
                                <div className="grid grid-cols-6 gap-3">
                                  {tier.items.map((item) => (
                                    <div key={item.id} className="w-12 h-12">
                                      <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-full h-full rounded object-cover"
                                      />
                                    </div>
                                  ))}
                                  {/* Fill remaining slots with placeholder */}
                                  {Array.from({ length: 6 - tier.items.length }).map((_, index) => (
                                    <div key={`item-placeholder-${index}`} className="w-12 h-12 bg-white/10 rounded" />
                                  ))}
                                </div>
                              </div>

                              {/* Right: Price and Button */}
                              <div className="flex items-center gap-6">
                                <div className="text-right">
                                  <div className="text-xl font-bold text-white">
                                    $90.99
                                  </div>
                                  <div className="text-xs text-white/60">
                                    Battle cost
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <button 
                                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
                                    onClick={() => console.log('View battle:', tier.name)}
                                  >
                                    View battle
                                  </button>
                                  <div className="text-xs text-white/60">
                                    Unboxed: $904.44
                                  </div>
                                </div>
                              </div>
                            </div>
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
                // Define exact tier structure from reference image
                const battleTiers = [
                  { name: 'NORMAL', items: paginatedItems.slice(0, 1) },
                  { name: 'INVERSE', items: paginatedItems.slice(1, 3) },
                  { name: 'TERMINAL', items: paginatedItems.slice(3, 5) }
                ];

                return (
                  <div className="space-y-4">
                    {battleTiers.map((tier, tierIndex) => {
                      if (tier.items.length === 0) return null;

                      return (
                        <div key={tier.name} className="rounded-xl overflow-hidden">
                          {/* Battle Entry - Exact Reference Design */}
                          <div 
                            className={`relative p-6 ${
                              tier.name === 'NORMAL' ? 'bg-gradient-to-r from-purple-600/20 via-purple-500/15 to-purple-600/20' :
                              tier.name === 'INVERSE' ? 'bg-gradient-to-r from-purple-600/20 via-purple-500/15 to-purple-600/20' :
                              'bg-gradient-to-r from-red-600/20 via-red-500/15 to-red-600/20'
                            } backdrop-blur-sm border border-white/10`}
                          >
                            {/* Tier Label - Top Left */}
                            <div className="absolute top-4 left-6">
                              <span className="text-xs font-bold text-white/60 tracking-wider">
                                {tier.name}
                              </span>
                            </div>

                            {/* Item Count - Top Right */}
                            <div className="absolute top-4 right-6">
                              <span className="text-sm font-medium text-white/80">
                                {tier.items.length}/6
                              </span>
                            </div>

                            <div className="flex items-center gap-8 mt-6">
                              {/* Left: Player Avatars */}
                              <div className="flex items-center space-x-1">
                                {tier.items.map((item, index) => (
                                  <div key={item.id} className="relative">
                                    <img 
                                      src={item.player.avatar} 
                                      alt={item.player.username}
                                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                                    />
                                    {/* X separator between avatars */}
                                    {index < tier.items.length - 1 && (
                                      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                                        <span className="text-white/40 text-sm font-bold">×</span>
                                      </div>
                                    )}
                                  </div>
                                ))}

                              </div>

                              {/* Center: 6-Slot Item Grid */}
                              <div className="flex-1 flex items-center justify-center">
                                <div className="grid grid-cols-6 gap-3">
                                  {tier.items.map((item) => (
                                    <div key={item.id} className="w-12 h-12">
                                      <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-full h-full rounded object-cover"
                                      />
                                    </div>
                                  ))}
                                  {/* Fill remaining slots with placeholder */}
                                  {Array.from({ length: 6 - tier.items.length }).map((_, index) => (
                                    <div key={`item-placeholder-${index}`} className="w-12 h-12 bg-white/10 rounded" />
                                  ))}
                                </div>
                              </div>

                              {/* Right: Price and Button */}
                              <div className="flex items-center gap-6">
                                <div className="text-right">
                                  <div className="text-xl font-bold text-white">
                                    $90.99
                                  </div>
                                  <div className="text-xs text-white/60">
                                    Battle cost
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <button 
                                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
                                    onClick={() => console.log('View battle:', tier.name)}
                                  >
                                    View battle
                                  </button>
                                  <div className="text-xs text-white/60">
                                    Unboxed: $904.44
                                  </div>
                                </div>
                              </div>
                            </div>
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
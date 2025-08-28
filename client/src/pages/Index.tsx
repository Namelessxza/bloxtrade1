import { TrendingUp, Users, DollarSign, Package, Filter, Grid3X3, List } from "lucide-react";
import Header from "@/components/Header";
import GameItemCard from "@/components/GameItemCard";
import StatsCard from "@/components/StatsCard";
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-foreground">Featured Marketplace</h2>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Select defaultValue="trending">
                <SelectTrigger className="w-32 sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rarity">Rarity</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
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
              <div className="gaming-card border border-border/20 rounded-lg overflow-hidden">
                <div className="table-responsive">
                  <Table>
                    <TableHeader className="table-header-improved">
                    <TableRow>
                      <TableHead>Player Username & Profile</TableHead>
                      <TableHead>Item/Name</TableHead>
                      <TableHead>Label/Rarity</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Send Offer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gameItems.map((item) => (
                      <TableRow key={item.id} className="table-row-improved">
                        <TableCell className="table-cell-improved">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={item.player.avatar} 
                              alt={`${item.player.username} avatar`}
                              className="w-10 h-10 rounded-full object-cover border border-border/20"
                            />
                            <div>
                              <div className="font-semibold text-foreground flex items-center space-x-2">
                                <span>{item.player.username}</span>
                                <div className={`w-2 h-2 rounded-full ${item.player.isOnline ? 'bg-success' : 'bg-muted-foreground/30'}`} />
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="table-cell-improved">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-12 h-12 rounded-lg object-cover border border-border/20"
                            />
                            <div>
                              <div className="font-semibold text-foreground">{item.title}</div>
                              <div className="text-sm text-muted-foreground font-medium">{item.game}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="table-cell-improved">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            item.rarity === 'Mythic' ? 'bg-gaming-purple/20 text-gaming-purple gaming-text-glow' :
                            item.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-400 gaming-text-glow' :
                            item.rarity === 'Epic' ? 'bg-gaming-cyan/20 text-gaming-cyan gaming-text-glow' :
                            'bg-gaming-green/20 text-gaming-green'
                          }`}>
                            {item.rarity}
                          </span>
                        </TableCell>
                        <TableCell className="table-cell-improved text-muted-foreground font-semibold">
                          {item.category}
                        </TableCell>
                        <TableCell className="table-cell-improved text-right">
                          <Button size="sm" className="gaming-button-primary">
                            Send Offer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="list">
              <div className="space-y-3 lg:space-y-4">
                {gameItems.map((item) => (
                  <div key={item.id} className="gaming-card p-3 lg:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{item.game}</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                        item.rarity === 'Mythic' ? 'bg-gaming-purple/20 text-gaming-purple gaming-text-glow' :
                        item.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-400 gaming-text-glow' :
                        item.rarity === 'Epic' ? 'bg-gaming-cyan/20 text-gaming-cyan gaming-text-glow' :
                        'bg-gaming-green/20 text-gaming-green'
                      }`}>
                        {item.rarity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                      <div className="text-right">
                        <div className="text-lg font-bold text-success">
                          ${item.currentPrice.toFixed(2)}
                        </div>
                        {item.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                      <Button size="sm" className="gaming-button-primary whitespace-nowrap">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button 
              className="gaming-button-primary px-8 py-3 text-base"
            >
              Load More Items
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
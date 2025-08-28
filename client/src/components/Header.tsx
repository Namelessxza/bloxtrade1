import { Search, ShoppingCart, User, Wallet, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "wouter";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-gaming rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GX</span>
              </div>
              <h1 className="text-xl font-bold gradient-text-improved">
                GameXchange
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Marketplace
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Inventory
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Trading
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Leaderboard
            </Button>
          </nav>

          {/* Search - Desktop */}
          <div className="flex-1 max-w-md mx-4 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search items, skins, collectibles..."
                className="pl-10 bg-gaming-card border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-primary"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>

            <div className="hidden lg:flex items-center space-x-2 bg-gaming-card px-3 py-2 rounded-lg border border-border/50">
              <Wallet className="h-4 w-4 text-success" />
              <span className="text-success font-semibold">$2,485</span>
            </div>

            <Link href="/profile">
              <Button
                variant="outline"
                className="gaming-button-primary border-primary/30"
              >
                <User className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">Profile</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search items..."
                  className="pl-10 bg-gaming-card border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                  Marketplace
                </Button>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                  Inventory
                </Button>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                  Trading
                </Button>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                  Leaderboard
                </Button>
              </nav>

              {/* Mobile User Actions */}
              <div className="space-y-3 pt-3 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 bg-gaming-card px-3 py-2 rounded-lg border border-border/50">
                    <Wallet className="h-4 w-4 text-success" />
                    <span className="text-success font-semibold">$2,485</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        3
                      </span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <Link href="/profile">
                  <Button className="w-full gaming-button-primary">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'wouter';
import { Grid3x3, User, Bell, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { theme } from '@/config/theme';

export const AppHeader: React.FC = () => {
  return (
    <header 
      className="h-16 px-6 flex items-center justify-between"
      style={{ backgroundColor: theme.colors.background.secondary }}
    >
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.secondary.full})`,
            }}
          >
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <span className="text-white font-bold text-xl">GameXchange</span>
        </div>
      </Link>
      
      {/* Center Navigation */}
      <nav className="flex items-center gap-8">
        <NavLink href="/trades" label="Trades" />
        <NavLink href="/marketplace" label="Marketplace" />
        <NavLink href="/inventory" label="Inventory" />
        <NavLink href="/leaderboard" label="Leaderboard" />
      </nav>
      
      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          className="relative p-2"
          variant="ghost"
          style={{ color: theme.colors.text.secondary }}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: theme.colors.accent.red }}
          />
        </Button>
        
        <Button
          size="sm"
          className="relative p-2"
          variant="ghost"
          style={{ color: theme.colors.text.secondary }}
        >
          <ShoppingCart className="h-5 w-5" />
        </Button>
        
        <Link href="/components">
          <Button
            size="sm"
            className="px-4 py-2"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.secondary.full}, ${theme.colors.accent.pink})`,
              color: theme.colors.text.primary,
              border: 'none',
            }}
          >
            <Grid3x3 className="h-4 w-4 mr-2" />
            Components
          </Button>
        </Link>
        
        <Link href="/profile">
          <Button
            size="sm"
            className="px-4 py-2"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.accent.blue})`,
              color: theme.colors.text.primary,
              border: 'none',
            }}
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
        </Link>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  return (
    <Link href={href}>
      <span className="text-sm font-medium transition-colors cursor-pointer"
        style={{ 
          color: theme.colors.text.secondary,
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.text.primary}
        onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text.secondary}
      >
        {label}
      </span>
    </Link>
  );
};
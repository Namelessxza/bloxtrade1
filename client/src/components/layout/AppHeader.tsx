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
        <button
          className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all"
          style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`,
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            color: theme.colors.text.secondary,
            boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)`;
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.05)';
          }}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: theme.colors.accent.red,
              boxShadow: `0 0 0 2px ${theme.colors.background.secondary}`
            }}
          />
        </button>
        
        <button
          className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all"
          style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`,
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            color: theme.colors.text.secondary,
            boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)`;
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.05)';
          }}
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
        
        <Link href="/components">
          <button
            className="px-4 py-2 rounded-xl font-semibold text-sm transition-all relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.secondary.full}, ${theme.colors.accent.pink})`,
              color: theme.colors.text.primary,
              border: 'none',
              boxShadow: `0 4px 15px ${theme.colors.secondary.full}40, inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.1)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = `0 6px 20px ${theme.colors.secondary.full}50, inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -2px 0 rgba(0, 0, 0, 0.15)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 15px ${theme.colors.secondary.full}40, inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.1)`;
            }}
          >
            <Grid3x3 className="h-4 w-4 mr-2 inline" />
            Components
          </button>
        </Link>
        
        <Link href="/profile">
          <button
            className="px-4 py-2 rounded-xl font-semibold text-sm transition-all relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary.full}, ${theme.colors.accent.blue})`,
              color: theme.colors.text.primary,
              border: 'none',
              boxShadow: `0 4px 15px ${theme.colors.primary.full}40, inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.1)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = `0 6px 20px ${theme.colors.primary.full}50, inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -2px 0 rgba(0, 0, 0, 0.15)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 15px ${theme.colors.primary.full}40, inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.1)`;
            }}
          >
            <User className="h-4 w-4 mr-2 inline" />
            Profile
          </button>
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
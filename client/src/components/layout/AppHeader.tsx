import React, { useState } from 'react';
import { Link } from 'wouter';
import { Grid3x3, User, Bell, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { theme } from '@/config/theme';

export const AppHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
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
      
      {/* Center Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, skins, users..."
            className="w-full pl-10 pr-4 py-2 h-9 rounded-lg text-sm border-0"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: theme.colors.text.primary,
              fontSize: '14px',
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.outline = `2px solid ${theme.colors.primary.full}40`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.outline = 'none';
            }}
          />
        </div>
      </div>
      
      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button
          className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            color: theme.colors.text.secondary,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
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
          className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            color: theme.colors.text.secondary,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
        
        <Link href="/components">
          <button
            className="px-5 py-2 rounded-full text-sm transition-colors"
            style={{
              backgroundColor: theme.colors.secondary.full,
              color: theme.colors.text.primary,
              border: 'none',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <Grid3x3 className="h-4 w-4 mr-2 inline" />
            Components
          </button>
        </Link>
        
        <Link href="/profile">
          <button
            className="px-5 py-2 rounded-full text-sm transition-colors"
            style={{
              backgroundColor: theme.colors.primary.full,
              color: theme.colors.text.primary,
              border: 'none',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
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
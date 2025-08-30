import React, { useState } from 'react';
import { 
  Home, 
  TrendingUp, 
  Package, 
  Users, 
  Settings,
  HelpCircle,
  Lock,
  Gamepad2,
  Trophy,
  Coins,
  ShoppingBag,
  Activity
} from 'lucide-react';
import { SidebarScrollArea } from '@/components/ui/scroll-area';
import { theme } from '@/config/theme';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  count?: number;
  locked?: boolean;
}

export const AppSidebar: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'games' | 'sports'>('games');
  const [selectedCategory, setSelectedCategory] = useState('home');
  
  const gameCategories: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'trending', label: 'Trending', icon: TrendingUp, count: 24 },
    { id: 'inventory', label: 'My Inventory', icon: Package },
    { id: 'trades', label: 'Active Trades', icon: Activity, count: 3 },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'rewards', label: 'Rewards', icon: Trophy },
    { id: 'coins', label: 'Coins Shop', icon: Coins },
    { id: 'teams', label: 'Teams', icon: Users },
  ];
  
  const sportCategories: NavItem[] = [
    { id: 'football', label: 'Football', icon: Trophy },
    { id: 'basketball', label: 'Basketball', icon: Activity },
    { id: 'esports', label: 'Esports', icon: Gamepad2 },
    { id: 'tennis', label: 'Tennis', icon: Trophy },
  ];
  
  const currentCategories = activeMode === 'games' ? gameCategories : sportCategories;
  
  return (
    <div className="flex flex-col h-full" style={{ 
      backgroundColor: theme.colors.background.secondary 
    }}>
      {/* Mode Toggle */}
      <div className="p-4 bg-[#161618]">
        <div 
          className="flex p-1 rounded-xl bg-[#161618]"
          style={{ backgroundColor: theme.colors.background.primary }}
        >
          <ModeButton
            active={activeMode === 'games'}
            onClick={() => setActiveMode('games')}
            label="SAB"
            icon="🎮"
          />
          <ModeButton
            active={activeMode === 'sports'}
            onClick={() => setActiveMode('sports')}
            label="GAG"
            icon="⚽"
            locked
          />
        </div>
      </div>
      {/* Navigation Items */}
      <SidebarScrollArea className="flex-1 px-3 bg-[#161618]">
        <div className="space-y-1 py-2">
          {currentCategories.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              selected={selectedCategory === item.id}
              onClick={() => !item.locked && setSelectedCategory(item.id)}
            />
          ))}
        </div>
      </SidebarScrollArea>
      {/* Bottom Actions */}
      <div className="p-4 space-y-2 bg-[#161618]">
        <NavItem
          item={{ id: 'help', label: 'Help Center', icon: HelpCircle }}
          selected={false}
          onClick={() => {}}
        />
        <NavItem
          item={{ id: 'settings', label: 'Settings', icon: Settings }}
          selected={false}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

const ModeButton: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
  locked?: boolean;
}> = ({ active, onClick, label, icon, locked }) => {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className="flex-1 px-4 py-2 rounded-full transition-colors flex items-center justify-center gap-2 font-bold"
      style={{
        backgroundColor: active 
          ? theme.colors.primary.full
          : 'rgba(255, 255, 255, 0.03)',
        color: active ? theme.colors.text.primary : theme.colors.text.tertiary,
        opacity: locked ? 0.5 : 1,
        cursor: locked ? 'not-allowed' : 'pointer',
        border: `1px solid ${active ? theme.colors.primary.full + '30' : 'rgba(255, 255, 255, 0.05)'}`,
      }}
      onMouseEnter={(e) => {
        if (!active && !locked) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active && !locked) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
        }
      }}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-semibold text-sm">{label}</span>
      {locked && <Lock className="h-3 w-3" />}
    </button>
  );
};

const NavItem: React.FC<{
  item: NavItem;
  selected: boolean;
  onClick: () => void;
}> = ({ item, selected, onClick }) => {
  const Icon = item.icon;
  
  return (
    <button
      onClick={onClick}
      disabled={item.locked}
      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors group"
      style={{
        backgroundColor: selected 
          ? 'rgba(255, 255, 255, 0.08)'
          : 'transparent',
        color: selected ? theme.colors.text.primary : theme.colors.text.secondary,
        opacity: item.locked ? 0.5 : 1,
        cursor: item.locked ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!selected && !item.locked) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <span className="font-medium text-sm">{item.label}</span>
      </div>
      {item.count && (
        <span 
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{
            backgroundColor: selected 
              ? theme.colors.primary.full
              : theme.colors.primary['200'],
            color: theme.colors.text.primary,
          }}
        >
          {item.count}
        </span>
      )}
      {item.locked && <Lock className="h-4 w-4" />}
    </button>
  );
};
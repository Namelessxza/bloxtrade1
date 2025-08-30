import React from 'react';
import { Link } from 'wouter';
import { Coins, Bell, User, Wallet, Gift, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PremiumHeader: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-purple-900/30 to-slate-900 border-b border-white/5">
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center shadow-xl">
                  <Coins className="h-6 w-6 text-black" />
                </div>
              </div>
              <div>
                <span className="text-white font-black text-xl">GameXchange</span>
                <div className="text-xs text-amber-500 font-semibold -mt-1">PREMIUM</div>
              </div>
            </div>
          </Link>
          
          {/* Search Bar */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for games..."
                className="w-64 pl-10 pr-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg text-white placeholder:text-gray-500 border border-white/10 focus:border-amber-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink label="🎰 Casino" active />
          <NavLink label="⚽ Sport" />
          <NavLink label="🎮 Esports" />
          <NavLink label="🎲 Live Casino" />
        </nav>
        
        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Balance Display */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg border border-yellow-500/20">
            <Wallet className="h-4 w-4 text-yellow-500" />
            <div className="text-sm">
              <span className="text-gray-400">Balance:</span>
              <span className="ml-2 font-bold text-yellow-500">$5,420.69</span>
            </div>
          </div>
          
          {/* Notifications */}
          <Button
            size="sm"
            className="relative p-2 bg-white/5 hover:bg-white/10 border border-white/10"
            variant="ghost"
          >
            <Bell className="h-5 w-5 text-gray-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </Button>
          
          {/* Deposit Button */}
          <Button
            size="sm"
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-green-500/25"
          >
            <Gift className="h-4 w-4 mr-2" />
            Deposit
          </Button>
          
          {/* Profile */}
          <Button
            size="sm"
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold hover:scale-105 transition-transform shadow-lg shadow-amber-500/25"
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          
          {/* Mobile Menu */}
          <Button
            size="sm"
            className="p-2 md:hidden bg-white/5 hover:bg-white/10 border border-white/10"
            variant="ghost"
          >
            <Menu className="h-5 w-5 text-gray-300" />
          </Button>
        </div>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        active
          ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border border-amber-500/30'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
};
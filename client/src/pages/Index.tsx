import React from 'react';
import { PremiumHeader } from '@/components/layout/PremiumHeader';
import { PremiumSidebar } from '@/components/layout/PremiumSidebar';
import { PremiumChatPanel } from '@/components/layout/PremiumChatPanel';
import { PremiumDashboard } from '@/components/dashboard/PremiumDashboard';

export default function Index() {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-900">
      {/* Header */}
      <PremiumHeader />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[260px] flex-shrink-0 hidden lg:block">
          <PremiumSidebar />
        </div>
        
        {/* Dashboard */}
        <div className="flex-1 overflow-hidden">
          <PremiumDashboard />
        </div>
        
        {/* Chat Panel */}
        <div className="w-[380px] flex-shrink-0 hidden xl:block">
          <PremiumChatPanel />
        </div>
      </div>
    </div>
  );
}
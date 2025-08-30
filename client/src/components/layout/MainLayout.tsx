import React from 'react';
import { theme } from '@/config/theme';

interface MainLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  sidebar: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  header,
  sidebar,
  rightPanel,
}) => {
  return (
    <div 
      className="flex flex-col h-screen w-full overflow-hidden"
      style={{ backgroundColor: theme.colors.background.primary }}
    >
      {/* Header */}
      <div className="flex-shrink-0" style={{ 
        backgroundColor: theme.colors.background.secondary,
        borderBottom: 'none'
      }}>
        {header}
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0" style={{
          backgroundColor: theme.colors.background.secondary,
          width: '275px'
        }}>
          {sidebar}
        </div>
        
        {/* Center Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
        
        {/* Right Panel (optional) */}
        {rightPanel && (
          <div className="flex-shrink-0" style={{
            backgroundColor: theme.colors.background.secondary,
            width: '396px'
          }}>
            {rightPanel}
          </div>
        )}
      </div>
    </div>
  );
};
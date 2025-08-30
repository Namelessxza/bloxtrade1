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
      style={{ 
        background: theme.gradients.dark,
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0" style={{ 
        backgroundColor: theme.colors.background.secondary,
        borderBottom: `1px solid ${theme.colors.border.subtle}`,
        backdropFilter: 'blur(10px)'
      }}>
        {header}
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0" style={{
          backgroundColor: theme.colors.background.tertiary,
          borderRight: `1px solid ${theme.colors.border.subtle}`,
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
            backgroundColor: theme.colors.background.tertiary,
            borderLeft: `1px solid ${theme.colors.border.subtle}`,
            width: '396px'
          }}>
            {rightPanel}
          </div>
        )}
      </div>
    </div>
  );
};
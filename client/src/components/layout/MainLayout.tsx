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
        background: '#08090C',
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0" style={{ 
        backgroundColor: '#0D0F14',
        backdropFilter: 'blur(10px)'
      }}>
        {header}
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 ml-4 my-4 rounded-2xl overflow-hidden" style={{
          backgroundColor: '#0A0E18',
          width: '275px'
        }}>
          {sidebar}
        </div>
        
        {/* Center Content */}
        <div className="flex-1 overflow-hidden" style={{
          backgroundColor: '#0F1218'
        }}>
          {children}
        </div>
        
        {/* Right Panel (optional) */}
        {rightPanel && (
          <div className="flex-shrink-0" style={{
            backgroundColor: '#0D0D0D',
            width: '396px'
          }}>
            {rightPanel}
          </div>
        )}
      </div>
    </div>
  );
};
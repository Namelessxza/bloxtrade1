import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { ChatPanel } from '@/components/layout/ChatPanel';
import { DashboardView } from '@/components/dashboard/DashboardView';

export default function Index() {
  return (
    <MainLayout
      header={<AppHeader />}
      sidebar={<AppSidebar />}
      rightPanel={<ChatPanel />}
    >
      <DashboardView />
    </MainLayout>
  );
}
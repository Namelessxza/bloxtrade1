import { ReactNode } from "react";
import Header from "@/components/Header";
import RightSideChatPanel from "@/components/RightSideChatPanel";

interface MainLayoutProps {
  children: ReactNode;
  showChat?: boolean;
  isLoggedIn?: boolean;
}

const MainLayout = ({ children, showChat = true, isLoggedIn = false }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gaming-bg">
      {/* Header - Full Width */}
      <Header />
      
      {/* Main Content Area */}
      <div className="flex">
        {/* Main Content - Takes up ~75% of width */}
        <main className={`flex-1 ${showChat ? 'max-w-[calc(100%-320px)]' : 'w-full'}`}>
          {children}
        </main>
        
        {/* Right Side Chat Panel - Fixed 320px width */}
        {showChat && (
          <aside className="hidden lg:block">
            <div className="fixed right-0 top-16 h-[calc(100vh-4rem)]">
              <RightSideChatPanel isLoggedIn={isLoggedIn} />
            </div>
          </aside>
        )}
      </div>
      
      {/* Mobile Chat Toggle (when chat is hidden on mobile) */}
      {showChat && (
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          {/* This would be a mobile chat toggle button */}
        </div>
      )}
    </div>
  );
};

export default MainLayout;
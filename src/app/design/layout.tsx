import TopNav from '@/components/design/TopNav'
import Sidebar from '@/components/design/Sidebar/Sidebar'
import Toolbar from '@/components/design/Toolbar'
import { ZoomProvider } from '../../components/design/context/ZoomContext'
import { HandModeProvider } from '../../components/design/context/HandModeContext'
import { ToolbarProvider } from '../../components/design/context/ToolbarContext'
import ZoomWrapper from '@/components/design/ZoomWrapper'
import SidebarShadow from '@/components/design/Sidebar/SidebarShadow'
import ZoomWrapperShadow from '@/components/design/ZoomWrapperShadow'

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ToolbarProvider>
      <ZoomProvider>
        <HandModeProvider>
          <div className="flex flex-col h-screen">
            <TopNav />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden relative">
                <Toolbar />
                <div className="relative flex-1">
                  <ZoomWrapperShadow />
                  <ZoomWrapper>
                    <main className="flex-1 overflow-auto bg-[#EBECF0]">
                      {children}
                    </main>
                  </ZoomWrapper>
                </div>
                <div className="absolute left-0 top-0 h-full w-3 z-50 pointer-events-none">
                  <SidebarShadow />
                </div>
              </div>
            </div>
          </div>
        </HandModeProvider>
      </ZoomProvider>
    </ToolbarProvider>
  )
}


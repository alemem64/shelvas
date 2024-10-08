import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopNav from '@/components/TopNav'
import Sidebar from '@/components/Sidebar/Sidebar'
import Toolbar from '@/components/Toolbar'
import { ZoomProvider } from '../context/ZoomContext';
import { HandModeProvider } from '../context/HandModeContext';
import { ToolbarProvider } from '../context/ToolbarContext'; // 이 줄을 추가해주세요
import ZoomWrapper from '@/components/ZoomWrapper';
import SidebarShadow from '@/components/Sidebar/SidebarShadow';
import ZoomWrapperShadow from '@/components/ZoomWrapperShadow';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'shelvas - Design',
  description: 'Revolutionizing the book design',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToolbarProvider> {/* 이 줄을 추가해주세요 */}
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
        </ToolbarProvider> {/* 이 줄을 추가해주세요 */}
      </body>
    </html>
  )
}

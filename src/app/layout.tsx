import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopNav from '@/components/TopNav'
import Sidebar from '@/components/Sidebar'
import Toolbar from '@/components/Toolbar'
import { ZoomProvider } from '../context/ZoomContext';
import ZoomWrapper from '@/components/ZoomWrapper';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'shelvas - Design',
  description: 'Revolutionizing the book industry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ZoomProvider>
          <div className="flex flex-col h-screen">
            <TopNav />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden relative">
                <Toolbar />
                <ZoomWrapper>
                  <main className="flex-1 overflow-auto bg-[#EBECF0]">
                    {children}
                  </main>
                </ZoomWrapper>
              </div>
            </div>
          </div>
        </ZoomProvider>
      </body>
    </html>
  )
}

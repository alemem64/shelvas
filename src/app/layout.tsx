import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shelvas - Online Book Design Program',
  description: 'Revolutionizing the book industry by substituting Adobe InDesign',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <nav className="bg-gray-800 text-white p-4">
            {/* Top navigation content */}
            Shelvas
          </nav>
          <div className="flex-1 flex">
            <aside className="w-64 bg-gray-200 p-4">
              {/* Sidebar content */}
              Sidebar
            </aside>
            <main className="flex-1 flex flex-col">
              <div className="bg-gray-100 p-2">
                {/* Toolbar content */}
                Toolbar
              </div>
              <div className="flex-1 p-4">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

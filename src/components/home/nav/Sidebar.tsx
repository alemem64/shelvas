'use client'
import Link from 'next/link'
import { FiHome, FiClock, FiSettings } from 'react-icons/fi'
import { BiBookContent } from 'react-icons/bi'

export default function Sidebar() {
  return (
    <div className="w-64 border-r h-full">
      <nav className="p-4 space-y-2">
        <Link href="/" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
          <FiHome size={20} />
          <span>Home</span>
        </Link>
        <Link href="/subscriptions" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
          <BiBookContent size={20} />
          <span>Subscriptions</span>
        </Link>
        <Link href="/history" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
          <FiClock size={20} />
          <span>History</span>
        </Link>
        
        <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold text-gray-500">Explore</h3>
          <div className="mt-2 space-y-1">
            {['Arts', 'Education', 'Law', 'History', 'Science', 'Romance', 'Travel', 'Young'].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="block px-2 py-1.5 hover:bg-gray-100 rounded-lg"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-4 w-56">
          <Link href="/settings" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
            <FiSettings size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

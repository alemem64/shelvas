'use client'
import React from 'react'
import Link from 'next/link'
import { FiHome, FiClock, FiSettings } from 'react-icons/fi'
import { BiBookContent } from 'react-icons/bi'

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside 
      className={`
        fixed top-16 left-0 h-full w-64 bg-white shadow-lg 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="block py-2 px-4 text-black hover:bg-gray-100 rounded">
              홈
            </Link>
          </li>
          <li>
            <Link href="/categories" className="block py-2 px-4 text-black hover:bg-gray-100 rounded">
              카테고리
            </Link>
          </li>
          <li>
            <Link href="/my-books" className="block py-2 px-4 text-black hover:bg-gray-100 rounded">
              내 서재
            </Link>
          </li>
          <li>
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
          </li>
          <li>
            <div className="absolute bottom-4 w-56">
              <Link href="/settings" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                <FiSettings size={20} />
                <span>Settings</span>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

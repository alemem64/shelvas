'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FiMenu, FiShoppingCart, FiBell } from 'react-icons/fi'

export default function TopNav() {
  return (
    <div className="h-16 border-b flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <FiMenu size={24} />
        </button>
        <Link href="/">
          <Image src="/logo.svg" alt="Shelvas" width={120} height={32} />
        </Link>
      </div>
      
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <FiShoppingCart size={24} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <FiBell size={24} />
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          + New book
        </button>
        <button className="w-10 h-10 rounded-full overflow-hidden">
          <Image src="/profile.jpg" alt="Profile" width={40} height={40} />
        </button>
      </div>
    </div>
  )
}

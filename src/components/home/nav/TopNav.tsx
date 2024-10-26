'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiMenu, FiX, FiShoppingCart, FiBell, FiSearch, FiPlus } from 'react-icons/fi'

interface TopNavProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function TopNav({ isMenuOpen, toggleMenu }: TopNavProps) {
  return (
    <div className="h-16 border-b flex items-center px-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4 w-1/3">
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <Link href="/">
          <Image src="/logo.svg" alt="Shelvas" width={120} height={32} />
        </Link>
      </div>
      
      <div className="flex-1 flex justify-center items-center">
        <div className="relative w-full max-w-2xl flex items-center">
          <input
            type="search"
            placeholder="Search"
            className="w-full px-4 py-1.5 rounded-l-full border-l border-y bg-gray-50 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-gray-100 border-r border-y px-4 py-2 rounded-r-full hover:bg-gray-200">
            <FiSearch size={20} />
          </button>
        </div>
        <div className="flex items-center ml-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FiShoppingCart size={24} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FiBell size={24} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-1/4 justify-end">
        <button className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 flex items-center whitespace-nowrap transition-all duration-300 ease-in-out">
          <FiPlus size={20} className="mr-1" />
          <span className="hidden sm:inline overflow-hidden max-w-0 sm:max-w-[100px] transition-all duration-300 ease-in-out">New book</span>
        </button>
        <button className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image src="/profile.jpg" alt="Profile" width={40} height={40} />
        </button>
      </div>
    </div>
  )
}

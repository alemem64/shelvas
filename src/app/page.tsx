'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TopNav from '@/components/home/nav/TopNav'
import Sidebar from '@/components/home/nav/Sidebar'

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const bestSellers: Book[] = [
    {
      id: 1,
      title: "On Call: A Doctor's Journey in Public Service",
      author: "Anthony Fauci M.D.",
      coverImage: "/books/oncall.jpg"
    },
    // ... 더 많은 책 데이터
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <TopNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className="flex flex-1 pt-16"> {/* TopNav 높이만큼 상단 패딩 추가 */}
        <Sidebar isOpen={isMenuOpen} />
        <main className={`flex-1 overflow-auto transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
          <div className="p-6">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Best sellers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {bestSellers.map((book) => (
                  <Link href={`/book/${book.id}`} key={book.id} className="block">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-2 font-semibold">{book.title}</h3>
                    <p className="text-gray-600">{book.author}</p>
                  </Link>
                ))}
              </div>
            </section>
            
            {/* 추천 도서 섹션도 비슷한 구조로 추가 */}

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Recommended books</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {bestSellers.map((book) => (
                  <Link href={`/book/${book.id}`} key={book.id} className="block">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-2 font-semibold">{book.title}</h3>
                    <p className="text-gray-600">{book.author}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

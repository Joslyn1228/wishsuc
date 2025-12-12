'use client'

import { useEffect, useRef } from 'react'
import data from '@/lib/data'

export default function Hobbies() {
  const hobbiesRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (hobbiesRef.current) {
      const elements = hobbiesRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => {
      if (hobbiesRef.current) {
        const elements = hobbiesRef.current.querySelectorAll('.animate-on-scroll')
        elements.forEach((el) => observer.unobserve(el))
      }
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="hobbies"
      ref={hobbiesRef}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 animate-on-scroll">
          {data.hobbies.title}
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.hobbies.items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-6 rounded-lg shadow-md animate-on-scroll"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.name}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
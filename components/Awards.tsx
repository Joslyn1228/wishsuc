'use client'

import { useEffect, useRef } from 'react'
import data from '@/lib/data'

export default function Awards() {
  const awardsRef = useRef<HTMLElement>(null)

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

    if (awardsRef.current) {
      const elements = awardsRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => {
      if (awardsRef.current) {
        const elements = awardsRef.current.querySelectorAll('.animate-on-scroll')
        elements.forEach((el) => observer.unobserve(el))
      }
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="awards"
      ref={awardsRef}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 animate-on-scroll">
          {data.awards.title}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {data.awards.items.map((item) => (
              <div 
                key={item.id} 
                className="bg-gray-50 p-6 rounded-lg shadow-md animate-on-scroll"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-lg text-blue-600 mt-1">{item.institution}</p>
                  </div>
                  <p className="text-gray-500 mt-2 md:mt-0">{item.year}</p>
                </div>
                <p className="text-gray-700 mt-4">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
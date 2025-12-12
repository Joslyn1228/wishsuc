'use client'

import { useEffect, useRef } from 'react'
import data from '@/lib/data'

export default function Education() {
  const educationRef = useRef<HTMLElement>(null)

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

    if (educationRef.current) {
      const elements = educationRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => {
      if (educationRef.current) {
        const elements = educationRef.current.querySelectorAll('.animate-on-scroll')
        elements.forEach((el) => observer.unobserve(el))
      }
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="education"
      ref={educationRef}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 animate-on-scroll">
          {data.education.title}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {data.education.items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-6 rounded-lg shadow-md animate-on-scroll"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.institution}</h3>
                    <p className="text-lg text-blue-600 mt-1">{item.degree} - {item.major}</p>
                  </div>
                  <p className="text-gray-500 mt-2 md:mt-0">{item.duration}</p>
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
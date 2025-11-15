'use client'

import { useEffect, useRef } from 'react'
import data from '@/lib/data'

export default function About() {
  const aboutRef = useRef<HTMLElement>(null)

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

    if (aboutRef.current) {
      const elements = aboutRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => {
      if (aboutRef.current) {
        const elements = aboutRef.current.querySelectorAll('.animate-on-scroll')
        elements.forEach((el) => observer.unobserve(el))
      }
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 animate-on-scroll">
          {data.about.title}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl text-gray-700 mb-8 text-center leading-relaxed animate-on-scroll">
            {data.about.description}
          </p>
          
          <div className="mt-12 animate-on-scroll">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              技能栈
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {data.about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  tabIndex={0}
                  role="listitem"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


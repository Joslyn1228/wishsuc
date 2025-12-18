'use client'

import { useEffect, useRef } from 'react'
import data from '@/lib/data'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

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

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => {
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.animate-on-scroll')
        elements.forEach((el) => observer.unobserve(el))
      }
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 md:pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-on-scroll">
          <span className="block">你好，我是</span>
          <span className="block text-blue-600 mt-2">{data.hero.name}</span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-4 animate-on-scroll">
          {data.hero.title}
        </p>
        
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-on-scroll">
          {data.hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-on-scroll">
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="查看项目"
          >
            {data.hero.cta.primary}
          </button>
          
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="联系我"
          >
            {data.hero.cta.secondary}
          </button>
          
          <a
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="管理端"
          >
            管理端
          </a>
        </div>
      </div>
    </section>
  )
}


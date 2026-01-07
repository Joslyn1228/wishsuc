'use client'

import { useEffect, useRef, useState } from 'react'
import data from '@/lib/data'
import supabase from '@/lib/supabase'

export default function Hobbies() {
  const hobbiesRef = useRef<HTMLElement>(null)
  const [hobbiesData, setHobbiesData] = useState(data.hobbies.items)
  const [loading, setLoading] = useState(false)

  // 从后端获取爱好数据
  useEffect(() => {
    async function fetchHobbies() {
      try {
        setLoading(true)
        const hobbiesFromBackend = await supabase.getHobbies()
        if (hobbiesFromBackend.length > 0) {
          setHobbiesData(hobbiesFromBackend)
        }
      } catch (error) {
        console.error('Error fetching hobbies from backend:', error)
        // 如果后端获取失败，使用本地数据
      } finally {
        setLoading(false)
      }
    }

    fetchHobbies()
  }, [])

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
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">加载中...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hobbiesData.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white p-6 rounded-lg shadow-md animate-on-scroll"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.name}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
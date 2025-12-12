'use client'

import { useEffect, useRef, useState } from 'react'
import data from '@/lib/data'

// 从配置中获取basePath，用于处理图片路径
const basePath = '/wishsuc'

export default function Photography() {
  const photographyRef = useRef<HTMLElement>(null)
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null)

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

    if (photographyRef.current) {
      const elements = photographyRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => {
      if (photographyRef.current) {
        const elements = photographyRef.current.querySelectorAll('.animate-on-scroll')
        elements.forEach((el) => observer.unobserve(el))
      }
      observer.disconnect()
    }
  }, [])

  const toggleModule = (moduleId: number) => {
    const newSelectedModule = selectedModule === moduleId ? null : moduleId
    setSelectedModule(newSelectedModule)
    
    // 预加载当前模块的所有图片
    if (newSelectedModule) {
      const module = data.photography.modules.find(m => m.id === newSelectedModule)
      if (module) {
        module.works.forEach(work => {
          const img = new Image()
          img.src = basePath + work.image
        })
      }
    }
  }

  const openImageViewer = (src: string, title: string) => {
    setSelectedImage({ src, title })
    document.body.style.overflow = 'hidden'
  }

  const closeImageViewer = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeImageViewer()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedImage])

  return (
    <section
      id="photography"
      ref={photographyRef}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 animate-on-scroll">
          {data.photography.title}
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
          {data.photography.description}
        </p>

        <div className="space-y-12">
          {data.photography.modules.map((module) => (
            <div key={module.id} className="animate-on-scroll">
              <div 
                className="bg-gray-50 p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{module.name}</h3>
                  <svg 
                    className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${selectedModule === module.id ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-gray-600">{module.description}</p>
              </div>

              {selectedModule === module.id && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {module.works.map((work) => (
                    <div key={work.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div 
                        className="h-48 bg-gray-200 flex items-center justify-center cursor-pointer relative overflow-hidden"
                        onDoubleClick={() => openImageViewer(work.image, work.title)}
                      >
                        {/* Blurred placeholder */}
                        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                          <svg className="w-16 h-16 text-gray-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        
                        {/* Actual image with fade-in effect */}
                        <img 
          src={basePath + work.image} 
          alt={work.title} 
          className="w-full h-full object-cover transition-all duration-500 hover:scale-105 opacity-0"
          loading="lazy"
          onLoad={(e) => {
            const target = e.target as HTMLImageElement
            target.classList.remove('opacity-0')
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/400x300?text=摄影作品'
            target.alt = '摄影作品占位图'
            target.classList.remove('opacity-0')
          }}
        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{work.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{work.description}</p>
                        {work.tags && work.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {work.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">双击图片放大查看</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 cursor-pointer"
          onClick={closeImageViewer}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full p-4">
            <button 
              className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors z-10"
              onClick={closeImageViewer}
              aria-label="关闭"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={basePath + selectedImage.src} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
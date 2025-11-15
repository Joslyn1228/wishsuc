'use client'

import { useEffect, useRef } from 'react'
import data from '@/lib/data'

export default function Contact() {
  const contactRef = useRef<HTMLElement>(null)

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

    if (contactRef.current) {
      const elements = contactRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => {
      if (contactRef.current) {
        const elements = contactRef.current.querySelectorAll('.animate-on-scroll')
        elements.forEach((el) => observer.unobserve(el))
      }
      observer.disconnect()
    }
  }, [])

  type SocialLink = {
    name: string
    url: string
    icon: string
    isWechat?: boolean
    wechatId?: string
  }

  const socialLinks: SocialLink[] = [
    { name: 'Email', url: `mailto:${data.contact.email}`, icon: '✉️' },
    { name: 'GitHub', url: data.contact.github, icon: '🐙' },
    ...(data.contact.Wechat ? [{ name: 'Wechat', url: `weixin://`, icon: '💬', isWechat: true, wechatId: data.contact.Wechat }] : []),
    ...(data.contact['X(Twitter)'] ? [{ name: 'X(Twitter)', url: data.contact['X(Twitter)'], icon: '🐦' }] : []),
  ]

  return (
    <section
      id="contact"
      ref={contactRef}
      className="py-20 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 animate-on-scroll">
          {data.contact.title}
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-700 text-center mb-12 animate-on-scroll">
          {data.contact.description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-on-scroll">
          {socialLinks.map((link, index) => {
            if (link.isWechat) {
              return (
                <div
                  key={index}
                  className="flex items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                  onClick={() => {
                    if (typeof window !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText(link.wechatId || '')
                      alert(`微信号已复制到剪贴板: ${link.wechatId}`)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      if (typeof window !== 'undefined' && navigator.clipboard) {
                        navigator.clipboard.writeText(link.wechatId || '')
                        alert(`微信号已复制到剪贴板: ${link.wechatId}`)
                      }
                    }
                  }}
                  aria-label={`复制微信号 ${link.wechatId}`}
                >
                  <span className="text-3xl" aria-hidden="true">
                    {link.icon}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {link.name}
                  </span>
                </div>
              )
            }
            return (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('mailto:') || link.url.startsWith('weixin://') ? undefined : '_blank'}
                rel={link.url.startsWith('mailto:') || link.url.startsWith('weixin://') ? undefined : 'noopener noreferrer'}
                className="flex items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`通过 ${link.name} 联系我`}
              >
                <span className="text-3xl" aria-hidden="true">
                  {link.icon}
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  {link.name}
                </span>
              </a>
            )
          })}
        </div>
        
        <div className="mt-12 text-center animate-on-scroll">
          <a
            href={`mailto:${data.contact.email}`}
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="发送邮件"
          >
            发送邮件
          </a>
        </div>
      </div>
    </section>
  )
}


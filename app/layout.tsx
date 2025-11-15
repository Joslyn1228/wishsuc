import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Joslyn的个人主页 | Personal Portfolio',
  description: '欢迎访问我的个人主页，了解我的项目、技能和联系方式。',
  keywords: ['个人主页', '作品集', 'Portfolio', 'Web开发'],
  authors: [{ name: 'Joslyn' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '个人主页 | Personal Portfolio',
    description: '欢迎访问我的个人主页，了解我的项目、技能和联系方式。',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '个人主页 | Personal Portfolio',
    description: '欢迎访问我的个人主页，了解我的项目、技能和联系方式。',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}


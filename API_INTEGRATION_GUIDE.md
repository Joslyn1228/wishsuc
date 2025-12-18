# API集成指南

## 项目现状分析

当前项目配置了 `output: 'export'`，这意味着它是一个**静态导出的Next.js项目**，不支持传统的API路由。静态导出模式下，Next.js会生成纯静态HTML/CSS/JS文件，无法运行服务器端代码或API路由。

## 解决方案

### 方案一：使用外部API服务（推荐）

由于当前项目是静态导出模式，最适合的方案是使用外部API服务。以下是具体步骤：

#### 1. 选择外部API服务

您可以选择以下外部API服务之一：
- [Vercel Edge Functions](https://vercel.com/docs/functions/edge-functions)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [自己部署的Node.js API服务器](https://nodejs.org/en/docs/guides/getting-started-guide/)

#### 2. 实现外部API

以Vercel Edge Functions为例：

```javascript
// api/data.js
import { NextResponse } from 'next/server'

export async function GET(request) {
  // 实现您的API逻辑
  const data = {
    message: 'Hello from API',
    timestamp: new Date().toISOString()
  }
  return NextResponse.json(data)
}
```

#### 3. 在客户端调用API

```javascript
// components/YourComponent.js
import { useState, useEffect } from 'react'

export default function YourComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://your-api-endpoint.example.com/data')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  
  return (
    <div>
      {data && <p>{data.message}</p>}
    </div>
  )
}
```

### 方案二：修改项目配置（移除静态导出）

如果您希望使用Next.js内置的API路由，可以修改项目配置：

#### 1. 修改next.config.js

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/wishsuc',
  // 移除 output: 'export'，启用服务器模式
}

module.exports = nextConfig
```

#### 2. 创建API路由

```javascript
// app/api/data/route.js
export async function GET(request) {
  // 实现您的API逻辑
  const data = {
    message: 'Hello from API',
    timestamp: new Date().toISOString()
  }
  return Response.json(data)
}
```

#### 3. 修改部署方式

移除静态导出后，您需要使用支持Next.js服务器的部署平台，如：
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

### 方案三：使用第三方API服务

直接使用第三方API服务，如：
- [Firebase](https://firebase.google.com/)
- [Supabase](https://supabase.com/)
- [Airtable](https://airtable.com/)
- [Notion API](https://developers.notion.com/)

## 具体步骤总结

### 对于静态导出项目（当前配置）

1. **选择外部API服务**
2. **实现API端点**
3. **在客户端添加API调用逻辑**
4. **部署API服务**
5. **更新客户端API URL**

### 对于服务器模式项目

1. **修改next.config.js，移除output: 'export'**
2. **创建app/api目录和路由文件**
3. **实现API逻辑**
4. **修改部署平台**
5. **部署应用**

## 推荐方案

对于您当前的静态导出项目，**推荐使用方案一**（外部API服务），因为：
1. 不需要改变现有项目结构
2. 不需要修改部署方式
3. 支持无缝扩展
4. 适合静态网站的API需求

## 示例：添加Firebase API支持

### 1. 安装Firebase SDK

```bash
npm install firebase
```

### 2. 配置Firebase

```javascript
// lib/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
```

### 3. 在组件中使用Firebase

```javascript
// components/YourComponent.js
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function YourComponent() {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    async function fetchItems() {
      const querySnapshot = await getDocs(collection(db, 'items'))
      const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setItems(itemsList)
    }
    fetchItems()
  }, [])
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

## 注意事项

1. **CORS配置** - 如果使用外部API，确保正确配置CORS
2. **API密钥安全** - 不要在客户端代码中暴露敏感API密钥
3. **错误处理** - 确保添加适当的错误处理逻辑
4. **加载状态** - 添加加载指示器，提升用户体验
5. **缓存策略** - 考虑添加API响应缓存，减少请求次数

通过以上步骤，您可以为您的静态网站添加API支持，实现动态数据功能。
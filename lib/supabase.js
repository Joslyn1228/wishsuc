// lib/supabase.js
// Supabase客户端配置
// 请替换为您自己的Supabase项目信息

const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co'
const supabaseKey = 'YOUR_ANON_KEY'

class SupabaseClient {
  constructor() {
    this.url = supabaseUrl
    this.key = supabaseKey
  }

  // 获取项目列表
  async getProjects() {
    try {
      const response = await fetch(`${this.url}/rest/v1/projects?select=*`, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      return await response.json()
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  }

  // 获取单个项目
  async getProject(id) {
    try {
      const response = await fetch(`${this.url}/rest/v1/projects?id=eq.${id}`, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      return data[0] || null
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    }
  }

  // 创建项目
  async createProject(project) {
    try {
      const response = await fetch(`${this.url}/rest/v1/projects`, {
        method: 'POST',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      })
      return await response.json()
    } catch (error) {
      console.error('Error creating project:', error)
      return null
    }
  }

  // 更新项目
  async updateProject(id, updates) {
    try {
      const response = await fetch(`${this.url}/rest/v1/projects?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })
      return await response.json()
    } catch (error) {
      console.error('Error updating project:', error)
      return null
    }
  }

  // 删除项目
  async deleteProject(id) {
    try {
      const response = await fetch(`${this.url}/rest/v1/projects?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      return response.ok
    } catch (error) {
      console.error('Error deleting project:', error)
      return false
    }
  }
}

// 创建并导出Supabase客户端实例
const supabase = new SupabaseClient()
export default supabase
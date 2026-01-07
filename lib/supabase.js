// lib/supabase.js
// Supabase客户端配置
// 请替换为您自己的Supabase项目信息

// 替换为你的实际 Supabase 配置
const supabaseUrl = 'https://你的项目ID.supabase.co'
const supabaseKey = '你的匿名密钥'

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

  // ========== 爱好管理 ==========

  // 获取爱好列表
  async getHobbies() {
    try {
      const response = await fetch(`${this.url}/rest/v1/hobbies?select=*&order=id.asc`, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      return await response.json()
    } catch (error) {
      console.error('Error fetching hobbies:', error)
      return []
    }
  }

  // 获取单个爱好
  async getHobby(id) {
    try {
      const response = await fetch(`${this.url}/rest/v1/hobbies?id=eq.${id}`, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      return data[0] || null
    } catch (error) {
      console.error('Error fetching hobby:', error)
      return null
    }
  }

  // 创建爱好
  async createHobby(hobby) {
    try {
      const response = await fetch(`${this.url}/rest/v1/hobbies`, {
        method: 'POST',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hobby)
      })
      return await response.json()
    } catch (error) {
      console.error('Error creating hobby:', error)
      return null
    }
  }

  // 更新爱好
  async updateHobby(id, updates) {
    try {
      const response = await fetch(`${this.url}/rest/v1/hobbies?id=eq.${id}`, {
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
      console.error('Error updating hobby:', error)
      return null
    }
  }

  // 删除爱好
  async deleteHobby(id) {
    try {
      const response = await fetch(`${this.url}/rest/v1/hobbies?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      return response.ok
    } catch (error) {
      console.error('Error deleting hobby:', error)
      return false
    }
  }

  // ========== 摄影作品集管理 ==========

  // 获取摄影模块
  async getPhotographyModules() {
    try {
      const response = await fetch(`${this.url}/rest/v1/photography_modules?select=*&order=id.asc`, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      return await response.json()
    } catch (error) {
      console.error('Error fetching photography modules:', error)
      return []
    }
  }

  // 创建摄影模块
  async createPhotographyModule(module) {
    try {
      const response = await fetch(`${this.url}/rest/v1/photography_modules`, {
        method: 'POST',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(module)
      })
      return await response.json()
    } catch (error) {
      console.error('Error creating photography module:', error)
      return null
    }
  }

  // 更新摄影模块
  async updatePhotographyModule(id, updates) {
    try {
      const response = await fetch(`${this.url}/rest/v1/photography_modules?id=eq.${id}`, {
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
      console.error('Error updating photography module:', error)
      return null
    }
  }

  // 删除摄影模块
  async deletePhotographyModule(id) {
    try {
      const response = await fetch(`${this.url}/rest/v1/photography_modules?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      return response.ok
    } catch (error) {
      console.error('Error deleting photography module:', error)
      return false
    }
  }

  // 获取摄影作品
  async getPhotographyWorks(moduleId = null) {
    try {
      const url = moduleId 
        ? `${this.url}/rest/v1/photography_works?module_id=eq.${moduleId}&order=id.asc`
        : `${this.url}/rest/v1/photography_works?order=id.asc`
      
      const response = await fetch(url, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      return await response.json()
    } catch (error) {
      console.error('Error fetching photography works:', error)
      return []
    }
  }

  // 创建摄影作品
  async createPhotographyWork(work) {
    try {
      const response = await fetch(`${this.url}/rest/v1/photography_works`, {
        method: 'POST',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(work)
      })
      return await response.json()
    } catch (error) {
      console.error('Error creating photography work:', error)
      return null
    }
  }

  // 更新摄影作品
  async updatePhotographyWork(id, updates) {
    try {
      const response = await fetch(`${this.url}/rest/v1/photography_works?id=eq.${id}`, {
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
      console.error('Error updating photography work:', error)
      return null
    }
  }

  // 删除摄影作品
  async deletePhotographyWork(id) {
    try {
      const response = await fetch(`${this.url}/rest/v1/photography_works?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      return response.ok
    } catch (error) {
      console.error('Error deleting photography work:', error)
      return false
    }
  }

  // ========== 网站配置管理 ==========

  // 获取网站配置
  async getSiteConfig() {
    try {
      const response = await fetch(`${this.url}/rest/v1/site_config?select=*&limit=1`, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      return data[0] || null
    } catch (error) {
      console.error('Error fetching site config:', error)
      return null
    }
  }

  // 更新网站配置
  async updateSiteConfig(id, updates) {
    try {
      const response = await fetch(`${this.url}/rest/v1/site_config?id=eq.${id}`, {
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
      console.error('Error updating site config:', error)
      return null
    }
  }
}

// 创建并导出Supabase客户端实例
const supabase = new SupabaseClient()
export default supabase
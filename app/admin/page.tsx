'use client'

import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'

export default function Admin() {
  const [projects, setProjects] = useState<Array<{ id: number; title: string; description: string; technologies: string[]; image: string; link: string; github: string }>>([])
  const [hobbies, setHobbies] = useState<Array<{ id: number; name: string; description: string }>>([])
  const [photographyModules, setPhotographyModules] = useState<Array<{ id: number; name: string; description: string }>>([])
  const [photographyWorks, setPhotographyWorks] = useState<Array<{ id: number; module_id: number; title: string; description: string; image: string; tags: string[] }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'projects' | 'hobbies' | 'photography'>('projects')
  
  const [newProject, setNewProject] = useState<{
    title: string;
    description: string;
    technologies: string[];
    image: string;
    link: string;
    github: string;
  }>({
    title: '',
    description: '',
    technologies: [],
    image: '',
    link: '',
    github: ''
  })

  const [newHobby, setNewHobby] = useState<{
    name: string;
    description: string;
  }>({
    name: '',
    description: ''
  })

  const [newPhotographyModule, setNewPhotographyModule] = useState<{
    name: string;
    description: string;
  }>({
    name: '',
    description: ''
  })

  const [newPhotographyWork, setNewPhotographyWork] = useState<{
    module_id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
  }>({
    module_id: 1,
    title: '',
    description: '',
    image: '',
    tags: []
  })

  // 获取数据列表
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [projectsData, hobbiesData, modulesData, worksData] = await Promise.all([
          supabase.getProjects(),
          supabase.getHobbies(),
          supabase.getPhotographyModules(),
          supabase.getPhotographyWorks()
        ])
        
        setProjects(projectsData)
        setHobbies(hobbiesData)
        setPhotographyModules(modulesData)
        setPhotographyWorks(worksData)
        setError(null)
      } catch (err) {
        setError('获取数据失败，请检查网络连接')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 处理项目表单提交
  const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await supabase.createProject(newProject)
      if (result) {
        setProjects([...projects, result])
        // 重置表单
        setNewProject({
          title: '',
          description: '',
          technologies: [],
          image: '',
          link: '',
          github: ''
        })
        setError(null)
      }
    } catch (err) {
      setError('创建项目失败')
      console.error('Error creating project:', err)
    } finally {
      setLoading(false)
    }
  }

  // 处理爱好表单提交
  const handleHobbySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await supabase.createHobby(newHobby)
      if (result) {
        setHobbies([...hobbies, result])
        // 重置表单
        setNewHobby({
          name: '',
          description: ''
        })
        setError(null)
      }
    } catch (err) {
      setError('创建爱好失败')
      console.error('Error creating hobby:', err)
    } finally {
      setLoading(false)
    }
  }

  // 处理摄影模块表单提交
  const handlePhotographyModuleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await supabase.createPhotographyModule(newPhotographyModule)
      if (result) {
        setPhotographyModules([...photographyModules, result])
        // 重置表单
        setNewPhotographyModule({
          name: '',
          description: ''
        })
        setError(null)
      }
    } catch (err) {
      setError('创建摄影模块失败')
      console.error('Error creating photography module:', err)
    } finally {
      setLoading(false)
    }
  }

  // 处理摄影作品表单提交
  const handlePhotographyWorkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await supabase.createPhotographyWork(newPhotographyWork)
      if (result) {
        setPhotographyWorks([...photographyWorks, result])
        // 重置表单
        setNewPhotographyWork({
          module_id: photographyModules[0]?.id || 1,
          title: '',
          description: '',
          image: '',
          tags: []
        })
        setError(null)
      }
    } catch (err) {
      setError('创建摄影作品失败')
      console.error('Error creating photography work:', err)
    } finally {
      setLoading(false)
    }
  }

  // 删除项目
  const deleteProject = async (id: number) => {
    if (!confirm('确定要删除这个项目吗？')) return
    
    try {
      setLoading(true)
      const success = await supabase.deleteProject(id)
      if (success) {
        setProjects(projects.filter(p => p.id !== id))
      }
    } catch (err) {
      setError('删除项目失败')
      console.error('Error deleting project:', err)
    } finally {
      setLoading(false)
    }
  }

  // 删除爱好
  const deleteHobby = async (id: number) => {
    if (!confirm('确定要删除这个爱好吗？')) return
    
    try {
      setLoading(true)
      const success = await supabase.deleteHobby(id)
      if (success) {
        setHobbies(hobbies.filter(h => h.id !== id))
      }
    } catch (err) {
      setError('删除爱好失败')
      console.error('Error deleting hobby:', err)
    } finally {
      setLoading(false)
    }
  }

  // 删除摄影模块
  const deletePhotographyModule = async (id: number) => {
    if (!confirm('确定要删除这个摄影模块吗？相关的作品也会被删除。')) return
    
    try {
      setLoading(true)
      const success = await supabase.deletePhotographyModule(id)
      if (success) {
        setPhotographyModules(photographyModules.filter(m => m.id !== id))
        setPhotographyWorks(photographyWorks.filter(w => w.module_id !== id))
      }
    } catch (err) {
      setError('删除摄影模块失败')
      console.error('Error deleting photography module:', err)
    } finally {
      setLoading(false)
    }
  }

  // 删除摄影作品
  const deletePhotographyWork = async (id: number) => {
    if (!confirm('确定要删除这个摄影作品吗？')) return
    
    try {
      setLoading(true)
      const success = await supabase.deletePhotographyWork(id)
      if (success) {
        setPhotographyWorks(photographyWorks.filter(w => w.id !== id))
      }
    } catch (err) {
      setError('删除摄影作品失败')
      console.error('Error deleting photography work:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">管理后台</h1>
          </div>
          
          <div className="px-4 py-6 sm:p-6">
            {/* 标签导航 */}
            <div className="mb-8">
              <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'projects'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  项目管理
                </button>
                <button
                  onClick={() => setActiveTab('hobbies')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'hobbies'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  爱好管理
                </button>
                <button
                  onClick={() => setActiveTab('photography')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'photography'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  摄影作品集
                </button>
              </nav>
            </div>

            {/* 项目管理部分 */}
            {activeTab === 'projects' && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">项目管理</h2>
              
              {/* 错误提示 */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}
              
              {/* 创建新项目表单 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-blue-800 mb-4">创建新项目</h3>
                <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">项目标题</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="输入项目标题"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">项目链接</label>
                    <input
                      type="url"
                      value={newProject.link}
                      onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="输入项目链接"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">项目描述</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="输入项目描述"
                      required
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">技术栈 (逗号分隔)</label>
                    <input
                      type="text"
                      value={newProject.technologies.join(', ')}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value.split(',').map(t => t.trim()) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="例如: React, JavaScript, CSS"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">图片链接</label>
                      <input
                        type="text"
                        value={newProject.image}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="输入图片URL"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">GitHub链接</label>
                      <input
                        type="url"
                        value={newProject.github}
                        onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="输入GitHub链接"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                      {loading ? '创建中...' : '创建项目'}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* 项目列表 */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">项目列表</h3>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">加载项目中...</p>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">暂无项目</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {projects.map((project) => (
                          <tr key={project.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{project.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-600 hover:text-blue-900 mr-4">编辑</button>
                              <button 
                                onClick={() => deleteProject(project.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                删除
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            )}

            {/* 爱好管理部分 */}
            {activeTab === 'hobbies' && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">爱好管理</h2>
              
              {/* 创建新爱好表单 */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-green-800 mb-4">创建新爱好</h3>
                <form onSubmit={handleHobbySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">爱好名称</label>
                    <input
                      type="text"
                      value={newHobby.name}
                      onChange={(e) => setNewHobby({ ...newHobby, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="输入爱好名称"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">爱好描述</label>
                    <textarea
                      value={newHobby.description}
                      onChange={(e) => setNewHobby({ ...newHobby, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="输入爱好描述"
                      required
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
                    >
                      {loading ? '创建中...' : '创建爱好'}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* 爱好列表 */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">爱好列表</h3>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">加载中...</p>
                  </div>
                ) : hobbies.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">暂无爱好</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hobbies.map((hobby) => (
                      <div key={hobby.id} className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{hobby.name}</h4>
                        <p className="text-gray-600 mb-4">{hobby.description}</p>
                        <div className="flex justify-end space-x-3">
                          <button className="text-blue-600 hover:text-blue-900">编辑</button>
                          <button 
                            onClick={() => deleteHobby(hobby.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            )}

            {/* 摄影作品集管理部分 */}
            {activeTab === 'photography' && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">摄影作品集管理</h2>
              
              {/* 创建新摄影模块表单 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-purple-800 mb-4">创建新模块</h3>
                <form onSubmit={handlePhotographyModuleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">模块名称</label>
                    <input
                      type="text"
                      value={newPhotographyModule.name}
                      onChange={(e) => setNewPhotographyModule({ ...newPhotographyModule, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="输入模块名称"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">模块描述</label>
                    <textarea
                      value={newPhotographyModule.description}
                      onChange={(e) => setNewPhotographyModule({ ...newPhotographyModule, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="输入模块描述"
                      required
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-400"
                    >
                      {loading ? '创建中...' : '创建模块'}
                    </button>
                  </div>
                </form>
              </div>

              {/* 创建新摄影作品表单 */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-indigo-800 mb-4">添加新作品</h3>
                <form onSubmit={handlePhotographyWorkSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">所属模块</label>
                    <select
                      value={newPhotographyWork.module_id}
                      onChange={(e) => setNewPhotographyWork({ ...newPhotographyWork, module_id: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      {photographyModules.map(module => (
                        <option key={module.id} value={module.id}>{module.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">作品标题</label>
                    <input
                      type="text"
                      value={newPhotographyWork.title}
                      onChange={(e) => setNewPhotographyWork({ ...newPhotographyWork, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="输入作品标题"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">作品描述</label>
                    <textarea
                      value={newPhotographyWork.description}
                      onChange={(e) => setNewPhotographyWork({ ...newPhotographyWork, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="输入作品描述"
                      required
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">图片链接</label>
                    <input
                      type="text"
                      value={newPhotographyWork.image}
                      onChange={(e) => setNewPhotographyWork({ ...newPhotographyWork, image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="输入图片URL"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">标签 (逗号分隔)</label>
                    <input
                      type="text"
                      value={newPhotographyWork.tags.join(', ')}
                      onChange={(e) => setNewPhotographyWork({ ...newPhotographyWork, tags: e.target.value.split(',').map(t => t.trim()) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="例如: 风景, 自然, 云南"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                    >
                      {loading ? '添加中...' : '添加作品'}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* 摄影模块列表 */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">模块列表</h3>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">加载中...</p>
                  </div>
                ) : photographyModules.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">暂无模块</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {photographyModules.map((module) => (
                      <div key={module.id} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{module.name}</h4>
                            <p className="text-gray-600">{module.description}</p>
                          </div>
                          <div className="flex space-x-3">
                            <button className="text-blue-600 hover:text-blue-900">编辑</button>
                            <button 
                              onClick={() => deletePhotographyModule(module.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              删除
                            </button>
                          </div>
                        </div>
                        
                        {/* 作品列表 */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">作品列表</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {photographyWorks.filter(work => work.module_id === module.id).map((work) => (
                              <div key={work.id} className="bg-gray-50 p-3 rounded border border-gray-200">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h6 className="font-medium text-gray-900">{work.title}</h6>
                                    <p className="text-sm text-gray-600">{work.description}</p>
                                    {work.tags.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {work.tags.map((tag, index) => (
                                          <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <button 
                                    onClick={() => deletePhotographyWork(work.id)}
                                    className="text-red-600 hover:text-red-900 text-sm"
                                  >
                                    删除
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            )}
            
            <div className="mt-8 text-center">
              <p className="text-gray-500 italic">注意：当前使用的是Supabase后端服务，需要替换为您自己的Supabase项目信息才能正常使用。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'

export default function Admin() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    image: '',
    link: '',
    github: ''
  })

  // 获取项目列表
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const data = await supabase.getProjects()
        setProjects(data)
        setError(null)
      } catch (err) {
        setError('获取项目失败，请检查网络连接')
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // 处理表单提交
  const handleSubmit = async (e) => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">管理后台</h1>
          </div>
          
          <div className="px-4 py-6 sm:p-6">
            {/* 项目管理部分 */}
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
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              <button className="text-red-600 hover:text-red-900">删除</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            
            {/* 其他管理模块 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <h3 className="text-lg font-medium text-green-800 mb-2">内容管理</h3>
                <p className="text-green-600">更新网站的文本和图片内容</p>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <h3 className="text-lg font-medium text-purple-800 mb-2">设置</h3>
                <p className="text-purple-600">管理网站的基本设置</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-500 italic">注意：当前使用的是Supabase后端服务，需要替换为您自己的Supabase项目信息才能正常使用。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
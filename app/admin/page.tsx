export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">管理后台</h1>
          </div>
          <div className="px-4 py-6 sm:p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">欢迎来到管理后台</h2>
              <p className="text-gray-600 mb-8">这是一个简单的后端管理界面示例</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">项目管理</h3>
                  <p className="text-blue-600">管理网站上的项目展示</p>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <h3 className="text-lg font-medium text-green-800 mb-2">内容管理</h3>
                  <p className="text-green-600">更新网站的文本和图片内容</p>
                </div>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <h3 className="text-lg font-medium text-purple-800 mb-2">设置</h3>
                  <p className="text-purple-600">管理网站的基本设置</p>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-gray-500 italic">注意：这是一个演示版本，实际功能需要后端API支持</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
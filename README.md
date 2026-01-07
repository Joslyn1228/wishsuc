# 个人主页项目

一个使用 Next.js (App Router) 和 Tailwind CSS 构建的现代化个人主页项目。

## 功能特性

- ✨ 响应式设计，移动优先
- 🎨 现代化的 UI 设计
- 🚀 基于 Next.js 14 App Router
- 💨 Tailwind CSS 样式
- ♿ 可访问性支持（ARIA、语义标签）
- 🔍 SEO 优化（OpenGraph、Meta 标签）
- 📱 平滑滚动和动画效果

## 技术架构与开发指南

### 4.1 技术栈选择

- **前端框架**: Next.js 14 (App Router) —— 理由: 利于 SEO，且是 React 生态主流
- **样式库**: Tailwind CSS —— 理由: 原子化 CSS，开发速度快，AI 生成代码准确率高
- **动画库**: 原生 IntersectionObserver API —— 理由: 轻量级实现，无需额外依赖
- **部署平台**: GitHub Pages / Vercel / Netlify (支持 CI/CD 自动化部署)

### 4.2 本地运行步骤

1. **克隆仓库**:

```bash
git clone https://github.com/joslyn1228/5.git
```

2. **安装依赖**:

```bash
cd PersonalWeb
npm install
```

3. **启动开发服务器**:

```bash
npm run dev
# 打开浏览器访问 http://localhost:3000
```

4. **构建生产版本**:

```bash
npm run build
```

5. **启动生产服务器**:

```bash
npm start
```

6. **代码检查**:

```bash
npm run lint
```

### 4.3 目录结构说明

```
PersonalWeb/
├── app/                    # Next.js 页面路由
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   ├── admin/              # 管理页面
│   └── globals.css         # 全局样式
├── components/             # 可复用组件
│   ├── Navbar.tsx          # 导航栏
│   ├── Footer.tsx          # 页脚
│   ├── Hero.tsx            # 英雄区
│   ├── About.tsx           # 关于我
│   ├── Projects.tsx        # 项目展示
│   ├── Contact.tsx         # 联系方式
│   ├── Education.tsx       # 教育经历
│   ├── Awards.tsx          # 荣誉奖项
│   ├── Hobbies.tsx         # 兴趣爱好
│   └── Photography.tsx     # 摄影作品
├── content/                # 内容数据
│   └── data.json           # 个人信息和项目数据
├── public/                 # 静态资源
│   ├── images/             # 图片资源
│   └── documents/          # 文档资源
├── lib/                    # 工具函数
│   ├── data.ts             # 数据处理函数
│   └── supabase.js         # Supabase 配置
├── scripts/                # 脚本文件
│   └── optimize-images.js  # 图片优化脚本
└── next.config.js          # Next.js 配置
```

## 自定义内容

编辑 `content/data.json` 文件来自定义你的个人信息：

- **hero**: 首页英雄区内容
- **about**: 关于我部分的内容和技能
- **projects**: 项目列表
- **contact**: 联系方式

## 图片资源

项目图片应放置在 `public/images/` 目录下：

- `public/images/project-1.jpg`
- `public/images/project-2.jpg`
- `public/images/project-3.jpg`

你可以在 `content/data.json` 中更新图片路径。

## 部署

### GitHub Pages（推荐）

项目已配置 GitHub Actions 自动部署。

**步骤：**
1. 在仓库 Settings → Pages 中，选择 "GitHub Actions" 作为源
2. 推送代码到 main 分支，会自动触发部署
3. 部署完成后访问：`https://joslyn1228.github.io/5/`

详细说明请查看 [GITHUB_PAGES_DEPLOY.md](./GITHUB_PAGES_DEPLOY.md)

### Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### Netlify

1. 将代码推送到 GitHub
2. 在 [Netlify](https://netlify.com) 导入项目
3. 构建命令：`npm run build`
4. 发布目录：`out`

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 实用优先的 CSS 框架
- **React** - UI 库

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！


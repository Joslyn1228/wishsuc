# Vercel 部署问题排查

## 已修复的问题

1. ✅ **移除了 layout.tsx 中的 `<head>` 标签**
   - Next.js App Router 会自动处理 metadata，不需要手动添加 `<head>`
   - favicon 现在通过 metadata.icons 配置

2. ✅ **添加了 vercel.json 配置文件**
   - 优化了构建配置
   - 设置了香港区域（hkg1）以提升国内访问速度

## 常见问题排查

### 1. 构建失败

**检查方法：**
- 在 Vercel 控制台查看构建日志
- 检查是否有 TypeScript 错误
- 检查是否有依赖安装问题

**解决方案：**
```bash
# 本地测试构建
npm run build
```

### 2. 页面显示空白

**可能原因：**
- JavaScript 错误
- 路由问题
- 数据加载失败

**检查方法：**
- 打开浏览器开发者工具（F12）
- 查看 Console 标签页的错误信息
- 查看 Network 标签页的请求状态

### 3. 样式不显示

**可能原因：**
- Tailwind CSS 未正确编译
- CSS 文件路径错误

**解决方案：**
- 确保 `tailwind.config.js` 配置正确
- 检查 `globals.css` 是否正确导入

### 4. 数据文件加载失败

**检查：**
- `content/data.json` 文件是否存在
- JSON 格式是否正确
- 路径别名 `@/content/data.json` 是否正确配置

## 重新部署步骤

1. **提交修复后的代码：**
   ```bash
   git add .
   git commit -m "Fix Vercel deployment issues"
   git push
   ```

2. **在 Vercel 控制台：**
   - 进入项目设置
   - 点击 "Redeploy"
   - 或等待自动部署（如果已连接 GitHub）

3. **检查部署日志：**
   - 查看构建是否成功
   - 检查是否有警告或错误

## 如果仍然无法打开

请提供以下信息：
1. Vercel 部署日志的错误信息
2. 浏览器控制台的错误信息（F12 → Console）
3. 访问的 URL 地址
4. 具体的错误提示（404、500、空白页面等）

## 优化建议

1. **添加环境变量**（如果需要）：
   - 在 Vercel 项目设置中添加环境变量

2. **配置自定义域名**：
   - 在 Vercel 项目设置中添加你的域名

3. **启用 Analytics**：
   - 在 Vercel 项目设置中启用 Analytics 查看访问统计


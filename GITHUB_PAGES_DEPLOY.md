# GitHub Pages 部署指南

## 自动部署（推荐）

项目已配置 GitHub Actions，会自动部署到 GitHub Pages。

### 步骤：

1. **启用 GitHub Pages**
   - 访问你的仓库：https://github.com/Joslyn1228/5
   - 点击 Settings → Pages
   - 在 "Source" 部分，选择 "GitHub Actions"
   - 保存设置

2. **推送代码触发部署**
   ```bash
   git push
   ```
   - 代码推送后，GitHub Actions 会自动构建并部署
   - 查看 Actions 标签页可以监控部署进度

3. **访问网站**
   - 部署完成后，网站地址为：
   - `https://joslyn1228.github.io/5/`
   - 或 `https://joslyn1228.github.io/5`（取决于仓库名）

## 手动部署

如果需要手动部署：

1. **构建项目**
   ```bash
   npm run build
   ```

2. **推送到 gh-pages 分支**
   ```bash
   # 安装 gh-pages（如果还没有）
   npm install --save-dev gh-pages
   
   # 添加到 package.json scripts
   # "deploy": "gh-pages -d out"
   
   # 部署
   npm run deploy
   ```

## 自定义域名

1. 在仓库根目录创建 `CNAME` 文件
2. 内容为你的域名，例如：`example.com`
3. 在 GitHub Pages 设置中添加自定义域名

## 注意事项

- GitHub Pages 只支持静态网站
- 已配置 Next.js 为静态导出模式
- 图片需要放在 `public` 目录下
- 所有路由都会生成静态 HTML 文件

## 故障排查

如果部署失败：
1. 检查 GitHub Actions 日志
2. 确保 `out` 目录已生成
3. 检查 GitHub Pages 设置是否正确


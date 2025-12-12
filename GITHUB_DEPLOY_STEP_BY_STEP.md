# GitHub部署步骤指南

## 1. 在GitHub上创建名为PW的新仓库

1. 登录你的GitHub账号
2. 点击页面右上角的「+」号，选择「New repository」
3. 在「Repository name」字段中输入 `PW`
4. 选择仓库可见性（公开或私有）
5. 不要勾选「Initialize this repository with a README」（因为我们已有本地仓库）
6. 点击「Create repository」

## 2. 将本地仓库的远程地址更改为新创建的PW仓库

仓库创建成功后，你会看到仓库的URL，类似于 `https://github.com/你的用户名/PW.git`

在本地项目目录中执行以下命令：

```bash
git remote set-url origin https://github.com/你的用户名/PW.git
```

## 3. 推送代码到新的远程仓库

```bash
git push -u origin main
```

## 4. 在GitHub仓库中启用GitHub Pages

1. 进入你的PW仓库页面
2. 点击「Settings」选项卡
3. 在左侧导航栏中选择「Pages」
4. 在「Source」部分，选择「GitHub Actions」
5. 保存设置

## 5. 等待GitHub Actions自动部署完成

1. 回到仓库主页，点击「Actions」选项卡
2. 你会看到一个正在运行的 workflow
3. 等待 workflow 完成（通常需要1-2分钟）
4. 部署成功后，你会看到一个绿色的对勾

## 6. 验证部署结果

部署完成后，你的网站将可以通过以下地址访问：

```
https://你的用户名.github.io/PW/
```

## 注意事项

- 项目已配置为静态导出模式，适合GitHub Pages部署
- GitHub Actions会自动处理构建和部署过程
- 每次推送代码到main分支时，都会触发自动部署
- 如果遇到部署问题，可以查看Actions日志进行排查

## 自定义配置

如果你需要修改部署配置，可以编辑以下文件：

- `.github/workflows/deploy.yml` - GitHub Actions工作流配置
- `next.config.js` - Next.js配置，包含basePath设置

## 故障排查

如果部署失败，建议检查：
1. GitHub Actions日志中的错误信息
2. 确保package.json中的构建命令正确
3. 检查next.config.js中的basePath是否设置为`/PW`
4. 确保所有依赖已正确安装
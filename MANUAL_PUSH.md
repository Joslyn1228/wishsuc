# 手动推送代码到 GitHub

## 方法 1: 使用 Personal Access Token（推荐）

### 步骤 1: 生成 Token
1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 填写 Note: `PersonalWeb Push`
4. 选择过期时间（建议 90 天或 No expiration）
5. **勾选 `repo` 权限**（这是最重要的）
6. 点击 "Generate token"
7. **立即复制 token**（只显示一次！）

### 步骤 2: 推送代码
在 PowerShell 中运行：

```powershell
# 设置远程仓库（如果还没有）
git remote set-url origin https://github.com/JoslynLiu1228/3.git

# 推送代码
git push -u origin main
```

当提示输入凭据时：
- **Username**: `JoslynLiu1228`
- **Password**: 粘贴你的 Personal Access Token（不是 GitHub 密码）

## 方法 2: 使用 GitHub Desktop

1. 下载安装 [GitHub Desktop](https://desktop.github.com/)
2. 使用 GitHub 账号登录
3. 选择 "Add" → "Add Existing Repository"
4. 选择项目文件夹 `D:\桌面\PersonalWeb`
5. 点击 "Publish repository"
6. 选择仓库 `3` 或创建新仓库

## 方法 3: 使用 SSH（需要配置 SSH key）

### 步骤 1: 生成 SSH Key
```powershell
ssh-keygen -t ed25519 -C "1025181275@qq.com"
# 按 Enter 使用默认路径
# 可以设置密码或直接按 Enter
```

### 步骤 2: 添加 SSH Key 到 GitHub
1. 复制公钥内容：
   ```powershell
   cat ~/.ssh/id_ed25519.pub
   ```
2. 访问：https://github.com/settings/keys
3. 点击 "New SSH key"
4. 粘贴公钥内容
5. 点击 "Add SSH key"

### 步骤 3: 使用 SSH URL 推送
```powershell
git remote set-url origin git@github.com:JoslynLiu1228/3.git
git push -u origin main
```

## 方法 4: 检查仓库是否存在

请确认：
1. 访问：https://github.com/JoslynLiu1228/3
2. 确认仓库存在且你有访问权限
3. 如果仓库不存在，请先创建：
   - 访问：https://github.com/new
   - 仓库名：`3`
   - 点击 "Create repository"

## 如果仍然失败

请检查：
- 仓库 URL 是否正确
- 仓库是否为私有（需要相应权限）
- GitHub 账号是否有访问权限
- 网络连接是否正常


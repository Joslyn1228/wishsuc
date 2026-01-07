# 数据库表结构说明

本文档描述了个人网站后端所需的数据库表结构。建议使用Supabase作为后端服务。

## 1. projects 表（项目表）
用于存储项目信息。

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[], -- 数组类型，存储技术栈
  image VARCHAR(500),
  link VARCHAR(500),
  github VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 2. hobbies 表（爱好表）
用于存储个人爱好信息。

```sql
CREATE TABLE hobbies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 3. photography_modules 表（摄影模块表）
用于存储摄影作品集的分类模块。

```sql
CREATE TABLE photography_modules (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 4. photography_works 表（摄影作品表）
用于存储具体的摄影作品信息。

```sql
CREATE TABLE photography_works (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES photography_modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  tags TEXT[], -- 数组类型，存储标签
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 5. site_config 表（网站配置表）
用于存储网站的基本配置信息。

```sql
CREATE TABLE site_config (
  id SERIAL PRIMARY KEY,
  hero_name VARCHAR(255),
  hero_title VARCHAR(255),
  hero_description TEXT,
  about_description TEXT,
  contact_email VARCHAR(255),
  contact_github VARCHAR(500),
  contact_wechat VARCHAR(255),
  contact_twitter VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 初始数据

### 摄影模块初始数据
```sql
INSERT INTO photography_modules (name, description) VALUES 
('旅行摄影', '记录旅途中的美景和人文风情'),
('生活摄影', '记录日常生活中的美好瞬间');
```

### 爱好初始数据
```sql
INSERT INTO hobbies (name, description) VALUES 
('阅读', '喜欢阅读文学、历史、经济类书籍，尤其喜欢雨果的作品'),
('游泳', '每周坚持游泳3-4次，擅长自由泳和蛙泳'),
('写作', '定期在个人博客上发表文章，内容涵盖生活感悟和学习心得'),
('电子游戏', '喜欢玩策略类和冒险类游戏，如《最终幻想》系列'),
('摄影', '热爱摄影，喜欢记录旅行中的美景和生活中的点滴');
```

## Supabase 设置步骤

1. **创建 Supabase 项目**
   - 访问 [supabase.com](https://supabase.com)
   - 创建新项目
   - 记录项目URL和API密钥

2. **创建数据表**
   - 在 Supabase Dashboard 中打开 SQL Editor
   - 执行上述SQL语句创建表结构
   - 插入初始数据

3. **设置 API 权限**
   - 进入 Settings > API
   - 确保 anon 公钥有读取权限
   - 如需写入权限，需要设置适当的 RLS (Row Level Security) 策略

4. **更新项目配置**
   - 修改 `lib/supabase.js` 文件
   - 替换 `YOUR_PROJECT_ID` 和 `YOUR_ANON_KEY`

## 环境变量配置（推荐）

创建 `.env.local` 文件：
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

然后更新 `lib/supabase.js`：
```javascript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## RLS 安全策略示例

为保护数据安全，建议设置 Row Level Security：

```sql
-- 启用 RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE photography_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE photography_works ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON hobbies FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON photography_modules FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON photography_works FOR SELECT USING (true);

-- 允许插入（可根据需要限制）
CREATE POLICY "Enable insert for all users" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON hobbies FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON photography_modules FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON photography_works FOR INSERT WITH CHECK (true);

-- 允许更新和删除（可根据需要限制）
CREATE POLICY "Enable update for all users" ON projects FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON projects FOR DELETE USING (true);
-- ... 其他表的类似策略
```

## 注意事项

1. **图片存储**：建议使用 Supabase Storage 或其他云存储服务存储图片，数据库中只存储图片URL
2. **数据备份**：定期备份数据库数据
3. **性能优化**：对于大量数据，考虑添加索引
4. **安全性**：根据实际需求设置更严格的 RLS 策略
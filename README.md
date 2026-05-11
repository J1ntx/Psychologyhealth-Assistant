# 心理健康 AI 助手前端

一个基于 `Vue 3`、`Vite` 和 `Element Plus` 的心理健康平台前端项目，包含用户端与后台管理端两套界面。

项目围绕“AI 心理咨询 + 情绪记录 + 心理健康知识内容管理”展开，适合作为 Vue 3 综合练习项目、课程设计、个人作品集或面试展示项目。

## 项目简介

本项目聚焦心理健康场景，前端主要覆盖以下能力：

- 用户注册与登录
- AI 心理咨询对话
- 基于 SSE 的流式消息返回
- 会话历史记录查看与删除
- 情绪分析结果展示
- 情绪日记记录
- 心理健康知识文章列表与详情展示
- 后台文章管理、咨询记录管理、情绪日记管理
- 数据分析看板展示

说明：当前仓库主要为前端项目，依赖独立后端服务，仓库内不包含后端代码。

## 功能模块

### 用户端

- 首页介绍与引导入口
- 登录 / 注册
- AI 心理咨询页面
- 流式聊天输出
- 会话历史管理
- 情绪日记填写
- 心理健康知识库
- 文章详情阅读

### 后台管理端

- 数据概览看板
- 知识文章分页查询
- 文章新增、编辑、上下线、删除
- 富文本编辑与封面上传
- 咨询会话记录查看
- 情绪日记分页查看与删除

## 技术栈

- `Vue 3`
- `Vite`
- `Vue Router`
- `Pinia`
- `Element Plus`
- `Sass`
- `Axios`
- `ECharts`
- `WangEditor`
- `@microsoft/fetch-event-source`

## 项目亮点

- 前后台分离式页面结构，路由划分清晰
- 基于 `fetch-event-source` 实现 AI 咨询流式返回
- 使用路由守卫配合本地登录信息控制不同角色访问权限
- 封装了通用组件，便于后台页面复用
- 通过 ECharts 展示用户、咨询、情绪等维度的数据看板

## 目录结构

```text
psychological-health/
├─ public/
├─ src/
│  ├─ api/              # 接口封装
│  ├─ assets/           # 静态资源
│  ├─ components/       # 公共组件
│  ├─ config/           # 项目配置
│  ├─ router/           # 路由配置
│  ├─ stores/           # Pinia 状态管理
│  ├─ utils/            # 工具方法与请求封装
│  ├─ views/            # 页面视图
│  ├─ App.vue
│  └─ main.js
├─ tools/
├─ package.json
├─ vite.config.js
└─ README.md
```

## 页面路由

### 前台页面

- `/`：首页
- `/consultation`：AI 心理咨询
- `/emotion-diary`：情绪日记
- `/knowledge`：知识文章列表
- `/knowledge/article/:id`：文章详情

### 后台页面

- `/auth/login`：登录
- `/auth/register`：注册
- `/back/dashboard`：数据分析看板
- `/back/knowledge`：知识文章管理
- `/back/consultations`：咨询记录管理
- `/back/emotional`：情绪日记管理

## 本地运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

在项目根目录创建 `.env.local`：

```env
VITE_API_PROXY_TARGET=http://127.0.0.1:1235
VITE_FILE_BASE_URL=http://127.0.0.1:1235
```

变量说明：

- `VITE_API_PROXY_TARGET`：开发环境接口代理地址
- `VITE_FILE_BASE_URL`：文件访问基础地址，例如文章封面图片地址前缀

### 3. 启动开发环境

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
```

### 5. 本地预览构建结果

```bash
npm run preview
```

## 权限说明

项目通过本地存储中的 `token` 和 `userInfo.userType` 控制页面访问权限：

- `userType === 1`：普通用户
- `userType === 2`：管理员

未登录状态下访问后台页面会被重定向到登录页。

## 相关实现说明

### AI 流式对话

项目使用 `@microsoft/fetch-event-source` 与后端 `text/event-stream` 接口通信，实现 AI 回复逐段渲染的效果，适合大模型聊天场景。

### 后台内容管理

后台知识文章模块支持文章分页、编辑、状态更新、删除、封面上传与富文本编辑，能够形成完整的内容管理闭环。

### 图表看板

后台首页使用 `ECharts` 展示系统总览、情绪趋势、咨询统计和用户活跃趋势等数据。


## 注意事项

## License

MIT

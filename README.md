# React Calculator App

[![React](https://img.shields.io/badge/React-19-blue)]()
[![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)]()
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-blueviolet)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

🔗 **GitHub Repository**

https://github.com/ppshuX/react-calculator

---

## 📖 Project Introduction

React Calculator 是一个基于 **React + Redux Toolkit** 构建的计算器 Web 应用，并与 **AcWing 后端接口**进行交互，实现了完整的 **登录 / 注册 / 计算器操作 / 登录状态管理**流程。

该项目主要用于练习：

- React 组件化开发
- Redux 状态管理
- React Router 路由控制
- 前后端接口通信

---

# 🚀 Features

### 🔐 用户认证系统

- 登录
- 注册
- 登录状态检测 (`get_status`)
- 用户退出 (`logout`)

### 🧮 计算器功能

- 数字输入
- 四则运算
- 删除输入
- 清空输入
- 运算结果计算

### ⚡ 状态管理

使用 **Redux Toolkit** 管理计算器状态：

- `currentOperand`
- `lastOperand`
- `operation`

### 🌐 前后端通信

通过 **jQuery AJAX** 调用 AcWing 后端接口：

- 登录
- 注册
- 获取登录状态
- 退出登录

登录成功后，前端自动更新状态并跳转计算器页面。

### 📦 路由控制

基于 **React Router DOM v7** 实现：

- 登录状态控制访问权限
- 未登录自动跳转登录页面
- 404 页面处理

---

# 🛠 Tech Stack

| 技术 | 说明 |
|----|----|
| React 19 | 前端 UI 框架 |
| React Router DOM 7 | 前端路由 |
| Redux Toolkit | 状态管理 |
| React Redux | Redux 与 React 连接 |
| Bootstrap 5 | UI 样式 |
| jQuery | AJAX 请求 |

---

# 📂 Project Structure

```
src
│
├── index.js                # 应用入口
├── index.css               # 全局样式
│
├── components
│   ├── app.jsx             # 根组件
│   ├── navbar.jsx          # 导航栏
│   │
│   └── content
│       ├── base.jsx        # 页面基础布局
│       ├── home.jsx        # 首页
│       ├── calculator.jsx  # 计算器页面
│       │
│       ├── calculator
│       │   ├── digitButton.jsx
│       │   └── operationButton.jsx
│       │
│       ├── login.jsx       # 登录页面
│       ├── register.jsx    # 注册页面
│       └── notfound.jsx    # 404 页面
│
└── redux
    ├── store.js            # Redux Store
    ├── reducer.js          # 计算器状态
    └── actions.js          # Redux Actions
```

---

# 🌐 Routes

| Route | Description |
|------|-------------|
| `/` | 重定向到 `/calculator` |
| `/calculator` | 首页 |
| `/calculator/home` | 首页 |
| `/calculator/calculator` | 计算器页面（需登录） |
| `/calculator/login` | 登录 |
| `/calculator/register` | 注册 |
| `/calculator/404` | 404 页面 |
| `/calculator/*` | 未匹配路径 |

---

# 🔗 Backend API (AcWing)

| API | Description |
|----|----|
| `/calculator/get_status/` | 获取登录状态 |
| `/calculator/login/` | 用户登录 |
| `/calculator/register/` | 用户注册 |
| `/calculator/logout/` | 用户退出 |

示例返回：

```json
{
  "result": "login",
  "username": "user"
}
```

---

# ⚙️ Installation

```bash
npm install
```

---

# ▶️ Run Project

```bash
npm start
```

浏览器访问：

```
http://localhost:3000
```

根路径会自动重定向到：

```
/calculator
```

---

# 📦 Build

```bash
npm run build
```

生成生产环境代码：

```
build/
```

---

# 🧪 Test

```bash
npm test
```

---

# 📌 Notes

本项目基于 **Create React App** 创建，主要用于练习：

- React Router 路由管理
- Redux 状态管理
- 前后端登录状态同步
- React 组件结构设计

---

# 📚 Learn More

React  
https://react.dev

Redux Toolkit  
https://redux-toolkit.js.org

React Router  
https://reactrouter.com
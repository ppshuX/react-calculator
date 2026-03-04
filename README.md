# Calculator App

基于 Create React App 的 React 计算器应用，包含首页、计算器、登录、注册等页面，使用 React Router 与 Bootstrap。

## 技术栈

- **React** 19
- **React Router DOM** 7
- **Bootstrap** 5
- **Redux** / **React Redux** / **@reduxjs/toolkit**（可选使用）

## 项目结构

```
src/
├── index.js              # 入口，引入 index.css、Bootstrap、BrowserRouter
├── index.css             # 全局样式
├── components/
│   ├── app.jsx           # 根组件，NavBar + Routes
│   ├── navbar.jsx        # 顶部导航
│   └── content/
│       ├── base.jsx      # 卡片布局容器，各页面内容包裹其中
│       ├── home.jsx      # 首页
│       ├── calculator.jsx # 计算器
│       ├── login.jsx     # 登录
│       ├── register.jsx  # 注册
│       └── notfound.jsx  # 404
```

## 本地运行

```bash
npm install
npm start
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm start` | 开发模式运行 |
| `npm run build` | 生产构建到 `build` 目录 |
| `npm test` | 运行测试 |
| `npm run eject` | 弹出 CRA 配置（不可逆） |

## 路由

| 路径 | 页面 |
|------|------|
| `/` | 首页 |
| `/calculator` | 计算器 |
| `/login` | 登录 |
| `/register` | 注册 |
| 其他 | 404 |

---

本项目由 [Create React App](https://github.com/facebook/create-react-app) 创建。

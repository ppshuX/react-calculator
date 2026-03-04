# Calculator App

基于 Create React App 的 React 计算器应用，支持登录/注册，未登录显示首页/登录/注册，登录后显示计算器与退出。路由统一在 `/calculator` 下，与 AcWing 后端接口对接。

## 技术栈

- **React** 19
- **React Router DOM** 7
- **Bootstrap** 5
- **Redux** + **React Redux** + **@reduxjs/toolkit**（计算器状态）
- **jQuery**（AJAX：get_status / login / register / logout）

## 项目结构

```
src/
├── index.js                 # 入口，Redux Provider + BrowserRouter
├── index.css                # 全局样式
├── components/
│   ├── app.jsx              # 根组件：get_status、路由、登录成功回调
│   ├── navbar.jsx           # 顶部导航（按 is_login 显示 计算器/退出 或 登录/注册）
│   └── content/
│       ├── base.jsx         # 卡片布局，各页面内容包裹其中
│       ├── home.jsx         # 首页
│       ├── calculator.jsx   # 计算器（Redux 连接）
│       ├── calculator/
│       │   ├── digitButton.jsx
│       │   └── operationButton.jsx
│       ├── login.jsx        # 登录
│       ├── register.jsx     # 注册
│       └── notfound.jsx     # 404
├── redux/
│   ├── store.js             # configureStore
│   ├── reducer.js           # 计算器 state（currentOperand, lastOperand, operation 等）
│   └── actions.js           # ADD_DIGIT, DELETE_DIGIT, CHOOSE_OPERATION, CLEAR, EVALUATE
```

## 本地运行

```bash
npm install
npm start
```

浏览器访问 [http://localhost:3000](http://localhost:3000)，根路径会重定向到 `/calculator`。

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm start` | 开发模式 |
| `npm run build` | 生产构建到 `build` |
| `npm test` | 运行测试 |
| `npm run eject` | 弹出 CRA 配置（不可逆） |

## 路由

| 路径 | 说明 |
|------|------|
| `/` | 重定向到 `/calculator` |
| `/calculator` | 首页 |
| `/calculator/home` | 首页 |
| `/calculator/calculator` | 计算器（需登录，未登录跳转登录页） |
| `/calculator/login` | 登录（已登录跳转首页） |
| `/calculator/register` | 注册（已登录跳转首页） |
| `/calculator/404` | 404 页 |
| `/calculator/*` | 其他未匹配路径 → 404 |

## 后端接口（AcWing）

- `GET .../calculator/get_status/`：获取登录状态，返回 `{ result: "login", username }` 或未登录
- `GET .../calculator/login/`：登录（params: username, password），成功返回 `{ result: "success" }`
- `GET .../calculator/register/`：注册（params: username, password, password_confirm）
- `GET .../calculator/logout/`：退出，成功返回 `{ result: "success" }`

前端与 demo 逻辑对齐；在 localhost 跨域时，登录成功通过 `onLoginSuccess` 在前端更新 `is_login` 并跳转到计算器页，以便不刷新也能看到计算器。

---

本项目由 [Create React App](https://github.com/facebook/create-react-app) 创建。

# React 知识总结

**项目地址**：[calculator-app](.)（本地项目路径，若已推送可替换为 GitHub / Gitee 仓库链接）

本文从基础到进阶，按条理梳理本计算器项目中用到的 React 相关概念与用法，便于复习与对照代码理解。

---

## 目录

- [一、React 基础](#一react-基础)
- [二、状态与数据流](#二状态与数据流)
- [三、生命周期（类组件）](#三生命周期类组件)
- [四、事件处理](#四事件处理)
- [五、路由（React Router）](#五路由react-router)
- [六、全局状态管理（Redux）](#六全局状态管理redux)
- [七、与后端交互（AJAX）](#七与后端交互ajax)
- [八、项目中的综合运用](#八项目中的综合运用)
- [九、可进一步拓展的方向](#九可进一步拓展的方向)

---

## 一、React 基础

### 1.1 什么是 React

- React 是用于构建用户界面的 JavaScript 库，由 Meta（原 Facebook）维护。
- 核心思想：**组件化** + **声明式 UI**——用组件描述“页面长什么样”，数据变化时视图自动更新。
- 使用 **JSX** 在 JavaScript 中书写类似 HTML 的标记，经 Babel 转译为 `React.createElement` 调用。

### 1.2 组件（Component）

- **组件**是 UI 的独立、可复用单元：接收输入（props），返回要渲染的内容。
- **类组件**：`class ... extends React.Component`，必须实现 `render()`，可拥有 `state` 与生命周期方法。
- **函数组件**：函数形式，接收 `props`，返回 JSX；配合 Hooks 也可具备状态与副作用。
- 本项目以**类组件**为主，便于集中管理 state 与生命周期。

### 1.3 JSX 语法要点

- **单根节点**：多段内容须包在一个父元素或 `React.Fragment`（`<>...</>`）中。
- **属性驼峰**：`className`、`onClick`、`style`（值为对象，如 `style={{ marginTop: "20px" }}`）。
- **插值**：在 JSX 中写 JavaScript 表达式使用 `{ }`。
- **列表**：用 `map` 生成子元素时，为子元素设置稳定 **key**，利于 React 做 diff。

### 1.4 组件通信：Props

- **props** 是父组件传给子组件的数据，在子组件中**只读**，不可直接修改。
- 父通过**属性**传入，子通过 `this.props.xxx`（类组件）或 `props.xxx`（函数组件）使用。
- 可传任意类型：字符串、数字、对象、数组、**函数**（用于子调父，即“回调”）。

---

## 二、状态与数据流

### 2.1 State（组件内部状态）

- **state** 是组件私有的可变数据；更新 state 会触发重新渲染。
- 类组件：在 `constructor` 或类属性中定义 `state`，用 **`this.setState()`** 更新（禁止直接修改 `this.state`）。
- `setState` 可传对象或函数；**函数形式** `setState(prevState => ({ ... }))` 适用于依赖上一次 state 的更新，避免闭包拿到旧值。

### 2.2 单向数据流

- 数据沿 **父 → 子** 通过 props 向下流动；子组件不能直接修改父的 state。
- 子要影响父：父将**回调函数**通过 props 传给子，子调用时传入参数，父在回调中 `setState` 或执行路由跳转等。

### 2.3 受控组件（表单）

- 将表单项的 `value` 与 state 绑定，用 `onChange` 把输入写回 state，使 **React state 成为唯一数据源**，即**受控组件**。
- 本项目登录/注册页的输入框即采用该方式：`value={this.state.username}`，`onChange` 中 `setState` 更新对应字段。

---

## 三、生命周期（类组件）

### 3.1 挂载阶段

- **constructor**：初始化 state、绑定方法等。
- **render**：根据当前 props 和 state 返回 JSX，不应在此修改 state。
- **componentDidMount**：组件首次挂载到 DOM 后执行**一次**，适合请求数据、订阅、发起初始 AJAX（如本项目的 get_status）。

### 3.2 更新阶段

- **render**：props 或 state 变化时再次执行。
- **componentDidUpdate(prevProps, prevState)**：更新完成后执行，可对比前后 props/state 再决定是否发请求或更新。

### 3.3 卸载阶段

- **componentWillUnmount**：组件从 DOM 移除前执行，适合取消订阅、清理定时器等。

---

## 四、事件处理

### 4.1 绑定与 this

- 类组件中，事件处理函数内访问 `this` 须保证指向组件实例。
- 常用写法：**类属性 + 箭头函数**（如 `handleClick = () => { ... }`），或在 constructor 中 `bind(this)`。
- 传参：`onClick={() => this.handleClick(id)}` 或 `onClick={this.handleClick.bind(this, id)}`。

### 4.2 阻止默认行为

- 如表单提交：在处理函数中调用 **`e.preventDefault()`**，避免页面整页刷新。

---

## 五、路由（React Router）

### 5.1 基本概念

- **React Router** 根据 URL 路径决定渲染哪个组件，实现单页应用（SPA）的多“页”效果。
- 常用：`BrowserRouter`、`Routes` / `Route`、`Navigate`、`Link`。

### 5.2 路由配置

- **Route**：`path` 指定路径，`element` 指定要渲染的组件。
- **Navigate**：渲染即触发跳转，常用 `replace` 避免历史记录堆积。
- **重定向**：如 `path='/'` 的 `element={<Navigate to="/calculator" replace />}` 实现根路径重定向。

### 5.3 声明式与编程式导航

- **Link**：声明式，点击不整页刷新，仅更新 URL 并切换对应 Route。
- **编程式**：`window.location.href` 会整页刷新；使用 `useNavigate()` 或通过 `Navigate` 组件 + state 可实现仅前端路由切换。

### 5.4 路由与权限

- 需“已登录”才能访问的路由：在 `element` 中写条件，如 `is_login ? <Calculator /> : <Navigate to="/login" />`，未登录则跳转登录页。

---

## 六、全局状态管理（Redux）

### 6.1 为什么需要 Redux

- 多个组件共享、修改同一份数据（如计算器的当前输入、上一操作数、运算符）时，仅靠 props 逐层传递成本高。
- Redux 提供**单一数据源**（store）与**统一更新方式**（dispatch action），便于维护与调试。

### 6.2 核心概念

| 概念 | 说明 |
|------|------|
| **Store** | 存放整个应用的 state，由 `createStore` 或 `configureStore` 创建 |
| **Action** | 描述“发生了什么”的普通对象，通常含 `type` 与可选 payload |
| **Reducer** | 纯函数 `(state, action) => newState`，根据 action 返回新 state |
| **Dispatch** | `store.dispatch(action)` 派发 action，触发 reducer 更新 state |

### 6.3 React-Redux

- **Provider**：在根组件外包裹，将 store 注入上下文。
- **connect**（或 Hooks：`useSelector`、`useDispatch`）：将 store 的 state 与 dispatch 映射到组件 props，实现“读全局 state”与“发 action”。

### 6.4 在计算器中的对应关系

- **state**：当前操作数、上一操作数、当前运算符、是否覆盖等。
- **actions**：输入数字、删除一位、选择运算符、清空、求值。
- **reducer**：根据 action 类型更新 state；求值时在 reducer 内完成运算并写回 state。

---

## 七、与后端交互（AJAX）

### 7.1 异步请求

- 通过 **XMLHttpRequest** 或 **fetch** 发 HTTP 请求；本项目使用 **jQuery 的 $.ajax** 调用 get_status、login、register、logout。
- 请求**异步**：发出后不阻塞，结果在 **success 回调**中处理，在回调里 `setState` 更新界面。

### 7.2 同源与跨域

- **同源**：协议、域名、端口一致；同源请求默认会携带 cookie，后端可通过 session 识别用户。
- **跨域**：前端（如 localhost:3000）请求另一域名接口时，浏览器会施加限制；若需带 cookie，须设 `withCredentials: true`，且后端需返回 `Access-Control-Allow-Credentials: true` 与具体的 `Access-Control-Allow-Origin`。

### 7.3 登录态与前端状态

- 后端常用 **Cookie + Session** 维护登录态。
- 前端在应用启动时（如 `componentDidMount`）调用 get_status，根据返回结果将 `is_login`、`username` 写入组件 state，据此渲染导航与受保护路由；在 localhost 跨域场景下，也可通过登录成功回调直接 setState，避免依赖 cookie。

---

## 八、项目中的综合运用

### 8.1 组件划分

- **布局型**：NavBar、Base（卡片容器）。
- **页面型**：Home、Login、Register、NotFound、Calculator，与路由一一对应。
- **子组件**：DigitButton、OperationButton，由 Calculator 使用，通过 props 与 Redux 协同。

### 8.2 数据流小结

- **全局 UI 状态**（是否登录、用户名）：放在根组件 state，由 get_status 与登录/退出接口更新；登录成功时也可通过“父传子的回调”直接 setState。
- **计算器状态**：Redux 管理，Calculator 及按钮子组件通过 connect 读 state、发 action。
- **表单状态**：登录/注册页的输入与错误信息放在各自组件 state，受控组件 + 提交时发 AJAX。

### 8.3 路由与权限

- 根路径 `/` 重定向至 `/calculator`。
- `/calculator/calculator` 仅在 `is_login === true` 时渲染计算器，否则重定向登录页。
- 已登录时访问登录/注册页则重定向首页，避免重复登录。

### 8.4 知识线（从简单到复杂）

1. **基础**：组件、JSX、props、state、setState、事件绑定。
2. **进阶**：生命周期（componentDidMount 请求数据）、受控组件、父子通信（回调）。
3. **路由**：Route、Navigate、Link，以及基于 state 的条件渲染实现权限控制。
4. **全局状态**：Redux 的 store、action、reducer、connect。
5. **工程化**：异步请求、跨域、登录态与前端 state 的配合、不刷新页面的登录成功跳转（回调 + Navigate）。

---

## 九、可进一步拓展的方向

- **Hooks**：用 `useState`、`useEffect`、`useNavigate` 等将类组件改写为函数组件，逻辑更内聚。
- **Redux Toolkit**：用 `createSlice` 简化 action 与 reducer 的编写。
- **错误与加载态**：为 AJAX 增加 `error` 回调与 loading 状态，提升体验。
- **路由守卫**：将“需登录”抽象为高阶组件或自定义 Route，避免在每条路由重复判断。

---

以上内容覆盖本计算器项目中用到的 React 核心概念，从基础到路由、Redux、异步与登录态，可按需结合项目代码对照理解。

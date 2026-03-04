import React, { Component } from 'react';
import NavBar from './navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './content/home';
import Calculator from './content/calculator';
import Login from './content/login';
import Register from './content/register';
import NotFound from './content/notfound';
import $ from 'jquery';

class App extends Component {
    state = {
        is_login: false,
        username: "",
    };

    /** 与 demo 的差异：本地 localhost 跨域时 get_status 拿不到 cookie，登录后 is_login 仍为 false。
     *  登录成功时用此回调在前端直接更新 is_login 并跳转到计算器页（不刷新页面，状态保留）。 */
    handleLoginSuccess = (username) => {
        this.setState({ is_login: true, username, redirectTo: "/calculator/calculator" });
        setTimeout(() => this.setState({ redirectTo: null }), 0);
    };

    componentDidMount() {
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/calculator/get_status/",
            type: "get",
            success: resp => {
                console.log(resp);
                if (resp.result === "login") {
                    this.setState({
                        is_login: true,
                        username: resp.username,
                    });
                } else {
                    this.setState({
                        is_login: false,
                    });
                }
            }
        });
    }

    render() {
        const { redirectTo } = this.state;
        return (
            <React.Fragment>
                {redirectTo && <Navigate to={redirectTo} replace />}
                <NavBar is_login={this.state.is_login} username={this.state.username} />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Navigate replace to="/calculator" />} />
                        <Route path='/calculator' element={<Home />} />
                        <Route path='/calculator/home' element={<Home />} />
                        <Route path='/calculator/calculator' element={this.state.is_login ? <Calculator /> : <Navigate replace to="/calculator/login" />} />
                        <Route path='/calculator/login' element={this.state.is_login ? <Navigate replace to="/calculator" /> : <Login onLoginSuccess={this.handleLoginSuccess} />} />
                        <Route path='/calculator/register' element={this.state.is_login ? <Navigate replace to="/calculator" /> : <Register />} />
                        <Route path='/calculator/404' element={<NotFound />} />
                        <Route path="/calculator/*" element={<Navigate replace to="/calculator/404" />} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;

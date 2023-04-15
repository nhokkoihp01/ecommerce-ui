import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Button, Container, Grid} from "@mui/material";
import validator from 'validator';
import {Link, useNavigate} from "react-router-dom";

import styles from "./Login.module.scss";
import AuthService from "~/services/auth/AuthService";
import {CartContext} from "~/untils/CartProvider";
import config from "~/config";


const cx = classNames.bind(styles);

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const {setShouldUpdate} = useContext(CartContext);
    const navigate = useNavigate();
    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    useEffect(() => {
        if (username.length > 0) {
            setError('')
        }

    }, [username])
    useEffect(() => {
        if (password.length > 0) {
            setError('')
        }

    }, [password])
    const handleLogin = async (e) => {
        if (validator.isEmpty(username) || validator.isEmpty(password)) {
            setError("Tài khoản và mật khẩu không được để trống")
        } else {
            const response = await AuthService.login(username, password);
            if (response?.data.accessToken) {
                setShouldUpdate(true);
                // window.history.back()
                navigate(config.routes.home)


            }

            if (response?.data.status === "UNAUTHORIZED") {
                setError("Tài khoản hoặc mật khẩu không đúng")
            } else {
                setError("")
            }
        }


    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }


    return (
        <div className={cx('wrapper')}>
            <Container>
                <Grid container justifyContent={"center"}>
                    <Grid item container md={4}>
                        <div className={cx("form-login")}>
                            <h1 className={cx('login-header')}>Đăng nhập</h1>
                            <div className={cx('error')}>
                                <span>{error}</span>
                            </div>
                            <input className={cx('input-item')}
                                   type="text"
                                   value={username}
                                   onChange={handleChangeUsername}
                                   placeholder="Tên tài khoản"/>
                            <input className={cx('input-item')}
                                   type="password"
                                   value={password}
                                   onKeyPress={handleKeyPress}
                                   onChange={handleChangePassword}
                                   placeholder="Nhập mật khẩu"/>
                            <span className={cx('notify')}>
                                Bạn có chưa có tài khoản
                                <Link to={config.routes.register} className={cx('link')}>Đăng ký</Link>
                            </span>
                            <div className={cx('function')}>
                                <Button size={"large"}
                                        className={cx('btn-login')}
                                        type={"submit"}
                                        onClick={handleLogin}
                                        variant={"contained"}>
                                    Đăng nhập
                                </Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Login;
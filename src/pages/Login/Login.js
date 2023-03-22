import React, {useState} from 'react';
import classNames from "classnames/bind";
import {Button, Container, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

import styles from "./Login.module.scss";
import AuthService from "~/services/auth/AuthService";


const cx = classNames.bind(styles);

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(username, password).then(
                () => {
                    //
                    navigate("/")
                    window.location.reload()
                },
                (error)=>{
                    console.log(error)
                }
            )


        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Grid container justifyContent={"center"}>
                    <Grid item container md={4}>
                        <div className={cx("form-login")}>
                            <h1 className={cx('login-header')}>Đăng nhập</h1>
                            <input className={cx('input-item')}
                                   type="text"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                                   placeholder="Tên tài khoản"/>
                            <input className={cx('input-item')}
                                   type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   placeholder="Nhập mật khẩu"/>
                            <Button type={"submit"} onClick={handleLogin} variant={"contained"}>Login</Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Login;
import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Button, Container, Grid} from "@mui/material";
import validator from 'validator';
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Link, useNavigate} from "react-router-dom";

import styles from "./Register.module.scss";
import AuthService from "~/services/auth/AuthService";
import config from "~/config";


const cx = classNames.bind(styles);

function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [numberPhone, setNumberPhone] = useState("");
    const [errorUsername, setErrorUsername] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorFirstName, setErrorFirstName] = useState("")
    const [errorLastName, setErrorLastName] = useState("")
    const [errorNumberPhone, setErrorNumberPhone] = useState("")
    const navigate = useNavigate();
    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const handleChangeLastName = (e) => {
        setLastName(e.target.value)
    }
    const handleChangeNumberPhone = (e) => {
        setNumberPhone(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const validate = (response) => {
        if (response?.data.status === "EMAIL_FOUNDED") {
            setErrorEmail(response?.data.message)
        }
        if (response?.data.status === "USERNAME_FOUNDED") {
            setErrorUsername(response?.data.message)
        }
        if (response?.data.status === "ALL_ERROR") {
            setErrorPassword(response?.data.data)
        }

    }
    useEffect(() => {
        if (username.length > 0) {
            setErrorUsername('')
        }

    }, [username])
    useEffect(() => {
        if (password.length > 0) {
            setErrorPassword('')
        }

    }, [password])
    useEffect(() => {
        if (email.length > 0) {
            setErrorEmail('')
        }

    }, [email])
    useEffect(() => {
        if (firstName.length > 0) {
            setErrorFirstName('')
        }

    }, [firstName])
    useEffect(() => {
        if (lastName.length > 0) {
            setErrorLastName('')
        }

    }, [lastName])
    useEffect(() => {
        if (numberPhone.length > 0) {
            setErrorNumberPhone('')
        }

    }, [numberPhone])

    const handleRegister = async () => {
        if (validator.isEmpty(username) || validator.isEmpty(password)
            || validator.isEmpty(email) || validator.isEmpty(firstName)
            || validator.isEmpty(lastName) || validator.isEmpty(numberPhone)) {
            setErrorUsername("Tài khoản không được để trống")
            setErrorEmail("Email không được để trống")
            setErrorPassword("Mật khẩu không được để trống")
            setErrorFirstName("Họ và tên đệm không được để trống")
            setErrorLastName("Tên không được để trống")
            setErrorNumberPhone("Số điện thoại không được để trống")
        }
        else if (!validator.isEmail(email)){
            setErrorEmail("Địa chỉ email không tồn tại")
        }else {
            const response = await AuthService.register(username, password, email, firstName, lastName, numberPhone);
            console.log(response)
            validate(response)
            if (response?.data.accessToken) {
                NotificationManager.success('Đăng ký thành công', 'Sau 5s chuyển tới trang đăng nhập', 5000,()=>{
                    navigate(config.routes.login)
                });
                setTimeout(()=>{
                    navigate(config.routes.login)
                },5000)

            }


        }


    }
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Grid container justifyContent={"center"}>
                    <Grid item container md={4}>
                        <div className={cx("form-register")}>
                            <h1 className={cx('register-header')}>Đăng ký</h1>

                            <input className={cx('input-item')}
                                   value={username}
                                   onChange={handleChangeUsername}
                                   type="text"
                                   placeholder="Tên tài khoản"/>
                            <span className={cx('error-item')}>{errorUsername}</span>
                            <input className={cx('input-item')}
                                   value={email}
                                   onChange={handleChangeEmail}
                                   type="email"
                                   placeholder="Nhập email"/>
                            <span className={cx('error-item')}>{errorEmail}</span>
                            <input className={cx('input-item')}
                                   value={firstName}
                                   onChange={handleChangeFirstName}
                                   type="text"
                                   placeholder="Nhập họ và tên đệm"/>
                            <span className={cx('error-item')}>{errorFirstName}</span>
                            <input className={cx('input-item')}
                                   value={lastName}
                                   onChange={handleChangeLastName}
                                   type="text"
                                   placeholder="Nhập tên"/>
                            <span className={cx('error-item')}>{errorLastName}</span>
                            <input className={cx('input-item')}
                                   value={numberPhone}
                                   onChange={handleChangeNumberPhone}
                                   type="text"
                                   placeholder="Nhập số điện thoại"/>

                            <span className={cx('error-item')}>{errorNumberPhone}</span>

                            <input className={cx('input-item')}
                                   value={password}
                                   onChange={handleChangePassword}
                                   type="password"
                                   placeholder="Nhập mật khẩu"/>

                            <span className={cx('error-item')}>{errorPassword}</span>
                            <span className={cx('notify')}>
                                Bạn có chưa có tài khoản
                                <Link to={config.routes.login} className={cx('link')}>Đăng nhập</Link>
                            </span>
                            <div className={cx('function')}>
                                <Button size={"large"}
                                        onClick={handleRegister}
                                        className={cx('btn-register')}
                                        type={"submit"}
                                        variant={"contained"}>
                                    Đăng ký
                                </Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Register;
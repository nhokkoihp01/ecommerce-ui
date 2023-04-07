import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Container} from "@material-ui/core";


import styles from "./UpdatePassword.module.scss";
import {CartContext} from "~/untils/CartProvider";
import validator from "validator";
import AuthService from "~/services/auth/AuthService";
import {Button, Grid} from "@mui/material";


const cx = classNames.bind(styles);

function UpdatePassword(props) {


    const [newPassword, setNewPassword] = useState("")
    const [reNewPassword, setReNewPassword] = useState("")

    const [error, setError] = useState("")
    const {setShouldUpdate,user} = useContext(CartContext);
    // const [password, setPassword] = useState('')
    // useEffect(() => {
    //     if (user) {
    //     setPassword(user.password)
    //
    //     }
    // }, [])
    console.log('pppp')
    console.log(user)
    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    const handleChangeReNewPassword = (e) => {
        setReNewPassword(e.target.value)
    }

    useEffect(() => {
        if (newPassword.length > 0) {
            setError('')
        }

    }, [newPassword])
    useEffect(() => {
        if (reNewPassword.length > 0) {
            setError('')
        }

    }, [reNewPassword])

    const handleUpdatePassword = async (e) => {
        if (validator.isEmpty(newPassword) || validator.isEmpty(reNewPassword)) {
            setError(" Mật khẩu mới , Nhập lại mật khẩu mới ,không được để trống")
        } else {
            const response = await AuthService.login(newPassword, reNewPassword);
            if (response?.data.accessToken) {
                setShouldUpdate(true);
                window.history.back()
            }

            if (response?.data.status === "UNAUTHORIZED") {
                // setError("Tài khoản hoặc mật khẩu không đúng")
            } else {
                setError("")
            }
        }


    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleUpdatePassword(e)
        }
    }
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Grid container justifyContent={"center"}>
                    <Grid item container md={4}>
                        <div className={cx("form-login")}>
                            <h1 className={cx('login-header')}>Update Password</h1>
                            <div className={cx('error')}>
                                <span>{error}</span>
                            </div>

                            <input className={cx('input-item')}
                                   type="password"
                                   value={newPassword}
                                   onKeyPress={handleKeyPress}
                                   onChange={handleChangeNewPassword}
                                   placeholder="Nhập mật khẩu mới"/>
                            <input className={cx('input-item')}
                                   type="password"
                                   value={reNewPassword}
                                   onKeyPress={handleKeyPress}
                                   onChange={handleChangeReNewPassword}
                                   placeholder="Nhập lại mật khẩu mới"/>
                            <div className={cx('function')}>
                                <Button size={"large"}
                                        className={cx('btn-login')}
                                        type={"submit"}
                                        onClick={handleUpdatePassword}
                                        variant={"contained"}>
                                    Đổi mật khẩu
                                </Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default UpdatePassword;
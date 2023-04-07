import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Container} from "@material-ui/core";
import {Button, Grid} from "@mui/material";
import validator from "validator";
import {useNavigate} from "react-router-dom";
import {NotificationManager} from "react-notifications";


import styles from "./UpdatePassword.module.scss";
import {CartContext} from "~/untils/CartProvider";
import AuthService from "~/services/auth/AuthService";
import {updatePasswordByUser} from "~/services/workspaces.sevices";
import config from "~/config";


const cx = classNames.bind(styles);

function UpdatePassword(props) {
    const {setShouldUpdate} = useContext(CartContext);
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [errorOldPassword, setErrorOldPassword] = useState('')
    const [errorNewPassword, setErrorNewPassword] = useState('')

    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    const handleChangeOldPassword = (e) => {
        setOldPassword(e.target.value)
    }

    useEffect(() => {
        if (newPassword.length > 0) {
            setErrorNewPassword('')
        }

    }, [newPassword])
    useEffect(() => {
        if (oldPassword.length > 0) {
            setErrorOldPassword('')
        }

    }, [oldPassword])
    const validate = () => {
        let hasError = false;
        if (validator.isEmpty(newPassword)) {
            setErrorNewPassword("Mật khẩu mới không được để trống!")
            hasError = true;
        }
        if (validator.isEmpty(oldPassword)) {
            setErrorOldPassword("Mật khẩu cũ không được để trống!")
            hasError = true;
        }

        return hasError;
    };
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (validate()) {
            return;
        }
        const user = JSON.parse(localStorage.getItem("token"))
        const body = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        const response = await updatePasswordByUser(user.userId, body)
        if (response.data.status === '400') {
            setErrorOldPassword("Mật khẩu cũ không đúng!")
        }
        else{
            NotificationManager.success('Đổi mật khẩu thành công')
            await AuthService.logout()
            navigate(config.routes.login)
            setShouldUpdate(false)
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
                            <h1 className={cx('login-header')}>Đổi mật khẩu</h1>
                            <input className={cx('input-item')}
                                   type="password"
                                   value={oldPassword}
                                   onKeyPress={handleKeyPress}
                                   onChange={handleChangeOldPassword}
                                   placeholder="Nhập mật khẩu cũ"/>
                            <span className={cx('error-item')}>{errorOldPassword}</span>
                            <input className={cx('input-item')}
                                   value={newPassword}
                                   onKeyPress={handleKeyPress}
                                   onChange={handleChangeNewPassword}
                                   type="password"
                                   placeholder="Nhập mật khẩu mới"/>
                            <span className={cx('error-item')}>{errorNewPassword}</span>
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
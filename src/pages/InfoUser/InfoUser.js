import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Container, Grid} from "@mui/material";
import {Button} from "@material-ui/core";

import styles from "./InfoUser.module.scss";
import UpLoadFileImage from "~/components/UploadFileImage";
import {CartContext} from "~/untils/CartProvider";
import {UpdateInfoUser} from "~/services/workspaces.sevices";
import validator from "validator";
import {NotificationManager} from "react-notifications";
import config from "~/config";
import {useNavigate} from "react-router-dom";
import AuthService from "~/services/auth/AuthService";

const cx = classNames.bind(styles);

function InfoUser() {
    const {setShouldUpdate, user} = useContext(CartContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [numberPhone, setNumberPhone] = useState(user.numberPhone)
    const [errorPassword, setErrorPassword] = useState("")
    const [errorFirstName, setErrorFirstName] = useState("")
    const [errorLastName, setErrorLastName] = useState("")
    const [errorNumberPhone, setErrorNumberPhone] = useState("")


    const [showButton, setShowButton] = useState(true);
    const [isChangeImage, setIsChangeImage] = useState(false)
    const [open, setOpen] = useState(true)
    const [images, setImages] = useState([]);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {

        setShowButton(false)
        setOpen(false)
        setIsChangeImage(true)
        setImages(imageList);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleChangeFirstname = (e) => {
        setFirstName(e.target.value)
    }
    const handleChangeLastName = (e) => {
        setLastName(e.target.value)
    }
    const handleChangeNumberPhone = (e) => {
        setNumberPhone(e.target.value)
    }

    const handleUpdate = async () => {
        if (validator.isEmpty(password, {min: 6, max: 30}) || validator.isEmpty(firstName)
            || validator.isEmpty(lastName) || validator.isEmpty(numberPhone)) {
            setErrorPassword("Mật khẩu phaỉ từ 6 đến 30 kí tự")
            setErrorFirstName("Họ và tên đệm không được để trống")
            setErrorLastName("Tên không được để trống")
            setErrorNumberPhone("Số điện thoại không được để trống")
        } else {
            const body = {
                password: password,
                firstName: firstName,
                lastName: lastName,
                numberPhone: numberPhone,
                image: isChangeImage ? images[0].data_url : user.image
            }
            const response = await UpdateInfoUser(user.id, body)
            if(response?.status === 200){
                NotificationManager.success('Sửa thông tin người dùng thành công')
                await AuthService.logout()
                navigate(config.routes.login)
                setShouldUpdate(false)
            }
        }


    }
    return (
        <Container>
            <div className={cx('wrapper')}>
                <div className={cx('left-info')}>
                    <UpLoadFileImage imageProduct={user.image}
                                     open={open}
                                     images={images}
                                     name={"User"}
                                     maxNumber={maxNumber}
                                     onChange={onChange}
                                     showButton={showButton}/>
                </div>
                <div className={cx('content-info')}>
                    <Grid>
                        <Grid>
                            <div className={cx("form-add")}>
                                <h1 className={cx('form-header')}>Thông tin cá nhân</h1>
                                <div className={cx('input-box')}>
                                    <input className={cx('input-box-item')}
                                           disabled
                                           value={user.username}
                                           type="text"
                                           placeholder="Username"/>
                                    <input className={cx('input-box-item')}
                                           type="password"
                                           value={password}
                                           onChange={handleChangePassword}
                                           placeholder="Password"/>
                                    <span>{errorPassword}</span>
                                </div>

                                <input className={cx('input-item')}
                                       type="email"
                                       disabled
                                       value={user.email}
                                       placeholder="Email"/>
                                <div className={cx('input-box')}>
                                    <input className={cx('input-box-item')}
                                           value={firstName}
                                           defaultValue={firstName}
                                           readOnly
                                           type="text"
                                           placeholder="First Name"/>
                                    <span>{errorFirstName}</span>

                                    <input className={cx('input-box-item')}
                                           type="text"
                                           defaultValue={lastName}
                                           readOnly
                                           value={lastName}
                                           onChange={handleChangeLastName}
                                    />
                                    <span>{errorLastName}</span>

                                </div>
                                <input className={cx('input-item')}
                                       value={numberPhone}
                                       defaultValue={user.numberPhone}
                                       readOnly
                                       onChange={handleChangeNumberPhone}
                                       type="text"
                                />
                                <span>{errorNumberPhone}</span>
                                <div className={cx('function')}>
                                    <button
                                        onClick={handleUpdate}
                                        className={cx('btn-submit')}
                                        type={"submit"}>
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </div>
        </Container>


    )
}

export default InfoUser;
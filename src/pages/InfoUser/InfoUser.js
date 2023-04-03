import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Container, Grid} from "@mui/material";
import {NotificationManager} from "react-notifications";
import {useNavigate} from "react-router-dom";

import styles from "./InfoUser.module.scss";
import UpLoadFileImage from "~/components/UploadFileImage";
import {CartContext} from "~/untils/CartProvider";
import {UpdateInfoUser} from "~/services/workspaces.sevices";
import AuthService from "~/services/auth/AuthService";
import config from "~/config";


const cx = classNames.bind(styles);

function InfoUser() {
    const {setShouldUpdate, user} = useContext(CartContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [numberPhone, setNumberPhone] = useState('')
    const [errorFirstName, setErrorFirstName] = useState("")
    const [errorLastName, setErrorLastName] = useState("")
    const [errorNumberPhone, setErrorNumberPhone] = useState("")
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setNumberPhone(user.numberPhone)
        }
    }, [])


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

    const handleChangeFirstname = (e) => {
        setFirstName(e.target.value)
    }
    const handleChangeLastName = (e) => {
        setLastName(e.target.value)
    }
    const handleChangeNumberPhone = (e) => {
        setNumberPhone(e.target.value)
    }
    const validate = () => {
        let hasError = false;
        if (firstName === undefined || firstName === "") {
            setErrorFirstName("Họ và tên đệm không được để trống")
            hasError = true;
        }
        if (lastName === undefined || lastName === "") {
            setErrorLastName("Tên không được để trống")
            hasError = true;
        }
        if (numberPhone === undefined || numberPhone === "") {
            setErrorNumberPhone("Số điện thoại không được để trống")
            hasError = true;
        }

        return hasError;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (validate()) {
            return;
        }
        const body = {
            firstName: firstName,
            lastName: lastName,
            numberPhone: numberPhone,
            image: isChangeImage ? images[0].data_url : user.image
        }
        const response = await UpdateInfoUser(user.id, body)
        if (response?.status === 200) {
            NotificationManager.success('Sửa thông tin người dùng thành công')
            await AuthService.logout()
            navigate(config.routes.login)
            setShouldUpdate(false)
        }
    }
    useEffect(() => {
        if (firstName !== undefined) {
            setErrorFirstName('')
        }

    }, [firstName])
    useEffect(() => {
        if (lastName !== undefined) {
            setErrorLastName('')
        }

    }, [lastName])
    useEffect(() => {
        if (numberPhone !== undefined) {
            setErrorNumberPhone('')
        }

    }, [numberPhone])

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


                                </div>


                                <input className={cx('input-item')}
                                       type="email"
                                       disabled
                                       value={user.email}
                                       placeholder="Email"/>

                                <input className={cx('input-item-error')}
                                       value={firstName}
                                       onChange={handleChangeFirstname}

                                       type="text"
                                       placeholder="First Name"/>
                                <span className={cx('error-text')}>{errorFirstName}</span>

                                <input className={cx('input-item-error')}
                                       type="text"
                                    // defaultValue={lastName}
                                       value={lastName}
                                       onChange={handleChangeLastName}
                                />
                                <span className={cx('error-text')}>{errorLastName}</span>


                                <input className={cx('input-item')}
                                       value={numberPhone}
                                       onChange={handleChangeNumberPhone}
                                       type="text"
                                />
                                <span className={cx('error-text')}>{errorNumberPhone}</span>
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
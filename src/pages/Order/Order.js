import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Container, Grid, InputBase} from "@material-ui/core";
import {useNavigate} from "react-router-dom";


import styles from "./Order.module.scss";
import {CartContext} from "~/untils/CartProvider";
import {convertCurrency} from "~/untils/convertCurrency";
import {createOrder} from "~/services/workspaces.sevices";
import {NotificationManager} from "react-notifications";
import config from "~/config";
import validator from "validator";


const cx = classNames.bind(styles);

function Order(props) {
    const {carts,setShouldUpdate, totalPrice, user} = useContext(CartContext);
    const [address, setAddress] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate();
    const handleChanAddress = (e) => {
        setAddress(e.target.value)
    }
    useEffect(() => {
        if (address.length > 0) {
            setError('')
        }

    }, [address])
    const handleCreateOrder = async () => {
        if (validator.isEmpty(address)){
            setError("Địa chỉ không được để trống")
        }
        else{
            const body = {
                userId:user.id,
                totalPrice: totalPrice,
                address: address,
                cartItems: carts
            }
            const response = await createOrder(user.id, body)
            if(response?.status === 200){
                NotificationManager.success('Đăng ký thành công', 'Sau 5s chuyển tới trang chủ', 5000,()=>{
                    navigate(config.routes.home)
                });
                setTimeout(()=>{
                    navigate(config.routes.home)
                },5000)
                setShouldUpdate(prev => !prev);
            }
        }

    }
    return (
        <div className={cx('wrapper')}>
            <Container>
                <h3 className={cx('header')}>Đặt hàng</h3>
                <div className={cx('payment')}>
                    <Grid container direction={"column"}>
                        <Grid item md={6}>
                            <h3 className={cx('label')}>Tên</h3>
                            <InputBase disabled value={user.firstName + " " + user.lastName}
                                       className={cx('input-item')} type="text"/>
                        </Grid>
                        <Grid item md={6}>
                            <h3 className={cx('label')}>Email</h3>
                            <InputBase disabled value={user.email}
                                       className={cx('input-item')} type="text"/>
                        </Grid>
                        <Grid item md={6}>
                            <h3 className={cx('label')}>Số điện thoại</h3>
                            <InputBase disabled value={user.numberPhone}
                                       className={cx('input-item')} type="text"/>
                        </Grid>
                        <Grid item md={6}>
                            <h3 className={cx('label')}>Địa chỉ</h3>
                            <InputBase placeholder="vd:37 Phú Châu,Tam Bình,Thủ Đức"
                                       value={address}
                                       onChange={ handleChanAddress}
                                       className={cx('input-item')}
                                       type="text"/>
                            <span className={cx('error')}>{error}</span>
                        </Grid>
                        <Grid item md={6}>
                            <div className={cx('total-price')}>
                                <p className={cx('title')}>Tổng tiền:</p>
                                <p className={cx('price')}>{convertCurrency(totalPrice)}</p>
                            </div>

                        </Grid>
                        <Grid item md={6}>
                            <div className={cx('order')}>
                                <button onClick={handleCreateOrder} className={cx('btn-order')}>Đặt hàng</button>
                            </div>
                        </Grid>


                    </Grid>
                </div>
            </Container>
        </div>
    );
}

export default Order;
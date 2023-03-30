import React, {useContext} from 'react';
import classNames from "classnames/bind";
import {Container, Grid} from "@material-ui/core";


import styles from "./Payment.module.scss";
import {CartContext} from "~/untils/CartProvider";


const cx = classNames.bind(styles);

function Payment(props) {
    const {carts, totalPrice, setShouldUpdate,user} = useContext(CartContext);
    return (
        <div className={cx('wrapper')}>
            <Container>
                <h3 className={cx('header')}>Thanh toán</h3>
                <div className={cx('payment')}>
                    <Grid container>
                        <Grid item md={6}>
                            <h3 className={cx('label')}>Nhập địa chỉ</h3>
                            <input className={cx('input-item')} type="text"/>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}

export default Payment;
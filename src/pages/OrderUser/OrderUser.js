import React from 'react';
import classNames from "classnames/bind";
import {Container} from "@material-ui/core";


import styles from "./OrderUser.module.scss";


const cx = classNames.bind(styles);

function OrderUser(props) {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <h3 className={cx('header')}>Thông tin đơn hàng</h3>
            </Container>
        </div>
    );
}

export default OrderUser;

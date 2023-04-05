import React from 'react';
import classNames from "classnames/bind";

import styles from "./Order.module.scss";


const cx = classNames.bind(styles);

function Order(props) {
    return (
        <div className={cx('wrapper')}>
            <h3>Order page</h3>
        </div>
    );
}

export default Order;
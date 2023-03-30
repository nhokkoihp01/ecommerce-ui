import React from 'react';
import classNames from "classnames/bind";


import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

function Product(props) {
    return (
        <div className={cx('wrapper')}>
            <h3>ALl product page</h3>
        </div>
    );
}

export default Product;
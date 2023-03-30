import React from 'react';
import classNames from "classnames/bind";


import styles from "./AddProduct.module.scss";

const cx = classNames.bind(styles);

function AddProduct(props) {
    return (
        <div className={cx('wrapper')}>
            <h3>Add product page</h3>
        </div>
    );
}

export default AddProduct;
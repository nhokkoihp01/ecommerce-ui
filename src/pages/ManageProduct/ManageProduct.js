import React from 'react';
import classNames from "classnames/bind";
import styles from "./ManageProduct.module.scss";
const cx = classNames.bind(styles);
function ManageProduct(props) {
    return (
        <div className={cx("header-manage")}>ManageProductPage</div>
    );
}

export default ManageProduct;
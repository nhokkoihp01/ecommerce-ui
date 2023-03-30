import React from 'react';
import classNames from "classnames/bind";

import styles from "./EditProduct.module.scss";

const cx = classNames.bind(styles);

function EditProduct(props) {
    return (
        <div className={cx('wrapper')}>
                <h3>EditProduct page</h3>
        </div>
    );
}

export default EditProduct;
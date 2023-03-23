import React from 'react';
import classNames from "classnames/bind";

import styles from "./ProductItem.module.scss";
import {Link} from "react-router-dom";
import config from "~/config";


const cx = classNames.bind(styles);



function ProductItem(props) {
    const {data} = props;
    const convertCurrency = (currency) =>{
        return  currency.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    return (
        <Link to={config.routes.productDetail} className={cx('wrapper')}>
            <div className={cx('box-image')}>
                <img className={cx('product-image')} src={data.image} alt="image"/>
            </div>
            <h3 className={cx('product-name')}>{data.description}</h3>
            <div className={cx('price')}>
                <p className={cx('new-price')}>{convertCurrency(data.newPrice)}</p>
                <p className={cx('old-price')}>{convertCurrency(data.oldPrice)}</p>
            </div>
            <div className={cx('product-sale')}>
                <span className={cx('percent')}>{data.sale}%</span>
                <span className={cx('label')}>Giảm</span>
            </div>
            <p className={cx('quantity')}>Số lượng tồn:{data.quantity}</p>
        </Link>
    );
}

export default ProductItem;
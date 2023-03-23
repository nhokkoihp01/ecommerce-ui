import React from 'react';
import classNames from "classnames/bind";
import {Link} from "react-router-dom";

import styles from "./ProductItem.module.scss";
import {convertCurrency} from "~/untils/convertCurrency";


const cx = classNames.bind(styles);



function ProductItem(props) {
    const {data} = props;
    return (
        <Link to={`/product-detail/${data.id}/product`} className={cx('wrapper')}>
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
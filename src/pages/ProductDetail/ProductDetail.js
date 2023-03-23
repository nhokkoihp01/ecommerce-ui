import React, {useState} from 'react';
import classNames from "classnames/bind";
import {Container, Grid} from "@material-ui/core";

import styles from "./ProductDetail.module.scss";
import Product from '~/assets/product/product01.jpg'

const cx = classNames.bind(styles);

function ProductDetail(props) {
    const [count, setCount] = useState(1);
    const incrementCount = () => {
        setCount(count + 1);
    };
    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Container>
                <div className={cx('content')}>
                    <Grid container>
                        <Grid container justifyContent={"center"} item md={4}>
                            <div className={cx('product-image')}>
                                <img src={Product} alt="image"/>
                            </div>
                        </Grid>
                        <Grid item md={8}>
                            <div className={cx('product-info')}>
                                <h3 className={cx('product-description')}>Máy hấp thực phẩm đa năng 03 tầng Magic Korea A61 (10.5 lít) - Hàng Chính Hãng</h3>
                                <div className={cx('price')}>
                                    <p className={cx('new-price')}>169.000đ</p>
                                   <div className={cx('box-sale')}>
                                       <p className={cx('old-price')}>169.000đ</p>
                                       <span className={cx('sale')}>-47%</span>
                                   </div>
                                </div>
                                <p className={cx('amount')}>Số lượng còn: 200</p>
                                <div className={cx("quantity")}>
                                    <div className={cx("title")}>Chọn số lượng mua</div>
                                    <span
                                        onClick={decrementCount}
                                        className={cx("btn-function", "pl-20")}>-</span>
                                    <span className={cx("count")}>{count}</span>
                                    <span onClick={incrementCount} className={cx("btn-function")}>+</span>
                                </div>
                                <button className={cx('btn-add-cart')}>Thêm vào giỏ hàng</button>
                            </div>
                        </Grid>

                    </Grid>
                </div>
            </Container>
        </div>
    );
}

export default ProductDetail;
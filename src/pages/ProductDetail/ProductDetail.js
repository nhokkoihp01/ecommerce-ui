import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Container, Grid} from "@material-ui/core";
import {useParams} from "react-router-dom";

import styles from "./ProductDetail.module.scss";
import {getProductById} from "~/services/workspaces.sevices";
import {convertCurrency} from "~/untils/convertCurrency";

const cx = classNames.bind(styles);

function ProductDetail(props) {
    let {id} = useParams();
    const [product,setProduct] = useState({})
    const [count, setCount] = useState(1);
    const incrementCount = () => {
        setCount(count + 1);
    };
    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    useEffect(() => {
        async function fetchData() {
            const response = await getProductById(id);
            const data = response?.data;
            if (data) {
                setProduct(data)
            }
        }

        fetchData();
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <Container>
                <div className={cx('content')}>
                    <Grid container>
                        <Grid container justifyContent={"center"} item md={4}>
                            <div className={cx('product-image')}>
                                <img src={product.image} alt={product.name}/>
                            </div>
                        </Grid>
                        <Grid item md={8}>
                            <div className={cx('product-info')}>
                                <h3 className={cx('product-description')}>{product.description}</h3>
                                <div className={cx('price')}>
                                    <p className={cx('new-price')}>{convertCurrency(product.newPrice)}</p>
                                    <div className={cx('box-sale')}>
                                        <p className={cx('old-price')}>{convertCurrency(product?.oldPrice)}</p>
                                        <span className={cx('sale')}>-47%</span>
                                    </div>
                                </div>
                                <p className={cx('amount')}>Số lượng còn: {product.quantity}</p>
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
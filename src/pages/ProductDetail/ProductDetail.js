import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Container, Grid} from "@material-ui/core";
import {useNavigate, useParams} from "react-router-dom";
import {NotificationManager} from 'react-notifications';

import styles from "./ProductDetail.module.scss";
import {addToCartByUserIdAndProductId, getProductById} from "~/services/workspaces.sevices";
import {convertCurrency} from "~/untils/convertCurrency";
import AuthService from "~/services/auth/AuthService";
import config from "~/config";
import {CartContext} from "~/untils/CartProvider";



const cx = classNames.bind(styles);

function ProductDetail(props) {
    let {id} = useParams();
    const {carts, setCarts} = useContext(CartContext);
    const [product, setProduct] = useState({})
    const [count, setCount] = useState(1);
    const [user, setUser] = useState({});
    const navigate = useNavigate()
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
    useEffect(() => {
        async function getInfoUser() {
            const response = await AuthService.getInfoUser()
            const data = response?.data.data;
            setUser(data)
        }

        getInfoUser()

    }, [])

    const handleAddToCart = async () => {
        if (user === undefined) {
            navigate(config.routes.login)
        }
        const body = {
            productId: product.id,
            quantity: count,
            name: product.name,
            image: product.image,
            newPrice: product.newPrice,
            oldPrice: product.oldPrice,
            description: product.description,
            sale: product.sale,
            categoryId: product.categoryId


        }
        const response = await addToCartByUserIdAndProductId(user.id, body)
        if (response.data.status === "OK") {
            NotificationManager.success('Thêm sản phẩm thành công')
            setCarts([...carts,body])

        } else {
            console.log("failed")
        }


    }


    // console.log(addToCart)

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
                                <button onClick={handleAddToCart} className={cx('btn-add-cart')}>Thêm vào giỏ hàng
                                </button>
                            </div>
                        </Grid>

                    </Grid>
                </div>
            </Container>
        </div>
    );
}

export default ProductDetail;
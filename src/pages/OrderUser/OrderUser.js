import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Container} from "@material-ui/core";


import styles from "./OrderUser.module.scss";
import {getOrderByUserId} from "~/services/workspaces.sevices";
import {convertCurrency} from "~/untils/convertCurrency";


const cx = classNames.bind(styles);

function OrderUser(props) {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        async function fetchData() {
            const user = JSON.parse(localStorage.getItem("token"))
            if(user){
                const response = await getOrderByUserId(user.userId)
                const data = response?.data
                setOrders(data)
            }

        }

        fetchData()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <Container>
                <h3 className={cx('header')}>Thông tin đơn hàng</h3>
                <div className={cx('order-user')}>
                    <div className={cx('order-user-left')}>

                        {
                            orders.map((item,index)=>{
                                return (
                                    <div key={index} className={cx('user')}>
                                        <p className={cx('user-id')}>Order ID:{item.id}</p>
                                        {
                                            item.cartItems.map((order,index)=>{
                                                return (
                                                    <div key={index} className={cx('order-user-left-item')}>
                                                        <div className={cx('order-user-left-item-img')}>
                                                            <img

                                                                src={order.image}
                                                                alt={order.name}/>
                                                        </div>
                                                        <div className={cx('order-user-left-item-product')}>
                                                            <h5 className={cx('order-user-left-item-product-name')}>
                                                                {order.description}
                                                            </h5>
                                                            <p className={cx('order-user-left-item-product-quantity')}>
                                                                x{order.quantity}
                                                            </p>
                                                        </div>
                                                        <div className={cx('order-user-left-item-price')}>
                                                            <p className={cx('order-user-left-item-price-old')}>
                                                                {convertCurrency(order.oldPrice)}
                                                            </p>
                                                            <p className={cx('order-user-left-item-price-new')}>
                                                                {convertCurrency(order.newPrice)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }
                                        <div className={cx('order-user-right')}>
                                            <div className={cx('order-user-right-total')}>
                                                <h4>Tổng tiền hàng</h4>
                                                <p>{convertCurrency(item.totalPrice)}</p>
                                            </div>

                                            <div className={cx('order-user-right-subtotal')}>
                                                <h4>Thành tiền</h4>
                                                <p>{convertCurrency(item.totalPrice)}</p>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }


                    </div>

                </div>
            </Container>
        </div>
    );
}

export default OrderUser;

import React from 'react';
import classNames from "classnames/bind";
import {Container} from "@material-ui/core";


import styles from "./OrderUser.module.scss";


const cx = classNames.bind(styles);

function OrderUser(props) {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <h3 className={cx('header')}>Thông tin đơn hàng</h3>
               <div className={cx('order-user')}>
                   <div className={cx('order-user-left')}>
                       <div className={cx('order-user-left-item')}>
                           <div className={cx('order-user-left-item-img')}>
                               <img

                                   src="https://salt.tikicdn.com/cache/750x750/ts/product/54/0a/48/a12dae1024f5af51fd3b267de4b35c24.jpg.webp" alt=""/>
                           </div>
                           <div className={cx('order-user-left-item-product')}>
                               <h5 className={cx('order-user-left-item-product-name')}>
                                   Áo Thun Nam cổ tròn TSIMPLE áo phông trơn basic tay ngắn vải cotton co giãn, dày dặn , form chuẩn nhiều màu
                               </h5>
                               <p className={cx('order-user-left-item-product-quantity')}>
                                   Số lượng x1
                               </p>
                           </div>
                           <div className={cx('order-user-left-item-price')}>
                               <p className={cx('order-user-left-item-price-old')}>
                                   120000đ
                               </p>
                               <p className={cx('order-user-left-item-price-new')}>
                                   110000đ
                               </p>
                           </div>
                       </div>

                       <div className={cx('order-user-left-item')}>
                           <div className={cx('order-user-left-item-img')}>
                               <img

                                   src="https://salt.tikicdn.com/cache/750x750/ts/product/54/0a/48/a12dae1024f5af51fd3b267de4b35c24.jpg.webp" alt=""/>
                           </div>
                           <div className={cx('order-user-left-item-product')}>
                               <h5 className={cx('order-user-left-item-product-name')}>
                                   Áo Thun Nam cổ tròn TSIMPLE áo phông trơn basic tay ngắn vải cotton co giãn, dày dặn , form chuẩn nhiều màu
                               </h5>
                               <p className={cx('order-user-left-item-product-quantity')}>
                                   Số lượng x1
                               </p>
                           </div>
                           <div className={cx('order-user-left-item-price')}>
                               <p className={cx('order-user-left-item-price-old')}>
                                   120000đ
                               </p>
                               <p className={cx('order-user-left-item-price-new')}>
                                   110000đ
                               </p>
                           </div>
                       </div>
                       <div className={cx('order-user-left-item')}>
                           <div className={cx('order-user-left-item-img')}>
                               <img

                                   src="https://salt.tikicdn.com/cache/750x750/ts/product/54/0a/48/a12dae1024f5af51fd3b267de4b35c24.jpg.webp" alt=""/>
                           </div>
                           <div className={cx('order-user-left-item-product')}>
                               <h5 className={cx('order-user-left-item-product-name')}>
                                   Áo Thun Nam cổ tròn TSIMPLE áo phông trơn basic tay ngắn vải cotton co giãn, dày dặn , form chuẩn nhiều màu
                               </h5>
                               <p className={cx('order-user-left-item-product-quantity')}>
                                   Số lượng x1
                               </p>
                           </div>
                           <div className={cx('order-user-left-item-price')}>
                               <p className={cx('order-user-left-item-price-old')}>
                                   120000đ
                               </p>
                               <p className={cx('order-user-left-item-price-new')}>
                                   110000đ
                               </p>
                           </div>
                       </div>
                   </div>
                   <div className={cx('order-user-right')}>
                        <div className={cx('order-user-right-total')}>
                            <h4>Tổng tiền hàng</h4>
                            <p>100000đ</p>
                        </div>
                       <div className={cx('order-user-right-delivery')}>
                           <h4>Phí ship</h4>
                           <p>15000đ</p>
                       </div>
                       <div className={cx('order-user-right-subtotal')}>
                           <h4>Thành tiền</h4>
                           <p>150000đ</p>
                       </div>
                   </div>
               </div>
            </Container>
        </div>
    );
}

export default OrderUser;

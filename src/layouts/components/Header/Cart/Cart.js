import React from 'react';
import classNames from "classnames/bind";
import {Avatar, Badge, withStyles} from "@material-ui/core";
import Tippy from "@tippyjs/react/headless";

import styles from './Cart.module.scss'
import {BiCart} from "react-icons/bi";
import Product from '~/assets/product/product01.jpg'


const cx = classNames.bind(styles);

function Cart(props) {
    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: 10,
            top: 3,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '8px 8px',
            fontSize: 16
        },
    }))(Badge);
    return (
        <Tippy
            content=""
            interactive
            placement="bottom-start"
            maxWidth={400}
            offset={[70, -4]}
            arrow={true}
            render={attrs => (
                <div className={cx("box")} tabIndex="-1" {...attrs}>
                    <div className={cx("box-cart")}>
                        <div className={cx("box-cart-item")}>
                            <h3 className={cx("title")}>Sản phẩm mới thêm</h3>
                            <div className={cx("cart-item")}>
                                <Avatar
                                    alt="Avatar"
                                    src={Product}
                                    variant="square"
                                    style={{width: "41", height: "41"}}
                                />
                                <div className={cx("product-info")}>
                    <span className={cx("product-name")}>
                      Áo Polo Teelab Special chất cá sấu thoáng mát co dãn 4c ,
                      áo thun có cổ local brand nam nữ unisex form rộng
                    </span>
                                    <span className={cx("product-price")}>69.000đ</span>
                                </div>
                            </div>
                            <div className={cx("checkout")}>
                                <a className={cx("btn-checkout")}>Xem giỏ hàng</a>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        >
            <StyledBadge
                badgeContent={4} overlap="rectangular" color="secondary" max={99}>
                <div className={cx('cart')}>
                    <BiCart className={cx('cart-icon')}/>
                </div>
            </StyledBadge>
        </Tippy>

    );
}

export default Cart;

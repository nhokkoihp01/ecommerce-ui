import React, {useContext} from 'react';
import classNames from "classnames/bind";
import {Avatar, Badge, withStyles} from "@material-ui/core";
import Tippy from "@tippyjs/react/headless";
import {Link} from "react-router-dom";

import styles from './Cart.module.scss'
import {BiCart} from "react-icons/bi";
import {convertCurrency} from "~/untils/convertCurrency";
import Notify from "~/assets/notify/notify-empty.png";
import {CartContext} from "~/untils/CartProvider";
import config from "~/config";



const cx = classNames.bind(styles);

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: 10,
        top: 3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '8px 8px',
        fontSize: 16
    },
}))(Badge);

function Cart(props) {
    const {carts} = useContext(CartContext);
    return (
        <Tippy
            interactive
            placement="bottom-start"
            maxWidth={400}
            offset={[70, -4]}
            arrow={true}
            render={attrs => (
                <div className={cx("box")} tabIndex="-1" {...attrs}>
                    <div className={cx("box-cart")}>
                        <div className={cx("box-cart-item")}>
                            {carts.length > 0 && (<h3 className={cx("title")}>Sản phẩm mới thêm</h3>)}
                            {
                                carts.length > 0 ? (
                                    carts?.map((item, index) => {
                                        return (
                                                <div key={item.productId} className={cx("cart-item")}>
                                                    <Avatar
                                                        alt="Avatar"
                                                        src={item.image}
                                                        variant="square"
                                                        style={{width: "41", height: "41"}}
                                                    />
                                                    <div className={cx("product-info")}>
                                                        <span className={cx("product-name")}>{item.name}</span>
                                                        <span
                                                            className={cx("product-price")}>{convertCurrency(item.newPrice)}</span>
                                                    </div>
                                                </div>

                                        )
                                    })
                                ) : (
                                    <div className={cx("box-cart")}>
                                        <img
                                            className={cx("cart-image")}
                                            src={Notify}
                                            alt="notify image"
                                        />
                                        <span className={cx("cart-notify")}>Chưa có sản phẩm</span>
                                    </div>
                                )
                            }
                            {
                                carts.length > 0 && (
                                    <div className={cx("checkout")}>
                                        <Link to={config.routes.checkout} className={cx("btn-checkout")}>Xem giỏ hàng</Link>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                </div>
            )}
        >
            <StyledBadge
                badgeContent={carts.length} overlap="rectangular" color="secondary" max={99}>
                <div className={cx('cart')}>
                    <BiCart className={cx('cart-icon')}/>
                </div>
            </StyledBadge>
        </Tippy>

    );
}

export default Cart;

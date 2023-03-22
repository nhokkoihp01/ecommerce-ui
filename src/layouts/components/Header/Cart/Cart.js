import React from 'react';
import classNames from "classnames/bind";
import {Badge, withStyles} from "@material-ui/core";

import styles from './Cart.module.scss'
import {BiCart} from "react-icons/bi";


const cx = classNames.bind(styles);

function Cart(props) {
    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: 10,
            top: 3,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '8px 8px',
            fontSize:16
        },
    }))(Badge);
    return (
        <StyledBadge
            badgeContent={4} color="secondary" max={99}>
            <div className={cx('cart')}>
                <BiCart className={cx('cart-icon')}/>
            </div>
        </StyledBadge>
    );
}

export default Cart;

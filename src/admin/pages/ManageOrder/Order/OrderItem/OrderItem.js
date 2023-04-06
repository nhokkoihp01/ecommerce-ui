import React from "react";
import classNames from "classnames/bind";

import {Link} from "react-router-dom";


import styles from "./OrderItem.module.scss";

import {convertCurrency} from "~/untils/convertCurrency";
const cx = classNames.bind(styles);

function OrderItem(props) {
    const {cartItems} = props;


    return (
        <div>

                {
                    cartItems?.map((item,index)=>{
                        return (
                            <Link
                                key={item.id}

                                className={cx("order-item")}>
                                <div className={cx("box-image")}>
                                    <img className={cx("image")} alt={item.name} src={item.image}></img>
                                </div>
                                <div className={cx("box-info")}>
                                    <h4 className={cx("order-name")}>{item.name}</h4>
                                    <p className={cx("order-price")}>{convertCurrency(item.newPrice)}</p>
                                    <p className={cx("order-quantity")}>{item.quantity}</p>
                                </div>
                            </Link>
                        )
                    })
                }


        </div>
    );
}

export default OrderItem;

import React, {useContext, useState} from "react";
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';
import {Link, useNavigate} from "react-router-dom";


import styles from "./UserDropdown.module.scss";
import avatar from "~/assets/avatar/avatar.jpg";
import AuthService from "~/services/auth/AuthService";
import config from "~/config";
import {CartContext} from "~/untils/CartProvider";

const cx = classNames.bind(styles);

function UserDropdown(props) {
    const navigate = useNavigate()
    const {user} = props;
    const {setShouldUpdate} = useContext(CartContext);
    const handleLogout = () => {
        AuthService.logout();
        navigate(config.routes.login)
        setShouldUpdate(false)
    }

    return (
        <div className={cx("wrapper")}>
            <Tippy
                interactive
                placement="bottom-end"
                offset={[12, 4]}
                render={attrs => (
                    <div className={cx('dropdown-user')} tabIndex="-1" {...attrs}>
                        <Link to={config.routes.infoUser} className={cx("dropdown-item")}>
                            Tài khoản của tôi
                        </Link>
                        <Link to={config.routes.orderUser} className={cx("dropdown-item")}>
                            Đơn mua
                        </Link>
                        <span onClick={handleLogout} className={cx("dropdown-item")}>
                        Đăng xuất
                        </span>
                        <Link to={config.routes.updatePassword} className={cx("dropdown-item")}>
                            Đổi mật khẩu
                        </Link>
                    </div>
                )}
            >
                <div className={cx("user-info")}>
                    <img className={cx("avatar")} src={user.image == null ? avatar : user.image} alt={user.name}></img>
                    <span className={cx("username")}>{user.username}</span>
                </div>
            </Tippy>


        </div>
    );
}

export default UserDropdown;

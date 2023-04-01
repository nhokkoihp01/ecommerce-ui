import React, {useContext} from 'react';
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';
import {Link, useNavigate} from "react-router-dom";
import {Avatar} from "@mui/material";

import styles from "./Header.module.scss";
import Logo from "~/admin/assets/logo/logo.jpg";
import {AiOutlineFileDone} from 'react-icons/ai'
import {IoIosLogOut} from 'react-icons/io'
import config from "~/config";
import {CartContext} from "~/untils/CartProvider";
import AuthService from "~/services/auth/AuthService";

const cx = classNames.bind(styles);

function Header(props) {
    const {setShouldUpdate, user} = useContext(CartContext);
    const navigate = useNavigate()
    const handleLogout = () => {
        AuthService.logout();
        navigate(config.routes.home)
        setShouldUpdate(false)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-wrapper')}>
                <div className={cx('logo')}>
                    <div>
                        <Link to={config.routes.home}>
                            <img src={Logo} className={cx('logo-image')} alt=""/>
                        </Link>
                    </div>
                    <h4 className={cx('logo-text')}>Admin</h4>
                </div>
                <Tippy
                    offset={[12, 10]}
                    interactive
                    render={attrs => (
                        <div className={cx('profile')} tabIndex="-1" {...attrs}>
                            <a className={cx('profile-item')} href="">
                                <AiOutlineFileDone/>
                                Hồ sơ Shop
                            </a>
                            <span onClick={handleLogout} className={cx('profile-item')} >
                                <IoIosLogOut/>
                                Đăng xuất
                            </span>
                        </div>
                    )}
                >
                    <div className={cx('info-user')}>
                        <Avatar
                            alt="Remy Sharp"
                            src={user.image}
                            sx={{width: 30, height: 30}}
                        />
                        <span className={cx('name')}>{user.firstName + " " + user.lastName}</span>
                    </div>
                </Tippy>

            </div>
        </div>
    );
}

export default Header;

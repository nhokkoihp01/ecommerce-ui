import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import SideBarItem from '../SideBarItem/SideBarItem';


import logo from '../../assets/images/logo.jpg';
import LogoutIcon from '../../assets/icons/logout.svg';
import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";
import config from "~/config";
const cx = classNames.bind(styles);
function SideBar ({ menu }) {
    const location = useLocation();

    const [active, setActive] = useState(1);

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }

    return(
        <nav className={cx('sidebar')}>
            <div className={cx('sidebar-container')}>
                <div className={cx('sidebar-logo-container')}>
                    <Link
                        to={config.routes.home}

                    >
                        <img
                            src={logo}
                            alt="logo" />
                    </Link>
                </div>

                <div className={cx('sidebar-container')}>
                    <div className={cx('sidebar-items')}>
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />
                            </div>
                        ))}
                    </div>

                    <div className={cx('sidebar-footer')}>
                        <span className={cx('sidebar-item-label')}>Logout</span>
                        <img
                            src={LogoutIcon}
                            alt='icon-logout'
                            className={cx('sidebar-item-icon')} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;
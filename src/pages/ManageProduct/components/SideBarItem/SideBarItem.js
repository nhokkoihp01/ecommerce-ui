import React, {useState} from "react";
import { Link } from 'react-router-dom';

import styles from "./SideBarItem.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const SideBarItem = ({ item, active }) => {
    const [hover, setHover] = useState(false);
    return (
        <Link
            to={item.path}
            className={cx(active ? 'sidebar-item-active' : 'sidebar-item')} >
            <img
                src={item.icon}
                alt={`icon-${item.icon}`}
                className={cx('sidebar-item-icon')} />
            <span className={cx('sidebar-item-label')}>{item.title}</span>
        </Link>
    )
}
export default SideBarItem;

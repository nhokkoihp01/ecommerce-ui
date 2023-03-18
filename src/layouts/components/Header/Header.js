import React from 'react';
import classNames from "classnames/bind";


import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header(props) {
    return (
        <div className={cx('wrapper')}>
            <h1>Header</h1>
        </div>
    );
}

export default Header;
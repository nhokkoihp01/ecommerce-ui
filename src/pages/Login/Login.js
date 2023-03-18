import React from 'react';
import classNames from "classnames/bind";

import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

function Login(props) {
    return (
        <div className={cx('wrapper')}>
            Login page
        </div>
    );
}

export default Login;
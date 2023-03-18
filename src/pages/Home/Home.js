import React from 'react';
import classNames from "classnames/bind";



import styles from "./Home.module.scss";


const cx = classNames.bind(styles);

function Home(props) {
    return (
        <div className={cx('wrapper')}>
            Page Home
        </div>

    );
}

export default Home;
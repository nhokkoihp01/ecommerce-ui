import React from 'react';


import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';


import MainContent from "./pages/MainContent";
import classNames from "classnames/bind";
import styles from "./ManageOrder.module.scss";
const cx = classNames.bind(styles);
function ManageOrder() {
    return (

        <div className={cx('dashboard-container')}>
            <SideBar menu={sidebar_menu}/>
            <MainContent/>

        </div>

    )
}

export default ManageOrder;


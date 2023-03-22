import React from 'react';
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";

import styles from "./Search.module.scss";


const cx = classNames.bind(styles);

function Search(props) {
    return (
       <div className={cx('wrapper')}>
           <div className={cx('search')}>
               <input className={cx('search-input')} placeholder="Bạn tìm gì hôm nay"/>
               <button className={cx('btn-search', 'input-separate')}>Tìm kiếm</button>
           </div>
       </div>
    );
}

export default Search;

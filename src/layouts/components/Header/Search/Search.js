import React, {useState} from 'react';
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import {Link} from "react-router-dom";
import {Avatar} from "@material-ui/core";

import styles from "./Search.module.scss";
import Product from '~/assets/product/product01.jpg'



const cx = classNames.bind(styles);

function Search(props) {
    const [searchValue, setSearchValue] = useState("");
    const [showResult, setShowResult] = useState(false);
    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
       <div className={cx('wrapper')}>
           <Tippy
               interactive
               onClickOutside={handleHideResult}
               placement="bottom-start"
               maxWidth={600}
               visible={showResult && searchValue.length > 0}
               render={attrs => (
                   <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                       <Link
                           to={""}
                           className={cx("result-item")}
                           onClick={() => setShowResult(false)}
                       >
                           <Avatar
                               variant="square"
                               sx={{ width: 24, height: 24 }}
                               alt="Avatar"
                               src={Product}
                           />
                           <h3 className={cx("product-name")}>product 01</h3>
                       </Link>
                   </div>
               )}
           >
               <div className={cx('search')}>
                   <input className={cx('search-input')}
                          onChange={handleChange}
                          spellCheck={false}
                          value={searchValue}
                          onFocus={()=> setShowResult(true)}
                          placeholder="Bạn tìm gì hôm nay"/>
                   <button className={cx('btn-search', 'input-separate')}>Tìm kiếm</button>
               </div>
           </Tippy>

       </div>
    );
}

export default Search;

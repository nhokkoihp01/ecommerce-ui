import React from 'react';
import classNames from "classnames/bind";
import {Link} from "react-router-dom";

import styles from "./CategoryItem.module.scss";
import {MdOutlineArrowRight} from "react-icons/md";


const cx = classNames.bind(styles);

function CategoryItem(props) {
    const {getData, data, activeCategoryId} = props;
    return (
        <div className={cx("category-content")}>
            {data?.map((item, index) => {
                return (
                    <Link
                        to={`/product-category/${item.id}`}
                        onClick={() => getData(item)}
                        key={item.id}
                        className={cx({
                            "box-category": true,
                            active: item.id === activeCategoryId,
                            "open-icon": item.id === activeCategoryId,
                        })}
                    >
                        <MdOutlineArrowRight className={cx("arrow-icon")}/>
                        <h3 className={cx("category-item")}>{item?.name}</h3>
                    </Link>
                );
            })}
        </div>
    );
}

export default CategoryItem;
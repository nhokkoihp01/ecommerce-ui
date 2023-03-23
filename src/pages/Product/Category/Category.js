import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";

import styles from "./Category.module.scss";
import CategoryItem from "~/pages/Product/CategoryItem";
import {getCategory} from "~/services/workspaces.sevices";
import {MenuCategoryIcon} from "~/components/Icon";
import {useParams} from "react-router-dom";

const cx = classNames.bind(styles);

function Category(props) {
    const {id} = useParams()
    const [categories, setCategories] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(id);
    useEffect(() => {
        getCategory()
            .then((res) => setCategories(res.data))

    }, []);
    const handleGetData = (data) => {
        setActiveCategoryId(data.id)

    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('category-header')}>
                <MenuCategoryIcon className={cx('menu-icon')}/>
                <h3 className={cx('header-text')}>Tất cả danh mục</h3>
            </div>
            <div className={cx('divider')}></div>
            <CategoryItem activeCategoryId={activeCategoryId}  getData={handleGetData} data={categories}/>
        </div>
    );
}

export default Category;
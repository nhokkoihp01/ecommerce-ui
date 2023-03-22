import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import {  Container } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import styles from "./Category.module.scss";
import CategoryItem from "~/pages/Home/category/category-item";
import {getCategory} from "~/services/workspaces.sevices";


const cx = classNames.bind(styles);

function Category(props) {
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        getCategory().then((res)=> setCategories(res.data.data))

    },[])

  return (
    <div className={cx("wrapper")}>
      <Container style={{ padding: 0 }}>
        <div className={cx("category-header")}>
          <div className={cx("category-header-name")}>DANH MỤC</div>
        </div>
        <div className={cx("category-content")}>
            <CategoryItem categories={categories}/>
        </div>
      </Container>
    </div>
  );
}

export default Category;

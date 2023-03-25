import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Grid, Slider} from "@material-ui/core";


import styles from "./Content.module.scss";

import ProductItem from "~/layouts/components/ProductItem";
import {getProductByCategoryId} from "~/services/workspaces.sevices";
import {useParams} from "react-router-dom";

const cx = classNames.bind(styles);
function Content(props) {
    const {id} = useParams()
    const [priceRange, setPriceRange] = useState([0, 0]);
    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
    };
    const [products,setProducts] = useState([])
    useEffect(()=>{
        async function fetchData() {
            const response = await getProductByCategoryId(id);
            const data = response?.data;
            if (data) {
                setProducts(data)
            }
            else{
                setProducts([])
            }
        }

        fetchData();
    },[id])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter')}>
                <h3 className={cx("filter-header")}>Sắp xếp theo </h3>
                <div className={cx("filter-price")}>
                    <p>Giá từ: {priceRange[0]}</p>
                </div>

                <div className={cx("range-price")}>

                    <Slider
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay="auto"
                        color="primary"
                        min={0}
                        max={1000000}
                    />
                </div>
                <div className={cx("filter-price")}>
                    <p>đến: {priceRange[1]}</p>
                </div>
            </div>
            <div className={cx('box-product')}>
                <Grid container spacing={2}>

                    {
                       products.length > 0 ? (
                           products.map((item,index)=>{
                               return (
                                   <Grid key={item.id} item md={3} >
                                       <ProductItem data={item}/>
                                   </Grid>
                               )
                           })
                       ):(
                           <Grid style={{paddingTop:"30px"}} container spacing={2}>
                               <Grid style={{width: "100%"}} item md={12}>
                                   <div className={cx("notify")}>
                                       <h3 className={cx("notify-text")}>Không có sản phẩm nào</h3>
                                   </div>
                               </Grid>
                           </Grid>
                       )
                    }

                </Grid>

            </div>

        </div>
    );
}

export default Content;
import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import {Grid} from "@mui/material";
import ProductItem from "~/layouts/components/ProductItem";
import {getAllProduct} from "~/services/workspaces.sevices";
import {useMediaQuery} from "react-responsive";

const cx = classNames.bind(styles);

function Product(props) {
    const [products,setProducts] = useState([])
    useEffect(()=>{
        getAllProduct(20).then((res)=> setProducts(res.data.data))
    },[])
    const isMaxWidth = useMediaQuery({maxWidth:1100})
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>Sản phẩm nôi bật</h3>
            </div>
            <div className={cx('product-content')}>
                <Grid container spacing={2}>
                    {
                        products.map((item,index)=>{
                            return (
                                <Grid key={item.id} item md={isMaxWidth? 3:2} sm={4}>
                                    <ProductItem data={item}/>
                                </Grid>
                            )
                        })
                    }


                </Grid>
            </div>
        </div>
    );
}

export default Product;
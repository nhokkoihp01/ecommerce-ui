import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Grid, Slider} from "@material-ui/core";


import styles from "./Content.module.scss";
import ProductItem from "~/layouts/components/ProductItem";
import {getProductByCategoryId, getProductByFilterPrice, getProductBySearch} from "~/services/workspaces.sevices";
import {useParams} from "react-router-dom";
import {convertCurrency} from "~/untils/convertCurrency";
import {ArrowLeft, ArrowRight} from "~/components/Icon";
import {Pagination, PaginationItem} from "@mui/material";

const cx = classNames.bind(styles);
function Content(props) {
    const {id,searchValue} = useParams()
    const [products,setProducts] = useState([])
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentProducts = products?.slice(startIndex, endIndex);
    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
    };
    useEffect(()=>{
        getProductByFilterPrice(priceRange[0],priceRange[1]).then((res)=> setProducts(res?.data))

    },[priceRange])
    useEffect(()=>{
        async function fetchData() {
            if(id !== "search"){
                const response = await getProductByCategoryId(id);
                const data = response?.data;
                if (data) {
                    setProducts(data)
                }
                else{
                    setProducts([])
                }
            }
            else{
                const response = await getProductBySearch(searchValue)
                const data = response?.data;
                if (data) {
                    setProducts(data)
                }
                else{
                    setProducts([])
                }
            }

        }

        fetchData();
    },[id,searchValue])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter')}>
                <h3 className={cx("filter-header")}>Sắp xếp theo </h3>
                <div className={cx("filter-price")}>
                    <p>Giá từ: {convertCurrency(priceRange[0])}</p>
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
                    <p>đến: {convertCurrency(priceRange[1])}</p>
                </div>
            </div>
            <div className={cx('box-product')}>
                <Grid container spacing={2}>

                    {
                       products?.length > 0 ? (
                           currentProducts?.map((item,index)=>{
                               return (
                                   <Grid key={item.id} item md={3} sm={6} >
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
                <Grid item md={12} style={{ paddingTop: "40px" }}>
                    <Pagination
                        count={Math.ceil(products?.length / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{
                                    previous: ArrowLeft,
                                    next: ArrowRight,
                                }}
                                {...item}
                            />
                        )}
                    />
                </Grid>

            </div>

        </div>
    );
}

export default Content;
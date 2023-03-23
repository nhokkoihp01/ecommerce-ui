import React from 'react';
import classNames from "classnames/bind";
import {useMediaQuery} from "react-responsive";
import {Container, Grid} from "@material-ui/core";


import styles from "./Product.module.scss";
import Category from "~/pages/Product/Category";
import Content from "~/pages/Product/Content";



const cx = classNames.bind(styles);

function Product(props) {
    const maxWidthLg = useMediaQuery({maxWidth: 1100})
    const isTablet = useMediaQuery({minWidth:900})
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Grid container spacing={4}>
                    {
                        isTablet && (
                            <Grid item md={maxWidthLg ? 3 : 2}>
                                <Category/>
                            </Grid>
                        )
                    }
                    <Grid style={{width:"100%"}} item sm={12} md={maxWidthLg ? 9 : 10}>
                       <Content/>
                    </Grid>

                </Grid>
            </Container>
        </div>
    );
}

export default Product;
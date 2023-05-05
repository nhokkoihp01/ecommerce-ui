import React from 'react';
import classNames from "classnames/bind";
import {Container} from "@mui/material";




import styles from "./Home.module.scss";
import Category from "~/pages/Home/Category";
import Product from "~/pages/Home/Product";
import BackTop from '~/components/BackTop/BackTop';




const cx = classNames.bind(styles);

function Home(props) {
    return (
        <div className={cx('wrapper')}>
            <Container>
               <Category/>
                <Product/>
                <BackTop/>
            </Container>
        </div>

    );
}

export default Home;
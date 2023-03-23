import React from 'react';
import classNames from "classnames/bind";
import {useMediaQuery} from "react-responsive";
import {Container, Grid} from "@mui/material";


import styles from "./Footer.module.scss";
import CirclePay from '~/assets/payment/circle.png';
import ShopeePay from '~/assets/payment/shopeePay.png';
import JcbPay from '~/assets/payment/jcb.png';


const cx = classNames.bind(styles);

function Footer(props) {
    const isTablet = useMediaQuery({maxWidth:600})
    return (
        <div className={cx("wrapper")}>
            <Container>
                <Grid container spacing={2} justifyContent={isTablet ? 'center':''}>
                    <Grid item md={12 / 5}>
                        <div className={cx('footer-wrapper')}>
                            <h1 className={cx('title')}>Chăm sóc khách hàng</h1>
                            <a className={cx('footer-item')}>Trung tâm trợ giúp</a>
                            <a className={cx('footer-item')}>Shopee Blog</a>
                            <a className={cx('footer-item')}>Shopee Mall</a>
                            <a className={cx('footer-item')}>Hướng Dẫn Mua Hàng</a>
                        </div>
                    </Grid>
                    <Grid item md={12 / 5}>
                        <div className={cx('footer-wrapper')}>
                            <h1 className={cx('title')}>Chăm sóc khách hàng</h1>
                            <a className={cx('footer-item')}>Trung tâm trợ giúp</a>
                            <a className={cx('footer-item')}>Shopee Blog</a>
                            <a className={cx('footer-item')}>Shopee Mall</a>
                            <a className={cx('footer-item')}>Hướng Dẫn Mua Hàng</a>
                        </div>
                    </Grid>
                    <Grid item md={12 / 5}>
                        <div className={cx('footer-wrapper')}>
                            <h1 className={cx('title')}>Chăm sóc khách hàng</h1>
                            <a className={cx('footer-item')}>Trung tâm trợ giúp</a>
                            <a className={cx('footer-item')}>Shopee Blog</a>
                            <a className={cx('footer-item')}>Shopee Mall</a>
                            <a className={cx('footer-item')}>Hướng Dẫn Mua Hàng</a>
                        </div>
                    </Grid>
                    <Grid item md={12 / 5}>
                        <div className={cx('footer-wrapper')}>
                            <h1 className={cx('title')}>Chăm sóc khách hàng</h1>
                            <a className={cx('footer-item')}>Trung tâm trợ giúp</a>
                            <a className={cx('footer-item')}>Shopee Blog</a>
                            <a className={cx('footer-item')}>Shopee Mall</a>
                            <a className={cx('footer-item')}>Hướng Dẫn Mua Hàng</a>
                        </div>
                    </Grid>
                    <Grid item md={12 / 5}>
                        <div className={cx('footer-wrapper')}>
                            <h1 className={cx('title')}>Thanh toán</h1>
                            <Grid container className={cx('box-payment')}>
                                <Grid item md={3} className={cx('payment-item')}>
                                    <img src={CirclePay} alt="payment"/>
                                </Grid>
                                <Grid item md={3} className={cx('payment-item')}>
                                    <img src={ShopeePay} alt="payment"/>
                                </Grid>
                                <Grid item md={3} className={cx('payment-item')}>
                                    <img src={CirclePay} alt="payment"/>
                                </Grid>
                                <Grid item md={3} className={cx('payment-item')}>
                                    <img src={JcbPay} alt="payment"/>
                                </Grid>
                                <Grid item md={3} className={cx('payment-item')}>
                                    <img src={CirclePay} alt="payment"/>
                                </Grid>
                                <Grid item md={3} className={cx('payment-item')}>
                                    <img src={ShopeePay} alt="payment"/>
                                </Grid>
                                <Grid item md={3} className={cx('payment-item')}>
                                    <img src={CirclePay} alt="payment"/>
                                </Grid>
                                <Grid item md={3} className={cx('payment-item')}>
                                    <img src={JcbPay} alt="payment"/>
                                </Grid>


                            </Grid>
                        </div>
                    </Grid>


                </Grid>
            </Container>
        </div>
    );
}


export default Footer;
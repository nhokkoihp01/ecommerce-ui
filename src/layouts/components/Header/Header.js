import React from 'react';
import classNames from "classnames/bind";
import {useMediaQuery} from "react-responsive";
import { Container} from "@material-ui/core";
import {Grid} from "@mui/material";
import {Link} from "react-router-dom";

import styles from "./Header.module.scss";
import logo from '~/assets/logo/logo.jpg'
import TopNavbar from "~/layouts/components/Header/TopNavbar";
import Search from "~/layouts/components/Header/Search";
import Cart from "~/layouts/components/Header/Cart/Cart";
import config from "~/config";
import {AiFillHome} from 'react-icons/ai';
import {GiHamburgerMenu} from 'react-icons/gi';
import {useTranslation} from "react-i18next";


const cx = classNames.bind(styles);


function Header(props) {
    const {t, i18n} = useTranslation('home');

    const maxWidth600 = useMediaQuery({maxWidth: 600})
    const isTablet = useMediaQuery({maxWidth: 768})
    return (
        <div className={cx('wrapper')}>
            {!maxWidth600 && (<TopNavbar/>)}
            <Container>
                <div className={cx('header')}>
                    <Grid container justifyContent={"space-between"} alignItems={"center"}>
                        { !isTablet && (
                            <Grid item md={1} justifyContent={"flex-start"}>
                                <Link to={config.routes.home} className={cx('logo')}>
                                    <img src={logo} alt="logo"/>
                                </Link>
                            </Grid>
                        )}
                        <Grid item md={8} sm={8}>
                            <Search/>
                        </Grid>
                        {!isTablet && (
                            <Grid item md={2}>
                                <div className={cx('home')}>
                                    <Link className={cx('navbar-item')} to={config.routes.home}>
                                        <AiFillHome className={cx('icon')}/>
                                        {t('top nav bar.home page')}
                                    </Link>
                                </div>
                            </Grid>
                        )}
                        <Grid item md={1} sm={1}>
                            <Cart/>
                        </Grid>
                        {
                            isTablet && (
                                <Grid  item md={2}>
                                    <div className={cx('menu-mobile')}>
                                            <GiHamburgerMenu className={cx('menu-icon')}/>
                                    </div>
                                </Grid>
                            )
                        }

                    </Grid>
                </div>

            </Container>

        </div>
    );
}

export default Header;
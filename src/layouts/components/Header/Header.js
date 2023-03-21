import React from 'react';
import classNames from "classnames/bind";
import {useMediaQuery} from "react-responsive";
import {Container} from "@material-ui/core";


import styles from "./Header.module.scss";
import TopNavbar from "~/layouts/components/Header/TopNavbar";
import logo from '~/assets/logo/logo.jpg'
import {Grid} from "@mui/material";

const cx = classNames.bind(styles);

function Header(props) {
    const maxWidth600 = useMediaQuery({maxWidth: 600})
    return (
        <div className={cx('wrapper')}>
            {!maxWidth600 && (<TopNavbar/>)}
           <Container>
               <div className={cx('header')}>
                   <Grid container>
                       <Grid item contaier md={2} justifyContent={"flex-start"}>
                           <div className={cx('logo')}>
                               <img src={logo} alt="logo"/>
                           </div>
                       </Grid>
                       <Grid item contaier md={8} justifyContent={"flex-start"}>
                           <div className={cx('logo')}>
                               <img src={logo} alt="logo"/>
                           </div>
                       </Grid>
                       <Grid item contaier md={2} justifyContent={"flex-start"}>
                           <div className={cx('logo')}>
                               <img src={logo} alt="logo"/>
                           </div>
                       </Grid>
                   </Grid>
               </div>

           </Container>

        </div>
    );
}

export default Header;
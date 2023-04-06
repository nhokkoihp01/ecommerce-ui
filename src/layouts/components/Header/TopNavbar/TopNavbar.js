import React, {useEffect, useState} from "react";
import {Container, Grid, Popover, Typography, Box} from "@mui/material";
import classNames from "classnames/bind";
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";

import {FaFacebook} from "react-icons/fa";
import {RiInstagramFill} from "react-icons/ri";
import {GrLanguage} from "react-icons/gr"
import styles from "./TopNavbar.module.scss";
import Notify from "~/assets/notify/notify-empty.png";
import {

    MdNotifications,

} from "react-icons/md";
import UserDropdown from "./UserDropdown";
import config from "~/config";
import AuthService from "~/services/auth/AuthService";
import {useTranslation} from 'react-i18next';


const cx = classNames.bind(styles);

function TopNavbar(props) {
    const maxMd = useMediaQuery({maxWidth: 900});
    const minMd = useMediaQuery({minWidth: 900});
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({})

    const {t, i18n} = useTranslation('home');
    useEffect(() => {
        async function fetchData() {
            const response = await AuthService.getInfoUser()
            const data = response?.data.data;
            if (data !== undefined) {
                if (data.roles.includes("ROLE_ADMIN") && data) {
                    setUser(data)
                    setIsAdmin(true)
                    setIsUser(true)
                } else if (data.roles.includes("ROLE_USER") && data) {
                    setUser(data)
                    setIsAdmin(false)
                    setIsUser(true)
                } else {
                    setIsUser(false)
                    setIsAdmin(false)
                }
            }

        }

        fetchData()

    }, [])

    const handleNotifyClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotifyClose = () => {
        setAnchorEl(null);
    };
    const changeLanguage = (lng: 'en' | 'vi') => {

        i18n.changeLanguage(lng);
        console.log('hehe')
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
        <div className={cx("navbar-wrapper")}>
            <Container>
                <Grid className={cx("wrapper")} container={false}>
                    {minMd && (
                        <Grid
                            item
                            md={6}
                            lg={6}
                            container
                            direction={"row"}
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <div className={cx("navbar-left")}>
                                {
                                    isAdmin && (
                                        <Link
                                            to={config.routes.manageProduct}
                                            className={cx("navbar-item", "navbar-separate")}
                                        >
                                            {t('top nav bar.manage product')}
                                        </Link>
                                    )
                                }{

                            }

                                <a className={cx("navbar-item", "navbar-separate")} href="">
                                    {t('top nav bar.become a tiki seller')}
                                </a>
                                <a className={cx("navbar-item", "navbar-separate")} href="">
                                    {t('top nav bar.download app')}
                                </a>
                                <a className={cx("navbar-item")} href="">
                                    {t('top nav bar.connect')}
                                </a>
                                <a className={cx("icon")} href="">
                                    <FaFacebook/>
                                </a>
                                <a className={cx("instagram", "icon")} href="">
                                    <RiInstagramFill/>
                                </a>
                            </div>
                        </Grid>
                    )}
                    <Grid
                        item
                        container
                        md={6}
                        lg={6}
                        direction="row"
                        justifyContent={maxMd ? `flex-start` : "flex-end"}
                        alignItems="center"
                    >
                        <div className={cx("navbar-right")}>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleNotifyClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                PaperProps={{
                                    style: {
                                        backgroundColor: "transparent",
                                        boxShadow: "none",
                                        borderRadius: 0,
                                    },
                                }}
                            >
                                <Box
                                    sx={
                                        maxMd
                                            ? {
                                                position: "relative",
                                                mt: "10px",
                                                "&::before": {
                                                    backgroundColor: "white",
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    width: 12,
                                                    height: 12,
                                                    top: -6,
                                                    transform: "rotate(45deg)",
                                                    left: `calc(10% - 6px)`,
                                                },
                                            }
                                            : {
                                                position: "relative",
                                                mt: "10px",
                                                "&::before": {
                                                    backgroundColor: "white",
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    width: 12,
                                                    height: 12,
                                                    top: -6,
                                                    transform: "rotate(45deg)",
                                                    left: `calc(90% - 6px)`,
                                                },
                                            }
                                    }
                                />
                                <Typography
                                    sx={{
                                        p: 2,
                                        backgroundColor: "white",
                                        borderRadius: "2px",
                                        padding: 0,
                                    }}
                                >
                                    <div className={cx("box-notify")}>
                                        <div className={cx("notify")}>
                                            <img
                                                className={cx("image-notify")}
                                                src={Notify}
                                                alt="notify image"
                                            />
                                            <h4 className={cx("notify-text")}>
                                                Đăng nhập để xem thông báo
                                            </h4>
                                        </div>
                                        <div className={cx("function")}>
                                            <a href={""} className={cx("btn-function")}>
                                                Register
                                            </a>
                                            <a href={""} className={cx("btn-function")}>
                                                Login
                                            </a>
                                        </div>
                                    </div>
                                </Typography>
                            </Popover>
                            <div className={cx("language-box")}>
                                <p onClick={()=>changeLanguage('vi')}>VI</p>
                                <div className={cx("language-border")}></div>
                                <p onClick={()=>changeLanguage('en')}>EN</p>
                            </div>
                            <span
                                className={cx("navbar-right-item")}
                                onClick={handleNotifyClick}
                                aria-describedby={id}
                                variant="contained"
                            >
                <MdNotifications className={cx("icon")}/>
                                {t('top nav bar.notification')}
              </span>


                            {!isUser ? (
                                <div className={cx("login-register")}>
                                    <Link
                                        to={config.routes.register}
                                        className={cx("navbar-item", "navbar-separate")}
                                    >
                                        {t('top nav bar.register')}
                                    </Link>
                                    <Link
                                        to={config.routes.login}
                                        className={cx("navbar-right-item")}
                                    >
                                        {t('top nav bar.login')}
                                    </Link>
                                </div>
                            ) : (
                                <UserDropdown user={user}/>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default TopNavbar;

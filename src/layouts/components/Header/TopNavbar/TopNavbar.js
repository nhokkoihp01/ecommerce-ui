import React, {useEffect, useState} from "react";
import {Container, Grid, Popover, Typography, Box} from "@mui/material";
import classNames from "classnames/bind";
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";

import {FaFacebook} from "react-icons/fa";
import {RiInstagramFill} from "react-icons/ri";
import styles from "./TopNavbar.module.scss";
import Notify from "~/assets/notify/notify-empty.png";
import {
    MdContactSupport,
    MdNotifications,
    MdOutlineLanguage,
} from "react-icons/md";
import UserDropdown from "./UserDropdown";
import config from "~/config";
import AuthService from "~/services/auth/AuthService";


const cx = classNames.bind(styles);

function TopNavbar(props) {
    const maxMd = useMediaQuery({maxWidth: 900});
    const minMd = useMediaQuery({minWidth: 900});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [languageFunction, setLanguageFunction] = useState(null);
    const [isUser, setIsUser] = useState(false);
    const [user,setUser] = useState({})
    useEffect(() => {
        async function fetchData() {
            const response = await AuthService.getInfoUser()
            const data = response?.data.data;
            if(data){
                setUser(data)
                setIsUser(true)
            }
            else{
                setIsUser(false)
            }
        }

        fetchData()

    }, [])
    const handLeLanguageFunctionClick = (event) => {
        setLanguageFunction(event.currentTarget);
    };
    const handleLanguageFunctionClose = () => {
        setLanguageFunction(null);
    };
    const handleNotifyClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotifyClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const show = Boolean(languageFunction);
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
                                <Link
                                    to={""}
                                    className={cx("navbar-item", "navbar-separate")}
                                >
                                    Kênh nguời bán
                                </Link>
                                <a className={cx("navbar-item", "navbar-separate")} href="">
                                    Trở thành người bán Shopee
                                </a>
                                <a className={cx("navbar-item", "navbar-separate")} href="">
                                    Tải ứng dụng
                                </a>
                                <a className={cx("navbar-item")} href="">
                                    Kết nối
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
                            <span
                                className={cx("navbar-right-item")}
                                onClick={handleNotifyClick}
                                aria-describedby={id}
                                variant="contained"
                            >
                <MdNotifications className={cx("icon")}/>
                Thông báo
              </span>

                            <a className={cx("navbar-right-item")} href="">
                                <MdContactSupport className={cx("icon")}/>
                                Hỗ trợ
                            </a>
                            <Popover
                                id={id}
                                open={show}
                                anchorEl={languageFunction}
                                onClose={handleLanguageFunctionClose}
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
                                    sx={{
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
                                            left: "calc(90% - 6px)",
                                        },
                                    }}
                                />
                                <Typography sx={{p: 2, backgroundColor: "white"}}>
                                    <div className={cx("box-language")}>
                                        <span className={cx("language-text")}>Tiếng Việt</span>
                                        <span className={cx("language-text")}>English</span>
                                    </div>
                                </Typography>
                            </Popover>
                            <span
                                className={cx("navbar-right-item")}
                                onClick={handLeLanguageFunctionClick}
                                aria-describedby={id}
                                variant="contained"
                            >
                <MdOutlineLanguage className={cx("icon")}/>
                Tiếng việt
              </span>

                            {!isUser ? (
                                <div className={cx("login-register")}>
                                    <Link
                                        to={config.routes.register}
                                        className={cx("navbar-item", "navbar-separate")}
                                    >
                                        Đăng ký
                                    </Link>
                                    <Link
                                        to={config.routes.login}
                                        className={cx("navbar-right-item")}
                                    >
                                        Đăng nhập
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

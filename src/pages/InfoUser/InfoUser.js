import React from 'react';
import classNames from "classnames/bind";
import styles from "./InfoUser.module.scss";
import {Container, Grid} from "@mui/material";
import {Button} from "@material-ui/core";

const cx = classNames.bind(styles);

function InfoUser() {
    return (
        <Container>
            <div className={cx('wrapper')}>
                <div className={cx('left-info')}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4yyk-RYZ9FZjCSSjzgjgYPDqsD4xReeyvCNgJmPdigg&s"
                        alt=""/>
                </div>
                <div className={cx('content-info')}>
                    <Grid>
                        <Grid>
                            <div className={cx("form-add")}>
                                <h1 className={cx('form-header')}>Thông tin cá nhân</h1>

                                <input className={cx('input-item')}
                                       type="text"


                                       placeholder="Id"/>
                                <div className={cx('input-box')}>
                                    <input className={cx('input-box-item')}
                                           type="text"


                                           placeholder="Username"/>
                                    <input className={cx('input-box-item')}
                                           type="text"


                                           placeholder="Password"/>

                                </div>

                                <input className={cx('input-item')}
                                       type="text"


                                       placeholder="Email"/>
                                <div className={cx('input-box')}>
                                    <input className={cx('input-box-item')}
                                           type="number"


                                           placeholder="First Name"/>
                                    <input className={cx('input-box-item')}
                                           type="text"


                                           placeholder="Last Name"/>
                                </div>
                                <input className={cx('input-item')}
                                       type="number"


                                       placeholder="Phone Number"/>
                                <div className={cx('function')}>
                                    <Button size={"large"}
                                            className={cx('btn-submit')}
                                            type={"submit"}

                                            variant={"outlined"}>
                                        Cập nhật
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </div>
        </Container>


    )
}

export default InfoUser;
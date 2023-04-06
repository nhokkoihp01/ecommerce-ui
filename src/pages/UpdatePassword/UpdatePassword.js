import React from 'react';
import classNames from "classnames/bind";
import {Container} from "@material-ui/core";


import styles from "./UpdatePassword.module.scss";


const cx = classNames.bind(styles);

function UpdatePassword(props) {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <h3>Update Password page</h3>
            </Container>
        </div>
    );
}

export default UpdatePassword;
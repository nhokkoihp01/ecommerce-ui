import React, {useContext, useState} from 'react';
import classNames from "classnames/bind";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, InputBase
} from '@material-ui/core';
import {Container} from "@mui/material";


import styles from "./Checkout.module.scss";
import {FiEdit2} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import {useTableStyles} from "~/components/CustomerMaterial";
import {CartContext} from "~/untils/CartProvider";
import {convertCurrency} from "~/untils/convertCurrency";
import {removeItemFromCart} from "~/services/workspaces.sevices";
import {NotificationManager} from "react-notifications";


const cx = classNames.bind(styles);


function Checkout(props) {
    const classes = useTableStyles();
    const {carts, totalPrice, setShouldUpdate} = useContext(CartContext);

    const handleRemove = async (productId) => {
        const user = JSON.parse(localStorage.getItem("token"))
        if (user) {
            const response = await removeItemFromCart(user.userId, productId)
            if (response.data.status === "OK") {
                NotificationManager.success('Xoá sản phẩm khỏi giỏ hàng thành công')
                setShouldUpdate(prev => !prev);
            }

        }
    }



    return (
        <div className={cx('wrapper')}>
            <Container>
                <h3 className={cx('header')}>Giỏ hàng</h3>
                {
                    carts.length > 0 ? (
                        <div className={cx('checkout')}>
                            <Paper sx={{width: '100%'}}>
                                <TableContainer component={Paper} className={classes.tableContainer} sx={{maxHeight: 440}}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{whiteSpace: "nowrap"}} className={classes.tableCell}>Tên sản
                                                    phẩm</TableCell>
                                                <TableCell style={{whiteSpace: "nowrap"}} className={classes.tableCell}>Hình
                                                    ảnh</TableCell>
                                                <TableCell style={{whiteSpace: "nowrap"}}
                                                           className={classes.tableCell}>Giá</TableCell>
                                                <TableCell style={{whiteSpace: "nowrap"}} className={classes.tableCell}>Số
                                                    lượng</TableCell>
                                                <TableCell style={{whiteSpace: "nowrap"}} className={classes.tableCell}>Chức
                                                    năng</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                carts.map((item, index) => {
                                                    return (
                                                        <TableRow key={index}
                                                                  className={index % 2 === 0 ? classes.oddRow : classes.evenRow}>
                                                            <TableCell
                                                                className={classes.tableCell}>{item.description}</TableCell>
                                                            <TableCell className={classes.imageCell}>
                                                                <img src={item.image} alt={item.name}
                                                                     className={classes.image}/>
                                                            </TableCell>
                                                            <TableCell
                                                                className={classes.tableCell}>{convertCurrency(item.newPrice)}</TableCell>
                                                            <TableCell className={classes.tableCell}>{item.quantity}</TableCell>
                                                            <TableCell className={classes.tableCell}>
                                                                <div className={cx('function')}>
                                                                    <IconButton aria-label="delete"
                                                                                onClick={() => handleRemove(item.productId)}
                                                                                className={classes.iconButton}>
                                                                        <BsTrash className={cx('icon-remove')}/>
                                                                    </IconButton>
                                                                    <IconButton
                                                                        aria-label="update"
                                                                        className={classes.iconButton}>
                                                                        <FiEdit2 className={cx('icon-edit')}/>
                                                                    </IconButton>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }


                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                            <Grid style={{paddingTop: "150px"}} container spacing={2} justifyContent={"space-between"}
                                  alignItems={"center"}>
                                <Grid item md={4}>
                                    <div className={cx('total-price')}>
                                        <p className={cx('title')}>Tổng tiền:</p>
                                        <p className={cx('price')}>{convertCurrency(totalPrice)}</p>
                                    </div>
                                </Grid>
                                <Grid container justifyContent={"flex-end"} item md={3}>
                                    <div className={cx('payment')}>
                                        <button className={cx('btn-payment')}>Thanh toán</button>
                                    </div>
                                </Grid>
                            </Grid>

                        </div>
                    ):(
                        <div className={cx('empty-cart')}>
                            <h3 className={cx('empty-title')}>Chưa có sản phẩm trong giỏ hàng</h3>
                        </div>
                    )
                }

            </Container>

        </div>
    );
}

export default Checkout;
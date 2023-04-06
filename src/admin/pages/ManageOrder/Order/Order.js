import React, {Fragment, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {
   Box, Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";



import styles from "./Order.module.scss";

import {convertCurrency, convertDate} from "~/untils/convertCurrency";
import {MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md'
import {useTableStyles} from "~/components/CustomerMaterial";
import {getAllOrder} from "~/services/workspaces.sevices";


const cx = classNames.bind(styles);

function Order(props) {
    const classes = useTableStyles();
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openStates, setOpenStates] = useState({});
    useEffect(() => {
        setIsLoading(true);
        getAllOrder().then((res) => setOrders(res?.data))
    }, [])
    const handleOpen = (orderId) => {
        setOpenStates(prevStates => ({
            ...prevStates,
            [orderId]: !prevStates[orderId]
        }));
    };
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('header')}>Tất cả đơn hàng</h3>

            <div className={cx('manage')}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table aria-label="collapsible table">
                        <TableBody>
                            {
                                orders.map((item, index) => {
                                    return (
                                        <Fragment key={item.id}>
                                            <TableRow className={index % 2 === 0 ? classes.oddRow : classes.evenRow}
                                                      sx={{'& > *': {borderBottom: 'unset'}}}>
                                                <TableCell style={{whiteSpace: "nowrap"}} className={classes.tableCell}>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => handleOpen(item.id)}
                                                    >
                                                        {open ? <MdKeyboardArrowUp className={cx('arrow-icon')}/> :
                                                            <MdKeyboardArrowDown className={cx('arrow-icon')}/>}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell style={{whiteSpace: "nowrap", fontWeight: "bold"}}
                                                           className={classes.tableCell}>
                                                    Mã đơn hàng:{item.id}
                                                </TableCell>
                                                <TableCell style={{whiteSpace: "nowrap", fontWeight: "bold"}}
                                                           className={classes.tableCell}>
                                                    Ngày tạo:{convertDate(item.createdAt)}
                                                </TableCell>
                                                <TableCell style={{whiteSpace: "nowrap", fontWeight: "bold"}}
                                                           className={classes.tableCell}>Tên
                                                    khách
                                                    hàng:{item.name}</TableCell>
                                                <TableCell style={{whiteSpace: "nowrap", fontWeight: "bold"}}
                                                           className={classes.tableCell}>Số
                                                    điện
                                                    thoại:{item.numberPhone}</TableCell>
                                                <TableCell style={{whiteSpace: "nowrap", fontWeight: "bold"}}
                                                           className={classes.tableCell}>Tổng
                                                    tiền:{convertCurrency(item.totalPrice)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                                                    <Collapse in={openStates[item.id]} timeout="auto" unmountOnExit>
                                                        <Box sx={{margin: 1}}>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell style={{whiteSpace: "nowrap"}}
                                                                                   className={classes.tableCell}>Tên sản
                                                                            phẩm</TableCell>
                                                                        <TableCell style={{whiteSpace: "nowrap"}}
                                                                                   className={classes.tableCell}>Hình
                                                                            ảnh</TableCell>
                                                                        <TableCell style={{whiteSpace: "nowrap"}}
                                                                                   className={classes.tableCell}>Số
                                                                            lượng</TableCell>
                                                                        <TableCell style={{whiteSpace: "nowrap"}}
                                                                                   className={classes.tableCell}>Giá</TableCell>
                                                                        <TableCell style={{whiteSpace: "nowrap"}}
                                                                                   className={classes.tableCell}>Trạng
                                                                            thái</TableCell>

                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {
                                                                        item.cartItems.map((cartItem, index) => {
                                                                            return (
                                                                                <TableRow key={cartItem.productId}>
                                                                                    <TableCell
                                                                                        className={classes.tableCell}>{cartItem.description}
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        className={classes.imageCell}>
                                                                                        <img src={cartItem.image}
                                                                                             alt={cartItem.name}
                                                                                             className={classes.image}/>
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        className={classes.tableCell}>{cartItem.quantity}</TableCell>
                                                                                    <TableCell
                                                                                        className={classes.tableCell}>
                                                                                        {convertCurrency(cartItem.newPrice)}
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        className={classes.tableCell}>
                                                                                        Chờ xác nhận
                                                                                    </TableCell>

                                                                                </TableRow>
                                                                            )
                                                                        })
                                                                    }
                                                                    <TableCell
                                                                        style={{width: "40%", fontWeight: "bold"}}
                                                                        className={classes.tableCell}>
                                                                        Địa chỉ:{item.address}
                                                                    </TableCell>
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </Fragment>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>

                </TableContainer>
            </div>
        </div>
    );
}

export default Order;
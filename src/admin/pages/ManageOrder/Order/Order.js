import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow, Tooltip
} from "@material-ui/core";
import {tooltipClasses} from "@mui/material";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";


import styles from "./Order.module.scss";
import {BsTrash} from "react-icons/bs";
import {FiEdit2} from "react-icons/fi";
import {convertCurrency} from "~/untils/convertCurrency";
import {useTableStyles} from "~/components/CustomerMaterial";
import {getAllOrder} from "~/services/workspaces.sevices";
import OrderItem from "~/admin/pages/ManageOrder/Order/OrderItem";


const cx = classNames.bind(styles);

function Order(props) {
    const classes = useTableStyles();
    const [orders, setOrders] = useState([])
     const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
         setIsLoading(true);
        getAllOrder().then((res) => setOrders(res.data))
        console.log(getAllOrder())
    }, [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const LightTooltip = styled(({className, ...props}) => (
        <Tooltip {...props} classes={{popper: className}}/>
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            fontSize: 16,
        },
    }));
    // const handleRemove = async (id) => {
    //     const response = await deleteProduct(id);
    //     if(response?.data.status === "200"){
    //         NotificationManager.success("Xoá sản phẩm thành công");
    //         setIsLoading(true);
    //         getAllOrder()
    //             .then((res) => setOrders(res?.data.data))
    //             .finally(() => setIsLoading(false));
    //     }
    //
    // }

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('header')}>Tất cả Order</h3>

            <div className={cx('manage')}>
                <Paper sx={{width: '100%'}}>
                    <TableContainer component={Paper} className={classes.tableContainer}
                                    sx={{maxHeight: 440}}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{whiteSpace: "nowrap"}}
                                               className={classes.tableCell}>
                                        Id
                                    </TableCell>
                                    <TableCell style={{whiteSpace: "nowrap"}}
                                               className={classes.tableCell}>
                                        Danh sách sản phẩm
                                    </TableCell>
                                    <TableCell style={{whiteSpace: "nowrap"}}
                                               className={classes.tableCell}>
                                        Tổng tiền
                                    </TableCell>
                                    <TableCell style={{whiteSpace: "nowrap"}}
                                               className={classes.tableCell}>
                                       Địa chỉ
                                    </TableCell>
                                    <TableCell style={{whiteSpace: "nowrap"}}
                                               className={classes.tableCell}>
                                        Chức năng
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        console.log(orders)
                                        return (
                                            <TableRow key={item.id}
                                                      className={index % 2 === 0 ? classes.oddRow : classes.evenRow}>
                                                <TableCell
                                                    className={classes.tableCell}>{item.userId}</TableCell>

                                               <TableCell className={classes.tableCell}>
                                                   <OrderItem cartItems={item.cartItems}/>
                                               </TableCell>
                                                <TableCell
                                                    className={classes.tableCell}>{convertCurrency(item.totalPrice)}</TableCell>
                                                <TableCell
                                                    className={classes.tableCell}>{item.address}</TableCell>
                                                <TableCell className={classes.tableCell}>
                                                    <div className={cx('function')}>
                                                        <LightTooltip title="remove">
                                                            <IconButton className={classes.iconButton}
                                                                        onClick={() => {}}
                                                                        aria-label="remove"
                                                            >
                                                                <BsTrash className={cx('icon-remove')}/>
                                                            </IconButton>

                                                        </LightTooltip>
                                                        <Link to={`/manage-product/edit/${item.id}`}>
                                                            <LightTooltip title="Edit">
                                                                <IconButton className={classes.iconButton}
                                                                            aria-label="edit"
                                                                >
                                                                    <FiEdit2 className={cx('icon-edit')}/>
                                                                </IconButton>

                                                            </LightTooltip>
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        sx={{
                            fontWeight: 'bold',
                            mx: 0.5,
                            fontSize: 16,
                        }}
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={orders?.length || 0}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage="Lựa chọn số lượng sản phẩm"
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
}

export default Order;
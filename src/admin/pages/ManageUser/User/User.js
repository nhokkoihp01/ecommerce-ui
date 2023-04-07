import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, Tooltip
} from "@material-ui/core";
import {Link} from "react-router-dom";
import styled from "@emotion/styled";
import {NotificationManager} from "react-notifications";


import styles from "./User.module.scss";
import {BsTrash} from "react-icons/bs";
import {FiEdit2} from "react-icons/fi";
import {useTableStyles} from "~/components/CustomerMaterial";
import { getAllUsers} from "~/services/workspaces.sevices";
import {tooltipClasses} from "@mui/material";


const cx = classNames.bind(styles);

function User(props) {
    const classes = useTableStyles();
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        getAllUsers(0).then((res) => setUsers(res?.data))
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
    const handleRemove = async (id) => {
        console.log(id)
        // const response = await deleteProduct(id);
        // if(response?.data.status === "200"){
        //     NotificationManager.success("Xoá sản phẩm thành công");
        //     setIsLoading(true);
        //     getAllProduct()
        //         .then((res) => setProducts(res?.data.data))
        //         .finally(() => setIsLoading(false));
        // }

    }
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('header')}>Tất cả sản phẩm</h3>

            <div className={cx('manage')}>
                <Paper sx={{width: '100%'}}>
                    <TableContainer component={Paper} className={classes.tableContainer}
                                    sx={{maxHeight: 440}}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{whiteSpace: "nowrap"}}
                                               className={classes.tableCell}>
                                        Tên tài khoản
                                    </TableCell>
                                    <TableCell style={{whiteSpace: "nowrap"}}
                                               className={classes.tableCell}>
                                        Email
                                    </TableCell>
                                    <TableCell style={{whiteSpace: "nowrap"}}
                                               className={classes.tableCell}>
                                        Số điện thoại
                                    </TableCell>
                                    <TableCell style={{whiteSpace: "nowrap"}}
                                               className={classes.tableCell}>
                                        Tên khách hàng
                                    </TableCell>
                                    <TableCell style={{whiteSpace: "nowrap"}}
                                               className={classes.tableCell}>
                                        Chức năng
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow key={item.id}
                                                      className={index % 2 === 0 ? classes.oddRow : classes.evenRow}>
                                                <TableCell
                                                    className={classes.tableCell}>{item.username}</TableCell>
                                                <TableCell className={classes.tableCell}>
                                                    {item.email}
                                                </TableCell>
                                                <TableCell
                                                    className={classes.tableCell}>{item.numberPhone}</TableCell>
                                                <TableCell
                                                    className={classes.tableCell}>{item.firstName + " " + item.lastName}</TableCell>
                                                <TableCell className={classes.tableCell}>
                                                    <div className={cx('function')}>
                                                        <LightTooltip title="remove">
                                                            <IconButton className={classes.iconButton}
                                                                        onClick={() => handleRemove(item.id)}
                                                                        aria-label="remove"
                                                            >
                                                                <BsTrash className={cx('icon-remove')}/>
                                                            </IconButton>

                                                        </LightTooltip>
                                                        <Link to={``}>
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
                        count={users?.length || 0}
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

export default User;
import React, {useContext} from 'react';
import classNames from "classnames/bind";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from '@material-ui/core';
import {Container} from "@mui/material";



import styles from "./Checkout.module.scss";
import {FiEdit2} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import {useTableStyles} from "~/components/CustomerMaterial";
import {CartContext} from "~/untils/CartProvider";
import {convertCurrency} from "~/untils/convertCurrency";


const cx = classNames.bind(styles);



function Checkout(props) {
    const classes = useTableStyles();
    const {carts} = useContext(CartContext);
    return (
        <div className={cx('wrapper')}>
           <Container>
               <h3 className={cx('header')}>Giỏ hàng</h3>
               <div className={cx('checkout')}>
                   <Paper sx={{ width: '100%',overflow:"hiden" }}>
                       <TableContainer component={Paper} className={classes.tableContainer} sx={{ maxHeight: 440 }}>
                           <Table aria-label="simple table">
                               <TableHead>
                                   <TableRow>
                                       <TableCell style={{ whiteSpace: "nowrap" }} className={classes.tableCell}>Tên sản phẩm</TableCell>
                                       <TableCell style={{ whiteSpace: "nowrap" }} className={classes.tableCell}>Hình ảnh</TableCell>
                                       <TableCell style={{ whiteSpace: "nowrap" }} className={classes.tableCell}>Giá</TableCell>
                                       <TableCell style={{ whiteSpace: "nowrap" }} className={classes.tableCell}>Số lượng</TableCell>
                                       <TableCell style={{ whiteSpace: "nowrap" }} className={classes.tableCell}>Chức năng</TableCell>
                                   </TableRow>
                               </TableHead>
                               <TableBody>
                                   {
                                       carts.map((item,index)=>{
                                           return (
                                               <TableRow key={index} className={index % 2 === 0 ? classes.oddRow : classes.evenRow}>
                                                   <TableCell className={classes.tableCell}>{item.description}</TableCell>
                                                   <TableCell className={classes.imageCell}>
                                                       <img src={item.image} alt={item.name} className={classes.image} />
                                                   </TableCell>
                                                   <TableCell className={classes.tableCell}>{convertCurrency(item.newPrice)}</TableCell>
                                                   <TableCell className={classes.tableCell}>{item.quantity}</TableCell>
                                                   <TableCell className={classes.tableCell}>
                                                       <div className={cx('function')}>
                                                           <IconButton aria-label="delete" className={classes.iconButton}>
                                                               <BsTrash className={cx('icon-remove')}/>
                                                           </IconButton>
                                                           <IconButton aria-label="update" className={classes.iconButton}>
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
               </div>

           </Container>
        </div>
    );
}

export default Checkout;
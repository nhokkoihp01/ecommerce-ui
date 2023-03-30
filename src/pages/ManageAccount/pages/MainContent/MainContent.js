import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    TextField,
    MenuItem,
    Select,
    FormGroup,
    Checkbox,
    Button

} from '@material-ui/core';
import {Grid} from "@mui/material";
import {Container} from "@mui/material";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


import {FiEdit2} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import {MdAdd} from 'react-icons/md'
import {useTableStyles} from "~/components/CustomerMaterial";

import {convertCurrency} from "~/untils/convertCurrency";
import {getAllProduct} from "~/services/workspaces.sevices";

import styles from "./MainContent.module.scss";

const cx = classNames.bind(styles);

function MainContent() {
    const classes = useTableStyles();
    const [products, setProducts] = useState([])
    useEffect(() => {
        getAllProduct().then((res) => setProducts(res.data.data))
    }, [])
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);

    return (


        <div className={cx('wrapper')}>

            <div className={cx('main-content')}>


                <h3 className={cx('header')}>Quản lí tài khoản</h3>
                <div className={cx('add-product')} onClick={handleOpenAdd}>
                    <h4>
                        Thêm sản phẩm
                    </h4>

                    <MdAdd className={cx('icon-add')}/>

                </div>
                <Modal
                    open={openAdd}
                    onClose={handleCloseAdd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box className={cx('modal')}>
                        <Container>
                            <Grid>
                                <Grid>
                                    <div className={cx("form-add")}>
                                        <h1 className={cx('form-header')}>Thêm sản phẩm</h1>

                                        <input className={cx('input-item')}
                                               type="text"


                                               placeholder="Id"/>
                                        <input className={cx('input-item')}
                                               type="text"


                                               placeholder="Tên sản phẩm"/>
                                        <input className={cx('input-item-file')}
                                               type="file"


                                               placeholder="Hình sản phẩm"/>
                                        <input className={cx('input-item')}
                                               type="text"


                                               placeholder="Mô tả"/>
                                        <input className={cx('input-item')}
                                               type="number"


                                               placeholder="Giá ban đầu"/>
                                        <input className={cx('input-item')}
                                               type="text"


                                               placeholder="Giá mới"/>
                                        <input className={cx('input-item')}
                                               type="number"


                                               placeholder="Số lượng"/>
                                        <div className={cx('function')}>
                                            <Button size={"large"}
                                                    className={cx('btn-submit')}
                                                    type={"submit"}

                                                    variant={"outlined"}>
                                                Thêm
                                            </Button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Modal>
                <Modal
                    open={openUpdate}
                    onClose={handleCloseUpdate}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box className={cx('modal')}>
                        <Container>
                            <Grid>
                                <Grid>
                                    <div className={cx("form-add")}>
                                        <h1 className={cx('form-header')}>Sửa sản phẩm</h1>

                                        <input className={cx('input-item')}
                                               type="text"


                                               placeholder="Id"/>
                                        <input className={cx('input-item')}
                                               type="text"


                                               placeholder="Tên sản phẩm"/>
                                        <input className={cx('input-item-file')}
                                               type="file"


                                               placeholder="Hình sản phẩm"/>
                                        <input className={cx('input-item')}
                                               type="text"


                                               placeholder="Mô tả"/>
                                        <input className={cx('input-item')}
                                               type="number"


                                               placeholder="Giá ban đầu"/>
                                        <input className={cx('input-item')}
                                               type="text"


                                               placeholder="Giá mới"/>
                                        <input className={cx('input-item')}
                                               type="number"


                                               placeholder="Số lượng"/>
                                        <div className={cx('function')}>
                                            <Button size={"large"}
                                                    className={cx('btn-submit')}
                                                    type={"submit"}

                                                    variant={"outlined"}>
                                                Sửa
                                            </Button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Modal>
                <div className={cx('product-manage')}>
                    <Paper sx={{width: '100%', overflow: "hiden"}}>
                        <TableContainer component={Paper} className={classes.tableContainer} sx={{maxHeight: 440}}>
                            <Grid item xs={12}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{whiteSpace: "nowrap"}}
                                                       className={classes.tableCell}>Id</TableCell>
                                            <TableCell style={{whiteSpace: "nowrap"}} className={classes.tableCell}>Tên
                                                sản
                                                phẩm</TableCell>
                                            <TableCell style={{whiteSpace: "nowrap"}} className={classes.tableCell}>Hình
                                                ảnh</TableCell>

                                            <TableCell style={{whiteSpace: "nowrap"}}
                                                       className={classes.tableCell}>Giá ban đầu</TableCell>
                                            <TableCell style={{whiteSpace: "nowrap"}}
                                                       className={classes.tableCell}>Giá mới</TableCell>
                                            <TableCell style={{whiteSpace: "nowrap"}} className={classes.tableCell}>Số
                                                lượng</TableCell>
                                            <TableCell style={{whiteSpace: "nowrap"}} className={classes.tableCell}>Chức
                                                năng</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            products.map((item, index) => {
                                                return (
                                                    <TableRow key={index}
                                                              className={index % 2 === 0 ? classes.oddRow : classes.evenRow}>
                                                        <TableCell className={classes.tableCell}>{item.id}</TableCell>
                                                        <TableCell
                                                            className={classes.tableCell}>{item.description}</TableCell>
                                                        <TableCell className={classes.imageCell}>
                                                            <img src={item.image} alt={item.name}
                                                                 className={classes.image}/>
                                                        </TableCell>

                                                        <TableCell
                                                            className={classes.tableCell}>{convertCurrency(item.oldPrice)}</TableCell>
                                                        <TableCell
                                                            className={classes.tableCell}>{convertCurrency(item.newPrice)}</TableCell>
                                                        <TableCell
                                                            className={classes.tableCell}>{item.quantity}</TableCell>
                                                        <TableCell className={classes.tableCell}>
                                                            <div className={cx('function')}>
                                                                <IconButton aria-label="delete"
                                                                            className={classes.iconButton}>
                                                                    <BsTrash className={cx('icon-remove')}/>
                                                                </IconButton>
                                                                <IconButton aria-label="update"
                                                                            className={classes.iconButton}
                                                                            onClick={handleOpenUpdate}>
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
                            </Grid>
                        </TableContainer>

                    </Paper>
                </div>
            </div>

        </div>


    );

}

export default MainContent;
import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {InputBase, Grid, FormControl, Select, MenuItem, Button, FormHelperText} from "@material-ui/core";
import validator from "validator";
import {NotificationManager} from "react-notifications";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {v4} from "uuid"

import styles from "./AddProduct.module.scss";
import Empty from '~/admin/assets/empty/empty.jpg'
import {getCategory, insertProduct} from "~/services/workspaces.sevices";
import UpLoadFileImage from "~/components/UploadFileImage";
import {storage} from "~/firebase/firebase";

const cx = classNames.bind(styles);

function AddProduct(props) {
    const [categoryId, setCategoryId] = useState("6417f864e4fd34289f93334f");
    const [categories, setCategories] = useState([])

    const [errorNameProduct, setErrorNameProduct] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorNewPrice, setErrorNewPrice] = useState('')
    const [errorQuantity, setErrorQuantity] = useState('')



    const [isChangeImage, setIsChangeImage] = useState(false)
    const [showButton, setShowButton] = useState(true);
    const [open, setOpen] = useState(true)
    const [images, setImages] = useState([]);
    const maxNumber = 1;


    const onChange = (imageList, addUpdateIndex) => {

        setShowButton(false)
        setOpen(false)
        setIsChangeImage(true)
        setImages(imageList);

    };


    useEffect(() => {
        getCategory().then((res) => setCategories(res?.data))
    }, [])

    const handleChange = (event) => {
        setCategoryId(event.target.value);
    };

    const classProduct = {
        nameProduct: '',
        description: '',
        newPrice: '',
        oldPrice: 0,
        quantity: '',
        sale: 0,
        image: ''
    }
    const [formValue, setFormValue] = useState(classProduct)
    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setFormValue({...formValue, [name]: value})
    }
    const validate = () => {
        let hasError = false;
        if (validator.isEmpty(formValue.nameProduct)) {
            setErrorNameProduct("Tên sản phẩm không được để trống!")
            hasError = true;
        }
        if (validator.isEmpty(formValue.description)) {
            setErrorDescription("Mô tả sản phẩm không được để trống!")
            hasError = true;
        }
        if (validator.isEmpty(formValue.newPrice)) {
            setErrorNewPrice("Giá tiền mới đệm không được để trống!")
            hasError = true;
        }
        if (validator.isEmpty(formValue.quantity)) {
            setErrorQuantity("Số lượng sản phẩm không được để trống")
            hasError = true;
        }

        return hasError;
    };
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        if (validate()) {
            return;
        }
        const storageRef = ref(storage, `images/${images[0]?.file.name + v4()}`);
        const snapshot = await uploadBytes(storageRef, images[0].file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const body = {
            name: formValue.nameProduct,
            description: formValue.description,
            image: downloadURL,
            quantity: formValue.quantity,
            newPrice: formValue.newPrice,
            oldPrice: formValue.oldPrice,
            sale: formValue.sale,
            categoryId: categoryId,
        };
        console.log(body)
        const response = await insertProduct(body);
        if (response.data.status === "400") {
            setErrorNameProduct("Sản phẩm đã tồn tại");
        } else {
            NotificationManager.success("Thêm sản phẩm thành công");
        }


    }
    useEffect(() => {
        if (formValue.nameProduct.length > 0) {
            setErrorNameProduct('')
        }

    }, [formValue.nameProduct])
    useEffect(() => {
        if (formValue.description.length > 0) {
            setErrorDescription('')
        }

    }, [formValue.description])
    useEffect(() => {
        if (!validator.isEmpty(formValue.newPrice)) {
            setErrorNewPrice('')
        }

    }, [formValue.newPrice])

    useEffect(() => {
        if (!validator.isEmpty(formValue.quantity)) {
            setErrorQuantity('')
        }
    }, [formValue.quantity])
    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    }


    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('header')}>Thêm sản phẩm</h3>
            <div className={cx('form-product')}>
                <Grid container direction={"column"}>
                    <Grid item md={2} sm={12}>
                        <UpLoadFileImage imageProduct={Empty}
                                         open={open}
                                         images={images}
                                         name={"User"}
                                         maxNumber={maxNumber}
                                         onChange={onChange}
                                         showButton={showButton}/>
                    </Grid>
                    {
                        isChangeImage && (
                            <Grid item md={8} sm={12}>
                                <div className={cx('input')}>
                                    <h4 className={cx('name-product')}>Tên sản phẩm</h4>
                                    <InputBase fullWidth
                                               name="nameProduct"
                                               spellCheck={false}
                                               value={formValue.nameProduct}
                                               onChange={handleChangeInput}
                                               className={cx('input-item')}/>
                                    <FormHelperText className={cx('error')}>{errorNameProduct}</FormHelperText>
                                </div>
                            </Grid>
                        )
                    }
                    {
                        isChangeImage && (
                            <Grid item md={8} sm={12}>
                                <div className={cx('input')}>
                                    <h4 className={cx('name-product')}>Mô tả sản phẩm</h4>
                                    <InputBase fullWidth
                                               spellCheck={false}
                                               name="description"
                                               value={formValue.description}
                                               onChange={handleChangeInput}
                                               className={cx('input-item')}/>
                                    <FormHelperText className={cx('error')}>{errorDescription}</FormHelperText>
                                </div>
                            </Grid>
                        )
                    }
                    {
                        isChangeImage && (
                            <Grid item md={8} sm={12}>
                                <div className={cx('input')}>
                                    <h4 className={cx('name-product')}>Giá mới</h4>
                                    <InputBase fullWidth
                                               spellCheck={false}
                                               name="newPrice"
                                               value={formValue.newPrice}
                                               inputProps={{
                                                   min: 1,
                                                   max: 10,
                                                   step: 1,
                                               }}
                                               onKeyPress={handleKeyPress}
                                               type="number"
                                               onChange={handleChangeInput}
                                               className={cx('input-item')}/>
                                    <FormHelperText className={cx('error')}>{errorNewPrice}</FormHelperText>
                                </div>
                            </Grid>
                        )
                    }
                    {
                        isChangeImage && (
                            <Grid item md={8} sm={12}>
                                <div className={cx('input')}>
                                    <h4 className={cx('name-product')}>Giá cũ</h4>
                                    <InputBase fullWidth
                                               spellCheck={false}
                                               name="oldPrice"
                                               inputProps={{
                                                   min: 1,
                                                   max: 10,
                                                   step: 1,
                                               }}
                                               onKeyPress={handleKeyPress}
                                               type="number"
                                               value={formValue.oldPrice}
                                               onChange={handleChangeInput}
                                               className={cx('input-item')}/>
                                </div>
                            </Grid>
                        )
                    }
                    {
                        isChangeImage && (
                            <Grid item md={8} sm={12}>
                                <div className={cx('input')}>
                                    <h4 className={cx('name-product')}>Sale</h4>
                                    <InputBase fullWidth
                                               spellCheck={false}
                                               inputProps={{
                                                   min: 1,
                                                   max: 10,
                                                   step: 1,
                                               }}
                                               onKeyPress={handleKeyPress}
                                               type="number"
                                               name="sale"
                                               value={formValue.sale}
                                               onChange={handleChangeInput}
                                               className={cx('input-item')}/>
                                </div>
                            </Grid>
                        )
                    }
                    {
                        isChangeImage && (
                            <Grid item md={8} sm={12}>
                                <div className={cx('input')}>
                                    <h4 className={cx('name-product')}>Số lượng</h4>
                                    <InputBase fullWidth
                                               spellCheck={false}
                                               name="quantity"
                                               type="number"
                                               onKeyPress={handleKeyPress}
                                               value={formValue.quantity}
                                               onChange={handleChangeInput}
                                               className={cx('input-item')}/>
                                    <FormHelperText className={cx('error')}>{errorQuantity}</FormHelperText>
                                </div>
                            </Grid>
                        )
                    }
                    {
                        isChangeImage && (
                            <Grid item md={5} sm={12}>
                                <div className={cx('input')}>
                                    <h4 className={cx('name-product')}>Chọn thể loại</h4>
                                    <FormControl className={cx('input-item')} fullWidth>
                                        <Select
                                            className={cx('select')}
                                            value={categoryId}
                                            onChange={handleChange}>
                                            {/*<MenuItem value={0}>None</MenuItem>*/}
                                            {
                                                categories.map((item, index) => {
                                                    return (
                                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                        )
                    }
                    {
                        isChangeImage && (
                            <Grid item md={8} sm={12}>
                                <div className={cx('function')}>
                                    <Button sx={{padding: "4px"}}
                                            onClick={handleCreateProduct}
                                            color="primary"
                                            variant="contained"
                                            size="large">
                                        Tạo sản phẩm
                                    </Button>
                                </div>
                            </Grid>
                        )
                    }
                </Grid>
            </div>
        </div>
    );
}

export default AddProduct;
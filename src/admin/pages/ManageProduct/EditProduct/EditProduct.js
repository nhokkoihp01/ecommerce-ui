import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Button, FormControl, FormHelperText, Grid, InputBase, MenuItem, Select} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {NotificationManager} from "react-notifications";

import styles from "./EditProduct.module.scss";
import UpLoadFileImage from "~/components/UploadFileImage";
import {getCategory, getProductById, updateProduct} from "~/services/workspaces.sevices";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "~/firebase/firebase";
import {v4} from "uuid";

const cx = classNames.bind(styles);

function EditProduct(props) {
    const {id} = useParams();
    const [product, setProduct] = useState({})
    const [categoryId, setCategoryId] = useState('');
    const [nameProduct, setNameProduct] = useState('')
    const [description, setDescription] = useState('')
    const [newPrice, setNewPrice] = useState()
    const [oldPrice, setOldPrice] = useState()
    const [sale, setSale] = useState()
    const [quantity, setQuantity] = useState()
    useEffect(() => {
        async function fetchData() {
            const response = await getProductById(id);
            const data = response?.data;
            if (data) {
                setProduct(data)
                setCategoryId(data.categoryId)
                setNameProduct(data.name)
                setDescription(data.description)
                setNewPrice(data.newPrice)
                setOldPrice(data.oldPrice)
                setSale(data.sale)
                setQuantity(data.quantity)
            }
        }

        fetchData();
    }, [id]);
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategory().then((res) => setCategories(res?.data))
    }, [])


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
    const handleChange = (event) => {
        setCategoryId(event.target.value);
    };
    console.log(images)
    const classProduct = {
        nameProduct: nameProduct,
        description: '',
        newPrice: '',
        oldPrice: 0,
        quantity: '',
        sale: 0,
        image: ''
    }
    const [formValue, setFormValue] = useState(classProduct)
    useEffect(() => {
        const updatedClassProduct = {
            ...classProduct,
            nameProduct: nameProduct,
            description: description,
            newPrice: newPrice + "",
            oldPrice: oldPrice,
            quantity: quantity + "",
            sale: sale,
            image: ''
        }

        setFormValue(updatedClassProduct);
    }, [nameProduct, description, newPrice, oldPrice, quantity, sale]);
    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setFormValue({...formValue, [name]: value})
    }
    const validate = () => {
        let hasError = false;
        if (formValue.nameProduct === "") {
            setErrorNameProduct("Tên sản phẩm không được để trống!")
            hasError = true;
        }
        if (formValue.description === "") {
            setErrorDescription("Mô tả sản phẩm không được để trống!")
            hasError = true;
        }
        if (formValue.newPrice === "") {
            setErrorNewPrice("Giá tiền mới đệm không được để trống!")
            hasError = true;
        }
        if (formValue.quantity === "") {
            setErrorQuantity("Số lượng sản phẩm không được để trống")
            hasError = true;
        }

        return hasError;
    };
    const handleEditProduct = async (e) => {
        e.preventDefault();
        if (validate()) {
            return;
        }
        let downloadURL = product.image;
        if (images.length > 0) {
            const storageRef = ref(storage, `images/${images[0]?.file.name + v4()}`);
            const snapshot = await uploadBytes(storageRef, images[0].file);
            downloadURL = await getDownloadURL(snapshot.ref);
        }

        const body = {
            name: formValue.nameProduct,
            description: formValue.description,
            image: downloadURL,
            quantity: parseInt(formValue.quantity),
            newPrice: parseInt(formValue.newPrice),
            oldPrice: formValue.oldPrice,
            sale: formValue.sale,
            categoryId: categoryId,
        };
        const response = await updateProduct(id,body);
        if (response.data.status === "400") {
            NotificationManager.error("Cập nhật sản phẩm thất bại")
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
        if (formValue.newPrice.length > 0) {
            setErrorNewPrice('')
        }

    }, [formValue.newPrice])

    useEffect(() => {
        if (formValue.quantity.length > 0) {
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
            <h3 className={cx('header')}>Sửa sản phẩm</h3>
            <div className={cx('form-product')}>
                <Grid container direction={"column"}>
                    <Grid item md={2} sm={12}>
                        <UpLoadFileImage imageProduct={product.image}
                                         open={open}
                                         images={images}
                                         name={"User"}
                                         maxNumber={maxNumber}
                                         onChange={onChange}
                                         showButton={showButton}/>
                    </Grid>

                    <Grid item md={8} sm={12}>
                        <div className={cx('input')}>
                            <h4 className={cx('name-product')}>Tên sản phẩm</h4>
                            <InputBase fullWidth
                                       spellCheck={false}
                                       name="nameProduct"
                                       value={formValue.nameProduct}
                                       onChange={handleChangeInput}
                                       className={cx('input-item')}/>
                            <FormHelperText className={cx('error')}>{errorNameProduct}</FormHelperText>
                        </div>
                    </Grid>


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


                    <Grid item md={8} sm={12}>
                        <div className={cx('input')}>
                            <h4 className={cx('name-product')}>Giá mới</h4>
                            <InputBase fullWidth
                                       name="newPrice"
                                       spellCheck={false}
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

                    <Grid item md={8} sm={12}>
                        <div className={cx('input')}>
                            <h4 className={cx('name-product')}>Giá cũ</h4>
                            <InputBase fullWidth
                                       name="oldPrice"
                                       spellCheck={false}
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

                    <Grid item md={5} sm={12}>
                        <div className={cx('input')}>
                            <h4 className={cx('name-product')}>Chọn thể loại</h4>
                            <FormControl className={cx('input-item')} fullWidth>
                                <Select
                                    className={cx('select')}
                                    value={categoryId}
                                    onChange={handleChange}>
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

                    <Grid item md={8} sm={12}>
                        <div className={cx('function')}>
                            <Button sx={{padding: "4px"}}
                                    onClick={handleEditProduct}
                                    color="primary"
                                    variant="contained"
                                    size="large">
                                Cập nhật
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default EditProduct;
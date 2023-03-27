import React from 'react';
import classNames from "classnames/bind";
import styles from "./ManageProduct.module.scss";
import {FiEdit2} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import {MdAdd} from 'react-icons/md';
const cx = classNames.bind(styles);


function ManageProduct(props) {


    return (


        <div className={cx('table-manage')}>


            <div className={cx('table-wrapper')}>
                <div className={cx('table-title')}>
                    <h4>
                        Add New Product
                    </h4>
                    <div className={cx('btn-add')}>
                        <MdAdd/>
                    </div>
                </div>
                <div className={cx('table')}>

                    <div className={cx('row-header-green')}>
                        <div className={cx('cell')}>
                            Id
                        </div>
                        <div className={cx('cell')}>
                            Name Product
                        </div>
                        <div className={cx('cell')}>
                            Image Product
                        </div>
                        <div className={cx('cell')}>
                            Description
                        </div>
                        <div className={cx('cell')}>
                            New Price
                        </div>
                        <div className={cx('cell')}>
                            Old Price
                        </div>
                        <div className={cx('cell')}>
                            Quantity
                        </div>
                        <div className={cx('cell')}>
                           Sale
                        </div>
                        <div className={cx('cell')}>
                            Category Id
                        </div>
                        <div className={cx('cell')}>
                            Option
                        </div>
                    </div>

                    <div className={cx('row')}>
                        <div className={cx('cell')} >
                            1
                        </div>
                        <div className={cx('cell')} >
                            Ao thun
                        </div>
                        <div className={cx('cell')} >
                            <img className={cx('cell-img')} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4yyk-RYZ9FZjCSSjzgjgYPDqsD4xReeyvCNgJmPdigg&s" alt=""/>
                        </div>
                        <div className={cx('cell')} >
                            kientran
                        </div>
                        <div className={cx('cell')} >
                           90
                        </div>
                        <div className={cx('cell')} >
                            70
                        </div>
                        <div className={cx('cell')} >
                            10
                        </div>
                        <div className={cx('cell')} >
                            1
                        </div>
                        <div className={cx('cell')} >
                            Product Ao
                        </div>
                        <div className={cx('cell')} >
                            <div className={cx('btn-option')}>
                                <div className={cx('btn-edit')}>
                                    <FiEdit2/>
                                </div>
                                <div className={cx('btn-remove')}>
                                    <BsTrash/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('cell')} >
                            1
                        </div>
                        <div className={cx('cell')} >
                            Ao thun
                        </div>
                        <div className={cx('cell')} >
                            <img className={cx('cell-img')} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4yyk-RYZ9FZjCSSjzgjgYPDqsD4xReeyvCNgJmPdigg&s" alt=""/>
                        </div>
                        <div className={cx('cell')} >
                            kientran
                        </div>
                        <div className={cx('cell')} >
                            90
                        </div>
                        <div className={cx('cell')} >
                            70
                        </div>
                        <div className={cx('cell')} >
                            10
                        </div>
                        <div className={cx('cell')} >
                            1
                        </div>
                        <div className={cx('cell')} >
                            Product Ao
                        </div>
                        <div className={cx('cell')} >
                            <div className={cx('btn-option')}>
                                <div className={cx('btn-edit')}>
                                    <FiEdit2/>
                                </div>
                                <div className={cx('btn-remove')}>
                                    <BsTrash/>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
}

export default ManageProduct;
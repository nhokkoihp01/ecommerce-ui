import React from 'react';
import ManageLayout from "~/admin/components/ManageLayout";
import AddProduct from "~/admin/pages/ManageProduct/AddProduct/AddProduct";

function ManageAddProduct(props) {
    return (
        <ManageLayout children={<AddProduct/>}/>
    );
}

export default ManageAddProduct;
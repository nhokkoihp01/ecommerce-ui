import React from 'react';

import ManageLayout from "~/admin/components/ManageLayout";
import Product from "~/admin/pages/ManageProduct/Product/Product";


function ManageProduct(props) {

    return (
        <ManageLayout children={<Product/>}/>
    );
}

export default ManageProduct;
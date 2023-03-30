import React from 'react';

import ManageLayout from "~/admin/components/ManageLayout";
import EditProduct from "~/admin/pages/ManageProduct/EditProduct/EditProduct";

function ManageEditProduct(props) {
    return (
        <ManageLayout children={<EditProduct/>}/>
    );
}

export default ManageEditProduct;

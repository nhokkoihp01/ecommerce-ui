import React from 'react';

import ManageLayout from "~/admin/components/ManageLayout";
import Order from "~/admin/pages/ManageOrder/Order/Order";

function ManageOrder(props) {
    return (
        <ManageLayout children={<Order/>}/>
    );
}

export default ManageOrder;
import React from 'react';
import ManageLayout from "~/admin/components/ManageLayout";
import User from "~/admin/pages/ManageUser/User/User";

function ManageUser(props) {
    return (
        <ManageLayout children={<User/>}/>
    );
}

export default ManageUser;
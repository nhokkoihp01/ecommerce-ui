import React from 'react';
import classNames from "classnames/bind";
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";


import styles from "./ManageLayout.module.scss";
import {MdOutlineEmojiTransportation} from "react-icons/md";
import {BiDownArrowCircle} from 'react-icons/bi'
import {FaHeart,FaUserFriends} from "react-icons/fa";
import config from "~/config";
import Header from "~/admin/components/Header/Header";


const cx = classNames.bind(styles);

function ManageLayout({children}) {
    const isTablet = useMediaQuery({maxWidth: 768})
    const categories = [
        {
            id: 1,
            label: 'Quản lý sản phẩm',
            icon: <BiDownArrowCircle/>,
            items: [
                {
                    name: 'Tất cả sản phẩm',
                    to: config.routes.manageProduct
                },
                {
                    name: 'Thêm sản phẩm',
                    to: config.routes.addProduct
                },
            ]
        },
        {
            id: 2,
            label: 'Quản lý đơn hàng',
            icon: <FaHeart/>,
            items: [
                {
                    name: 'Tất cả',
                    to: config.routes.manageOrder
                },
                {
                    name: 'Đơn hủy',
                    to: ""
                },
            ]
        },
        {
            id: 2,
            label: 'Quản lý vận chuyển',
            icon: <MdOutlineEmojiTransportation/>,
            items: [
                {
                    name: 'Tất cả',
                    to: ""
                },
                {
                    name: 'Đơn hủy',
                    to: ""
                },
            ]
        },
        {
            id: 3,
            label: 'Quản lý tài khoản',
            icon: <FaUserFriends/>,
            items: [
                {
                    name: 'Tất cả',
                    to: config.routes.manageUser
                },
                {
                    name: 'Thêm tài khoản',
                    to: ""
                },
                {
                    name: 'Tài khoản bị cấm',
                    to: ""
                },
            ]
        },

    ]

    return (
        <div className={cx('wrapper')}>
            <Header/>
            <div style={{display: 'flex', height: '100%', minHeight: '400px'}}>
                <Sidebar defaultCollapsed={isTablet} collapsedWidth="50px">
                    <Menu
                        rootStyles={{
                            backgroundColor: '#e1e1e1',
                            color: '#333',
                        }}
                        menuItemStyles={{
                            button: ({level, active, disabled}) => {
                                if (level === 0)
                                    return {
                                        color: disabled ? '#f5d9ff' : 'rgba(10,104,255)',
                                        backgroundColor: active ? 'rgba(10,104,255)' : "#fff",
                                    };
                            },

                        }}
                    >
                        {
                            categories.map((category, index) => {
                                return (
                                    <SubMenu label={category.label}
                                             defaultOpen={!isTablet}
                                             key={category.id}
                                             icon={category.icon}>

                                        {
                                            category.items.map((item, index) => {
                                                return (
                                                    <MenuItem key={index}
                                                              component={<Link to={item.to}/>}
                                                              active={window.location.pathname === item.to}>
                                                        {item.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }

                                    </SubMenu>
                                )
                            })
                        }

                    </Menu>
                </Sidebar>
                <main style={{padding: 10,width:"100%"}}>{children}</main>
            </div>
        </div>
    );
}

export default ManageLayout;
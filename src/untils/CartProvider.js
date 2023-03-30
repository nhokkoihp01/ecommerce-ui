import React, {createContext, useEffect, useState} from 'react';


import AuthService from "~/services/auth/AuthService";
import {getAllCartsByUserId} from "~/services/workspaces.sevices";


export const CartContext = createContext([]);

function CartProvider(props) {
    const [carts, setCarts] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [totalPrice,setTotalPrice] = useState()
    const [user,setUser] = useState({})

    async function getAllCartByUser() {
        const user = JSON.parse(localStorage.getItem("token"))
        if (user && user.accessToken) {
            const response = await AuthService.getInfoUser()
            const data = response?.data.data;
            if (data) {
                const carts = await getAllCartsByUserId(data.id)
                setTotalPrice(carts?.data[0].totalPrice)
                if (carts.data !== null) {

                    setCarts(carts?.data[0].cartItems)
                } else {
                    setCarts([])
                }
            }
        }
    }
    async function getInfoUser() {
        const user = JSON.parse(localStorage.getItem("token"))
        if (user && user.accessToken) {
            const response = await AuthService.getInfoUser()
            const data = response?.data.data;
            setUser(data)
        }
    }

    useEffect(() => {
        getAllCartByUser()
        getInfoUser()
    }, [shouldUpdate]);



    return (
        <CartContext.Provider value={{carts, setCarts,totalPrice, setShouldUpdate,user}}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
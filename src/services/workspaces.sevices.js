import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";

export const getCategory = async () => {
    const result = await instance.get("/category");
    return result.data;
};
export const getAllProduct = async (maxResult) => {
    return await instance.get(`/products/all?maxResult=${maxResult}`);
};
export const getAllOrder = async () => {
    const result = await instance.get("/order", {headers: authHeader()});
    return result.data;
};
export const insertProduct = async (body) => {
    return await instance.post("/products", body, {headers: authHeader()});
};
export const updateProduct = async (productId, body) => {
    return await instance.put(`/products/${productId}`, body, {headers: authHeader()});
};
export const deleteProduct = async (productId) => {
    return await instance.delete(`/products/${productId}`, {headers: authHeader()});
};
export const getProductById = async (id) => {
    const result = await instance.get(`/products/${id}`)
    return result.data;
};
export const getProductByCategoryId = async (categoryId) => {
    const result = await instance.get(`/products/category/${categoryId}`)
    return result.data;
};
export const getProductBySearchAndMaxResult = async (search, maxResult) => {
    const result = await instance.get(`/products?search=${search}&maxResult=${maxResult}`)
    return result.data;
};
export const getProductBySearch = async (search) => {
    const result = await instance.get(`/products?search=${search}`)
    return result.data;
};
export const getProductByFilterPrice = async (minPrice, maxPrice) => {
    const result = await instance.get(`/products/filter/price?minPrice=${minPrice}&maxPrice=${maxPrice}`)
    return result.data;
};
export const addToCartByUserIdAndProductId = async (userId, body) => {
    return await instance.post(`/cart/add?userId=${userId}`, body, {headers: authHeader()})

};
export const getAllCartsByUserId = async (userId) => {
    const result = await instance.get(`/cart/${userId}`, {headers: authHeader()})
    return result.data

};
export const removeItemFromCart = async (userId, productId) => {
    return await instance.delete(`/cart/remove/${userId}/items/${productId}`, {headers: authHeader()})

};
export const UpdateItemFromCart = async (userId, productId, quantity) => {
    return await instance.put(`/cart/update/items/${productId}?userId=${userId}&quantity=${quantity}`, null, {headers: authHeader()})

};
export const createOrder = async (userId, body) => {
    return await instance.post(`/order/payment?userId=${userId}`, body, {headers: authHeader()})

};
export const getOrderByUserId = async (userId) => {
    const result = await instance.get(`/order/${userId}`, {headers: authHeader()})
    return result.data

};
export const UpdateInfoUser = async (userId, body) => {
    return await instance.put(`/users/update/${userId}`, body, {headers: authHeader()})

};
export const updatePasswordByUser = async (userId, body) => {
    return await instance.post(`/users/update/password/${userId}`, body, {headers: authHeader()})

};
export const deleteUserById = async (userId) => {
    return await instance.delete(`/users/${userId}`, {headers: authHeader()})

};

export const getAllUsers = async () => {
    const result = await instance.get(`/users`, {headers: authHeader()})
    return result.data


};







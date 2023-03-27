import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";

export const getCategory = async () => {
    const result = await instance.get("/category");
    return result.data;
};
export const getAllProduct = async () => {
    return await instance.get("/products/all");
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
    const result = await instance.get(`/cart/${userId}`,{headers: authHeader()})
    return result.data

};






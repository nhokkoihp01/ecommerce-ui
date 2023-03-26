import instance from "~/interceptors/axios";

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
export const getProductBySearchAndMaxResult = async (search,maxResult) => {
    const result = await instance.get(`/products?search=${search}&maxResult=${maxResult}`)
    return result.data;
};
export const getProductBySearch = async (search) => {
    const result = await instance.get(`/products?search=${search}`)
    return result.data;
};





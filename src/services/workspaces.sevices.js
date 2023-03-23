import instance from "~/interceptors/axios";

export const getCategory = async () => {
    return await instance.get("/category");
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
// export const getProductDetailById = async (id) => {
//   return await instance.get(`/product/1.0.0/product/${id}/detail`);
// };
// export const getShopById = async (id) => {
//   return await instance.get(`/user/1.0.0/shop/shop/${id}`);
// };
// export const getIndustrials = async () => {
//   return await instance.get(`/product/1.0.0/product/industrials`);
// };
// export const getProductFilter = async (body) => {
//   return await instance.post("/product/1.0.0/product/filter", body);
// };
// export const loginService = async (username,password) =>{
//   await  instance.post("/auth/login",{username,password})
//       .then((res)=>{
//         return res.data
//       })
//       .catch((e)=> e.response?.data)
// }



import config from "~/config";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import ProductDetail from "~/pages/ProductDetail";
import Product from "~/pages/Product";



const publicRoutes = [
    {path: '/', component: Home},
    {path: config.routes.home, component: Home},
    {path: config.routes.login, component: Login, layout: null},
    {path: config.routes.productDetail, component: ProductDetail},
    {path: config.routes.product, component: Product},


];
const privateRoutes = [];
export {publicRoutes, privateRoutes};
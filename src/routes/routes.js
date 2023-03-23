import config from "~/config";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import ProductDetail from "~/pages/ProductDetail";


const publicRoutes = [
    {path: '/', component: Home},
    {path: config.routes.home, component: Home},
    {path: config.routes.login, component: Login, layout: null},
    {path: config.routes.productDetail, component: ProductDetail},


];
const privateRoutes = [];
export {publicRoutes, privateRoutes};
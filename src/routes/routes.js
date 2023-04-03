import config from "~/config";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import ProductDetail from "~/pages/ProductDetail";
import Product from "~/pages/Product";
import Register from "~/pages/Register";
import Checkout from "~/pages/Checkout/Checkout";
import Order from "~/pages/Order";
import InfoUser from "~/pages/InfoUser";
import OrderUser from "~/pages/OrderUser";
import ManageProduct from "~/admin/pages/ManageProduct/Product";
import ManageEditProduct from "~/admin/pages/ManageProduct/EditProduct";
import ManageAddProduct from "~/admin/pages/ManageProduct/AddProduct";





const publicRoutes = [
    {path: '/', component: Home},
    {path: config.routes.home, component: Home},
    {path: config.routes.productDetail, component: ProductDetail},
    {path: config.routes.checkout, component: Checkout},
    {path: config.routes.product, component: Product},
    {path: config.routes.payment, component: Order},
    {path: config.routes.orderUser, component: OrderUser},
    {path: config.routes.login, component: Login, layout: null},
    {path: config.routes.register, component: Register, layout: null},
    {path: config.routes.manageProduct, component: ManageProduct, layout: null},
    {path: config.routes.editProduct, component: ManageEditProduct, layout: null},
    {path: config.routes.addProduct, component: ManageAddProduct, layout: null},
    {path: config.routes.infoUser, component: InfoUser},


];
const privateRoutes = [];
export {publicRoutes, privateRoutes};
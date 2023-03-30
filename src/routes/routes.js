import config from "~/config";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import ProductDetail from "~/pages/ProductDetail";
import Product from "~/pages/Product";
import Register from "~/pages/Register";
import ManageProduct from "~/pages/ManageProduct";
import Checkout from "~/pages/Checkout/Checkout";
import Payment from "~/pages/Payment";
import ManageOrder from "~/pages/ManageOrder";
import ManageAccount from "~/pages/ManageAccount";
import InfoUser from "~/pages/InfoUser";



const publicRoutes = [
    {path: '/', component: Home},
    {path: config.routes.home, component: Home},
    {path: config.routes.productDetail, component: ProductDetail},
    {path: config.routes.checkout, component: Checkout},
    {path: config.routes.product, component: Product},
    {path: config.routes.payment, component: Payment},
    {path: config.routes.login, component: Login, layout: null},
    {path: config.routes.register, component: Register, layout: null},
    {path: config.routes.manageProduct, component: ManageProduct, layout: null},
    {path: config.routes.manageOrder, component: ManageOrder, layout: null},
    {path: config.routes.manageAccount, component: ManageAccount, layout: null},
    {path: config.routes.infoUser, component: InfoUser},


];
const privateRoutes = [];
export {publicRoutes, privateRoutes};
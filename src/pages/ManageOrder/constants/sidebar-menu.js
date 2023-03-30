import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/manage-product',
        title: 'Quản lí sản phẩm',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: '/manage-order',
        title: 'Quản lí đơn hàng',
    },
    {
        id: 3,
        icon: UserIcon,
        path: '/manage-account',
        title: 'Quản lí tài khoản',
    },

]

export default sidebar_menu;
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Collection from "../pages/Collection";
import NotFound from "../pages/NotFound";
import SearchCategories from "../pages/SearchCategories";
import Register from "../pages/Register";
import SuccessOrder from "../pages/SuccessOrder";
import Category from "../pages/Category";
import AuthRequired from "../AuthRequired";
import HistoryOrder from "../pages/HistoryOrder";
import OrderDetail from "../pages/OrderDetail";
import UserInfor from "../pages/UserInfor";
export default [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/cart",
    element: Cart,
  },
  {
    path: "/product/:id",
    element: Product,
  },
  {
    path: "/collection",
    element: Collection,
  },
  {
    path: "/search",
    element: SearchCategories,
  },
  {
    path: "/success-order",
    element: SuccessOrder,
  },
  {
    path: "/register",
    element: AuthRequired.CheckLogged(Register),
  },
  {
    path: "/login",
    element: AuthRequired.CheckLogged(Login),
  },
  {
    path: "/category/:id",
    element: Category,
  },
  {
    path: "/history-order",
    element: HistoryOrder,
  },
  {
    path: "/history-order/:id",
    element: OrderDetail,
  },
  {
    path: "/user/:id",
    element: UserInfor,
  },
  {
    path: "*",
    element: NotFound,
  },
];

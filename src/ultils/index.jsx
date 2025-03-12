import { BASE_API, BASE_URL } from "../constants";
import Http from "../service/Api";

export const getImageProduct = (imageProduct) => {
  return `${BASE_URL}/assets/uploads/products/${imageProduct}`;
};
export const getCategoryId = (categoryId) => {
  return `/categories/${categoryId}/products`;
};
export const getProducts = () => {
  return `/products`;
};
export const getProductId = (productId) => {
  return `/products/${productId}`;
};
export const getSlide = () => {
  return `/sliders`;
};
export const getComments = (id) => {
  return `/products/${id}/comments`;
};
export const createComment = (id) => {
  return `/products/${id}/comments`;
};
export const getImageSlider = (imageSlider) => {
  return `${BASE_URL}/assets/uploads/sliders/${imageSlider}`;
};
export const order = () => {
  return `/order`;
};
export const createUser = () => {
  return `/customers/register`;
};
export const login = () => {
  return `/customers/login`;
};
export const logOut = (id) => {
  return `/customers/${id}/logout`;
};
export const OrderHistory = (id) => {
  return `/customers/${id}/orders`;
};
export const OrderDetail = (id) => {
  return `/customers/orders/${id}`;
};
export const OrderCancel = (id) => {
  return `/customers/orders/${id}/canceled`;
};
export const updateCustomer = (id) => {
  return `/customers/${id}/update`;
};

//interceptors
export const refreshToken = async () => {
  return Http.get(`/customer/refreshtoken`);
 
};

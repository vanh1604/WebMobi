export const BASE_API = " https://nodejs-api-tk2t.onrender.com/api/v1";
export const BASE_URL = " https://nodejs-api-tk2t.onrender.com";

export const getImageProduct = (imageProduct) => {
  return `${BASE_URL}/assets/uploads/products/${imageProduct}`;
};
// eslint-disable-next-line react-refresh/only-export-components
export const getCategoryId = (categoryId) => {
  return `${BASE_API}/categories/${categoryId}/products`;
};
export const getProducts = () => {
  return `${BASE_API}/products`;
};
export const getProductId = (productId) => {
  return `${BASE_API}/products/${productId}`;
};
export const getSlide = () => {
  return `${BASE_API}/sliders`;
};
export const getComments = (id) => {
  return `${BASE_API}/products/${id}/comments`;
};
export const createComment = (id) => {
  return `${BASE_API}/products/${id}/comments`;
};
export const getSlider = () => {
  return `${BASE_API}/sliders`;
};
export const getImageSlider = (imageSlider) => {
  return `${BASE_URL}/assets/uploads/sliders/${imageSlider}`;
};
export const order = () => {
  return `${BASE_API}/order`;
};
export const createUser = () => {
  return `${BASE_API}/customers/register`;
};
export const login = () => {
  return `${BASE_API}/customers/login`;
};
export const logOut = (id) => {
  return `${BASE_API}/customers/${id}/logout`;
};
export const OrderHistory = (id) => {
  return `${BASE_API}/customers/${id}/orders`;
}

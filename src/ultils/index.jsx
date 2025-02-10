export const BASE_API = " https://vietpro-shop-api.onrender.com/api/v1";
export const BASE_URL = " https://vietpro-shop-api.onrender.com";

export const getImageProduct = (imageProduct) => {
  return `${BASE_URL}/assets/uploads/products/${imageProduct}`;
};
export const getProductId = (categoryId) => {
  return `${BASE_API}/categories/${categoryId}/products`;
};
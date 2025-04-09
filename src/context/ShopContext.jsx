import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getProducts } from "../ultils";

import Http from "../service/Api";

export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [menu, setMenu] = useState([]);
  const getProductsData = async () => {
    try {
      const response = await Http.get(getProducts(), {
        params: {
          limit: 60,
        },
      });
      
      
      setProducts(response.data.data.docs);

      // setProducts(response.data.data.docs);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching products");
    }
  };
  const getMenu = async () => {
    try {
      const res = await Http.get(`/categories`);
      setMenu(res.data.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsData();
    getMenu();
  }, []);
  const value = { products, menu, setMenu, getMenu };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;

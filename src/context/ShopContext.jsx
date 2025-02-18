import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_API, getProductId, getProducts } from "../ultils";

export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [menu, setMenu] = useState([]);
  const getProductsData = async () => {
    try {
      const response = await axios.get(getProducts(), {
        params: {
          limit: 10,
        },
      });
      setProducts(response.data.data.docs);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching products");
    }
  };
  const getMenu = async () => {
    try {
      const res = await axios.get(`${BASE_API}/categories`);
      setMenu(res.data.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsData();
    getMenu();
  }, []);
  const value = { products, menu };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;

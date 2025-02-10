import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getProductId } from "../ultils";

export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const getProductsData = async () => {
        try {
            const response = await axios.get(
              "https://vietpro-shop-api.onrender.com/api/v1/products"
            );
            setProducts(response.data.data.docs);
          } catch (err) {
            console.error(err);
            toast.error("Error fetching products");
          }
    }
   
    
     useEffect(() => {
        getProductsData();
      }, []);
    const value = {products};
    return (
        <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
      );
}
export default ShopContextProvider
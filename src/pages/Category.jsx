import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { getImageProduct, getProductId } from "../ultils";
import Productitem from "../components/Productitem";

const Category = () => {
  const { id: categoryId } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  const getCategory = async (categoryId) => {
    try {
      const res = await axios.get(getProductId(categoryId));
      setCategoryProducts(res.data.data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory(categoryId);
  }, [categoryId]);
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-[20px] mx-[50px]">
      {/* <Categories /> */}
      {categoryProducts.map((item, index) => {
        return (
          <div className="border">
            <Productitem
              key={index}
              name={item.name}
              image={getImageProduct(item.image)}
              price={item.price}
              id={item._id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Category;

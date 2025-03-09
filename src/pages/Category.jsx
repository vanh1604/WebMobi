import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

import { getImageProduct, getCategoryId } from "../ultils";
import Productitem from "../components/Productitem";
import Http from "../service/Api";

const Category = () => {
  const { id: categoryId } = useParams();
  const { menu } = useContext(ShopContext);

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [name, setname] = useState("");
  const [total, setTotal] = useState(0);

  const getCategory = async (categoryId) => {
    try {
      const res = await Http.get(getCategoryId(categoryId));

      setCategoryProducts(res.data.data.docs);
      setTotal(res.data.data.pages.total);
      const category = menu.find((item) => item._id === categoryId);
      if (category) {
        setname(category.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory(categoryId);
  }, [categoryId]);

  return (
    <div>
      <div className="flex justify-center items-center mt-4">
        <h3 className="text-3xl">
          {name} (<span className="text-red-600">{total}</span>)
        </h3>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-[20px] mx-[50px] ">
        {/* <Categories /> */}
        {categoryProducts.map((item, index) => {
          return (
            <div className="border p-3" key={index}>
              <Productitem
                key={item._id}
                name={item.name}
                image={getImageProduct(item.image)}
                price={item.price}
                id={item._id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;

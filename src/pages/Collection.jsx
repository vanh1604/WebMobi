import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { getImageProduct } from "../ultils";
import Productitem from "../components/Productitem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mx-[20px] mt-[20px]">
      {products.map((product, index) => {
        return (
          <div className="border p-3" key={index}>
            <Productitem
              key={index}
              name={product.name}
              image={getImageProduct(product.image)}
              price={product.price}
              id={product._id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Collection;

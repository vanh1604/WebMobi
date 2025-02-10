import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getImageProduct } from "../ultils";
import Productitem from "../components/Productitem";
import { ShopContext } from "../context/ShopContext";

const Home = () => {
  const { products } = useContext(ShopContext);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [latestProduct, setLastestProduct] = useState([]);
  useEffect(() => {
    const filterFeatureProduct = products.filter(
      (product) => product.is_featured === true
    );
    setLastestProduct(products.slice(0, 4));
    setFeatureProducts(filterFeatureProduct);
  }, [products]);
  return (
    <>
      <div className="flex flex-col items-center gap-y-6 mt-[20px]">
        <div>
          <p className="text-2xl">Sản phẩm gần đây</p>
        </div>
        <div className="grid gird-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 gap-y-6 mx-20">
          {featureProducts.map((product, index) => {
            return (
              <Productitem
                key={index}
                name={product.name}
                image={getImageProduct(product.image)}
                price={product.price}
                id={product._id}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-6 mt-[20px]">
        <div>
          <p className="text-2xl">Sản phẩm nổi bật</p>
        </div>
        <div className="grid gird-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 gap-y-6 mx-20">
          {featureProducts.map((product, index) => {
            return (
              <Productitem
                key={index}
                name={product.name}
                image={getImageProduct(product.image)}
                price={product.price}
                id={product._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;

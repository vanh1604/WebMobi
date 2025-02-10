import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Productitem from "../components/Productitem";
import { getImageProduct } from "../ultils";

const Product = () => {
  const { id: productId } = useParams();
  const { products } = useContext(ShopContext);
  console.log(productId);
  
  const [productData, setProductData] = useState(false);
  useEffect(() => {
    const fetchProductData = async () => {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
      }
    };
    fetchProductData();
  }, [productId]);
console.log(productData);

  return productData ? (
    <div>
      <Productitem
        name={productData.name}
        image={getImageProduct(productData.image)}
        price={productData.price}
        
      />
    </div>
  ) : (
    ""
  );
};

export default Product;

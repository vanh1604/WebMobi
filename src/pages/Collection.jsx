import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { BASE_API, getImageProduct } from "../ultils";
import Productitem from "../components/Productitem";
import Pagination from "../components/Pagination";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Collection = () => {
  const { menu } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const [pages, setPages] = useState({ limit: 10 });
  const keyword = searchParams.get("keyword")?.trim().toLowerCase() || "";
  console.log(keyword);

  const [data, setData] = useState([]);
  // Track product existence

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_API}/products`, {
        params: {
          name: "iphone",
          limit: 60, // Fetch in batches of 60 to reduce calls
          page,
        },
      });

      const allProducts = res.data.data.docs;
      setData(allProducts); // Set all collected products in state
      setPages((prevPages) => ({
        ...prevPages,
        ...res.data.data.pages,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [keyword, menu]); // Removed `page` since we fetch all pages dynamically

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6 mx-[20px] mt-[20px]">
        {data.map((product, index) => (
          <div className="border p-3" key={index}>
            <Productitem
              name={product.name}
              image={getImageProduct(product.image)}
              price={product.price}
              id={product._id}
            />
          </div>
        ))}
      </div>

      <Pagination pages={pages} />
    </div>
  );
};

export default Collection;

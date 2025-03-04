import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { BASE_API, getImageProduct } from "../ultils";
import Productitem from "../components/Productitem";

import axios from "axios";

import PaginationCollection from "../components/PaginationCollection";
import { useParams, useSearchParams } from "react-router-dom";

const Collection = () => {
  const { menu } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const pageByLink = searchParams.get("page");
  const [pages, setPages] = useState({ limit: 10 });

  const [data, setData] = useState([]);
  // Track product existence

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_API}/products`, {
        params: {
          limit: pages.limit, // Fetch in batches of 60 to reduce calls
          page: pages.currentPage,
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
  }, [menu, pages.currentPage]); // Removed `page` since we fetch all pages dynamically
  useEffect(() => {
    setPages({
      ...pages,
      currentPage: pageByLink,
    });
  }, [pageByLink]);
  console.log(data);
  
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

      <PaginationCollection pages={pages} />
    </div>
  );
};

export default Collection;

import React, {  useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import {  getImageProduct } from "../ultils";
import Productitem from "../components/Productitem";
import Pagination from "../components/Pagination";
import { BASE_API } from "../constants";
import Http from "../service/Api";
const SearchCategories = () => {
  const [searchParams] = useSearchParams();
  const { menu } = useContext(ShopContext);
  const [pages, setPages] = useState({ limit: 10 });
  const keyword = searchParams.get("keyword") || "";
  const [products, setProducts] = useState([]);
  const page = parseInt(searchParams.get("page"), 10) || 1;

  useEffect(() => {
    const handleSearch = async () => {
      if (keyword.trim() === "") {
        setProducts([]);
      } else {
        const productsSearch = menu?.find((item) =>
          item?.name?.toLowerCase().includes(keyword.toLowerCase())
        );

        if (productsSearch) {
          try {
            const res = await Http.get(`${BASE_API}/products`, {
              params: {
                name: keyword,
                limit: 10,
                page,
              },
            });
            setProducts(res.data.data.docs);
            setPages((prevPages) => ({
              ...prevPages,
              ...res.data.data.pages,
            }));
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    handleSearch();
    console.log(products);
    console.log(pages);
  }, [keyword, menu, page]);

  return (
    <div>
      <div className="text-center text-3xl my-5">
        <h1 className="font-medium">Kết quả tìm kiếm sản phẩm {keyword}</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6 mx-[20px] mt-[20px]">
        {products.map((product) => (
          <div className="border p-3" key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Productitem
                name={product.name}
                image={getImageProduct(product.image)}
                price={product.price}
                id={product._id}
              />
            </Link>
          </div>
        ))}
      </div>
      <Pagination pages={pages} />
    </div>
  );
};

export default SearchCategories;

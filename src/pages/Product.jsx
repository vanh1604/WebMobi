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
    <div className="mx-auto gap-y-6 mt-[20px] w-3/4">
      <div>
        <div className="border bg-slate-200 flex justify-around items-center p-10">
          <div>
            <img src={getImageProduct(productData.image)} alt="" />
          </div>
          <div className="flex flex-col gap-y-2 text-xl">
            <p>Bảo hành : 12 Tháng</p>
            <p>Đi kèm : {productData.accessories}</p>
            <p>Tình trạng : {productData.status}</p>
            <p>Khuyến mãi : {productData.promotion}</p>
            <div>
              <p>Gía bán (chưa bao gồm VAT) :</p>
              <p className="text-red-500 text-3xl">{productData.price} đ</p>
            </div>
            {productData.is_stock === true ? (
              <div className="flex flex-col gap-y-2">
                <p className="text-green-600">Còn hàng</p>
                <button className="bg-blue-500 text-white cursor-pointer w-[120px] h-[35px] rounded-4xl hover:scale-110 trasison ease-in-out">
                  Mua ngay
                </button>
              </div>
            ) : (
              <div>
                <p className="text-red-600">Hết hàng</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-[20px] bg-slate-200 p-10">
        <p className="text-2xl font-bold">Đánh giá về</p>
      </div>
      <div className="bg-slate-200 p-10 mt-[20px]">
        <p>Bình luận sản phẩm</p>
        <form action="">
          <div className="my-2">
            <label htmlFor="">Tên :</label>
          </div>
          <div>
            <input className="outline w-full my-2" type="text" />
          </div>
          <div className="my-2">
            <label htmlFor="">Email :</label>
          </div>
          <div>
            <input className="outline w-full my-2" type="email" />
          </div>
          <div className="my-2">
            <label htmlFor="">Nội dung :</label>
          </div>
          <div>
            <textarea className="outline w-full my-2" rows={15} />
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Product;

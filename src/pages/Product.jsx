import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux-setup/reducers/cart";
import moment from "moment";
import {
  getComments,
  getImageProduct,
  getProductId,
  createComment,
} from "../ultils";
import axios from "axios";
import { toast } from "react-toastify";
import Http from "../service/Api";

const Product = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});
  const [comments, setComments] = useState([]);
  const [inputComments, setInputComments] = useState({});
  const handleChangeInputComments = (e) => {
    const { name, value } = e.target;
    setInputComments((prevInputComments) => ({
      ...prevInputComments,
      [name]: value,
    }));
  };
  const clickAddToCart = (type) => {
    dispatch(
      addToCart({
        _id: productData?._id,
        name: productData?.name,
        image: getImageProduct(productData?.image),
        price: productData?.price,
        quantity: 1,
      })
    );
    if (type === "buy-now") {
      return navigate(`/Cart`);
    }
  };

  const clickMomment = async (e) => {
    e.preventDefault();
    try {
      await Http.post(createComment(productId), inputComments);
      toast.success("Comment created successfully");
      setInputComments({});
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  const fetchProductData = async () => {
    try {
      const response = await Http.get(getProductId(productId));
      setProductData(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  const fetchComments = async () => {
    try {
      const res = await Http.get(getComments(productId));
      setComments(res.data.data.docs);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="mx-auto gap-y-6 mt-[20px] w-3/4">
      <div>
        <div className="border bg-slate-200 flex justify-around items-center p-10">
          <div>
            <img
              className="rounded-2xl"
              src={getImageProduct(productData.image)}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-y-2 text-xl">
            <p>Tên : {productData.name}</p>
            <p>Bảo hành : 12 Tháng</p>
            <p>Đi kèm : {productData.accessories}</p>
            <p>Tình trạng : {productData.status}</p>
            <p>Khuyến mãi : {productData.promotion}</p>
            <div>
              <p>Gía bán (chưa bao gồm VAT) :</p>
              <p className="text-red-500 text-3xl">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(productData.price)}
              </p>
            </div>
            {productData.is_stock === true ? (
              <div className="flex flex-col gap-y-2">
                <p className="text-green-600">Còn hàng</p>
                <div className="flex gap-x-2">
                  <button
                    onClick={() => clickAddToCart("buy-now")}
                    className="bg-red-500 text-white cursor-pointer w-[120px] h-[35px] rounded-4xl hover:scale-110 trasison ease-in-out"
                  >
                    Mua ngay
                  </button>
                  <button
                    onClick={() => clickAddToCart()}
                    className="bg-blue-500 text-white cursor-pointer w-[200px] h-[35px] rounded-4xl hover:scale-110 trasison ease-in-out"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
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
        <p>{productData.details}</p>
      </div>
      <div className="bg-slate-200 p-10 mt-[20px]">
        <p>Bình luận sản phẩm</p>
        <form action="" method="post">
          <div className="my-2">
            <label htmlFor="">Tên :</label>
          </div>
          <div>
            <input
              onChange={handleChangeInputComments}
              className="outline w-full my-2"
              name="name"
              type="text"
              value={inputComments.name || ""}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="my-2">
            <label htmlFor="">Email :</label>
          </div>
          <div>
            <input
              onChange={handleChangeInputComments}
              className="outline w-full my-2"
              name="email"
              type="email"
              value={inputComments.email || ""}
              required
            />
          </div>
          <div className="my-2">
            <label htmlFor="">Nội dung :</label>
          </div>
          <div>
            <textarea
              onChange={handleChangeInputComments}
              value={inputComments.content || ""}
              name="content"
              className="outline w-full my-2"
              rows={15}
              required
            />
          </div>
          <div>
            <button
              onClick={clickMomment}
              type="button"
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Create Comment
            </button>
          </div>
        </form>
      </div>
      <div className="bg-slate-200 p-10 mt-5 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-700 mb-4">Bình luận</p>
        {comments.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm my-2">
            <p className="text-base font-medium text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-600">{item.email}</p>
            <p className="text-gray-700 mt-2">{item.content}</p>
            <p className="text-xs text-gray-500 mt-2">
              {moment(item.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Product;

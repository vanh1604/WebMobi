import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoTrashBinOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { updatedItemCart } from "../redux-setup/reducers/cart";
import { removeFromCart, resetCart } from "../redux-setup/reducers/cart";
import axios from "axios";
import { order } from "../ultils";

import { useNavigate } from "react-router-dom";
const Cart = () => {
  // giá trị được xuất ra: "123.456,79 ₫"

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState({});
  const cart = useSelector((state) => state.cart.items);
  const newItems = cart.map((item) => ({
    prd_id: item._id,
    price: item.price,
    qty: item.quantity,
  }));


  const changeInputQuantity = (e, id) => {
    if (e.target.value < 1) {
      const isConfirm = confirm("Are you sure you want to remove this item?");
      return isConfirm ? dispatch(removeFromCart(id)) : false;
    }
    dispatch(updatedItemCart({ id: id, quantity: e.target.value }));
  };
  const changeFormInputs = (e) => {
    const { name, value } = e.target;
    return setUserInformation({ ...userInformation, [name]: value });
  };
  console.log(userInformation);

  const clickOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(order(), {
        ...userInformation,
        customer_id: "614717de271a0400ee8ef1cd",
        items: newItems,
      });
      if (response.status === 201) {
        dispatch(resetCart());
        setUserInformation({});
        return navigate("/success-order");
      } else {
        console.error("Order was not successful", response);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  const removeItemCard = (id) => {
    const isConfirm = confirm("Are you sure you want to remove this item?");
    return isConfirm ? dispatch(removeFromCart(id)) : false;
  };
  const TotalCart = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const formatTotalCart = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(TotalCart);
  return (
    <div>
      <div className="text-center my-5">
        <h1 className="text-2xl font-bold">Thông tin giỏ hàng</h1>
      </div>
      <div className=" contaienr flex justify-around">
        <div>
          <div>
            {cart.map((item, index) => {
              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 "
                >
                  <div className="flex items-start gap-6">
                    <img className="w-16 sm:w-20" src={item.image} alt="" />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    onChange={(e) => changeInputQuantity(e, item._id)}
                    type="number"
                    defaultValue={item.quantity}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  />
                  <IoTrashBinOutline
                    className="cursor-pointer text-2xl"
                    onClick={() => removeItemCard(item._id)}
                  />
                </div>
              );
            })}
            {cart.length !== 0 ? (
              <p className="mt-4 text-2xl">
                Tổng tiền :{" "}
                <span className="font-bold  text-red-400">
                  {formatTotalCart}
                </span>{" "}
                
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <form method="post" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  className="outline w-full sm:w-auto"
                  name="email"
                  placeholder="Email"
                  onChange={changeFormInputs}
                />
                <input
                  type="text"
                  className="outline w-full sm:w-auto"
                  name="fullName"
                  placeholder="Họ và Tên"
                  onChange={changeFormInputs}
                />
                <input
                  type="tel"
                  className="outline w-full sm:w-auto"
                  name="phone"
                  placeholder="Sđt"
                  onChange={changeFormInputs}
                />
              </div>
              <input
                name="address"
                type="text"
                className="outline w-full"
                placeholder="Address"
                onChange={changeFormInputs}
              />
            </div>
            <div className="flex  gap-4 justify-around">
              <button
                onClick={clickOrder}
                className="bg-pink-200 p-2 rounded-2xl mt-10 w-full sm:w-auto cursor-pointer hover:scale-110 transition ease-in-out"
              >
                Thanh toán ngay
              </button>
              <button className="bg-orange-200 p-2 rounded-2xl mt-10 w-full sm:w-auto cursor-pointer hover:scale-110 transition ease-in-out">
                Trả góp online
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;

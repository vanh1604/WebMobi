import React from "react";
import { useSelector } from "react-redux";
import { IoTrashBinOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { updatedItemCart } from "../redux-setup/reducers/cart";
import { removeFromCart } from "../redux-setup/reducers/cart";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  console.log(cart);
  const changeInputQuantity = (e, id) => {
    if (e.target.value < 1) {
      const isConfirm = confirm("Are you sure you want to remove this item?");
      return isConfirm ? dispatch(removeFromCart(id)) : false;
    }
    dispatch(updatedItemCart({ id: id, quantity: e.target.value }));
  };
  const removeItemCard = (id) => {
    const isConfirm = confirm("Are you sure you want to remove this item?");
    return isConfirm ? dispatch(removeFromCart(id)) : false;
  };
  const TotalCart = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  console.log(TotalCart);

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
                        <p>{item.price * item.quantity}đ</p>
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
                <span className="font-bold  text-red-400">{TotalCart}</span> đ
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <form action="">
            <div className="flex flex-col items-start gap-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  className="outline"
                  name="Email"
                  placeholder="Email"
                />
                <input
                  type="text"
                  className="outline"
                  name="Họ và Tên"
                  placeholder="Họ và Tên"
                />
                <input
                  type="number"
                  className="outline"
                  name="Sđt"
                  placeholder="Sđt"
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  className="outline w-full"
                  placeholder="Address"
                />
              </div>
            </div>
            <button className="bg-pink-200 p-2 rounded-2xl mt-10">
              Thanh toán
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;

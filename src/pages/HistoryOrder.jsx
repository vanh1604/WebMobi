import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OrderCancel, OrderHistory } from "../ultils";
import Http from "../service/Api";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HistoryOrder = () => {
  const { curentCustomer } = useSelector((state) => state.auth.login);
  const CustumerId = curentCustomer?._id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const inforOrder = async () => {
    setLoading(true);
    try {
      const res = await Http.get(OrderHistory(CustumerId));
      console.log(res.data.data.docs);

      setOrders(res.data.data.docs);
    } catch (error) {
      setError("Không thể tải lịch sử đơn hàng.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const cancel = async (id) => {
    try {
      const res = await Http.get(OrderCancel(id));
      if (res.status === 200) {
        toast.success("Order canceled successfully");
        inforOrder();
      } else {
        toast.error(res.response?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  };
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  useEffect(() => {
    inforOrder();
  }, []);

  return (
    <div className="mt-10 container mx-auto">
      <h1 className="my-5 text-center text-2xl font-bold">Lịch sử mua hàng</h1>
      {loading && <div className="text-center">Đang tải...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg text-center">
        <thead className="bg-gray-50">
          <tr>
            <th>Đơn hàng của bạn</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-4 px-6">{moment(order.updatedAt).format("DD/MM/YYYY HH:mm")}</td>
                <td className="py-4 px-6">{formatPrice(order.totalPrice)}</td>
                <td className="py-4 px-6">
                  <div className="flex justify-around items-center">
                    <div>
                      {order.status === 1 && <span className="text-yellow-500">Đơn hàng đang giao</span>}
                      {order.status === 2 && <span className="text-green-500">Đơn đã giao</span>}
                      {order.status === 0 && <span className="text-red-500">Hủy Đơn hàng</span>}
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => navigate(`/history-order/${order._id}`)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Xem chi tiết</button>
                      {order.status !== 2 && (
                        <button onClick={() => cancel(order._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Hủy đơn hàng</button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Chưa có đơn hàng nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryOrder;

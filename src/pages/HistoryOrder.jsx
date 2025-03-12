import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OrderHistory } from "../ultils";
import Http from "../service/Api";

const HistoryOrder = () => {
  const { curentCustomer } = useSelector((state) => state.auth.login);
  const CustumerId = curentCustomer?._id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inforOrder = async () => {
    setLoading(true);
    try {
      const res = await Http.get(OrderHistory(CustumerId));
      
      
      setOrders(res.data.data.docs);
    } catch (error) {
      setError("Không thể tải lịch sử đơn hàng.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
              <tr key={index}>
                <td>{order.orderName || "N/A"}</td>
                <td>{order.totalPrice || "N/A"}</td>
                <td>{order.status || "N/A"}</td>
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

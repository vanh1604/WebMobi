import axios from "axios";
import React, { use, useEffect } from "react";
import { useSelector } from "react-redux";
import { OrderHistory } from "../ultils";

const HistoryOrder = () => {
  const CustumerId = useSelector((state) => state.auth.curentCustomer._id);
  const inforOrder = async()=>{
    
    try {
        const res = await axios.get(OrderHistory(CustumerId));
        console.log(res);
        
    } catch (error) {
        console.log(error);
        
    }
    
  }
  useEffect(() => {
      inforOrder();
  },[])
  return (
    <div className="mt-10 container mx-auto">
      <div className="my-5 text-center text-2xl font-bold">
        <h1>Lịch sử mua hàng</h1>
      </div>
      <div>
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg text-center">
          <thead className="bg-gray-50 ">
            <tr>
              <th>Đơn hàng của bạn</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryOrder;

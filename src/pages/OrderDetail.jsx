import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Http from "../service/Api";
import { OrderDetailProduct } from "../ultils";

const OrderDetail = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInforOrder = async () => {
      setLoading(true);
      try {
        const res = await Http.get(OrderDetailProduct(orderId));
        console.log(res.data.data.docs);
        setOrder(res.data.data.docs);
      } catch (error) {
        console.error("Error fetching order information:", error);
        console.log(error);
        
      } finally {
        setLoading(false);
      }
    };

    getInforOrder();
  }, [orderId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {order ? <pre>{JSON.stringify(order, null, 2)}</pre> : <p>No order found</p>}
    </div>
  );
};

export default OrderDetail;

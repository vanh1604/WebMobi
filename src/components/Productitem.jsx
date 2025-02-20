import React from "react";
import { Link } from "react-router-dom";


const Productitem = ({ name, image, price, id }) => {
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden flex justify-center items-center h-[85%]">
        <img
          className="hover:scale-110 transition ease-in-out "
          src={image}
          alt={name || "Product Image"}
        />
      </div>
      <p className="pt-3 pb-1 text-sm text-center">{name}</p>
      <p className="text-sm text-center font-medium">{(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price))}</p>
    </Link>
  );
};

export default Productitem;

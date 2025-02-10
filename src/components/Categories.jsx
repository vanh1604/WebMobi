import React, { useContext, useEffect, useState } from "react";
import { BASE_API } from "../ultils";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Categories = () => {
 const {menu} =useContext(ShopContext)
  return (
    <div className="flex flex-row gap-3 bg-amber-300 py-2">
      {menu.map((item) => {
        return (
          <ul
            className="text-gray-700  '"
            key={item._id}
          >
            <li className="text-xl cursor-pointer hover:bg-pink-600 px-2 hover:scale-110 transition ease-in-out rounded-md">
              <Link to={`/category/${item._id}`}>{item.name}</Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Categories;

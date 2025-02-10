import React, { useEffect, useState } from "react";
import { BASE_API } from "../ultils";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
  const [menu, setMenu] = useState([]);
  const getMenu = async () => {
    try {
      const res = await axios.get(`${BASE_API}/categories`);
      setMenu(res.data.data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMenu();
  }, []);
  return (
    <div className="flex flex-row gap-3 bg-amber-300 py-2">
      {menu.map((item) => {
        return (
          <ul
            className="text-gray-700 hover:bg-pink-600 px-2 hover:scale-110 transition ease-in-out '"
            key={item._id}
          >
            <li className="text-xl cursor-pointer">
              <Link to={`/category/${item._id}`}>{item.name}</Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Categories;

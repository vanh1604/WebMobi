import React, { use, useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";

import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const handleSearch = () => {
    setSearch("");
    return navigate(`/search?keyword=${search}`);
  };

  return (
    <div className="flex justify-between items-center px-[50px] bg-slate-200">
      <div>
        <img src={logo} className="w-[50px]" alt="" />
      </div>
      <div className="relative">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="outline h-[30px]"
            value={search}
            placeholder="Search products..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-pink-200 p-2 rounded-2xl cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <ul className="flex text-xl py-3">
          <NavLink to="/" className="flex flex-col items-center">
            <li className="px-[10px] hover:bg-pink-200">Home</li>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink to="/collection" className="flex flex-col items-center">
            <li className="px-[10px] hover:bg-pink-200">Collection</li>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="cart" className="flex flex-col items-center">
            <li className="px-[10px] hover:bg-pink-200">Cart</li>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="login" className="flex flex-col items-center">
            <li className="px-[10px] hover:bg-pink-200">Login</li>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

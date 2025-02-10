import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-[50px] bg-slate-200">
      <div>
        <img src={logo} className="w-[50px]" alt="" />
      </div>
      <div>
        <ul className="flex text-xl py-3">
          <NavLink to="/">
            <li className="px-[10px] hover:bg-pink-200">Home</li>
          </NavLink>

          <NavLink to="/collection">
            <li className="px-[10px] hover:bg-pink-200">Collection</li>
          </NavLink>
          <NavLink to="cart">
            <li className="px-[10px] hover:bg-pink-200">Cart</li>
          </NavLink>
          <NavLink to="login">
            <li className="px-[10px] hover:bg-pink-200">Login</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

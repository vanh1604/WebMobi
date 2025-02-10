import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const { products } = useContext(ShopContext);
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [show, setShow] = useState(true);
  const handleSearch = () => {
    if (search.trim() === "") {
      setFilteredProduct([]);
      return;
    }
    const filtered = products.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filtered);
    const hidden = products?.some((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    );
    setShow(hidden);

    setFilteredProduct(filtered);
  };
  console.log("Filtered Products:", filteredProduct);

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

        <ul className="bg-white shadow-md rounded-lg absolute ">
          {filteredProduct.length > 0 && show ? (
            filteredProduct.map((item) => (
              <li key={item._id} className="p-2 border-b">
                <Link to={`/product/${item._id}`}>{item.name}</Link>
              </li>
            ))
          ) : (
            <p className={`p-2 text-gray-500 ${show ? "hidden" : "block"}`}>
              No items found
            </p>
          )}
        </ul>
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

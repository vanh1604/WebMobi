import React, { use, useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/gradient-mobile-store-logo-design.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { getProducts } from "../ultils";
import axios from "axios";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const { menu, setMenu, getMenu } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleSearch = () => {
    setSearch("");
    return navigate(`/search?keyword=${search}`);
  };
  const totalCart = useSelector(({ cart }) =>
    cart.items.reduce((total, item) => total + (item.quantity || 0), 0)
  );
  const filterProducts = (id) => {
    navigate(`/product/${id}`);
    setSearch("");
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${getProducts()}`,{
          params: {
            limit:600
          }
        });
        setProducts(res.data.data.docs);
      } catch (error) {}
    };
    if (search === "") {
      getData();
    } else {
      setProducts(
        products.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  return (
    <div className="flex justify-between items-center px-[50px] bg-slate-200">
      <Link to="/">
        <img src={logo} className="w-[70px] h-[70px]" alt="" />
      </Link>
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
        {search && products.length > 0 && (
          <div className="absolute top-full z-10 left-0 right-0 bg-white h-[300px] overflow-y-scroll">
            {products.map((item) => (
              <div
                key={item._id}
                className="flex gap-2 items-center p-2 hover:bg-pink-200 cursor-pointer"
                onClick={() => filterProducts(item._id)}
              >
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        )}
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
            <div className="flex relative">
              <li className="px-[20px] hover:bg-pink-200">Cart</li>
              <p className="text-sm absolute top-[-3px] right-[8px] bg-amber-300 w-[15px] h-[15px] rounded-full flex justify-center items-center">
                {totalCart}
              </p>
            </div>
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

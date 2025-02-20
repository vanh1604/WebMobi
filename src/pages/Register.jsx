import axios from "axios";
import React, { use, useState } from "react";

import { createUser } from "./../ultils/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [inputRegister, setInputRegister] = useState({});
  const [statusRegister, setStatusRegister] = useState(false);
  const navigate = useNavigate();
  const changeInputRegister = (e) => {
    const { name, value } = e.target;
    setInputRegister({
      ...inputRegister,
      [name]: value,
    });
    console.log(inputRegister);
  };
  const clickRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(createUser(), inputRegister);
      if (res.status === 200) {
        toast.success("Registration successful");
        setStatusRegister(false);
        navigate("/");
      } else {
        setStatusRegister(res.response.data);
        toast.error(res.response.data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response?.data);
      setStatusRegister(true);
    }
  };
  return (
    <>
      <div className="container mx-auto bg-slate-200 w-[500px] p-5 mt-5 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold mt-5 mb-3 text-center">Đăng ký</h1>
          <hr className="w-1/4 mx-auto mb-5" />
        </div>
        <div className="w-full">
          <form method="post" className="flex flex-col items-center gap-6">
            <div className="flex gap-4 w-full">
              <input
                className="outline border flex-1 p-2"
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={changeInputRegister}
              />
              <input
                className="outline border flex-1 p-2"
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeInputRegister}
              />
            </div>
            <div className="flex gap-4 w-full">
              <input
                className="outline border flex-1 p-2"
                type="text"
                name="email"
                placeholder="Email"
                onChange={changeInputRegister}
              />
              <input
                className="outline border flex-1 p-2"
                type="number"
                name="phone"
                placeholder="Phone"
                onChange={changeInputRegister}
              />
            </div>
            <div className="w-full">
              <input
                className="outline border w-full p-2"
                type="text"
                name="address"
                placeholder="Address"
                onChange={changeInputRegister}
              />
            </div>
            <div className="flex">
              <button
                onClick={clickRegister}
                className="bg-red-500 text-white px-4 py-2 rounded-2xl cursor-pointer hover:shadow-lg hover:opacity-90 hover:scale-110 transition ease-in-out"
              >
                Đắng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

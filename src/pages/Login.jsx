import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../ultils";
import axios from "axios";
import { logginSuccess } from "../redux-setup/reducers/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState({});
  const changeInputlogin = (e) => {
    const { name, value } = e.target;
    setInputLogin({
      ...inputLogin,
      [name]: value,
    });
  };
  const clickLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(login(), inputLogin);
      console.log(res.data);
      dispatch(
        logginSuccess({
          ...res.data.customer,
          accessToken: res.data.accessToken,
        })
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.customer.fullName)
        );
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  };
  return (
    <div>
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
                name="email"
                placeholder="Email"
                onChange={changeInputlogin}
              />
              <input
                className="outline border flex-1 p-2"
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeInputlogin}
              />
            </div>

            <div>
              Nếu bạn chưa có tài khoản hãy đăng ký{" "}
              <span
                className="cursor-pointer text-orange-500 text-xl font-medium"
                onClick={() => navigate("/register")}
              >
                ở đây
              </span>
            </div>
            <div>
              <button
                onClick={clickLogin}
                className="bg-red-500 text-white px-4 py-2 rounded-2xl cursor-pointer hover:shadow-lg hover:opacity-90 hover:scale-110 transition ease-in-out"
              >
                Đắng Nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

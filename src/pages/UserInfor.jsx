import React, { useState } from "react";
import { useSelector } from "react-redux";
import Http from "../service/Api";
import { updateCustomer } from "../ultils";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserInfor = () => {
  const {id:userId} = useParams();
  const user = useSelector((state) => state.auth.user);
  const [formInput, setFormInput] = useState({ ...user });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Http.post(updateCustomer(userId), formInput);
      setSuccessMessage(res.data.message);
      toast.success(res.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mt-10 mx-auto bg-white p-6 rounded shadow-md">
      {successMessage && (
        <div className="bg-green-200 text-green-700 p-2 rounded text-center">
          {successMessage}
        </div>
      )}
      <h2 className="text-xl font-bold text-center mb-4">
        Thông tin tài khoản
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          placeholder="Họ và tên"
          required
        />
        <input
          type="email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          placeholder="Email (bắt buộc)"
          required
        />
        <input
          type="text"
          name="phone"
          value={formInput.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          placeholder="Số điện thoại (bắt buộc)"
        />
        <input
          type="text"
          name="address"
          value={formInput.address}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
        />
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật ngay"}
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => (window.location.href = "/")}
          >
            Quay về trang chủ
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfor;

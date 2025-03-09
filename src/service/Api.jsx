import axios from "axios";
import store from "../redux-setup/store";
import { refreshToken } from "../ultils";
import { BASE_API } from "../constants";

console.log("instance created with baseURL:");
const Http = axios.create({
  baseURL: "https://nodejs-api-tk2t.onrender.com/api/v1",
  withCredentials: true,
});
const res = await Http.get("/products");
console.log("instance created with baseURL:", res);
Http.interceptors.request.use(
  async (config) => {
    try {
      const login = store.getState().auth.login;
      const loggedIn = login?.loggedIn;
      if (loggedIn) {
        const accessToken = login.curentCustomer.accessToken;
        console.log(`accessToken:::${accessToken}`);
        config.headers["token"] = `Bearer ${accessToken}`;
      }
      return config;
    } catch (error) {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  },
  async (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

Http.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    try {
      const response = error.response;

      if (response.status === 401 || response.data === "Token expired") {
        if (response.config.url.indexOf("/customer/refreshtoken") >= 0)
          return error;
        const { data } = await Http.get(refreshToken(), {
          headers: { token: `Bearer ${response.config.headers["token"]}` },
        });
        console.log(data);
        const newAccessToken = data?.accessToken;
        console.log(`newAccessToken:::${newAccessToken}`);
        response.config.headers["token"] = `Bearer ${newAccessToken}`;
      }
    } catch (err) {
      console.error("Response interceptor error:", err);
      return Promise.reject(error);
    }
  }
);

export default Http;

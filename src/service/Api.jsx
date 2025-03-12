import axios from "axios";
import store from "../redux-setup/store";
import { refreshToken } from "../ultils";
import { updatedTokenSuccess } from "../redux-setup/reducers/auth";
import { BASE_API } from "../constants";

const Http = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

Http.interceptors.request.use(
  async (config) => {
    const login = store.getState().auth.login;
    const loggedIn = login?.loggedIn;
    if (loggedIn) {
      const accessToken = login.curentCustomer.accessToken;
      console.log(`accessToken:::${accessToken}`);
      config.headers["token"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

//
Http.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const response = error.response;
    console.log(response.data);
    if (response.data === "Token expired") {
      if (response.config.url.indexOf("/customer/refreshtoken") >= 0)
        return error;
      const data = (await refreshToken()).data;
      const newAccessToken = data.accessToken;
      console.log(`newAccessToken:::${newAccessToken}`);
      store.dispatch(updatedTokenSuccess({ newAccessToken }));
      response.config.headers["token"] = `Bearer ${newAccessToken}`;
      return Http(response.config);
    }
    return Promise.reject(error);
  }
);

export default Http;

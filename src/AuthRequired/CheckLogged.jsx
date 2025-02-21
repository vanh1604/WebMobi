import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const CheckLogged = (OriginComponent) => {
  const ExtendsComponent = () => {
    const login = useSelector(({ auth }) => auth.login.loggedIn);
    return login ? <Navigate to="/" /> : <OriginComponent />;
  };

  return ExtendsComponent;
};

export default CheckLogged;

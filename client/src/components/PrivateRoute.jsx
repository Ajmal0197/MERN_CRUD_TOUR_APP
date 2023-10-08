import React from "react";
import { useSelector } from "react-redux";
import LoadingToDirect from "./LoadingToDirect";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <LoadingToDirect />;
};

export default PrivateRoute;

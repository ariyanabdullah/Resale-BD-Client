import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../Authprovider/Authprovider";
import UseAdmin from "../Hooks/UseAdmin";

const AdminRoute = ({ children }) => {
  const { user } = useContext(authcontext);
  const [isadmin] = UseAdmin(user?.email);
  const navigate = useNavigate();

  if (isadmin === "admin") {
    return children;
  }

  return navigate("/");
};

export default AdminRoute;

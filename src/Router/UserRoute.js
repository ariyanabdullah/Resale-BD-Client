import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../Authprovider/Authprovider";
import UseAdmin from "../Hooks/UseAdmin";

const UserRoute = ({ children }) => {
  const { user } = useContext(authcontext);
  const [isadmin] = UseAdmin(user?.email);
  const navigate = useNavigate();

  if (isadmin === "user") {
    return children;
  }

  return navigate("/");
};

export default UserRoute;

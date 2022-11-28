import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { authcontext } from "../Authprovider/Authprovider";
import Loader from "../Components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(authcontext);
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  if (user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;

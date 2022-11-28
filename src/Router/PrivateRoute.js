import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { authcontext } from "../Authprovider/Authprovider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(authcontext);
  const location = useLocation();

  if (loading) {
    return (
      <div class="h-screen">
        <div className="flex justify-center items-center h-full">
          <PuffLoader color="#36d7b7" />
        </div>
      </div>
    );
  }

  if (user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;

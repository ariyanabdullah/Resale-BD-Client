import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { authcontext } from "../Authprovider/Authprovider";
import Header from "../Pages/SharedPages/Header/Header";
import UseAdmin from "../Hooks/UseAdmin";
import Loader from "../Components/Loader/Loader";
import Footer from "../Pages/SharedPages/Footer/Footer";

const DashboardLayout = () => {
  const { user } = useContext(authcontext);

  const [isadmin, loading] = UseAdmin(user?.email);

  //   if (loading) {
  //     return <Loader></Loader>;
  //   }

  const admin = (
    <>
      <li>
        <Link to="/dashboard/allsellers">Sellers</Link>
      </li>
      <li>
        <Link to="/dashboard/allbuyers">Buyers</Link>
      </li>
      <li>
        <Link to="/dashboard/reporteditem">Reported Items </Link>
      </li>
    </>
  );

  const seller = (
    <>
      <li>
        <Link to="/dashboard/myproduct">My Products</Link>
      </li>
      <li>
        <Link to={`/dashboard/addproduct/${user?.email}`}>Add Product </Link>
      </li>
    </>
  );
  const buyer = (
    <>
      <li>
        <Link to="/dashboard/myorder">My Order </Link>
      </li>
    </>
  );

  return (
    <div>
      <Header></Header>

      {loading && <Loader></Loader>}

      <div className="drawer drawer-mobile ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  ">
          {/* <!-- Page content here --> */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}

            {isadmin === "admin" && <> {admin}</>}
            {isadmin === "seller" && <> {seller}</>}

            {isadmin === "user" && <> {buyer}</>}
          </ul>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../../../Authprovider/Authprovider";
import Loader from "../../../Components/Loader/Loader";
import UseAdmin from "../../../Hooks/UseAdmin";

const Header = () => {
  const { user, LogOut } = useContext(authcontext);

  const navigate = useNavigate();

  const [isadmin, loading] = UseAdmin(user?.email);

  const handleLogOut = () => {
    LogOut()
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  };
  const menuItem = (
    <>
      <li>
        <Link to="/" className="rounded-lg">
          Home
        </Link>
      </li>

      <li>
        <Link to="#" className="rounded-lg">
          Blog
        </Link>
      </li>

      <>
        {isadmin === "admin" && (
          <>
            {" "}
            <li>
              <Link to="/dashboard/allsellers" className="rounded-lg">
                Dashboard
              </Link>
            </li>{" "}
          </>
        )}

        {isadmin === "seller" && (
          <>
            {" "}
            <li>
              <Link to="/dashboard/myproduct" className="rounded-lg">
                Dashboard
              </Link>
            </li>{" "}
          </>
        )}
        {isadmin === "user" && (
          <>
            {" "}
            <li>
              <Link to="/dashboard/myorder" className="rounded-lg">
                Dashboard
              </Link>
            </li>{" "}
          </>
        )}
      </>
    </>
  );

  // if (loading) {
  //   return <Loader></Loader>;
  // }

  return (
    <div className="bg-neutral">
      <div className="navbar  container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItem}
            </ul>
          </div>

          <Link to="/" className="font-bold text-xl">
            Relsale BD
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuItem}</ul>
        </div>
        <div className="navbar-end">
          <>
            {user ? (
              <>
                <button onClick={handleLogOut} className="btn">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">
                  Log In
                </Link>
              </>
            )}
          </>

          <label
            tabIndex={0}
            htmlFor="my-drawer-2"
            className="btn btn-primary lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;

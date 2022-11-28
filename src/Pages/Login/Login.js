import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authcontext } from "../../Authprovider/Authprovider";
import Loader from "../../Components/Loader/Loader";
import UseToken from "../../Hooks/UseToken";

const Login = () => {
  const { LoginUser, GoogleUser } = useContext(authcontext);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [token] = UseToken(currentUser);
  const [loading, setLoading] = useState(false);

  if (token) {
    navigate(from, { replace: true });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogIn = (data) => {
    const { email, password } = data;

    LoginUser(email, password)
      .then((result) => {
        const user = result.user;
        setError("");
        setLoading(true);
        setCurrentUser(email);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // google register

  const handleGoogle = () => {
    GoogleUser()
      .then((result) => {
        const user = result.user;
        const email = user.email;
        const name = user.displayName;
        const select = "user";
        setCurrentUser(email);
        saveUSer(name, email, select);
      })
      .catch((err) => console.log(err.message));
  };

  // save user info to database
  const saveUSer = (name, email, select) => {
    const user = {
      name: name,
      email,
      role: select,
    };

    fetch("https://my-app-server.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Successfully Registerd");
          setLoading(false);
          navigate("/");
        }
      });
  };

  if (loading) {
    return <Loader> </Loader>;
  }

  return (
    <div>
      <div className="my-12">
        <div className="w-full container mx-auto max-w-md p-8 space-y-3 rounded-xl dark:bg-neutral ">
          <h1 className="text-2xl font-bold text-primary text-center">Login</h1>
          <form
            onSubmit={handleSubmit(handleLogIn)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-1 text-sm">
              <input
                type="email"
                {...register("email", {
                  required: "Email Field Is Required",
                })}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
              />
              {errors.email && (
                <p className="text-red-400 font-thin text-sm">
                  {" "}
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="space-y-1 text-sm">
              <input
                type="password"
                {...register("password", {
                  required: "Password Field Is Required",
                  minLength: {
                    value: 6,
                    message: "Password Should be At least 6 character",
                  },
                })}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
              />
              {errors.password && (
                <p className="text-red-400 font-thin text-sm">
                  {" "}
                  {errors.password?.message}{" "}
                </p>
              )}
            </div>

            <div>
              <p className="text-red-400 font-semibold text-sm"> {error}</p>
            </div>

            <button
              type="submit"
              className="block w-full p-3 text-center rounded-lg dark:text-white btn btn-primary"
            >
              Log in
            </button>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGoogle}
              aria-label="Log in with Google"
              className="p-3  btn btn-circle "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
          </div>
          <p className="text-xs text-center sm:px-6 dark:text-gray-400">
            Don't have an account?
            <Link to="/register" className="underline dark:text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

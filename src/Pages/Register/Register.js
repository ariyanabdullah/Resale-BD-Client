import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { authcontext } from "../../Authprovider/Authprovider";
import UseToken from "../../Hooks/UseToken";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [token] = UseToken(currentUser);

  const { RegisterUser, updateUser, GoogleUser } = useContext(authcontext);
  const handleRegister = (data) => {
    const { name, email, password, select } = data;
    setError("");

    RegisterUser(email, password)
      .then((result) => {
        updateUser(name)
          .then((user) => {
            saveUSer(name, email, select);
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogle = () => {
    GoogleUser()
      .then((result) => {
        const user = result.user;
        const email = user.email;
        const name = user.displayName;
        const select = "user";
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

    fetch("http://localhost:5000/users", {
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
          setCurrentUser(email);
        }
      });
  };

  return (
    <div>
      <div className="my-12">
        <div className="w-full container mx-auto max-w-md p-8 space-y-3 rounded-xl dark:bg-neutral ">
          <h1 className="text-2xl font-bold text-primary text-center">
            Register Now
          </h1>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-1 text-sm">
              <input
                type="text"
                {...register("name", { required: "Name Is Required" })}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
              />

              {errors.name && (
                <p className="text-red-400 font-thin text-sm">
                  {" "}
                  {errors.name?.message}{" "}
                </p>
              )}
            </div>
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
              <p className="text-red-400 font-thin text-sm"> {error}</p>
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
            <div className="space-y-1 text-sm">
              <label htmlFor="select" className="font-bold">
                {" "}
                Register as{"--"}
              </label>
              <select
                id="select"
                className="w-[78%] px-4 py-3 rounded-md border text-center border-primary dark:bg-neutral dark:text-black "
                {...register("select", {
                  required: "You have to Select One role",
                })}
              >
                {" "}
                Register as
                <option value="user" defaultValue={"user"}>
                  user
                </option>
                <option value="seller">saller</option>
              </select>
            </div>
            <button
              type="submit"
              className="block w-full p-3 text-center rounded-lg dark:text-white btn btn-primary"
            >
              Register
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
              className="p-3 btn btn-circle "
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
            Already have an account?
            <Link to="/login" className="underline dark:text-primary">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

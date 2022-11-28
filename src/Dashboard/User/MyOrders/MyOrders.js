import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { authcontext } from "../../../Authprovider/Authprovider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { user } = useContext(authcontext);

  const navigate = useNavigate();

  const {
    data: allOrders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const res = await fetch(
        `https://my-app-server.vercel.app/allorder?email=${user?.email}`,
        {
          headers: {
            authorization: `${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 401 || res.status === 402 || res.status === 403) {
        return navigate("/");
      }

      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id) => {
    console.log(id);

    fetch(`https://my-app-server.vercel.app/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("order item Deleted");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (allOrders.length === 0) {
    return (
      <div className="text-center font-bold mx-auto my-auto text-primary text-2xl ">
        {" "}
        You did not Ordered any Product{" "}
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product Info</th>

              <th>Product Price</th>
              <th>payment</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {allOrders?.map((order) => (
              <tr key={order._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={order.productImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {order.productName &&
                          order.productName.slice(0, 20) + "..."}
                      </div>
                    </div>
                  </div>
                </td>

                <td> $ {order.productPrice}</td>
                <td>
                  {order.productPrice && !order.paid && (
                    <>
                      <Link to={`/dashboard/payment/${order._id}`}>
                        <button className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-primary font-semibold text-primary hover:text-white hover:bg-primary hover:border-primary focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                          Pay
                        </button>
                      </Link>
                    </>
                  )}
                  {order.productPrice && order.paid && (
                    <p className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2  font-semibold text-primary">
                      Paid
                    </p>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-2xl text-red-800"
                  >
                    <AiFillDelete />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;

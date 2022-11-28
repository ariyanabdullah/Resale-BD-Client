import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const AllBuyers = () => {
  const navigate = useNavigate();

  const {
    data: sellers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Sellers"],
    queryFn: async () => {
      const res = await fetch(
        "https://my-app-server.vercel.app/users?role=user",
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
    fetch(`https://my-app-server.vercel.app/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Seller Deleted successfully");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <h1 className="text-primary my-4 text-center font-bold text-2xl">
        All Buyers Are In the Table
      </h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>

                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.role}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(seller._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBuyers;

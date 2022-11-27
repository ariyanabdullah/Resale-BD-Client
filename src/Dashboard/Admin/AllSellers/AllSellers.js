import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { authcontext } from "../../../Authprovider/Authprovider";
import Loader from "../../../Components/Loader/Loader";

const AllSellers = () => {
  const { user } = useContext(authcontext);

  const {
    data: sellers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Sellers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users?role=seller");
      const data = await res.json();
      return data;
    },
  });
  // delete a seller
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
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

  // verify a seller

  const handleVerify = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("seller verified SuccessFully");
          refetch();
        }
      });
  };

  // console.log(sellers);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <h1 className="text-primary my-4 text-center font-bold text-2xl">
        All Sellers Are In the Table {sellers.length}
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
                <th>Verify Seller</th>
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
                    <>
                      {seller.verified ? (
                        <>
                          <span className="font-bold text-xl  text-blue-400">
                            <FaCheckCircle />
                          </span>
                        </>
                      ) : (
                        <>
                          {" "}
                          <button
                            onClick={() => handleVerify(seller._id)}
                            className="btn btn-xs btn-accent"
                          >
                            {" "}
                            Verify
                          </button>
                        </>
                      )}
                    </>
                  </td>
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

export default AllSellers;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../Components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";

const ReportedItem = () => {
  const {
    data: ReportedItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["RoportedItems"],
    queryFn: async () => {
      const res = await fetch(
        `https://my-app-server.vercel.app/reportedItems?isReported=true`
      );
      const data = await res.json();
      return data;
    },
  });

  // Delete Reported Item

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `https://my-app-server.vercel.app/reportedItems/${id}`
    );
    if (res.data.deletedCount > 0) {
      refetch();
      toast.success("Product Delete SuccessFull");
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Product Name</th>
                <th>Seller Name</th>
                <th>Seller Email</th>
                <th>Remove Item</th>
              </tr>
            </thead>
            <tbody>
              {ReportedItems.map((item) => (
                <tr key={item._id}>
                  <th>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={item.image} alt="" />
                      </div>
                    </div>
                  </th>
                  <td>{item.product_name}</td>
                  <td>{item.sellerName}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-bold text-right text-3xl text-error"
                    >
                      {" "}
                      <AiFillDelete />{" "}
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

export default ReportedItem;

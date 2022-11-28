import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Loader from "../../../Components/Loader/Loader";
import { authcontext } from "../../../Authprovider/Authprovider";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyProduct = () => {
  const { user } = useContext(authcontext);

  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://my-app-server.vercel.app/products?email=${user?.email}`,
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

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `https://my-app-server.vercel.app/reportedItems/${id}`
    );
    if (res.data.deletedCount > 0) {
      refetch();
      toast.success("Product Delete SuccessFull");
    }
  };

  const handleAdvirtis = (id) => {
    console.log(id);

    fetch(`https://my-app-server.vercel.app/advertisItem/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 402 || res.status === 403) {
          return navigate("/");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast("Item is ready  to Advertisment");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center font-bold mx-auto my-auto text-primary text-2xl ">
        {" "}
        You did not add any Product{" "}
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center font-bold my-4 text-2xl text-primary">
        My Products {products.length}{" "}
      </h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th> Product Name</th>
                <th>Brand</th>
                <th> Price </th>
                <th> Sales Status</th>
                <th> Remove </th>
                <th> Add to Advertise </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <th>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={p.image} alt="" />
                      </div>
                    </div>
                  </th>

                  <td>{p.product_name}</td>
                  <td>{p.productCategory}</td>
                  <td>{p.resalePrice}</td>
                  <td> {p.paid ? <> Sold</> : <> Unsold</>}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="font-bold text-right text-3xl text-error"
                    >
                      {" "}
                      <AiFillDelete />{" "}
                    </button>
                  </td>
                  <td>
                    {p.paid ? (
                      <> </>
                    ) : (
                      <>
                        <>
                          {p.isAdvertise ? (
                            <>
                              <p className="text-warning">Already Advertised</p>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleAdvirtis(p._id)}
                                className="btn btn-xs "
                              >
                                {" "}
                                Advertise
                              </button>{" "}
                            </>
                          )}
                        </>
                      </>
                    )}
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

export default MyProduct;

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Loader from "../../../../../../Components/Loader/Loader";

import { authcontext } from "../../../../../../Authprovider/Authprovider";

const PurchageProduct = ({ product, setBooked }) => {
  const { user } = useContext(authcontext);

  console.log(product);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddTocart = (data) => {
    // console.log(data);
    setLoading(true);
    const order = {
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      buyerNumber: data.buyerNumber,
      meetLocation: data.meetLocation,
      productName: product.product_name,
      productPrice: product.resalePrice,
      productImage: product.image,
      productId: product._id,
    };

    setLoading(true);

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Booking Approved");
          setBooked(null);
          setLoading(false);
        } else {
          toast.error(data.message);
        }
      });
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      {loading && <Loader></Loader>}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="purchage-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit(handleAddTocart)}
            className="w-96 mx-auto"
          >
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 "
            />
            <input
              type="text"
              defaultValue={user?.email}
              readOnly
              className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 "
            />
            <input
              type="text"
              defaultValue={product.product_name}
              readOnly
              className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 "
            />
            <input
              type="number"
              defaultValue={product.resalePrice}
              readOnly
              className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 "
            />
            <input
              type="text"
              {...register("buyerNumber", {
                required: "Your Number field is required",
              })}
              placeholder="Your number"
              className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 "
            />

            {errors.buyerNumber && (
              <p className="text-red-400"> {errors?.buyerNumber.message}</p>
            )}

            <input
              type="text"
              {...register("meetLocation", {
                required: "Location is Required",
              })}
              placeholder="Meeting location"
              className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 "
            />

            {errors.meetLocation && (
              <p className="text-red-400"> {errors?.meetLocation.message} </p>
            )}

            <div className="text-center">
              <button className="btn " type="submit">
                {" "}
                Add To Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchageProduct;

import React, { useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import toast from "react-hot-toast";
import PurchageProduct from "./PurchageProduct/PurchageProduct";
import UseAdmin from "../../../../../Hooks/UseAdmin";
import { authcontext } from "../../../../../Authprovider/Authprovider";
const SingleProduct = ({ Product }) => {
  const { user } = useContext(authcontext);

  const {
    image,
    product_name,
    originalPrice,
    resalePrice,
    productDescription,
    postDate,
    useYears,
    phoneNumber,
    location,
    sellerName,
    sellerVerify,
  } = Product;

  const [booked, setBooked] = useState(null);

  // console.log(Product);

  const [isadmin] = UseAdmin(user?.email);

  const handleReport = (id) => {
    fetch(`https://my-app-server.vercel.app/product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Product Reported");
        }
      });
  };

  return (
    <div>
      <div className="overflow-hidden  transition-shadow duration-300 bg-white rounded shadow-lg">
        <img src={image} className="object-cover w-full h-64" alt="" />

        <div className="p-5  border-t-0">
          <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
            <a
              href="/"
              className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
              aria-label="Category"
              title="traveling"
            >
              {product_name}
            </a>
            <span className="text-gray-600">— {}</span>
          </p>

          <div className="flex justify-between items-center my-1">
            <p className="text-black ">
              Original price:
              <span className="font-bold text-primary"> ${originalPrice}</span>
            </p>
            <p className="text-black py-">
              Reslae price:{" "}
              <span className="font-bold text-primary">$ {resalePrice} </span>
            </p>
          </div>

          <div className="flex justify-between items-center my-1">
            <p className="text-black ">
              {" "}
              Years of Use: <small>{useYears}</small>{" "}
            </p>
            <p className="text-black ">
              {" "}
              Post Date: <small>{postDate}</small>{" "}
            </p>
          </div>

          <div className="flex justify-between items-center my-1">
            <p className="text-black ">
              {" "}
              Phone : <small>{phoneNumber}</small>{" "}
            </p>
            <p className="text-black ">
              {" "}
              Location: <small>{location}</small>{" "}
            </p>
          </div>

          <div className="text-black py-1 flex items-center ">
            <div>
              Seller Name: <span className="font-bold"> {sellerName}</span>{" "}
            </div>
            <div className="ml-3 ">
              {sellerVerify && (
                <span className=" font-thin  text-blue-400">
                  <FaCheckCircle />
                </span>
              )}
            </div>
          </div>

          <p className="inline-block h-[30px] mb-16 text-lg leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700">
            {productDescription && productDescription.slice(0, 120)}
          </p>

          <div className="flex justify-between items-center my-1">
            {isadmin === "seller" || isadmin === "admin" ? (
              <>
                <div>
                  <h1 className="font-bold text-red-400">
                    Only User can Purchage Product
                  </h1>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div>
                  {Product?.paid ? (
                    <>
                      <p className="text-xl font-bold text-warning">Sold Out</p>
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor="purchage-modal"
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => setBooked(Product)}
                      >
                        Purchase
                      </label>
                    </>
                  )}
                </div>{" "}
              </>
            )}

            <div>
              <button
                onClick={() => handleReport(Product._id)}
                className=" btn btn-sm btn-error btn-outline py-2 px-3 text-white font-semibold"
              >
                <span className="inline-block">
                  <BsFillExclamationTriangleFill />
                </span>{" "}
                Report
              </button>
            </div>
          </div>

          {booked && (
            <PurchageProduct
              setBooked={setBooked}
              product={Product}
            ></PurchageProduct>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

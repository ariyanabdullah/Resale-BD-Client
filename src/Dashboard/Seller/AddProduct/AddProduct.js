import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const AddProduct = () => {
  const seller = useLoaderData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const imgHostkey = process.env.REACT_APP_imbb;

  const navigation = useNavigation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (navigation.state !== "idle") {
    return <Loader></Loader>;
  }

  const handleAddProduct = (data) => {
    let categoryid;
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    if (data.productCategory === "iPhone") {
      categoryid = "1";
    }

    if (data.productCategory === "Samsung") {
      categoryid = "2";
    }

    if (data.productCategory === "Xiaomi") {
      categoryid = "3";
    }

    const url = `https://api.imgbb.com/1/upload?expiration=15552000&key=${imgHostkey}`;

    setLoading(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          setLoading(true);
          const image = imgData.data.url;
          const productInfo = {
            sellerName: seller?.name,
            sellerVerify: seller?.verified,
            email: seller?.email,
            phoneNumber: data.phoneNumber,
            product_name: data.product_name,
            productCategory: data.productCategory,
            category_id: categoryid,
            postDate: data.postDate,
            useYears: data.useYears,
            resalePrice: data.resalePrice,
            originalPrice: data.originalPrice,
            productCondition: data.productCondition,
            productDescription: data.productDescription,
            location: data.location,
            image: image,
          };

          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("product added Successfully");
                setLoading(false);
                navigate("/dashboard/myproduct");
              }
            });
        }
      });
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="my-6">
        <div className="w-[80%] mx-auto  p-8  rounded-xl dark:bg-neutral ">
          <h1 className="text-2xl font-bold text-primary mb-4 text-center">
            Add A Product
          </h1>
          <form onSubmit={handleSubmit(handleAddProduct)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {/* Seller Name */}
              <div className="space-y-0 text-sm">
                <input
                  type="text"
                  defaultValue={seller?.name}
                  readOnly
                  disabled
                  className="w-full px-4 py-2 rounded-md border  dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
              </div>

              {/* Seller Email */}
              <div className="space-y-0 text-sm">
                <input
                  type="text"
                  defaultValue={seller?.email}
                  readOnly
                  disabled
                  className="w-full px-4 py-2 rounded-md border  dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
              </div>

              {/* Phone Number*/}
              <div className="space-y-0 text-sm">
                <input
                  type="text"
                  {...register("phoneNumber", {
                    required: " Phone Number Is Required",
                  })}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
                {errors.phoneNumber && (
                  <p className="text-red-400 font-thin text-sm">
                    {" "}
                    {errors.phoneNumber?.message}
                  </p>
                )}
              </div>
              {/* product Name */}
              <div className="space-y-0 text-sm">
                <input
                  type="text"
                  {...register("product_name", {
                    required: " Product Name Is Required",
                  })}
                  placeholder="Product Name"
                  className="w-full px-4 py-2 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
                {errors.product_name && (
                  <p className="text-red-400 font-thin text-sm">
                    {" "}
                    {errors.product_name?.message}
                  </p>
                )}
              </div>

              {/* product conditon */}
              <div className="space-y-0 text-sm">
                <input
                  type="text"
                  {...register("productCondition", {
                    required: " Product Condition Name Is Required",
                  })}
                  placeholder="Product Condition (excellent/good/fair)"
                  className="w-full px-4 py-2 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
                {errors.productCondition && (
                  <p className="text-red-400 font-thin text-sm">
                    {" "}
                    {errors.productCondition?.message}
                  </p>
                )}
              </div>
              {/* Original price */}
              <div className="space-y-0 text-sm">
                <input
                  type="number"
                  {...register("originalPrice", {
                    required: " Product Original Price  Is Required",
                  })}
                  placeholder="Original Price"
                  className="w-full px-4 py-2 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
                {errors.originalPrice && (
                  <p className="text-red-400 font-thin text-sm">
                    {" "}
                    {errors.originalPrice?.message}
                  </p>
                )}
              </div>
              {/* Resale price */}
              <div className="space-y-0 text-sm">
                <input
                  type="number"
                  {...register("resalePrice", {
                    required: " Product Old Price  Is Required",
                  })}
                  placeholder="Resale Price"
                  className="w-full px-4 py-2 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
                {errors.resalePrice && (
                  <p className="text-red-400 font-thin text-sm">
                    {" "}
                    {errors.resalePrice?.message}
                  </p>
                )}
              </div>

              {/* Years Of Use */}
              <div className="space-y-0 text-sm">
                <input
                  type="text"
                  {...register("useYears", {
                    required: " Product Years Of Use Is Required",
                  })}
                  placeholder="Years Of Use"
                  className="w-full px-4 py-2 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
                {errors.useYears && (
                  <p className="text-red-400 font-thin text-sm">
                    {" "}
                    {errors.useYears?.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-0 text-sm">
                <input
                  type="text"
                  {...register("location", {
                    required: " Location Is Required",
                  })}
                  placeholder="Location"
                  className="w-full px-4 py-2 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
                {errors.location && (
                  <p className="text-red-400 font-thin text-sm">
                    {" "}
                    {errors.location?.message}
                  </p>
                )}
              </div>

              {/* Post Date */}
              <div className="space-y-0 text-sm">
                <label htmlFor="postDate" className="font-bold text-primary">
                  {" "}
                  Post Date {"--"}
                </label>
                <input
                  id="postDate"
                  type="date"
                  {...register("postDate", {
                    required: "  Post Date  Is Required",
                  })}
                  placeholder="Post Date"
                  className="w-[79%] px-4 py-2 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
                {errors.postDate && (
                  <p className="text-red-400 font-thin text-sm">
                    {" "}
                    {errors.postDate?.message}
                  </p>
                )}
              </div>

              {/* product category */}
              <div className="space-y-0 text-sm">
                <label htmlFor="select" className="font-bold text-primary">
                  {" "}
                  Product Category{"--"}
                </label>
                <select
                  id="select"
                  className="w-[65.7%] px-4 py-2 rounded-md border text-center border-primary dark:bg-neutral dark:text-black "
                  {...register("productCategory", {
                    required: "You have to Select One Category",
                  })}
                >
                  {" "}
                  <option value="iPhone">iPhone</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Xiaomi">Xiaomi</option>
                </select>
              </div>
              {/* Product Image */}
              <div className="space-y-0 text-sm">
                <label htmlFor="image" className="font-bold text-primary">
                  {" "}
                  Upload an Image {"--"}
                </label>
                <input
                  type="file"
                  id="image"
                  {...register("image", {
                    required: "Image Field Is Required",
                  })}
                  placeholder="Upload Product Image"
                  className="w-[65.7%] px-4 py-2 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
                />
                {errors.image && (
                  <p className="text-red-400 font-thin text-sm">
                    {" "}
                    {errors.image?.message}
                  </p>
                )}
              </div>
            </div>

            {/* product description */}
            <div className="my-4 text-sm">
              <textarea
                type="text"
                rows={4}
                {...register("productDescription", {
                  required: "Product Description Field Is Required",
                  minLength: {
                    value: 126,
                    message: "Description Should be At least 120 character",
                  },
                })}
                placeholder="Product Description"
                className="w-full px-4 py-2 rounded-md border border-primary dark:bg-neutral dark:text-black focus:dark:border-indigo-400"
              />
              {errors.productDescription && (
                <p className="text-red-400 font-thin text-sm">
                  {" "}
                  {errors.productDescription?.message}{" "}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="block mx-auto w-[50%] p-3 text-center rounded-lg dark:text-white btn btn-primary"
            >
              ADD PRODUCT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

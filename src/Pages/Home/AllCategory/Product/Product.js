import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import SingleProduct from "./SingleProduct/SingleProduct";
import Loader from "../../../../Components/Loader/Loader";

const Product = () => {
  const products = useLoaderData();

  const navigation = useNavigation();
  // console.log(navigation);
  if (navigation.state === "loading") {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="container my-7 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <SingleProduct key={p._id} Product={p}>
              {" "}
            </SingleProduct>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

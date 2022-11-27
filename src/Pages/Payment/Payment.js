import React from "react";
import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
  const ordered = useLoaderData();

  return (
    <div>
      <section className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
        <div>
          <div className="card w-2/5 bg-base-100 shadow-lg">
            <img className="rounded-t-lg  " src={ordered.productImage} alt="" />

            <div className="card-body">
              <h2 className="card-title">{ordered.productName}</h2>

              <p> ${ordered.productPrice} </p>
            </div>
          </div>
        </div>

        <div className="w-96 shadow-lg border py-9 px-4 rounded-sm  my-auto">
          <Elements stripe={stripePromise}>
            <Checkout ordered={ordered} />
          </Elements>
        </div>
      </section>
    </div>
  );
};

export default Payment;

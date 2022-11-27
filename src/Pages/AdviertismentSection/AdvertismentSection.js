import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdvertismentSection = () => {
  const { data: advertisMentItems = [] } = useQuery({
    queryKey: ["advertisMentItems"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/advertisItem?isAdvertise=true"
      );
      const data = await res.json();
      return data;
    },
  });

  // console.log(advertisMentItems);

  return (
    <div>
      <h1 className="text-center text-5xl text-secondary font-extrabold ">
        Featured Items
      </h1>

      <p className="text-center font-bold"> Your Desire Phones are Here</p>

      <section className="container mt-12 mb-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advertisMentItems.map((item) => (
            <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{item.product_name}</h2>
                <p></p>
              </div>
              <figure className="h-[200px] ">
                <img className="w-full" src={item.image} alt="" />
              </figure>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdvertismentSection;

import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdvertismentSection = () => {
  const { data: advertisMentItems = [] } = useQuery({
    queryKey: ["advertisMentItems"],
    queryFn: async () => {
      const res = await fetch(
        "https://my-app-server.vercel.app/advertisItem?isAdvertise=true"
      );
      const data = await res.json();
      return data;
    },
  });

  // console.log(advertisMentItems);

  if (advertisMentItems.length === 0) {
    return <div> {""}</div>;
  }

  return (
    <div>
      <h1 className="text-center text-5xl text-secondary font-extrabold ">
        Featured Items
      </h1>

      <p className="text-center font-bold"> Your Desire Phones are Here</p>

      <section className="container mt-12 mb-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advertisMentItems.map((item) => (
            // <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
            //   <div className="card-body">
            //     <h2 className="card-title">{item.product_name}</h2>
            //     <p></p>
            //   </div>
            //   <figure className="h-[200px] ">
            //     <img className="w-full" src={item.image} alt="" />
            //   </figure>
            // </div>

            <div
              key={item._id}
              className="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-xl transition dark:shadow-slate-700/[.7]"
            >
              <div className="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
                <img
                  className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
                  src={item.image}
                  alt=".."
                />
              </div>

              <div className="p-4 md:p-5">
                <h3 className="text-lg text-center font-bold text-primary ">
                  {item.product_name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdvertismentSection;

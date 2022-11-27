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

  return (
    <div>
      <h1 className="my-6 text-center">{advertisMentItems.length}</h1>

      <h1 className="text-center text-5xl text-secondary font-extrabold ">
        Featured Items
      </h1>
    </div>
  );
};

export default AdvertismentSection;

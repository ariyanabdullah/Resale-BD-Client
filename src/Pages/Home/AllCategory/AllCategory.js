import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import Categoy from "./Categoy";

const AllCategory = () => {
  const {
    data: catagories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["catagories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/category");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="py-8 mb-7">
        <h1 className="text-center text-5xl text-secondary font-extrabold ">
          All Categories
        </h1>
      </div>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {catagories.map((cat) => (
            <Categoy key={cat.category_id} Category={cat}></Categoy>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllCategory;

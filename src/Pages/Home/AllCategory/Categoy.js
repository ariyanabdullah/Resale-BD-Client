import React from "react";
import { Link } from "react-router-dom";

const Categoy = ({ Category }) => {
  const { category_id, category_name, img } = Category;

  return (
    <div>
      <div>
        <Link
          to={`/category/${category_id}`}
          className="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-xl transition dark:shadow-slate-700/[.7]"
        >
          <div className="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
            <img
              className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
              src={img}
              alt=".."
            />
          </div>

          <div className="p-4 md:p-5">
            <h3 className="text-lg text-center font-bold text-primary ">
              {category_name}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categoy;

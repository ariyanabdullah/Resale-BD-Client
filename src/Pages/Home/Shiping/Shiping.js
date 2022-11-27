import React from "react";
import {
  MdOutlineLocalShipping,
  MdCreditCardOff,
  MdAssignmentReturn,
  MdHourglassDisabled,
} from "react-icons/md";

const Shiping = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center justify-center">
          <div className="text-8xl text-[#589195cc]">
            <MdOutlineLocalShipping />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Free Shipping </h1>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-8xl text-[#589195cc]">
            <MdCreditCardOff />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Secure Payments </h1>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-8xl text-[#589195cc]">
            <MdAssignmentReturn />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Easy Returns </h1>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-8xl text-[#589195cc]">
            <MdHourglassDisabled />
          </div>
          <div>
            <h1 className="text-2xl font-bold">24/7 Support</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shiping;

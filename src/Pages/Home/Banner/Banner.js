import React from "react";
import "./Banner.css";
const Banner = () => {
  return (
    <div>
      <div className="hero sm:py-0 md:py-16 lg:py-20 main-banner">
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl text-white font-bold">
              Trade-in Price Promise
            </h1>
            <p className="mb-5 text-white">
              Buy and Sell your used cell phones and electronics. Sell your
              iPhone, Samsung Galaxy, iPad and more for cash, or buy used
              iPhones, iPads and other cell
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

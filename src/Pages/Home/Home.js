import React from "react";
import AllCategory from "./AllCategory/AllCategory";
import Banner from "./Banner/Banner";
import Shiping from "./Shiping/Shiping";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      {/* banner section */}
      <section className="mb-12">
        <Banner></Banner>
      </section>
      {/* shipping */}

      <section className="mb-2 container mx-auto">
        <Shiping></Shiping>
      </section>

      {/* category section */}
      <section className="container mb-36 mx-auto">
        <AllCategory></AllCategory>
      </section>

      {/* Advirtisment */}

      {/* Testimonial Section */}

      <section className="mt-5">
        <Testimonials></Testimonials>
      </section>
    </div>
  );
};

export default Home;

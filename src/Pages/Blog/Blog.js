import React from "react";

const Blog = () => {
  return (
    <div>
      <section className="my-12 container w-[70%] mx-auto">
        <div>
          {/* first box */}

          <div className="shadow-md rounded-md my-4 py-5 px-4">
            <h1 className="font-bold text-xl">
              1. What are the different ways to manage a state in a React
              application?
            </h1>

            <p className="font-semibold text-gray-800">
              There Four Kinds of React State to Manage . They are Local state.
              Global state. Server state. URL state
            </p>
          </div>
          {/* second box */}
          <div className="shadow-md rounded-md my-4 py-5 px-4">
            <h1 className="font-bold text-xl">
              1. How does prototypical inheritance work?
            </h1>

            <p className="font-semibold text-gray-800">
              The prototype is itself an object, so the prototype will have its
              own prototype, making what's called a prototype chain. The chain
              ends when we reach a prototype that has null for its own prototype
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

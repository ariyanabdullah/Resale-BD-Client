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
              2. How does prototypical inheritance work?
            </h1>

            <p className="font-semibold text-gray-800">
              The prototype is itself an object, so the prototype will have its
              own prototype, making what's called a prototype chain. The chain
              ends when we reach a prototype that has null for its own prototype
            </p>
          </div>
          {/* third box */}
          <div className="shadow-md rounded-md my-4 py-5 px-4">
            <h1 className="font-bold text-xl">
              3. What is a unit test? Why should we write unit tests?
            </h1>

            <p className="font-semibold text-gray-800">
              The main objective of unit testing is to isolate written code to
              test and determine if it works as intended. Unit testing is an
              important step in the development process, because if done
              correctly, it can help detect early flaws in code which may be
              more difficult to find in later testing stages.
            </p>
          </div>
          {/* fourth box */}
          <div className="shadow-md rounded-md my-4 py-5 px-4">
            <h1 className="font-bold text-xl">
              4. What is the differents between React vs. Angular vs. Vue?
            </h1>

            <p className="font-semibold text-gray-800">
              Both - Angular JS and React JS frameworks are used to create web
              interfaces for front end development. Angular is Google's matured
              and advanced JavaScript framework based on TypeScript, whereas Vue
              is a progressive open-source front-end JavaScript framework
              created by Evan You
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

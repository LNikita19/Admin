import React from "react";

const Signup = () => {
  return (
    <>
      <div className="flex flex-col  justify-center items-center min-h-screen overflow-hidden">
        <div className="w-[50rem] p-20 m-auto bg-white rounded-md shadow-xl shadow-gray-200">
          <h1 className="text-3xl font-bold text-center text-[#1A2338] ">
            Create and account
          </h1>
          <form className="mt-6 flex flex-col justify-center items-center">
            <div className="mb-2 w-[20rem]">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-[#000] bg-white border rounded-md"
              />
            </div>
            <div className="mb-2 w-[20rem]">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-[#000] bg-white border rounded-md "
              />
            </div>
            <a
              href="/"
              className="text-xs font-bold text-[#1A2338] hover:underline"
            >
              Forget Password?
            </a>
            <div className="mt-6">
              <button className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#00C52C] rounded-md hover:bg-blue-700 focus:outline-none">
                Signup
              </button>
            </div>
          </form>

          <p className="mt-8 text-base font-light text-center text-gray-700">
            Already have an account?
            <a href="/" className="font-medium text-[#1A2338] hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;

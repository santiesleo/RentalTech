import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../../components/NavBar";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    nit: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/signup", form);
      alert("Registration successful");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
                  Create Account
                </h1>
                <p className="text-gray-600 text-center">
                  Fill in your information to get started
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Choose your username"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400 text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400 text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="nit"
                    className="text-sm font-medium text-gray-700"
                  >
                    NIT
                  </label>
                  <div className="relative">
                    <input
                      id="nit"
                      type="text"
                      name="nit"
                      placeholder="Enter your NIT"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400 text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Create a strong password"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400 text-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

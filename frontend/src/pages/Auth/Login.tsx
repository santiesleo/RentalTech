import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Navbar from "../../components/NavBar";

const LoginPage = () => {
  const { setToken } = useAuthContext();
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);

      const { data } = await axiosInstance.post("/auth/token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      alert("Login successful");
      navigate("/products");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your username and password.");
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
                  Welcome Back
                </h1>
                <p className="text-gray-600 text-center">
                  Please sign in to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="Enter your username"
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
                      placeholder="Enter your password"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400 text-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                >
                  Sign in
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Need help? Contact support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

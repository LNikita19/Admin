import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      navigate("/Home");
    }
  }, [navigate, setIsLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/userLogin`, {
        Email: email,
        Password: password,
      });

      if (response.data.status === "loggedin") {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        navigate("/Home"); // Redirect to Home after login
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", err);
    }
  };
  return (
    <div className="flex flex-col bg-[#FFF9E1] justify-center items-center min-h-screen">
      <div className="w-full max-w-lg p-8 border-2 border-[#4A301C] rounded-lg shadow-lg bg-white">
        <div className="flex flex-col items-center">
          <img className="w-1/2 mb-4" src="/logo1.png" />
          <h1 className="text-3xl font-bold text-center text-[#1A2338] mb-4">
            Login to Account
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Please enter your email and password to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#361A06] focus:border-[#361A06]"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#361A06] focus:border-[#361A06]"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#361A06] text-white rounded-md hover:bg-[#4A301C] focus:outline-none focus:ring-2 focus:ring-[#361A06] focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-sm text-[#361A06] hover:underline">
            Forget Password?
          </a>
        </div>
      </div>
    </div>

  );
};

export default Login;
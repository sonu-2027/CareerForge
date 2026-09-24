import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/LoginComp.webp";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // ✅ important
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${API}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      // ✅ store user + token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");
      navigate("/dashboard"); // ✅ redirect
    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-[#ed6e4e] ">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <img src={bgImage} alt="Logo" className="h-full w-full object-cover" />
      </div>

      <div className="w-1/2 flex flex-col justify-center px-16 ml-10">
        <h2 className="text-4xl font-bold text-white mb-3">LOGIN</h2>
        <p className="text-white text-lg mb-8">Enter your account details</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="bg-transparent border-b border-[#e3bfb2] text-white placeholder-white/70 p-2 w-150 mb-6 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="bg-transparent border-b border-[#e3bfb2] text-white placeholder-white/70 p-2 w-full mb-6 outline-none"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-white text-sm cursor-pointer">
              <input
                type="checkbox"
                className="accent-blue-500 cursor-pointer"
              />
              <span>Remember Me</span>
            </label>

            <div className="text-white text-sm mr-2 cursor-pointer hover:underline">
              Forgot Password?
            </div>
          </div>

          <button className="ml-50 bg-[#6978bb] w-40 mt-12 hover:bg-[#323464] text-white px-8 py-3 rounded-full text-xl font-medium transition-colors">
            Login
          </button>
        </form>

        <div className="flex items-center gap-2 ml-40 mt-8">
          <span className="text-white text-md">Don't have an account?</span>
          <Link
            to="/signup"
            className="text-white text-md font-bold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

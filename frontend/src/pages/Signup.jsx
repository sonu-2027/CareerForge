import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/SignUpComp.webp";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, // ✅ important
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${API}/api/auth/signup`, form);

      // ✅ store user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Signup Successful!");
      navigate("/dashboard"); // ✅ redirect
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed.");
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-[#ed6e4e]">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <img src={bgImage} alt="Logo" className="h-full w-full object-cover" />
      </div>

      <div className="w-1/2 flex flex-col justify-center px-16 ml-10">
        <h2 className="text-4xl font-bold text-white mb-3">SIGN UP</h2>
        <p className="text-white text-lg mb-8">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="bg-transparent border-b border-white text-white placeholder-white/70 p-2 w-full mb-6 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="bg-transparent border-b border-white text-white placeholder-white/70 p-2 w-full mb-6 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-transparent border-b border-white text-white placeholder-white/70 p-2 w-full mb-8 outline-none"
          />

          <div className="mt-3">
            <button
              type="submit"
              className="bg-[#6978bb] hover:bg-[#323464] text-white ml-56 px-8 py-3 rounded-full text-xl font-medium transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2 ml-45 mt-8">
          <span className="text-white text-md">Already have an account?</span>
          <Link
            to="/login"
            className="text-white text-md font-bold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

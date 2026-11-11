import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { errorMessage } from "../services/api";
import { saveSession } from "../services/auth";
import bgImage from "../assets/SignUpComp.webp";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, // ✅ important
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await API.post("/auth/signup", form);
      saveSession(res.data);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(errorMessage(err, "Signup failed."));
    } finally {
      setSubmitting(false);
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
            required
            minLength={2}
            onChange={handleChange}
            className="bg-transparent border-b border-white text-white placeholder-white/70 p-2 w-full mb-6 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="bg-transparent border-b border-white text-white placeholder-white/70 p-2 w-full mb-6 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password (min 6 characters)"
            required
            minLength={6}
            onChange={handleChange}
            className="bg-transparent border-b border-white text-white placeholder-white/70 p-2 w-full mb-8 outline-none"
          />

          {error && (
            <p className="text-sm text-white bg-black/20 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="mt-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#6978bb] hover:bg-[#323464] disabled:opacity-60 text-white ml-56 px-8 py-3 rounded-full text-xl font-medium transition-colors cursor-pointer"
            >
              {submitting ? "..." : "Sign Up"}
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

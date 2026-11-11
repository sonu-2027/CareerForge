import { Link, NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../services/auth";

const linkClass = ({ isActive }) =>
  isActive ? "underline underline-offset-4 font-semibold" : "hover:underline";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex flex-wrap justify-between items-center gap-y-2 px-10 py-4 bg-[#dc6b43] text-white">
      <Link to="/" className="text-2xl font-bold font-['Fraunces']">
        <span className="text-black">Career</span>Forge
      </Link>

      <div className="space-x-6">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/companies" className={linkClass}>
          Companies
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About Us
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>
      </div>

      <div className="flex items-center space-x-4 tracking-tight">
        {loggedIn ? (
          <>
            <NavLink to="/dashboard" className={linkClass}>
              Jobs
            </NavLink>
            <NavLink to="/saved" className={linkClass}>
              Saved
            </NavLink>
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="rounded-full px-4 py-2 border-2 border-amber-100 bg-[#dc6b43] cursor-pointer hover:bg-white/10"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/signup"
              className="rounded-full px-4 py-2 border-2 border-amber-100 text-center bg-[#dc6b43] hover:bg-white/10"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4  bg-[#dc6b43] text-white">
      <h1 className="text-2xl font-bold font-['Fraunces']">
        <span className="text-black">Career</span>Forge
      </h1>

      <div className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/Companies">Companies</Link>
        <Link to="/About">About Us</Link>
        <Link to="/Contact">Contact</Link>
      </div>

      <div className="space-x-4 tracking-tight">
        <Link to="/Login">Login</Link>
        <Link
          to="/Signup"
          className="rounded-full px-4 py-2 border-2 border-amber-100 text-center bg-[#dc6b43]"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

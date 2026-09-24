import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const companies = [
  {
    id: 1,
    name: "Grab",
    logo: "Grab",
    tagline: "Southeast Asia's leading superapp",
    location: "Singapore · SE Asia",
    industry: "Technology · Mobility",
    openRoles: 24,
    featured: true,
    tags: ["UX & Design", "Engineering", "Operations"],
  },
  {
    id: 2,
    name: "Upwork",
    logo: "Up",
    tagline: "The world's largest freelance platform",
    location: "San Francisco · Remote",
    industry: "Future of Work",
    openRoles: 18,
    featured: false,
    tags: ["Marketing", "HR & Talent", "Finance"],
  },
  {
    id: 3,
    name: "Spotify",
    logo: "♫",
    tagline: "Music, podcasts and audiobooks",
    location: "Stockholm · Remote",
    industry: "Music & Audio",
    openRoles: 42,
    featured: false,
    tags: ["Engineering", "Data Science", "Design"],
  },
];

function CompanyCard({ company }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex-shrink-0 w-[240px] hover:w-[300px] bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 
      ${
        hovered
          ? "shadow-2xl border border-orange-300 -translate-y-2 scale-105"
          : "shadow-md border border-gray-200"
      }`}
    >
      {/* Featured */}
      {company.featured && (
        <div className="absolute top-4 right-4 text-xs bg-[#dc6b43] text-white px-2 py-1 rounded-full">
          ⭐ Featured
        </div>
      )}

      {/* Logo */}
      <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-lg">
        {company.logo}
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-800">{company.name}</h3>
        <p className="text-xs text-gray-500 mt-1">📍 {company.location}</p>
        <p
          className={`text-sm text-gray-600 mt-2 ${
            hovered ? "" : "line-clamp-2"
          }`}
        >
          {company.tagline}
        </p>
      </div>

      {/* Industry */}
      <div className="mt-3">
        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          {company.industry}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {(hovered ? company.tags : company.tags.slice(0, 2)).map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-orange-100 text-[#dc6b43] px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
        {!hovered && company.tags.length > 2 && (
          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
            +{company.tags.length - 2}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t">
        <div>
          <span className="text-lg font-bold text-[#dc6b43]">
            {company.openRoles}
          </span>
          <span className="text-xs text-gray-500 ml-1">roles</span>
        </div>

        <button
          onClick={() => navigate("/login")}
          className={`text-sm px-4 py-1 rounded-full text-white transition ${
            hovered ? "bg-[#dc6b43]" : "bg-gray-800"
          }`}
        >
          View Jobs →
        </button>
      </div>
    </div>
  );
}

export default function Companies() {
  const scrollRef = useRef(null);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const onMouseDown = (e) => {
    dragging.current = true;
    dragStart.current = {
      x: e.pageX,
      scrollLeft: scrollRef.current.scrollLeft,
    };
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;
    scrollRef.current.scrollLeft =
      dragStart.current.scrollLeft - (e.pageX - dragStart.current.x);
  };

  const stopDrag = () => (dragging.current = false);

  const scroll = (dir) =>
    scrollRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#fff3e5] py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[#dc6b43] uppercase tracking-widest text-xs mb-2">
              Top Companies
            </p>
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              Best Companies for <br />
              <span className="text-[#dc6b43] italic">Employees</span>
            </h1>
            {/* <p className="text-gray-500 mt-4 text-sm">
              Hover to explore · Drag to browse
            </p> */}
          </div>

          {/* Slider */}
          <div className="relative">
            {/* Arrows */}
            <button
              onClick={() => scroll(-1)}
              className="absolute left-[-10px] top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
            >
              ‹
            </button>

            <button
              onClick={() => scroll(1)}
              className="absolute right-[-10px] top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
            >
              ›
            </button>

            {/* Scroll Area */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto no-scrollbar cursor-grab py-6"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
            >
              {companies.map((c) => (
                <CompanyCard key={c.id} company={c} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

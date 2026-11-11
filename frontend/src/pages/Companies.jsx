import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

// Shown when the API has no jobs yet (empty DB) or can't be reached,
// so the page is never blank.
const FEATURED_FALLBACK = [
  {
    name: "Grab",
    tagline: "Southeast Asia's leading superapp",
    locations: ["Singapore · SE Asia"],
    industry: "Technology · Mobility",
    openRoles: 24,
    featured: true,
    tags: ["UX & Design", "Engineering", "Operations"],
  },
  {
    name: "Upwork",
    tagline: "The world's largest freelance platform",
    locations: ["San Francisco · Remote"],
    industry: "Future of Work",
    openRoles: 18,
    tags: ["Marketing", "HR & Talent", "Finance"],
  },
  {
    name: "Spotify",
    tagline: "Music, podcasts and audiobooks",
    locations: ["Stockholm · Remote"],
    industry: "Music & Audio",
    openRoles: 42,
    tags: ["Engineering", "Data Science", "Design"],
  },
];

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

function CompanyCard({ company }) {
  const navigate = useNavigate();
  const tags = company.tags || company.jobTypes || [];

  return (
    <div
      className="relative flex flex-col bg-white rounded-2xl p-6 border border-gray-200 shadow-md
                 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-orange-300"
    >
      {company.featured && (
        <div className="absolute top-4 right-4 text-xs bg-[#dc6b43] text-white px-2 py-1 rounded-full">
          ⭐ Featured
        </div>
      )}

      <div className="w-14 h-14 bg-orange-100 text-[#dc6b43] rounded-xl flex items-center justify-center font-bold text-lg">
        {initials(company.name)}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-800 break-words">
          {company.name}
        </h3>
        {company.locations?.length > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            📍 {company.locations.join(" · ")}
          </p>
        )}
        {company.tagline && (
          <p className="text-sm text-gray-600 mt-2">{company.tagline}</p>
        )}
      </div>

      {company.industry && (
        <div className="mt-3">
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {company.industry}
          </span>
        </div>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-orange-100 text-[#dc6b43] px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <div>
          <span className="text-lg font-bold text-[#dc6b43]">
            {company.openRoles}
          </span>
          <span className="text-xs text-gray-500 ml-1">
            {company.openRoles === 1 ? "role" : "roles"}
          </span>
        </div>

        <button
          onClick={() =>
            navigate(`/dashboard?company=${encodeURIComponent(company.name)}`)
          }
          className="text-sm px-4 py-1.5 rounded-full text-white bg-gray-800 hover:bg-[#dc6b43] transition cursor-pointer"
        >
          View Jobs →
        </button>
      </div>
    </div>
  );
}

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await API.get("/jobs/companies", { params: { limit: 30 } });
        if (cancelled) return;
        const list = res.data.companies || [];
        if (list.length === 0) {
          setCompanies(FEATURED_FALLBACK);
          setUsingFallback(true);
        } else {
          setCompanies(list);
        }
      } catch (err) {
        console.error("Error loading companies:", err);
        if (!cancelled) {
          setCompanies(FEATURED_FALLBACK);
          setUsingFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? companies.filter((c) => c.name.toLowerCase().includes(q))
      : companies;
  }, [companies, query]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#fff3e5] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#dc6b43] uppercase tracking-widest text-xs mb-2">
              Top Companies
            </p>
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              Best Companies for <br />
              <span className="text-[#dc6b43] italic">Employees</span>
            </h1>
          </div>

          <div className="max-w-md mx-auto mb-10">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies..."
              className="w-full bg-white rounded-full shadow px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#dc6b43]/40"
            />
          </div>

          {usingFallback && !loading && (
            <p className="text-center text-xs text-gray-500 mb-6">
              Showing featured companies. Live company data will appear once
              jobs are available.
            </p>
          )}

          {loading ? (
            <p className="text-center text-gray-500">Loading companies...</p>
          ) : visible.length === 0 ? (
            <p className="text-center text-gray-500">
              No companies match “{query}”.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((c) => (
                <CompanyCard key={c.name} company={c} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

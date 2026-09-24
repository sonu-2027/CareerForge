import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);
      const data = await res.json();

      console.log("API RESPONSE:", data); // debug

      // ✅ FIXED LINE
      setJobs(data.jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();

    const interval = setInterval(fetchJobs, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div className="bg-[#dc6b43] h-50 pt-10">
        <h1 className="text-amber-50 text-3xl mb-5 pl-9 font-bold">
          Find Your Dream Job Here ✦
        </h1>
        <SearchBar />
      </div>

      {/* Main */}
      <div className="bg-[#fdf6ed] px-8 py-8">
        <h2 className="text-2xl font-semibold mb-6">Recommended Jobs</h2>

        <div className="flex gap-8">
          {/* Filters */}
          <div className="w-1/4">
            <Filters />
          </div>

          {/* Jobs */}
          <div className="w-3/4 grid grid-cols-2 gap-6">
            {loading ? (
              <p>Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p>No jobs found</p>
            ) : (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

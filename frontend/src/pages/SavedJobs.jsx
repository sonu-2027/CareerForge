import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import API, { errorMessage } from "../services/api";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    API.get("/users/saved-jobs")
      .then((res) => !cancelled && setJobs(res.data.savedJobs || []))
      .catch((err) => !cancelled && setError(errorMessage(err, "Could not load saved jobs.")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const unsave = async (jobId) => {
    try {
      await API.delete(`/users/saved-jobs/${jobId}`);
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      setError(errorMessage(err, "Could not remove job."));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fdf6ed] px-8 py-10">
        <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : jobs.length === 0 ? (
          <p>
            No saved jobs yet.{" "}
            <Link to="/dashboard" className="text-[#dc6b43] underline">
              Browse jobs
            </Link>
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} saved onToggleSave={unsave} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SavedJobs;

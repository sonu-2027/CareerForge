import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Navbar from "../components/Navbar";
import API, { errorMessage } from "../services/api";
import useSavedJobs from "../hooks/useSavedJobs";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { savedIds, toggleSave } = useSavedJobs();

  useEffect(() => {
    let cancelled = false;
    API.get(`/jobs/${id}`)
      .then((res) => !cancelled && setJob(res.data.job))
      .catch((err) => !cancelled && setError(errorMessage(err, "Job not found.")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  const applyUrl = job?.applyLink || (/^https?:\/\//.test(job?.source || "") ? job.source : "");
  const saved = job ? savedIds.has(job._id) : false;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fdf6ed] px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <Link to="/dashboard" className="text-sm text-[#dc6b43] hover:underline">
            ← Back to jobs
          </Link>

          {loading ? (
            <p className="mt-6">Loading...</p>
          ) : error ? (
            <p className="mt-6 text-red-600">{error}</p>
          ) : (
            <div className="bg-white rounded-2xl shadow p-8 mt-4">
              <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
              <p className="text-gray-700">
                <strong>{job.company}</strong> · {job.location}
              </p>
              <div className="flex gap-2 mt-3 text-xs">
                {job.jobType && (
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
                    {job.jobType}
                  </span>
                )}
                {job.source && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    via {/^https?:\/\//.test(job.source) ? "Remotive" : job.source}
                  </span>
                )}
              </div>

              {/* Scraped descriptions are third-party HTML: always sanitise. */}
              <div
                className="mt-6 text-sm text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.description || ""),
                }}
              />

              <div className="flex gap-3 mt-8">
                {applyUrl ? (
                  <a
                    href={applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#dc6b43] hover:bg-[#c45a35] text-white px-5 py-2 rounded-full"
                  >
                    Apply on Company Portal
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">No apply link available.</span>
                )}
                <button
                  onClick={() => toggleSave(job._id)}
                  className="border px-5 py-2 rounded-full cursor-pointer hover:bg-orange-50"
                >
                  {saved ? "♥ Saved" : "♡ Save job"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default JobDetails;

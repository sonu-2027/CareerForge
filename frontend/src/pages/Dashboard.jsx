import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import API, { errorMessage } from "../services/api";
import useSavedJobs from "../hooks/useSavedJobs";

const PAGE_SIZE = 12;

function Dashboard() {
  // ?company=Grab (set by the Companies page) filters by company
  const [searchParams, setSearchParams] = useSearchParams();
  const company = searchParams.get("company") || "";

  // draft values typed in the search bar; applied on submit
  const [keywordDraft, setKeywordDraft] = useState("");
  const [locationDraft, setLocationDraft] = useState("");

  // applied filters (these trigger a fetch)
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  // Result of the latest fetch, tagged with the query it belongs to.
  // "loading" is derived (result is stale) instead of set inside the effect.
  const [result, setResult] = useState({
    key: null,
    jobs: [],
    pagination: null,
    error: "",
  });

  const { savedIds, toggleSave } = useSavedJobs();

  const params = useMemo(() => {
    const p = { page, limit: PAGE_SIZE };
    const search = [keyword, category].filter(Boolean).join(" ");
    if (search) p.search = search;
    if (location) p.location = location;
    if (jobType) p.jobType = jobType;
    if (company) p.company = company;
    return p;
  }, [keyword, location, jobType, category, company, page]);

  const queryKey = JSON.stringify(params);
  const loading = result.key !== queryKey;
  const { jobs, pagination, error } = result;

  useEffect(() => {
    let cancelled = false;

    API.get("/jobs", { params })
      .then((res) => {
        if (cancelled) return;
        setResult({
          key: queryKey,
          jobs: res.data.jobs || [],
          pagination: res.data.pagination || null,
          error: "",
        });
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Error fetching jobs:", err);
        setResult({
          key: queryKey,
          jobs: [],
          pagination: null,
          error: errorMessage(err, "Could not load jobs."),
        });
      });

    return () => {
      cancelled = true;
    };
  }, [params, queryKey]);

  const applySearch = () => {
    setKeyword(keywordDraft.trim());
    setLocation(locationDraft.trim());
    setPage(1);
  };

  const clearAll = () => {
    setKeywordDraft("");
    setLocationDraft("");
    setKeyword("");
    setLocation("");
    setJobType("");
    setCategory("");
    setPage(1);
    setSearchParams({});
  };

  return (
    <div>
      <Navbar />

      <div className="bg-[#dc6b43] pt-10 pb-8">
        <h1 className="text-amber-50 text-3xl mb-5 pl-9 font-bold">
          Find Your Dream Job Here ✦
        </h1>
        <SearchBar
          keyword={keywordDraft}
          location={locationDraft}
          onKeywordChange={setKeywordDraft}
          onLocationChange={setLocationDraft}
          onSubmit={applySearch}
        />
      </div>

      <div className="bg-[#fdf6ed] min-h-screen px-8 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold">
            {company ? `Jobs at ${company}` : "Recommended Jobs"}
          </h2>
          {company && (
            <button
              onClick={() => {
                setSearchParams({});
                setPage(1);
              }}
              className="text-xs bg-white border rounded-full px-3 py-1 cursor-pointer hover:bg-orange-50"
            >
              ✕ Clear company filter
            </button>
          )}
          {pagination && (
            <span className="text-sm text-gray-500">
              {pagination.totalJobs} result{pagination.totalJobs === 1 ? "" : "s"}
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <Filters
              jobType={jobType}
              onJobTypeChange={(v) => {
                setJobType(v);
                setPage(1);
              }}
              category={category}
              onCategoryChange={(v) => {
                setCategory(v);
                setPage(1);
              }}
              onClear={clearAll}
            />
          </div>

          <div className="md:w-3/4">
            {loading ? (
              <p>Loading jobs...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : jobs.length === 0 ? (
              <p>No jobs found. Try changing your search or filters.</p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      saved={savedIds.has(job._id)}
                      onToggleSave={toggleSave}
                    />
                  ))}
                </div>

                {pagination && pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                      disabled={!pagination.hasPrevPage}
                      onClick={() => setPage((p) => p - 1)}
                      className="px-4 py-2 rounded-full bg-white border disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                      ← Prev
                    </button>
                    <span className="text-sm">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button
                      disabled={!pagination.hasNextPage}
                      onClick={() => setPage((p) => p + 1)}
                      className="px-4 py-2 rounded-full bg-white border disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

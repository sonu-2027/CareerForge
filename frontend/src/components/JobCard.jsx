import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { toPlainText } from "../utils/text";

function JobCard({ job, saved = false, onToggleSave }) {
  const preview = toPlainText(job.description);
  const company = job.company || "Unknown Company";

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition flex flex-col">
      <div className="flex justify-between items-start mb-4 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 shrink-0 rounded-md bg-orange-100 text-[#dc6b43] flex items-center justify-center font-bold text-sm">
            {company[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <Link
              to={`/jobs/${job._id}`}
              className="font-semibold text-sm hover:text-[#dc6b43] line-clamp-2"
            >
              {job.title || "No Title"}
            </Link>
            <p className="text-xs text-gray-500 truncate">{company}</p>
          </div>
        </div>

        {onToggleSave && (
          <button
            onClick={() => onToggleSave(job._id)}
            aria-label={saved ? "Remove from saved jobs" : "Save job"}
            className="cursor-pointer"
          >
            <Heart
              size={18}
              className={saved ? "text-red-500" : "text-gray-400"}
              fill={saved ? "currentColor" : "none"}
            />
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap mb-3 text-xs">
        {job.jobType && (
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
            {job.jobType}
          </span>
        )}
        {job.location && (
          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">
            {job.location}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {preview || "No description available"}
      </p>

      <div className="flex justify-between items-center text-sm mt-auto">
        <span className="text-gray-400 text-xs">
          {job.createdAt ? new Date(job.createdAt).toDateString() : "Recently"}
        </span>
        <Link
          to={`/jobs/${job._id}`}
          className="text-[#dc6b43] font-medium hover:underline"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}

export default JobCard;

import { Heart } from "lucide-react";

function JobCard({ job }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
      {/* Top */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img
            src={job.companyLogo || "https://via.placeholder.com/40"}
            alt="logo"
            className="w-10 h-10 rounded-md"
          />
          <div>
            <h3 className="font-semibold text-sm">{job.title || "No Title"}</h3>
            <p className="text-xs text-gray-500">
              {job.company || "Unknown Company"}
            </p>
          </div>
        </div>

        <Heart className="text-gray-400 cursor-pointer" size={18} />
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-3 text-xs">
        {job.type && (
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
            {job.type}
          </span>
        )}
        {job.workMode && (
          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">
            {job.workMode}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">
        {job.description
          ? job.description.replace(/<[^>]+>/g, "").slice(0, 100) + "..."
          : "No description available"}
      </p>

      {/* Bottom */}
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">{job.salary || "Not disclosed"}</span>
        <span className="text-gray-400 text-xs">
          {job.createdAt ? new Date(job.createdAt).toDateString() : "Recently"}
        </span>
      </div>
    </div>
  );
}

export default JobCard;

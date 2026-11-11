// Only filters the backend actually supports are shown:
// jobType (GET /api/jobs?jobType=...) and a keyword category (?search=...).
const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
  "Freelance",
  "Remote",
];

const CATEGORIES = [
  "Software Development",
  "UI/UX Design",
  "Data Science",
  "Marketing",
  "Finance",
  "Human Resources",
];

function Filters({ jobType, onJobTypeChange, category, onCategoryChange, onClear }) {
  return (
    <div className="space-y-6 text-sm">
      <div>
        <h3 className="font-semibold mb-2">Job Type</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="jobType"
            checked={jobType === ""}
            onChange={() => onJobTypeChange("")}
          />{" "}
          All
        </label>
        {JOB_TYPES.map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="jobType"
              checked={jobType === type}
              onChange={() => onJobTypeChange(type)}
            />{" "}
            {type}
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Job Category</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCategoryChange(category === c ? "" : c)}
              className={`px-3 py-1 rounded-full border text-xs cursor-pointer transition ${
                category === c
                  ? "bg-[#dc6b43] text-white border-[#dc6b43]"
                  : "bg-white hover:bg-orange-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="text-[#dc6b43] underline cursor-pointer"
      >
        Clear all filters
      </button>
    </div>
  );
}

export default Filters;

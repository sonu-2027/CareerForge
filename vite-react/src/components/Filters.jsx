import { useState } from "react";

function Filters() {
  const [categoryQuery, setCategoryQuery] = useState("");

  const categories = [
    "Software Development",
    "UI/UX Design",
    "Data Science",
    "Marketing",
    "Finance",
    "Human Resources",
  ];

  return (
    <div className="space-y-6 text-sm">
      {/* Job Type */}
      <div>
        <h3 className="font-semibold mb-2">Job Type</h3>
        {["Full-time", "Part-time", "Internship"].map((type) => (
          <label key={type} className="flex items-center gap-2">
            <input type="checkbox" /> {type}
          </label>
        ))}
      </div>

      {/* Salary */}
      <div>
        <h3 className="font-semibold mb-2">Salary Range</h3>
        <input type="range" className="w-full" />
      </div>

      {/* Experience */}
      <div>
        <h3 className="font-semibold mb-2">Experience</h3>
        {["Entry", "Mid", "Senior"].map((lvl) => (
          <label key={lvl} className="flex items-center gap-2">
            <input type="checkbox" /> {lvl}
          </label>
        ))}
      </div>

      {/* Category Search */}
      <div>
        <h3 className="font-semibold mb-2">Job Category</h3>

        <input
          type="text"
          value={categoryQuery}
          onChange={(e) => setCategoryQuery(e.target.value)}
          placeholder="Search category..."
          className="w-full border rounded-lg px-3 py-2"
        />

        {categoryQuery && (
          <div className="border mt-1 rounded bg-white shadow">
            {categories
              .filter((c) =>
                c.toLowerCase().includes(categoryQuery.toLowerCase()),
              )
              .map((c) => (
                <div
                  key={c}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCategoryQuery(c)}
                >
                  {c}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Work Mode */}
      <div>
        <h3 className="font-semibold mb-2">Work Mode</h3>
        {["Remote", "Hybrid", "On-site"].map((mode) => (
          <label key={mode} className="flex items-center gap-2">
            <input type="checkbox" /> {mode}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Filters;

import { Search, MapPin } from "lucide-react";

function SearchBar() {
  return (
    <div className="w-8xl h-17 mx-8 bg-white rounded-full shadow-lg flex items-center px-4 py-2">
      {/* Job Search */}
      <div className="flex items-center flex-1 gap-2 px-3">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Job title or keyword"
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300"></div>

      {/* Location */}
      <div className="flex items-center flex-1 gap-2 px-3">
        <MapPin className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Add country or city"
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Button */}
      <button className="ml-3 bg-[#6978bb] hover:bg-[#323464] text-white text-md px-9 py-4 rounded-full transition">
        Search
      </button>
    </div>
  );
}

export default SearchBar;

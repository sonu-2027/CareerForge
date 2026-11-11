import { Search, MapPin } from "lucide-react";

function SearchBar({ keyword, location, onKeywordChange, onLocationChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="mx-8 bg-white rounded-full shadow-lg flex items-center px-4 py-2"
    >
      <div className="flex items-center flex-1 gap-2 px-3">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="Job title, keyword or company"
          className="w-full outline-none text-sm"
        />
      </div>

      <div className="h-6 w-px bg-gray-300"></div>

      <div className="flex items-center flex-1 gap-2 px-3">
        <MapPin className="text-gray-400" size={18} />
        <input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Add country or city"
          className="w-full outline-none text-sm"
        />
      </div>

      <button
        type="submit"
        className="ml-3 bg-[#6978bb] hover:bg-[#323464] text-white px-9 py-3 rounded-full transition cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

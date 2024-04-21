import React from "react";

const SearchBar = ({ setSearch }) => {
  return (
    <>
      {/* Search Bar */}
      <div className="flex justify-center flex-grow w-full">
        <form className="w-full">
          <input
            className="p-2 w-full border-black border text-black"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;

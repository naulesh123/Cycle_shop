import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const BigSearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="relative flex items-center w-full max-w-4xl bg-white rounded-full shadow-md px-4 py-1">
        <MagnifyingGlassIcon className="text-gray-500 h-6 w-6 mr-3" />
        <Input
          type="text"
          className="flex-grow border-none focus:ring-0 focus:outline-none p-0"
          value={search}
          onChange={handleSearchChange}
          containerProps={{
            className: "flex-grow",
          }}
          style={{ boxShadow: 'none', border: 'none' }}
        />
        <div className="flex items-center space-x-3">
          {/* Additional icons can be added here */}
        </div>
      </div>
    </div>
  );
};

export default BigSearchBar;

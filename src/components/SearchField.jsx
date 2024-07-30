import { useContext, useState } from "react";
import { ImageContext } from "../App";

const SearchField = () => {
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(1);

  const { fetchData, setSearchImage } = useContext(ImageContext);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const hangleButtonSearch = () => {
    if (perPage < 0 || perPage > 8) {
      alert("Please Enter a number between 1 and 8!");
      return;
    }
    fetchData(
      `search/photos?page=1&query=${searchValue}&per_page=${perPage}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    );
    setSearchValue("");
    setSearchImage(searchValue);
  };

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      if (perPage < 0 || perPage > 8) {
        alert("Please Enter a number between 1 and 8!");
        return;
      }
      fetchData(
        `search/photos?page=1&query=${searchValue}&per_page=${perPage}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
      );
      setSearchValue("");
      setSearchImage(searchValue);
    }
  };

  return (
    <div className="flex">
      <input
        className="bg-gray-50 border border-gray-300 text-sm w-full indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl"
        type="search"
        placeholder="Search Anything..."
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterSearch}
      />
      <input
        type="number"
        min="1"
        max="8"
        value={perPage}
        onChange={(e) => {
          setPerPage(e.target.value);
        }}
      />
      <button
        onClick={hangleButtonSearch}
        disabled={!searchValue}
        className="bg-blue-600 px-6 py-2.5 text-white rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
      >
        Search
      </button>
    </div>
  );
};

export default SearchField;

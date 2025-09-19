// import { useState } from "react";
// import { Input } from "../ui/input";
// import { SearchIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { fetchProcutsByFilters, setFilters } from "@/redux/slice/productSlic";

// function SearchBar() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [search, setSearch] = useState("");
//   const [showSearchInput, setShowSearchInput] = useState(false);

//   const handleToggleSearch = () => {
//     setShowSearchInput((prev) => !prev);
//   };


//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!search.trim()) return; // avoid empty searches
//     dispatch(setFilters({ search }));
//     dispatch(fetchProcutsByFilters({ search }));
//     navigate(`/collection/all?search=${search}`);
//   };

//   return (
//     <div
//       className={`flex items-center justify-center w-max  ${
//         showSearchInput
//           ? "absolute w-screen  top-0 left-0  bg-white h-24 z-50 transition-all duration-300"
//           : "w-0"
//       }`}
//     >
//       {!showSearchInput ? (
//         <button
//           type="button"
//           onClick={handleToggleSearch}
//           className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//         >
//           {/* SearchIcon placeholder (replace with actual Lucide icon if imported) */}
//           <SearchIcon />
//         </button>
//       ) : (
//         <>
//           <form
//             onSubmit={handleSearch}
//             className="  flex justify-center items-center gap-2 min-w-md ring rounded-2xl px-3 py-1 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
//           >
//             <Input
//               id="search-field"
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0"
//               autoFocus
//             />
//             <button type="submit">
//               {" "}
//               <SearchIcon className="cursor-pointer" />
//             </button>
//           </form>
//           <button
//             type="button"
//             onClick={handleToggleSearch}
//             className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//           >
//             {/* XIcon placeholder (replace with actual Lucide icon if imported) */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="h-5 w-5"
//             >
//               <path d="M18 6 6 18" />
//               <path d="m6 6 12 12" />
//             </svg>
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default SearchBar;



import { useState } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProcutsByFilters, setFilters } from "@/redux/slice/productSlic";

function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleToggleSearch = () => {
    setShowSearchInput((prev) => !prev);
    navigate(`/collections/all`);
  };

  // FIX ✅ correct event type for form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return; // avoid empty searches
    dispatch(setFilters({ search }));
    dispatch(fetchProcutsByFilters({ search }));
    navigate(`/collections/all?search=${search}`);
  };

  return (
    <div
      className={`flex items-center justify-center w-max ${
        showSearchInput
          ? "absolute w-screen top-0 left-0 bg-white h-24 z-50 transition-all duration-300"
          : "w-0"
      }`}
    >
      {!showSearchInput ? (
        <button
          type="button"
          onClick={handleToggleSearch}
          className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <SearchIcon />
        </button>
      ) : (
        <>
          <form
            onSubmit={handleSearch}
            className="flex justify-center items-center gap-2 min-w-md ring rounded-2xl px-3 py-1 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
          >
            <Input
              id="search-field"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            <button type="submit">
              <SearchIcon className="cursor-pointer" />
            </button>
          </form>
          <button
            type="button"
            onClick={handleToggleSearch}
            className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default SearchBar;

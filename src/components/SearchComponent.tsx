import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { useRouter } from "next/navigation";

// Define the type for the suggestion
interface Suggestion {
  id: number;
  name: string;
  city: string;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); // Use the Suggestion type
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  // Fetch search suggestions as the user types
  useEffect(() => {
    if (query.length > 1) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]); // Clear suggestions if query is empty
    }
  }, [query]);

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();

      // Ensure data.suggestions is an array of type Suggestion[]
      if (Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions as Suggestion[]);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions", error);
      setSuggestions([]); // Ensure suggestions is an empty array on error
    }
  };

  const handleSuggestionClick = (id: number) => {
    router.push(`/detail/${id}`); // Redirect to dynamic route for the destination
  };

  return (
    <div className=" w-[250px] z-[100] font-serif">
        <div className="relative">
        <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)} // Show when focused
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        className="h-8 font-sans rounded-md focus:outline-none px-3 w-full"
        placeholder="Search Destinations..."
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="w-5 h-5 absolute right-2 top-[0.35rem]"
      />
        </div>
      {suggestions.length > 0 && (
        <ul className={`absolute rounded-lg  w-[250px] bg-white border mt-1 shadow-lg max-h-60 overflow-y-auto z-[100] ${showSuggestions ? "opacity-1" : "opacity-0"}`}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion.id)}
            >
              <div>{suggestion.name}</div>
              <div className="text-sm text-gray-500">{suggestion.city}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

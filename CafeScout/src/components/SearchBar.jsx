import { useState, useEffect, useRef } from "react";
import { useCafes } from "../context/CafeContext";
import { searchPlace, autocompletePlace } from "../services/geocodingService";
import { getCurrentLocation } from "../services/locationService";

function SearchBar() {
  // Consume central state and actions from Context
  const {
    currentLocation,
    setCurrentLocation,
    searchText,
    setSearchText,
    loading,
    setLoading,
    error,
    setError,
    radius,
    setRadius,
  } = useCafes();

  // =====================================================
  // AUTOCOMPLETE STATE & HOOKS
  // =====================================================
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isSelectingRef = useRef(false);

  // Debounced API call to fetch location autocomplete suggestions
  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      if (searchText.trim().length > 2) {
        try {
          const hints = await autocompletePlace(searchText);
          setSuggestions(hints);
          setShowSuggestions(true);
        } catch (e) {
          console.error(e);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Click outside listener to dismiss the suggestions dropdown
  useEffect(() => {
    function handleClickOutside() {
      setShowSuggestions(false);
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Selection handler for autocomplete dropdown item
  function handleSelectSuggestion(suggestion) {
    isSelectingRef.current = true;
    setSearchText(suggestion.formatted);
    setSuggestions([]);
    setShowSuggestions(false);

    // Setting currentLocation triggers the places query reactively in CafeContext
    setCurrentLocation({
      lat: suggestion.lat,
      lng: suggestion.lng,
      name: suggestion.formatted,
    });
  }

  // =====================================================
  // SEARCH A CITY
  // =====================================================
  async function handleSearch() {
    if (!searchText.trim()) return;

    setShowSuggestions(false);
    setLoading(true);
    setError(null);

    try {
      // Convert city/landmark name into coordinates
      const location = await searchPlace(searchText);

      if (!location) {
        setError("We couldn't find the location you entered. Please check the spelling and try again.");
        return;
      }

      // Save searched location (triggers fetchNearbyCafes in Context)
      setCurrentLocation(location);
    } catch (err) {
      console.error(err);
      setError("Failed to query this location. Please try checking your internet connection.");
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // NEAR ME (GPS LOCATION)
  // =====================================================
  async function handleNearMe() {
    setLoading(true);
    setError(null);

    try {
      // Get browser GPS coordinates
      const location = await getCurrentLocation();

      // Save user location (triggers fetchNearbyCafes in Context)
      setCurrentLocation({
        lat: location.lat,
        lng: location.lng,
        name: "My Location",
      });
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve your location. Please check browser location permissions.");
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // JSX
  // =====================================================
  return (
    <section className="mx-auto max-w-7xl px-8 py-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 rounded-2xl bg-white p-4 shadow-lg">
        
        {/* Search Input and Suggestions */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search any city or place..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#6F4E37] disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-800"
          />

          {/* Autocomplete Dropdown List */}
          {showSuggestions && suggestions.length > 0 && (
            <ul
              className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectSuggestion(suggestion);
                  }}
                  className="cursor-pointer px-4 py-3 text-sm text-gray-700 hover:bg-[#FAF7F2] hover:text-[#6F4E37] transition duration-150 border-b border-gray-50 last:border-b-0 flex items-center gap-2"
                >
                  <span className="text-gray-400">📍</span>
                  <span className="font-medium">{suggestion.formatted}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Radius Filter Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="radius" className="text-sm font-semibold text-gray-500 whitespace-nowrap">
            Radius:
          </label>
          <select
            id="radius"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-[#6F4E37] cursor-pointer"
          >
            <option value={2000}>2 km</option>
            <option value={5000}>5 km</option>
            <option value={10000}>10 km</option>
            <option value={20000}>20 km</option>
          </select>
        </div>

        {/* Search Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex-1 md:flex-none rounded-xl bg-[#6F4E37] px-6 py-3 font-semibold text-white hover:bg-[#5B3E2D] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            onClick={handleNearMe}
            disabled={loading}
            className="flex-1 md:flex-none rounded-xl bg-[#6F4E37] px-6 py-3 font-semibold text-white hover:bg-[#5B3E2D] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition duration-200"
          >
            Near Me
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-4 flex items-center justify-center gap-3 text-[#6F4E37] font-medium animate-pulse">
          <svg className="animate-spin h-5 w-5 text-[#6F4E37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Searching nearby places...</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-red-50 border border-red-200 p-4 text-red-800 transition duration-200 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 transition font-bold text-lg px-2"
          >
            &times;
          </button>
        </div>
      )}

      {/* Active Selection Coordinates info */}
      {currentLocation && (
        <p className="mt-3 text-center text-sm font-medium text-gray-500">
          📍 {currentLocation.name ? currentLocation.name : `${currentLocation.lat.toFixed(5)}, ${currentLocation.lng.toFixed(5)}`}
        </p>
      )}
    </section>
  );
}

export default SearchBar;
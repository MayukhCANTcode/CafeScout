// =====================================================
// SEARCH BAR COMPONENT
// =====================================================
//
// Responsibilities:
//
// • Get user location
// • Update global search text
//
// =====================================================

import { getCurrentLocation } from "../services/locationService";

function SearchBar({

  currentLocation,

  setCurrentLocation,

  searchText,

  setSearchText,

}) {

  async function handleNearMe() {

    try {

      const location = await getCurrentLocation();

      setCurrentLocation(location);

    }

    catch {

      alert("Unable to get your location.");

    }

  }

  return (

    <section className="mx-auto max-w-7xl px-8 py-8">

      <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lg">

        <input

          type="text"

          placeholder="Search cafes..."

          value={searchText}

          onChange={(e)=>setSearchText(e.target.value)}

          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#6F4E37]"

        />

        <button

          onClick={handleNearMe}

          className="rounded-xl bg-[#6F4E37] px-6 py-3 font-semibold text-white hover:bg-[#5B3E2D]"

        >

          Near Me

        </button>

      </div>

      {currentLocation && (

        <p className="mt-4 text-center">

          📍 {currentLocation.lat.toFixed(4)} ,

          {" "}

          {currentLocation.lng.toFixed(4)}

        </p>

      )}

    </section>

  );

}

export default SearchBar;
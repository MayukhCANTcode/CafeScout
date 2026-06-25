// Import the useState Hook from React.
// useState allows us to store values that can change
// while the application is running.
import { useState } from "react";

// Import our custom function from locationService.
// This function is responsible for getting the user's
// current location using the browser's Geolocation API.
import { getCurrentLocation } from "../services/locationService";

function SearchBar() {

  // =====================================================
  // STATE
  // =====================================================

  // Stores whatever the user types into the search box.
  const [search, setSearch] = useState("");

  // Stores the user's current location.
  //
  // Initially:
  // location = null
  //
  // After clicking "Near Me":
  // location = {
  //    lat: ...,
  //    lng: ...
  // }
  const [location, setLocation] = useState(null);



  // =====================================================
  // HANDLE "NEAR ME" BUTTON CLICK
  // =====================================================

  // This function runs whenever the user clicks
  // the "Near Me" button.
  async function handleNearMe() {

    try {

      // Ask the browser for the user's current location.
      //
      // await means:
      // "Pause here until the browser gives me the location."
      const currentLocation = await getCurrentLocation();

      // Save the location inside React state.
      // This automatically causes the component to re-render.
      setLocation(currentLocation);

      // Broadcast a custom browser event.
      //
      // Right now MapView is listening for this event.
      // When it receives it, the map flies to the user's location.
      //
      // NOTE:
      // We are using this only temporarily.
      // Later we'll replace it with proper React state management.
      window.dispatchEvent(
        new CustomEvent("locationChanged", {
          detail: currentLocation,
        })
      );

      // Print the location inside the browser console.
      // Useful for debugging.
      console.log(currentLocation);

    } catch (error) {

      // If the user blocks location permission
      // or an error occurs,
      // show an alert instead of crashing the application.
      alert("Unable to get your location.");

      console.error(error);
    }
  }



  // =====================================================
  // JSX
  // =====================================================

  return (

    // Main search section
    <section className="mx-auto max-w-7xl px-8 py-8">

      {/* Search Box + Near Me Button */}
      <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lg">

        {/* Search Input */}
        <input

          type="text"

          placeholder="🔍 Search cafes..."

          // Current value stored in React state.
          value={search}

          // Update React state whenever
          // the user types something.
          onChange={(e) => setSearch(e.target.value)}

          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#6F4E37]"
        />



        {/* Near Me Button */}
        <button

          // When clicked,
          // execute handleNearMe().
          onClick={handleNearMe}

          className="rounded-xl bg-[#6F4E37] px-6 py-3 font-semibold text-white transition hover:bg-[#5B3E2D]"
        >
          Near Me
        </button>

      </div>



      {/* Display the current search text */}
      <p className="mt-4 text-center text-lg">
        Searching for: {search}
      </p>



      {/* =====================================================
          CONDITIONAL RENDERING

          If location exists,
          display the latitude & longitude.

          If location is null,
          display nothing.
      ===================================================== */}

      {location && (

        <p className="mt-2 text-center text-gray-600">

          📍 Latitude: {location.lat.toFixed(5)}

          <br />

          📍 Longitude: {location.lng.toFixed(5)}

        </p>

      )}

    </section>
  );
}

export default SearchBar;
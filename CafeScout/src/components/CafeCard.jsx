// =====================================================
// CAFE CARD COMPONENT
// =====================================================
//
// This component displays one cafe.
//
// Responsibilities:
// • Display cafe information
// • Select a cafe when clicked
// • Save/Remove favorites
// • Read favorites from Local Storage
//
// React Flow:
//
// User clicks ❤️
//
// ↓
//
// Local Storage updates
//
// ↓
//
// React State updates
//
// ↓
//
// UI automatically changes
//
// =====================================================



// ---------------- IMPORTS ----------------

// React Hooks
import { useEffect, useState } from "react";

// Import helper functions for Local Storage.
import {
  getFavorites,
  toggleFavorite,
} from "../utils/localStorage";



function CafeCard({ cafe, setSelectedCafe }) {

  // =====================================================
  // STATE
  // =====================================================

  // Stores whether THIS cafe
  // is currently marked as favorite.
  const [favorite, setFavorite] = useState(false);



  // =====================================================
  // LOAD FAVORITE STATUS
  // =====================================================
  //
  // Runs once when the component loads.
  //
  // Checks Local Storage to see whether
  // this cafe was already favorited.
  //
  useEffect(() => {

    const favorites = getFavorites();

    setFavorite(

      favorites.includes(cafe.id)

    );

  }, [cafe.id]);



  // =====================================================
  // HANDLE FAVORITE BUTTON
  // =====================================================

  function handleFavorite(event) {

    // Prevent selecting the card.
    event.stopPropagation();

    // Update Local Storage.
    const updatedFavorites = toggleFavorite(cafe.id);

    // Update React State.
    setFavorite(

      updatedFavorites.includes(cafe.id)

    );

  }



  // =====================================================
  // JSX
  // =====================================================

  return (

    <div

      onClick={() => setSelectedCafe(cafe)}

      className="mb-5 cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"

    >

      {/* =====================================================
          TOP SECTION
      ===================================================== */}

      <div className="flex items-center justify-between">

        {/* Cafe Name */}
        <h2 className="text-xl font-bold text-[#6F4E37]">

          {cafe.name}

        </h2>



        {/* Favorite Button */}
        <button

          onClick={handleFavorite}

          className="text-2xl transition hover:scale-125"

        >

          {favorite ? "❤️" : "🤍"}

        </button>

      </div>



      {/* =====================================================
          CATEGORY
      ===================================================== */}

      <p className="mt-2 text-sm font-medium text-gray-500">

        ☕ {cafe.category}

      </p>



      {/* =====================================================
          RATING + STATUS
      ===================================================== */}

      <div className="mt-4 flex items-center gap-3">

        {/* Rating */}
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold">

          ⭐ {cafe.rating}

        </span>



        {/* Open / Closed Badge */}

        {cafe.isOpen ? (

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

            🟢 Open

          </span>

        ) : (

          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

            🔴 Closed

          </span>

        )}

      </div>



      {/* =====================================================
          ADDRESS
      ===================================================== */}

      <p className="mt-4 text-gray-600">

        📍 {cafe.address}

      </p>



      {/* =====================================================
          DISTANCE
      ===================================================== */}

      <p className="mt-2 text-gray-500">

        🚶 {cafe.distance} away

      </p>

    </div>

  );

}

export default CafeCard;
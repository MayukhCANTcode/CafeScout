// =====================================================
// LAYOUT COMPONENT
// =====================================================
//
// Responsibilities:
//
// • Store selected cafe
// • Store all cafes
// • Pass cafes to MapView
// • Pass cafes to CafeList
//
// =====================================================

import { useState } from "react";

import MapView from "./MapView";
import CafeList from "./CafeList";

// Import dummy cafes.
// Later this can be replaced with API data.
import cafesData from "../data/cafes";

function Layout({

  currentLocation,

  searchText,

}) {

  // =====================================================
  // STATE
  // =====================================================

  // Stores the currently selected cafe.
  const [selectedCafe, setSelectedCafe] = useState(null);

  // Stores every cafe.
  // Later this can be updated using an API.
  const [cafes] = useState(cafesData);

  return (

    <section className="mx-auto flex max-w-7xl gap-6 px-8 py-12">

      {/* ================= MAP ================= */}

      <div className="flex-1 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

        <MapView

          currentLocation={currentLocation}

          selectedCafe={selectedCafe}

          cafes={cafes}

        />

      </div>



      {/* ================= SIDEBAR ================= */}

      <div className="w-96 rounded-2xl bg-white p-8 shadow-lg">

        <CafeList

          cafes={cafes}


          searchText={searchText}

          setSelectedCafe={setSelectedCafe}

        />

      </div>

    </section>

  );

}

export default Layout;
// Import useState from React.
// We use it to store data that can change while the app is running.
import { useState } from "react";

// Import the Map component.
// This component displays the interactive map.
import MapView from "./MapView";

// Import the CafeList component.
// This component displays all the cafe cards.
import CafeList from "./CafeList";

// Layout is responsible for displaying
// both the map and the cafe list side by side.
function Layout() {

  // ---------------- STATE ----------------

  // selectedCafe stores the cafe that the user clicks.
  //
  // Initially:
  // selectedCafe = null
  //
  // After clicking a cafe:
  // selectedCafe = {
  //    id: 1,
  //    name: "...",
  //    rating: ...
  // }
  //
  // Whenever selectedCafe changes,
  // React automatically re-renders this component.
  const [selectedCafe, setSelectedCafe] = useState(null);

  return (

    // ---------------- MAIN LAYOUT ----------------
    // Creates a horizontal layout using Flexbox.
    //
    // +-------------------------------+-------------+
    // |                               |             |
    // |            Map                |  Cafe List  |
    // |                               |             |
    // +-------------------------------+-------------+
    <section className="mx-auto flex max-w-7xl gap-6 px-8 py-12">

      {/* ---------------- MAP SECTION ---------------- */}

      {/* 
        flex-1
        Makes the map take all the remaining available space.

        overflow-hidden
        Prevents the map from overflowing outside its rounded corners.

        rounded-3xl
        Gives large rounded corners.

        shadow-xl
        Adds a large shadow to make it look like a card.
      */}
      <div className="flex-1 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

        {/* 
          Pass selectedCafe to MapView.

          Whenever selectedCafe changes,
          MapView receives the updated cafe.

          Example:

          selectedCafe

                ↓

            MapView

                ↓

          flyTo(selectedCafe)
        */}
        <MapView selectedCafe={selectedCafe} />

      </div>

      {/* ---------------- SIDEBAR ---------------- */}

      {/* Sidebar containing all cafe cards */}
      <div className="w-96 rounded-2xl bg-white p-8 shadow-lg">

        {/*
          Pass setSelectedCafe to CafeList.

          CafeList itself does NOT change the state.

          Instead, it passes this function down
          to every CafeCard.

          Flow:

          CafeCard Click

                ↓

          setSelectedCafe(cafe)

                ↓

          Layout updates selectedCafe

                ↓

          MapView receives new selectedCafe

                ↓

          Map flies to that cafe
        */}
        <CafeList setSelectedCafe={setSelectedCafe} />

      </div>

    </section>
  );
}

export default Layout;
// =====================================================
// CAFE LIST
// =====================================================
//
// Displays cafes.
//
// Search is now controlled by App.
//
// =====================================================

import CafeCard from "./CafeCard";

function CafeList({

  cafes,

  searchText,

  setSelectedCafe,

}) {

  // Filter cafes using the global search text.
  const filteredCafes = cafes.filter((cafe)=>

    cafe.name

      .toLowerCase()

      .includes(

        searchText.toLowerCase()

      )

  );

  return (

    <div>

      <h2 className="mb-6 text-3xl font-bold">

        Nearby Cafés

      </h2>

      {filteredCafes.length===0 && (

        <div className="rounded-xl bg-gray-100 p-6 text-center">

          ☕

          <br />

          No cafés found.

        </div>

      )}

      {filteredCafes.map((cafe)=>(

        <CafeCard

          key={cafe.id}

          cafe={cafe}

          setSelectedCafe={setSelectedCafe}

        />

      ))}

    </div>

  );

}

export default CafeList;
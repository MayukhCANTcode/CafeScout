// CafeCard is a reusable component.
// It receives two props:
// 1. cafe -> An object containing all the details of a cafe.
// 2. setSelectedCafe -> A function passed from the parent component
//    that updates which cafe is currently selected.

function CafeCard({ cafe, setSelectedCafe }) {
  return (
    // When the user clicks anywhere on this card,
    // call setSelectedCafe() and pass the entire cafe object.
    // This tells React that this cafe is now selected.
    <div
      onClick={() => setSelectedCafe(cafe)}
      className="mb-5 cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >

      {/* ---------------- TOP SECTION ---------------- */}
      {/* Displays the cafe name on the left and a favorite icon on the right */}
      <div className="flex items-center justify-between">

        {/* Cafe Name */}
        <h2 className="text-xl font-bold text-[#6F4E37]">
          {cafe.name}
        </h2>

        {/* Favorite Button
            Currently this is only for UI.
            Later we'll make it save the cafe to favorites. */}
        <button className="text-xl transition hover:scale-125">
          🤍
        </button>

      </div>

      {/* ---------------- RATING & STATUS ---------------- */}
      <div className="mt-4 flex items-center gap-3">

        {/* Rating Badge */}
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold">
          ⭐ {cafe.rating}
        </span>

        {/* Open/Closed Status
            Right now it is hardcoded as "Open".
            Later this will come from the API. */}
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          Open
        </span>

      </div>

      {/* ---------------- DISTANCE ---------------- */}
      {/* Shows how far the cafe is from the user */}
      <p className="mt-4 text-gray-500">
        📍 {cafe.distance} away
      </p>

    </div>
  );
}

export default CafeCard;
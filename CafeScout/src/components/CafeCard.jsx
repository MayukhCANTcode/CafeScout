import { useCafes } from "../context/CafeContext";

function CafeCard({ cafe }) {
  // Consume selection state globally from Context
  const {
    selectedCafe,
    setSelectedCafe,
  } = useCafes();

  // Check if this card is currently selected
  const isSelected = selectedCafe?.id === cafe.id;

  // Visual design palettes for the 4 categories
  const categoryStyles = {
    "Cafe": { bg: "bg-[#FDF8F5] text-[#8C6246] border-[#F2EAE1]", emoji: "☕" },
    "Restaurant": { bg: "bg-[#F0F5FF] text-[#2F54EB] border-[#D6E4FF]", emoji: "🍽️" },
    "Bakery": { bg: "bg-[#FFFBE6] text-[#D4B106] border-[#FFE58F]", emoji: "🥐" },
    "Ice Cream": { bg: "bg-[#FFF0F0] text-[#FF4D4F] border-[#FFCCC7]", emoji: "🍦" }
  };

  const style = categoryStyles[cafe.category] || { bg: "bg-gray-50 text-gray-600 border-gray-200", emoji: "📍" };

  return (
    <div
      id={`cafe-card-${cafe.id}`}
      onClick={() => setSelectedCafe(cafe)}
      className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-300 active:scale-[0.99] border-l-4 ${
        isSelected
          ? "border-[#6F4E37] border-l-[#6F4E37] bg-[#FAF7F2]/50 shadow-md scale-[1.01]"
          : "border-gray-200 border-l-transparent hover:border-l-[#6F4E37]/75 hover:scale-[1.02] hover:shadow-md bg-white"
      }`}
    >
      {/* Top Details (Name) */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-gray-800 group-hover:text-[#6F4E37] transition duration-200 leading-snug">
          {cafe.name}
        </h3>
      </div>

      {/* Category Badge */}
      <div className="mt-2 flex flex-wrap gap-2 items-center">
        <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-0.5 text-xs font-semibold border ${style.bg}`}>
          <span>{style.emoji}</span>
          <span>{cafe.category}</span>
        </span>
      </div>

      {/* Rating & Status Indicators */}
      <div className="mt-3.5 flex items-center gap-2">
        {cafe.rating ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 border border-amber-250">
            ⭐ {cafe.rating}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-xs font-bold text-gray-500 border border-gray-200">
            ⭐ New
          </span>
        )}

        {/* Pulsing Dot Status Badge if open hours are defined */}
        {cafe.isOpen !== undefined && (
          cafe.isOpen ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-250">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Open
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-250">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
              Closed
            </span>
          )
        )}
      </div>

      {/* Address Text */}
      <p className="mt-3 text-xs text-gray-500 line-clamp-2 leading-relaxed">
        📍 {cafe.address}
      </p>

      {/* Distance Badge info */}
      <p className="mt-2 text-xs font-bold text-gray-400">
        🚶 {cafe.distance} away
      </p>
    </div>
  );
}

export default CafeCard;
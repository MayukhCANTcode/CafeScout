import { useCafes } from "../context/CafeContext";
import MapView from "./MapView";
import CafeList from "./CafeList";

function Layout() {
  // Consume context state
  const {
    selectedCategories,
    setSelectedCategories,
    sortBy,
    setSortBy,
  } = useCafes();

  // Chips categories list
  const categoryChips = [
    { label: "Cafes", value: "Cafe", emoji: "☕" },
    { label: "Restaurants", value: "Restaurant", emoji: "🍽️" },
    { label: "Bakeries", value: "Bakery", emoji: "🥐" },
    { label: "Ice Cream", value: "Ice Cream", emoji: "🍦" }
  ];

  // Helper to toggle a chip category in multi-select state
  const handleToggleCategory = (val) => {
    if (selectedCategories.includes(val)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== val));
    } else {
      setSelectedCategories([...selectedCategories, val]);
    }
  };

  return (
    <section className="mx-auto flex flex-col lg:flex-row max-w-7xl gap-6 px-8 py-10">
      
      {/* Map Section */}
      <div className="flex-1 min-h-[500px] lg:h-[650px] overflow-hidden rounded-3xl border border-gray-150 bg-white shadow-lg">
        <MapView />
      </div>

      {/* Sidebar Panel */}
      <div className="w-full lg:w-96 flex flex-col rounded-3xl border border-gray-150 bg-white p-6 shadow-lg lg:h-[650px]">
        
        {/* Filter Chips Panel */}
        <div className="mb-5">
          <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Filter Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categoryChips.map((chip) => {
              const isSelected = selectedCategories.includes(chip.value);
              return (
                <button
                  key={chip.value}
                  onClick={() => handleToggleCategory(chip.value)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#6F4E37] border-[#6F4E37] text-white shadow-sm hover:bg-[#5B3E2D]"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <span>{chip.emoji}</span>
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Options Panel */}
        <div className="mb-5 border-t border-gray-100 pt-4 flex items-center justify-between">
          <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Sort Places
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 outline-none focus:border-[#6F4E37] cursor-pointer"
          >
            <option value="distance">🚶 Distance</option>
            <option value="name">🔤 Name (A-Z)</option>
            <option value="category">🏷️ Category</option>
          </select>
        </div>

        {/* CafeList Content (Sized & Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-1">
          <CafeList />
        </div>

      </div>

    </section>
  );
}

export default Layout;
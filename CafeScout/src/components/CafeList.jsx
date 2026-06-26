import { useCafes } from "../context/CafeContext";
import CafeCard from "./CafeCard";

function CafeList() {
  // Retrieve filtered and sorted cafes list, loading, and error states from central Context
  const { filteredCafes, loading, error } = useCafes();

  return (
    <div>
      {/* Title */}
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Places Found ({filteredCafes.length})
      </h2>

      {/* Loading Skeletons */}
      {loading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-6 w-2/3 rounded-md bg-gray-200" />
                <div className="h-6 w-6 rounded-full bg-gray-200" />
              </div>
              <div className="mt-3.5 h-4 w-1/3 rounded bg-gray-200" />
              <div className="mt-4 flex items-center gap-2">
                <div className="h-6 w-16 rounded-full bg-gray-200" />
                <div className="h-6 w-20 rounded-full bg-gray-200" />
              </div>
              <div className="mt-4 h-4 w-5/6 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}

      {/* Error Alert Box */}
      {!loading && error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-center text-red-800 shadow-sm">
          <span className="text-3xl mb-2 block">⚠️</span>
          <h4 className="font-bold text-base">Search Failed</h4>
          <p className="mt-2 text-sm leading-relaxed">{error}</p>
        </div>
      )}

      {/* Polished Empty State illustration */}
      {!loading && !error && filteredCafes.length === 0 && (
        <div className="rounded-3xl border border-[#F2EAE1] bg-[#FAF7F2] p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-4xl text-[#6F4E37]">
            🔍
          </div>
          <h3 className="text-lg font-extrabold text-[#6F4E37]">
            No Places Found
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            We couldn't find matching places. Try choosing other filter category chips or expanding your search radius.
          </p>
        </div>
      )}

      {/* Display List */}
      {!loading && !error && filteredCafes.length > 0 && (
        <div className="flex flex-col gap-4">
          {filteredCafes.map((cafe) => (
            <CafeCard
              key={cafe.id}
              cafe={cafe}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CafeList;
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { fetchNearbyCafes } from "../services/placesService";

const CafeContext = createContext();

export function CafeProvider({ children }) {
  // Coordinates & general location name
  const [currentLocation, setCurrentLocation] = useState(null);

  // Search input text
  const [searchText, setSearchText] = useState("");

  // Raw API results
  const [cafes, setCafes] = useState([]);

  // Loading & error feedback states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Radius in meters: 2000 (2km), 5000 (5km), 10000 (10km), 20000 (20km)
  const [radius, setRadius] = useState(10000);

  // Filter chips array (e.g. ["Cafe", "Restaurant"])
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Sort order: "distance", "name", "category"
  const [sortBy, setSortBy] = useState("distance");

  // Selected place for map-card sync
  const [selectedCafe, setSelectedCafe] = useState(null);

  // Automatically fetch places whenever currentLocation or radius changes
  useEffect(() => {
    if (!currentLocation || !currentLocation.lat || !currentLocation.lng) return;

    let isMounted = true;
    const loadPlaces = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchNearbyCafes(
          currentLocation.lat,
          currentLocation.lng,
          radius
        );
        if (isMounted) {
          setCafes(results);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Failed to fetch places for this area. Please check your internet connection.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPlaces();
    return () => {
      isMounted = false;
    };
  }, [currentLocation, radius]);

  // Perform dynamic filtering and sorting locally to avoid unnecessary network queries
  const filteredCafes = useMemo(() => {
    let result = [...cafes];

    // 1. Filter by selected category chips
    if (selectedCategories.length > 0) {
      result = result.filter((c) => selectedCategories.includes(c.category));
    }

    // 2. Sort by selected criteria
    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "category") {
      result.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === "distance") {
      // Helper to convert "350 m" -> 350, "2.4 km" -> 2400 for sorting
      const parseDistance = (distStr) => {
        if (!distStr || distStr === "Nearby") return 0;
        const num = parseFloat(distStr);
        if (distStr.toLowerCase().includes("km")) {
          return num * 1000;
        }
        return num;
      };
      result.sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance));
    }

    return result;
  }, [cafes, selectedCategories, sortBy]);

  const value = {
    currentLocation,
    setCurrentLocation,
    searchText,
    setSearchText,
    cafes,
    setCafes,
    filteredCafes,
    loading,
    setLoading,
    error,
    setError,
    radius,
    setRadius,
    selectedCategories,
    setSelectedCategories,
    sortBy,
    setSortBy,
    selectedCafe,
    setSelectedCafe,
  };

  return <CafeContext.Provider value={value}>{children}</CafeContext.Provider>;
}

// Custom hook to consume CafeContext easily
export function useCafes() {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error("useCafes must be used within a CafeProvider");
  }
  return context;
}

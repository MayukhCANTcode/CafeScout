// =====================================================
// PLACES SERVICE
// =====================================================
//
// This service fetches nearby cafes from Geoapify.
//
// Input:
//
// Latitude
// Longitude
//
// Output:
//
// Array of cafes
//
// =====================================================

// Read API key from .env
const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

// =====================================================
// FETCH NEARBY CAFES
// =====================================================
//
// Parameters:
//
// lat -> latitude
// lng -> longitude
//
// Returns:
//
// [
//   {
//      id,
//      name,
//      lat,
//      lng,
//      address,
//      rating,
//      distance,
//      category,
//      isOpen
//   }
// ]
//
// =====================================================

// =====================================================
// HELPERS
// =====================================================

// Basic parser to estimate if a place is open based on OSM opening_hours string.
function parseOpeningHours(openingHours) {
  if (!openingHours) return undefined;
  const cleanHours = openingHours.trim().toLowerCase();
  if (cleanHours === "24/7") return true;

  try {
    const now = new Date();
    const dayNames = ["su", "mo", "tu", "we", "th", "fr", "sa"];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const rules = cleanHours.split(";");
    for (const rule of rules) {
      const match = rule.match(/(?:([a-z]{2})(?:-([a-z]{2}))?\s+)?(\d{2}):(\d{2})-(\d{2}):(\d{2})/);
      if (match) {
        const [, startDay, endDay, startH, startM, endH, endM] = match;
        let dayMatches = true;

        if (startDay) {
          const startIndex = dayNames.indexOf(startDay);
          const endIndex = endDay ? dayNames.indexOf(endDay) : startIndex;
          const currentIndex = now.getDay();

          if (endIndex >= startIndex) {
            dayMatches = currentIndex >= startIndex && currentIndex <= endIndex;
          } else {
            dayMatches = currentIndex >= startIndex || currentIndex <= endIndex;
          }
        }

        if (dayMatches) {
          const startMin = parseInt(startH, 10) * 60 + parseInt(startM, 10);
          const endMin = parseInt(endH, 10) * 60 + parseInt(endM, 10);

          if (endMin > startMin) {
            if (currentMinutes >= startMin && currentMinutes <= endMin) {
              return true;
            }
          } else {
            if (currentMinutes >= startMin || currentMinutes <= endMin) {
              return true;
            }
          }
        }
      }
    }
    return false;
  } catch {
    return true; // Fallback to true if parsing fails
  }
}

export async function fetchNearbyCafes(lat, lng, radius = 10000) {

  // Build API URL targeting catering and bakeries
  const url =
    `https://api.geoapify.com/v2/places?` +
    `categories=catering,commercial.food_and_drink.bakery` +
    `&filter=circle:${lng},${lat},${radius}` +
    `&limit=100` +
    `&apiKey=${API_KEY}`;

  // Fetch data
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch nearby places.");
  }

  // Convert to JSON
  const data = await response.json();

  console.log("Geoapify Response:", data);

  if (!data.features) {
    return [];
  }

  // Convert API response into our own format using real properties
  const cafes = data.features.map((place) => {
    const props = place.properties;

    // Determine category: decide everything into "Cafe", "Restaurant", "Bakery", or "Ice Cream"
    const categoriesList = props.categories || [];
    const nameLower = (props.name || props.datasource?.raw?.name || "").toLowerCase();

    let category = "Restaurant"; // Default to Restaurant

    if (categoriesList.includes("commercial.food_and_drink.bakery") || nameLower.includes("bakery") || nameLower.includes("bake")) {
      category = "Bakery";
    } else if (categoriesList.includes("catering.ice_cream") || nameLower.includes("ice cream") || nameLower.includes("icecream") || nameLower.includes("gelato")) {
      category = "Ice Cream";
    } else if (
      categoriesList.includes("catering.cafe") ||
      categoriesList.includes("catering.cafe.coffee") ||
      nameLower.includes("cafe") ||
      nameLower.includes("coffee") ||
      nameLower.includes("tea") ||
      nameLower.includes("brew")
    ) {
      category = "Cafe";
    }

    // Format distance in meters to a readable string
    const distanceStr = (() => {
      const dist = props.distance;
      if (dist === undefined || dist === null) return "Nearby";
      if (dist < 1000) {
        return `${dist} m`;
      }
      return `${(dist / 1000).toFixed(1)} km`;
    })();

    // Extract rating or default to null
    const rating = props.rating || props.datasource?.raw?.rating || null;

    // Check if open (badge if available)
    const openingHours = props.opening_hours || props.datasource?.raw?.opening_hours;
    const isOpen = parseOpeningHours(openingHours);

    return {
      // Use unique place_id for stable favorite updates
      id: props.place_id,

      name: props.name || props.datasource?.raw?.name || "Unnamed Place",

      lat: props.lat,

      lng: props.lon,

      address: props.formatted || "Address unavailable",

      category,

      rating,

      distance: distanceStr,

      isOpen,
    };
  });

  return cafes;

}
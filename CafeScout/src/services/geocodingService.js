// =====================================================
// GEOCODING SERVICE
// =====================================================
//
// Purpose:
//
// Converts a place name into latitude & longitude.
//
// Example:
//
// "Silchar"
//
// ↓
//
// {
//    lat: 24.8333,
//    lng: 92.7789
// }
//
// This is called "Forward Geocoding".
//
// =====================================================



// ---------------- API KEY ----------------

// Read the API key from the .env file.
const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;



// =====================================================
// SEARCH PLACE
// =====================================================
//
// Input:
//
// "Silchar"
//
// Output:
//
// {
//    lat,
//    lng
// }
//
// =====================================================

export async function searchPlace(placeName) {

  // Encode the search text so spaces and
  // special characters become URL-safe.
  const encodedPlace = encodeURIComponent(placeName);



  // Build the Geoapify URL.
  const url =

    `https://api.geoapify.com/v1/geocode/search?text=${encodedPlace}&apiKey=${API_KEY}`;



  // Send request.
  const response = await fetch(url);



  // Convert response to JSON.
  const data = await response.json();



  // If no results were found,
  // return null.
  if (data.features.length === 0) {

    return null;

  }



  // Get the first matching location.
  const location = data.features[0];



  // Return only the coordinates.
  return {

    lat: location.properties.lat,

    lng: location.properties.lon,

    name: location.properties.formatted,

  };

}

// =====================================================
// AUTOCOMPLETE PLACE
// =====================================================
//
// Input:
//
// "Sil"
//
// Output:
//
// [
//    { formatted, lat, lng }
// ]
//
// =====================================================
export async function autocompletePlace(placeName) {
  if (!placeName.trim()) return [];

  const encodedPlace = encodeURIComponent(placeName);
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodedPlace}&apiKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  if (!data.features) {
    return [];
  }

  return data.features.map((feature) => ({
    formatted: feature.properties.formatted,
    lat: feature.properties.lat,
    lng: feature.properties.lon,
  }));
}
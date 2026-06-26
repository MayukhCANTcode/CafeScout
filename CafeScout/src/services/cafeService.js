// =====================================================
// CAFE SERVICE
// =====================================================
//
// This service is responsible for fetching nearby cafes
// from the OpenStreetMap Overpass API.
//
// Instead of hardcoding cafe data inside React components,
// we keep all API-related logic here.
//
// This makes the code:
// • Easier to reuse
// • Easier to maintain
// • Easier to test
// =====================================================

export async function getNearbyCafes(latitude, longitude) {

  // Radius (in meters) around the user's location
  const radius = 10000;

  // Build an Overpass API query.
  // We are asking for all nodes tagged as "cafe"
  // within a 2 km radius.
  const query = `
    [out:json];
    (
      node["amenity"="cafe"](around:${radius},${latitude},${longitude});
    );
    out;
  `;

  // Send a POST request to the Overpass API.
  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      body: query,
    }
  );

  // If the request fails,
  // throw an error.
  if (!response.ok) {
    throw new Error("Failed to fetch nearby cafes.");
  }

  // Convert the response into JSON.
  const data = await response.json();

  // Return the raw data for now.
  // We'll clean and format it in the next step.
  return data;
}

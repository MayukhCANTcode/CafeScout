// Import the CafeCard component.
// We'll use this component to display each individual cafe.
import CafeCard from "./CafeCard";

// CafeList receives one prop:
// setSelectedCafe -> A function passed from the parent component (Layout).
// Whenever a user clicks on a cafe card,
// this function updates which cafe is currently selected.
function CafeList({ setSelectedCafe }) {

  // This is a temporary array of cafe data.
  // Right now the data is hardcoded.
  // Later we'll replace this with real data fetched from an API.
  const cafes = [
    {
      id: 1,                 // Unique ID for React
      name: "Cafe Coffee Day",
      rating: 4.4,
      distance: "1.2 km",

      // Latitude & Longitude
      // Used by the map to know where this cafe is located.
      lat: 24.7588,
      lng: 92.7865,
    },

    {
      id: 2,
      name: "Cafe HQ",
      rating: 4.6,
      distance: "2.1 km",
      lat: 24.7615,
      lng: 92.7897,
    },

    {
      id: 3,
      name: "Beans & Brews",
      rating: 4.5,
      distance: "2.8 km",
      lat: 24.7644,
      lng: 92.7829,
    },
  ];

  return (
    <div>

      {/* Sidebar Heading */}
      <h2 className="mb-6 text-3xl font-bold text-[#2E2E2E]">
        Nearby Cafés
      </h2>

      {/* 
        cafes.map() loops through every cafe inside the array.

        Example:

        cafes = [Cafe1, Cafe2, Cafe3]

        React will automatically create:

        <CafeCard />
        <CafeCard />
        <CafeCard />

        One card for every cafe.
      */}
      {cafes.map((cafe) => (

        // Create one CafeCard component
        // and pass the cafe information to it.
        <CafeCard

          // React uses key to uniquely identify each item.
          // It helps React efficiently update the UI.
          key={cafe.id}

          // Pass the entire cafe object.
          // Inside CafeCard we can access:
          // cafe.name
          // cafe.rating
          // cafe.distance
          // cafe.lat
          // cafe.lng
          cafe={cafe}

          // Pass the function that updates
          // which cafe is selected.
          setSelectedCafe={setSelectedCafe}
        />
      ))}

    </div>
  );
}

export default CafeList;
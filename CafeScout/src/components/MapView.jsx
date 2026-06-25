// React Hooks
// useEffect -> Runs code when the component mounts or when specific data changes.
// useRef -> Stores values that persist across renders without causing re-renders.
import { useEffect, useRef } from "react";

// Import the MapLibre library to display an interactive map.
import maplibregl from "maplibre-gl";

// Import MapLibre's default CSS.
// Without this, the map controls and styling won't appear correctly.
import "maplibre-gl/dist/maplibre-gl.css";

// MapView receives the currently selected cafe from Layout.
//
// Whenever selectedCafe changes,
// this component moves the map to that cafe.
function MapView({ selectedCafe }) {

  // ---------------- REFS ----------------

  // Stores the HTML div where the map will be rendered.
  const mapContainer = useRef(null);

  // Stores the MapLibre map instance.
  // We keep it inside useRef so React doesn't recreate the map
  // every time the component re-renders.
  const mapRef = useRef(null);

  // Stores the marker object.
  // Instead of creating a new marker every click,
  // we'll simply move the existing one.
  const markerRef = useRef(null);



  // =====================================================
  // CREATE THE MAP (Runs ONLY once when component mounts)
  // =====================================================
  useEffect(() => {

    // Create a new interactive map.
    mapRef.current = new maplibregl.Map({

      // HTML container where the map should appear.
      container: mapContainer.current,

      // Map style.
      // We'll replace this demo style with a better one later.
      style: "https://demotiles.maplibre.org/style.json",

      // Initial center of the map.
      // Format:
      // [longitude, latitude]
      center: [92.7789, 24.8339],

      // Initial zoom level.
      zoom: 13,
    });

    // Add zoom (+ / -) and compass controls.
    mapRef.current.addControl(
      new maplibregl.NavigationControl()
    );



    // ---------------- CREATE MARKER ----------------

    // Create one marker.
    markerRef.current = new maplibregl.Marker({
      color: "#6F4E37",
    })

      // Initial marker position.
      .setLngLat([92.7789, 24.8339])

      // Add marker to the map.
      .addTo(mapRef.current);



    // =====================================================
    // LISTEN FOR USER LOCATION CHANGES
    // =====================================================

    // Whenever SearchBar dispatches a "locationChanged" event,
    // this function executes.
    window.addEventListener("locationChanged", (event) => {

      // Extract latitude & longitude from the event.
      const location = event.detail;

      // Smoothly animate the map to the user's location.
      mapRef.current.flyTo({

        // Again remember:
        // [longitude, latitude]
        center: [location.lng, location.lat],

        zoom: 16,

        // Animation speed.
        speed: 1.5,
      });

      // Move the marker to the user's location.
      markerRef.current.setLngLat([
        location.lng,
        location.lat,
      ]);
    });



    // Cleanup Function
    // Runs automatically when the component is removed.
    // Prevents memory leaks.
    return () => mapRef.current.remove();

  }, []);



  // =====================================================
  // RUNS WHENEVER selectedCafe CHANGES
  // =====================================================
  useEffect(() => {

    // If no cafe has been selected,
    // do nothing.
    if (!selectedCafe || !mapRef.current) return;

    // Smoothly animate the map to the selected cafe.
    mapRef.current.flyTo({
      center: [
        selectedCafe.lng,
        selectedCafe.lat,
      ],

      zoom: 16,

      speed: 1.5,
    });

    // Move the marker to the selected cafe.
    markerRef.current.setLngLat([
      selectedCafe.lng,
      selectedCafe.lat,
    ]);

  }, [selectedCafe]);



  // =====================================================
  // JSX
  // =====================================================

  // React creates an empty div.
  // MapLibre then renders the map INSIDE this div.
  return (
    <div
      ref={mapContainer}
      className="h-[600px] w-full"
    />
  );
}

export default MapView;
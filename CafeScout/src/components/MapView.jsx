import { useState, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCafes } from "../context/CafeContext";

// Read API key from Vite environment
const API_KEY = "7b84da1925e14ed49d1e6e6a2eb84b82";

function MapView() {
  // Consume Context values
  const {
    currentLocation,
    filteredCafes,
    selectedCafe,
    setSelectedCafe,
    onMapClick,
  } = useCafes();

  // HTML container ref
  const mapContainer = useRef(null);

  // Map instance ref
  const mapRef = useRef(null);

  // User location marker ref (blue)
  const userMarkerRef = useRef(null);

  // Track active markers to trigger popups programmatically
  const markersRef = useRef([]);

  // Active map style state (defaults to 'osm-bright' which looks like Google Maps)
  const [mapStyle, setMapStyle] = useState("osm-bright");

  // List of styled map views provided by Geoapify
  const stylesList = [
    { name: "Google Style", id: "osm-bright", emoji: "🗺️" },
    { name: "Clean Light", id: "positron", emoji: "☀️" },
    { name: "Dark Mode", id: "dark-matter", emoji: "🌙" },
    { name: "Terrain Carto", id: "osm-carto", emoji: "🎨" }
  ];

  // Store click callback in ref to prevent closure capture issues
  const onMapClickRef = useRef(onMapClick);
  useEffect(() => {
    onMapClickRef.current = onMapClick;
  }, [onMapClick]);

  // =====================================================
  // CREATE MAP INSTANCE (ON MOUNT)
  // =====================================================
  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${API_KEY}`,
      center: [92.7789, 24.8339],
      zoom: 13,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl());

    // Register general map click listener for coordinate querying
    mapRef.current.on("click", (e) => {
      const { lat, lng } = e.lngLat;
      if (onMapClickRef.current) {
        onMapClickRef.current(lat, lng);
      }
    });

    // Create blue marker to indicate selected search/GPS coordinates
    userMarkerRef.current = new maplibregl.Marker({
      color: "#2563EB",
    })
      .setLngLat([92.7789, 24.8339])
      .addTo(mapRef.current);

    return () => mapRef.current.remove();
  }, []);

  // =====================================================
  // DYNAMIC MAP STYLE SWAPPING
  // =====================================================
  useEffect(() => {
    if (!mapRef.current) return;
    const styleUrl = `https://maps.geoapify.com/v1/styles/${mapStyle}/style.json?apiKey=${API_KEY}`;
    mapRef.current.setStyle(styleUrl);
  }, [mapStyle]);

  // =====================================================
  // UPDATE USER MARKER AND FLY TO NEW LOCATION
  // =====================================================
  useEffect(() => {
    if (!currentLocation || !mapRef.current) return;

    mapRef.current.flyTo({
      center: [currentLocation.lng, currentLocation.lat],
      zoom: 14,
      speed: 1.5,
    });

    userMarkerRef.current.setLngLat([currentLocation.lng, currentLocation.lat]);
  }, [currentLocation]);

  // =====================================================
  // RENDER DYNAMIC MARKERS (MATCHING FILTERED LIST)
  // =====================================================
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear old markers
    markersRef.current.forEach((item) => item.marker.remove());
    markersRef.current = [];

    // Add new markers matching only filtered cafes
    filteredCafes.forEach((cafe) => {
      const emoji = cafe.category === "Cafe" ? "☕" : cafe.category === "Restaurant" ? "🍽️" : cafe.category === "Bakery" ? "🥐" : "🍦";

      // Styled popup bubble
      const popup = new maplibregl.Popup({ offset: 25 })
        .setHTML(`
          <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px; min-width: 180px;">
            <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: #1f2937; line-height: 1.3;">${cafe.name}</h4>
            <div style="margin-top: 6px; display: inline-block; border-radius: 6px; background-color: #faf7f2; border: 1px solid #f2eae1; padding: 2px 6px; font-size: 10px; font-weight: 600; color: #8c6246;">
              ${emoji} ${cafe.category}
            </div>
            <p style="margin: 8px 0 0; font-size: 11px; color: #4b5563; line-height: 1.4;">
              📍 ${cafe.address}
            </p>
            <p style="margin: 6px 0 0; font-size: 10px; font-weight: 600; color: #9ca3af;">
              🚶 ${cafe.distance} away
            </p>
            <button 
              id="popup-btn-${cafe.id}"
              style="margin-top: 10px; width: 100%; border: none; background-color: #6F4E37; color: white; border-radius: 8px; padding: 6px 12px; font-size: 11px; font-weight: 600; cursor: pointer; transition: background-color 0.2s;"
            >
              View Details
            </button>
          </div>
        `);

      const marker = new maplibregl.Marker({
        color: "#6F4E37",
      })
        .setLngLat([cafe.lng, cafe.lat])
        .setPopup(popup)
        .addTo(mapRef.current);

      markersRef.current.push({
        cafeId: cafe.id,
        marker,
      });

      // Synchronize marker click event (Marker -> Card scrolling)
      const el = marker.getElement();
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelectedCafe(cafe);

        // Smooth scroll matching card into view on sidebar panel
        setTimeout(() => {
          const cardEl = document.getElementById(`cafe-card-${cafe.id}`);
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }, 100);
      });

      // Handle click events on details button inside dynamic popup markup
      popup.on("open", () => {
        const btn = document.getElementById(`popup-btn-${cafe.id}`);
        if (btn) {
          btn.onclick = (e) => {
            e.stopPropagation();
            setSelectedCafe(cafe);
            
            const cardEl = document.getElementById(`cafe-card-${cafe.id}`);
            if (cardEl) {
              cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
          };
        }
      });
    });
  }, [filteredCafes]);

  // =====================================================
  // REACTION FOR CARD CLICK -> HIGHLIGHT MARKER & OPEN POPUP
  // =====================================================
  useEffect(() => {
    if (!selectedCafe || !mapRef.current) return;

    // Move view center smoothly
    mapRef.current.flyTo({
      center: [selectedCafe.lng, selectedCafe.lat],
      zoom: 16,
      speed: 1.2,
    });

    // Find marker instance and pop open the information box
    const match = markersRef.current.find((item) => item.cafeId === selectedCafe.id);
    if (match && match.marker) {
      // Close other open popups first
      markersRef.current.forEach((item) => {
        if (item.cafeId !== selectedCafe.id && item.marker.getPopup()?.isOpen()) {
          item.marker.getPopup().remove();
        }
      });

      const popup = match.marker.getPopup();
      if (popup && !popup.isOpen()) {
        popup.addTo(mapRef.current);
      }
    }
  }, [selectedCafe]);

  return (
    <div className="relative h-full w-full">
      {/* Floating Map Style Selector */}
      <div className="absolute top-4 left-4 z-10 flex gap-1 rounded-xl bg-white/95 p-1 shadow-md backdrop-blur-sm border border-gray-200">
        {stylesList.map((styleItem) => {
          const isActive = mapStyle === styleItem.id;
          return (
            <button
              key={styleItem.id}
              onClick={() => setMapStyle(styleItem.id)}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#6F4E37] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-150"
              }`}
            >
              <span>{styleItem.emoji}</span>
              <span>{styleItem.name}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={mapContainer}
        className="h-full w-full"
      />
    </div>
  );
}

export default MapView;

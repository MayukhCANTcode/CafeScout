// =====================================================
// MAP VIEW COMPONENT
// =====================================================
//
// Responsibilities:
//
// • Display interactive map
// • Show marker for user's location
// • Show marker for every cafe
// • Fly to user location
// • Fly to selected cafe
//
// This component receives:
//
// currentLocation
// selectedCafe
// cafes
//
// =====================================================


// ---------------- IMPORTS ----------------

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";



function MapView({

  currentLocation,

  selectedCafe,

  cafes,

}) {

  // =====================================================
  // REFS
  // =====================================================

  const mapContainer = useRef(null);

  const mapRef = useRef(null);

  const userMarkerRef = useRef(null);

  // Stores all cafe markers.
  const cafeMarkersRef = useRef([]);




  // =====================================================
  // CREATE MAP
  // =====================================================

  useEffect(() => {

    mapRef.current = new maplibregl.Map({

      container: mapContainer.current,

      style: "https://demotiles.maplibre.org/style.json",

      center: [92.7789, 24.8339],

      zoom: 13,

    });

    mapRef.current.addControl(

      new maplibregl.NavigationControl()

    );



    // User marker

    userMarkerRef.current = new maplibregl.Marker({

      color: "#2563EB",

    })

      .setLngLat([92.7789, 24.8339])

      .addTo(mapRef.current);



    return () => mapRef.current.remove();

  }, []);




  // =====================================================
  // USER LOCATION CHANGED
  // =====================================================

  useEffect(() => {

    if (!currentLocation || !mapRef.current) return;

    mapRef.current.flyTo({

      center: [

        currentLocation.lng,

        currentLocation.lat,

      ],

      zoom: 15,

      speed: 1.5,

    });

    userMarkerRef.current.setLngLat([

      currentLocation.lng,

      currentLocation.lat,

    ]);

  }, [currentLocation]);




  // =====================================================
  // CREATE CAFE MARKERS
  // =====================================================

  useEffect(() => {

    if (!mapRef.current) return;

    // Remove old markers

    cafeMarkersRef.current.forEach(

      (marker) => marker.remove()

    );

    cafeMarkersRef.current = [];



    cafes.forEach((cafe) => {

      const marker = new maplibregl.Marker({

        color: "#6F4E37",

      })

        .setLngLat([

          cafe.lng,

          cafe.lat,

        ])

        .setPopup(

          new maplibregl.Popup({

            offset: 20,

          }).setHTML(`

            <h3>${cafe.name}</h3>

            <p>⭐ ${cafe.rating}</p>

          `)

        )

        .addTo(mapRef.current);



      cafeMarkersRef.current.push(marker);

    });

  }, [cafes]);




  // =====================================================
  // SELECTED CAFE
  // =====================================================

  useEffect(() => {

    if (!selectedCafe || !mapRef.current) return;

    mapRef.current.flyTo({

      center: [

        selectedCafe.lng,

        selectedCafe.lat,

      ],

      zoom: 16,

      speed: 1.5,

    });

  }, [selectedCafe]);




  // =====================================================
  // JSX
  // =====================================================

  return (

    <div

      ref={mapContainer}

      className="h-[600px] w-full"

    />

  );

}

export default MapView;
// =====================================================
// APP COMPONENT
// =====================================================
//
// Root component of CafeScout.
//
// Responsibilities:
//
// • Store user's location
// • Store search text
// • Pass shared state to child components
//
// =====================================================

import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Layout from "./components/Layout";

function App() {

  // User's location
  const [currentLocation, setCurrentLocation] = useState(null);

  // Search text used throughout the app
  const [searchText, setSearchText] = useState("");

  return (
    <>

      <Navbar />

      <Hero />

      <SearchBar
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <Layout
        currentLocation={currentLocation}
        searchText={searchText}
      />

    </>
  );
}

export default App;
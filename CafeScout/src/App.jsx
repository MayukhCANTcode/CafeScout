import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Layout from "./components/Layout";
import { CafeProvider } from "./context/CafeContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CafeProvider>
        <Navbar />

        <Hero />

        <SearchBar />

        <Layout />
      </CafeProvider>
    </AuthProvider>
  );
}

export default App;
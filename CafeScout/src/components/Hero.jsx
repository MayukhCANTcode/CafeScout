function Hero() {
  return (
    <section className="flex flex-col items-center justify-center bg-[#FAF7F2] px-6 py-16 text-center">
      <h1 className="mb-6 text-5xl font-bold text-[#2E2E2E]">
        Find your next favorite café
      </h1>

      <p className="mb-8 max-w-2xl text-lg text-gray-600">
        Discover beautiful cafés around you with interactive maps and curated
        reviews.
      </p>

      <button className="rounded-xl bg-[#6F4E37] px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#5B3E2D]">
        Explore Nearby Cafés
      </button>
    </section>
  );
}

export default Hero;
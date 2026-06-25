function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#FAF7F2]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-[#6F4E37]">
          ☕ CafeScout
        </h1>

        {/* Navigation */}
        <div className="hidden gap-8 text-lg font-medium md:flex">
          <a
            href="#"
            className="transition hover:text-[#6F4E37]"
          >
            Explore
          </a>

          <a
            href="#"
            className="transition hover:text-[#6F4E37]"
          >
            Favorites
          </a>
        </div>

        {/* Login */}
        <button className="rounded-xl bg-[#6F4E37] px-5 py-2 text-white transition duration-300 hover:scale-105 hover:bg-[#5B3E2D]">
          Login
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
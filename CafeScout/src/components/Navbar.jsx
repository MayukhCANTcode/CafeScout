import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, login, logout, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#FAF7F2]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-[#6F4E37]">
          ☕ CafeScout
        </h1>

        {/* Auth Actions */}
        {loading ? (
          <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-200"></div>
        ) : !user ? (
          <button
            onClick={login}
            className="flex items-center gap-2.5 rounded-xl bg-white border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition duration-300 hover:scale-105 hover:bg-gray-50 focus:outline-none cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.6 15.01 1 12 1 7.24 1 3.23 3.73 1.34 7.73l3.87 3a7.16 7.16 0 0 1 6.79-5.69z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44a5.51 5.51 0 0 1-2.39 3.62l3.71 2.87c2.17-2 3.43-4.94 3.43-8.59z"
              />
              <path
                fill="#FBBC05"
                d="M5.21 10.73A7.12 7.12 0 0 1 5 12c0 .44.03.87.09 1.3l-3.87 3a11.93 11.93 0 0 1 0-8.6l3.99 3.03z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.71-2.87c-1.03.69-2.34 1.1-4.25 1.1a7.16 7.16 0 0 1-6.79-5.69l-3.87 3A11.93 11.93 0 0 0 12 23z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="hidden flex-col items-end sm:flex text-right">
              <span className="text-sm font-semibold text-gray-800 leading-none mb-1">
                {user.displayName}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {user.email}
              </span>
            </div>
            
            <img
              src={user.photoURL}
              alt={user.displayName || "User Profile"}
              className="h-10 w-10 rounded-full border border-[#6F4E37]/30 object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />

            <button
              onClick={logout}
              className="rounded-xl border border-[#6F4E37]/30 bg-transparent px-4 py-2 text-sm font-semibold text-[#6F4E37] transition duration-300 hover:scale-105 hover:bg-[#FAF7F2] focus:outline-none cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
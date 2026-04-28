import { useRef, useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoSearchOutline, IoChevronBack } from "react-icons/io5";
import useTheme from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
}

export default function Navbar({ onSearch }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { user } = useAuth();
  const { signOut } = useAuth();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const showSearch = ["/", "/news", "/photo-challenge"].includes(
    location.pathname
  );
  const showBack = !["/", "/news", "/photo-challenge", "/community"].includes(
    location.pathname
  );
  const showGreeting = !showBack || location.pathname === "/community";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch?.(query.trim());
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="h-auto p-4 md:p-6 pb-0! flex flex-row gap-2 items-center justify-between bg-transparent">
      <div className="flex flex-col text-(--text-primary) justify-start">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-(--text-secondary) text-2xl hover:text-(--text-primary) font-bold transition-colors"
          >
            <IoChevronBack /> Back
          </button>
        ) : (
          <></>
        )}

        {showGreeting && (
          <div
            className={`flex flex-col ${location.pathname !== "/community" ? "hidden md:flex" : ""}`}
          >
            <p className="text-sm">Hi, {user?.displayName ?? "Anonymous"}</p>
            <h3>{getGreeting()}</h3>
          </div>
        )}
      </div>
      <div className="flex justify-end md:justify-between items-center gap-2 w-full md:w-fit">
        {/* Search */}
        {showSearch ? (
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-(--bg-input) rounded-full px-2 py-2 md:px-4 md:py-2.5  flex-1 w-full md:max-w-xl border-r border-(--border)"
          >
            <IoSearchOutline className="text-(--text-muted) text-[15px] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your location..."
              className="bg-transparent text-sm text-(--text-primary) outline-none flex-1 placeholder:text-(--text-muted)"
            />
          </form>
        ) : (
          <div />
        )}

        {/* togle theme */}
        <button
          onClick={toggle}
          className="w-fit h-fit rounded-full transition-colors duration-300 focus:outline-none bg-(--bg-card) border-r border-(--border)"
        >
          <div className="flex flex-row -space-x-2 ">
            <div
              className={`flex items-center rounded-full p-2.5 md:p-3 transition-colors duration-300 ${isDark ? "bg-(--bg-input)" : "bg-transparent"}`}
            >
              <BsMoonFill
                className={`text-[16px] ${isDark ? "text-white" : "text-(--text-muted)"}`}
              />
            </div>
            <div
              className={`flex items-center rounded-full p-2.5 md:p-3 transition-colors duration-300 ${!isDark ? "bg-(--bg-input)" : "bg-transparent"}`}
            >
              <BsSunFill
                className={`text-[16px] ${!isDark ? "text-amber-500" : "text-(--text-muted)"}`}
              />
            </div>
          </div>
        </button>

        {/* profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() =>
              user ? setDropdownOpen(!dropdownOpen) : navigate("/login")
            }
            className="w-fit h-fit rounded-full overflow-hidden flex items-center justify-center border border-(--border) hover:border-(--text-muted) transition-colors"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                loading="lazy"
                className="size-8 md:size-10 object-cover"
              />
            ) : (
              <FaUserCircle className="text-[32px] md:text-[40px] text-(--text-muted)" />
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-56 bg-(--bg-card) border border-(--border) rounded-2xl shadow-lg z-50 overflow-hidden">
              {user ? (
                <>
                  {/* Profile info */}
                  <div className="flex items-center gap-3 p-4 border-b border-(--border)">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        className="size-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <FaUserCircle className="text-[40px] text-(--text-muted) shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-(--text-primary) font-medium text-sm truncate">
                        {user.displayName}
                      </p>
                      <p className="text-(--text-secondary) text-xs truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-(--bg-input) transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-(--text-primary) hover:bg-(--bg-input) transition-colors"
                >
                  Sign in
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

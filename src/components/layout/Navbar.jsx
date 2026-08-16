import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Car,
  LogOut,
  LayoutDashboard,
  User,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Vehicles", path: "/vehicles" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
      setMobileOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const goToDashboard = () => {
    navigate(isAdmin ? "/admin" : "/dashboard");
    setUserMenuOpen(false);
    setMobileOpen(false);
  };

  const goToProfile = () => {
    navigate("/dashboard");
    setUserMenuOpen(false);
    setMobileOpen(false);
  };

  const userInitial = (
    user?.name ||
    user?.displayName ||
    user?.email ||
    "U"
  )
    .charAt(0)
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-blue-900/90 backdrop-blur-md transition-all duration-300 border-b border-white/10 shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-transform duration-200 active:scale-95" >
          <span className="text-2xl font-extrabold tracking-tight text-white sm:text-2xl p-3 ">
            Auto<span className="text-yellow-500 ">Drive</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-lg px-4 py-3 text-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white shadow-inner"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Side Menu */}
        <div className="hidden items-center md:flex">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* User Button */}
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full p-1 transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <div className="flex h-9 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-sm font-bold text-white shadow-md">
                  {userInitial}
                </div>
                <ChevronDown
                  size={16}
                  className={`text-blue-200 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Animated Dropdown */}
              <div
                className={`absolute right-0 mt-3 w-56 origin-top-right overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5 shadow-2xl transition-all duration-200 ${
                  userMenuOpen
                    ? "scale-100 opacity-100 pointer-events-auto"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <div className="px-3 py-2  font-semibold uppercase tracking-wider text-black text-x">
                  Account
                </div>

                <button
                  onClick={goToDashboard}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <LayoutDashboard size={18} className="text-slate-700 text-xl" />
                  Dashboard
                </button>

                <button
                  onClick={goToProfile}
                  className="flex w-full  items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <User size={20} className="text-slate-700 " />
                  Profile
                </button>

                <div className="my-1 border-t border-slate-100 py-0.5" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-400 hover:shadow-lg active:scale-95"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-xl p-2 text-white transition-colors hover:bg-white/10 active:scale-95 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1.5 border-t border-white/10 px-4 py-4 bg-blue-950/40 backdrop-blur-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="my-2 border-t border-white/10" />

          {user ? (
            <div className="space-y-1 pt-1">
              <button
                onClick={goToDashboard}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-blue-100 hover:bg-white/10"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </button>

              <button
                onClick={goToProfile}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-blue-100 hover:bg-white/10"
              >
                <User size={18} />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-300 hover:bg-white/10"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="mt-2 block rounded-xl bg-blue-500 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-blue-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
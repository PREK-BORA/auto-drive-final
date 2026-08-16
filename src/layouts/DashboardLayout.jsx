import { useState, useRef, useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Menu as MenuIcon,
  X as CloseIcon,
  LogOut,
  Home,
  Car,
  ChevronDown,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function DashboardLayout({ sidebarItems = [], title }) {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    try {
      await logout()
      setUserMenuOpen(false)
      setMobileOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const userInitial = (
    user?.name ||
    user?.displayName ||
    user?.email ||
    'U'
  )
    .charAt(0)
    .toUpperCase()

  // Shared Sidebar Navigation
  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white border-r border-slate-200">
      {/* Sidebar Logo */}
      <div className="flex h-16 items-center gap-2.5 px-6 border-b border-slate-100">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <Car className="h-5 w-5" />
        </div>
        <span className="text-xl font-extrabold tracking-tight text-slate-900">
          Auto<span className="text-yellow-500">Drive</span>
        </span>
      </div>

      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path)
                setMobileOpen(false)
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover: bg-white hover:text-slate-700'
              }`}
            >
              <span
                className={`flex items-center justify-center ${
                  isActive ? 'text-white' : 'text-blue-600'
                }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* Bottom Option: Back to main website */}
      <div className="p-4 border-t border-white">
        <Link
          to="/"
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <Home className="h-5 w-5 text-blue-500" />
          <span className="ml-1 truncate bg-blue-200 py-3 border rounded-full px-2">Back to Website</span>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Desktop Fixed Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* 2. Mobile Drawer Backdrop & Sidebar */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Slide-out Mobile Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* 3. Main Area */}
      <div className="flex flex-1 flex-col md:pl-64 min-w-0">
        {/* Sticky Header Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 sm:px-6 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Open sidebar"
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 active:scale-95 md:hidden"
            >
              {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>

            {/* Page Title */}
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
              {title}
            </h1>
          </div>

          {/* User Menu Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full p-1 transition-all hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-sm font-bold text-white shadow-sm">
                {userInitial}
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-500 transition-transform duration-200 ${
                  userMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* User Dropdown Panel */}
            <div
              className={`absolute right-0 mt-2 w-52 origin-top-right rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl transition-all duration-200 ${
                userMenuOpen
                  ? 'scale-100 opacity-100 pointer-events-auto'
                  : 'scale-95 opacity-0 pointer-events-none'
              }`}
            >
              <button
                onClick={() => {
                  navigate(isAdmin ? '/admin' : '/dashboard')
                  setUserMenuOpen(false)
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                Dashboard
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
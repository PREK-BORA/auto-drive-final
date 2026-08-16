import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

import PublicLayout from "../layouts/PublicLayout";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import VehiclesPage from "../pages/VehiclesPage";
import VehicleDetailsPage from "../pages/VehicleDetailsPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import UserProfile from "../pages/user/UserProfile";
import UserFavorites from "../pages/user/UserFavorites";
import UserBookings from "../pages/user/UserBookings";
import UserChangePassword from "../pages/user/UserChangePassword";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminVehicles from "../pages/admin/AdminVehicles";
import AdminServices from "../pages/admin/AdminServices";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminMessages from "../pages/admin/AdminMessages";

function AuthRequired() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner message="Checking authentication..." />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}

function AdminRequired() {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner message="Checking permissions..." />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

function GuestOnly() {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <LoadingSpinner message="Checking authentication..." />;
  if (user) return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;

  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Login and registration are available only to signed-out users. */}
      <Route element={<GuestOnly />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Authenticated user dashboard */}
      <Route element={<AuthRequired />}>
        <Route element={<UserDashboardLayout />}>
          <Route path="/dashboard" element={<UserProfile />} />
          <Route path="/dashboard/favorites" element={<UserFavorites />} />
          <Route path="/dashboard/bookings" element={<UserBookings />} />
          <Route path="/dashboard/password" element={<UserChangePassword />} />
        </Route>
      </Route>

      {/* Admin-only dashboard */}
      <Route element={<AdminRequired />}>
        <Route element={<AdminDashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/vehicles" element={<AdminVehicles />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

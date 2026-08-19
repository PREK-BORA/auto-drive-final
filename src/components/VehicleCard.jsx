import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Fuel, Settings, Calendar, Heart } from "lucide-react";

import { useAuth } from "../context/AuthContext";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../services/firestoreService";

function getImageUrl(image) {
  if (typeof image === "string") return image;
  if (image && typeof image === "object") return image.url || "";
  return "";
}



export default function VehicleCard({ vehicle }) {
  const { user } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);


  const fallbackImage =
    "https://images.pexels.com/photos/170782/pexels-photo-170782.jpeg?auto=compress&cs=tinysrgb&w=800";


  const imageUrl = getImageUrl(vehicle?.images?.[0]) || fallbackImage;

  const isAvailable = vehicle?.status === "available";

  useEffect(() => {
    let cancelled = false;

    const checkFavorite = async () => {
      // No user = no favorites
      if (!user?.uid || !vehicle?.id) {
        setIsFavorite(false);
        return;
      }

      try {
        const favorites = await getFavorites(user.uid);

        if (!cancelled) {
          setIsFavorite(
            favorites.some((favorite) => favorite.vehicleId === vehicle.id),
          );
        }
      } catch (error) {
        console.error("Failed to check favorite:", error);

        if (!cancelled) {
          setIsFavorite(false);
        }
      }
    };

    checkFavorite();

    return () => {
      cancelled = true;
    };
  }, [user?.uid, vehicle?.id]);

  const toggleFavorite = async (e) => {
    // Prevent opening the Details link
    e.preventDefault();
    e.stopPropagation();

    // User must be logged in
    if (!user?.uid) {
      return;
    }

    // Prevent double-click
    if (favoriteLoading) {
      return;
    }

    try {
      setFavoriteLoading(true);

      if (isFavorite) {
        // Remove favorite
        await removeFavorite(user.uid, vehicle.id);

        setIsFavorite(false);
      } else {
        // Add favorite
        await addFavorite(user.uid, vehicle.id);

        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Failed to update favorite:", error);

      alert(error?.message || "Failed to update favorite.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  // ============================================================
  // Handle broken image
  // ============================================================

  const handleImageError = (e) => {
    // Prevent infinite loop if fallback also fails
    if (e.currentTarget.src !== fallbackImage) {
      e.currentTarget.src = fallbackImage;
    }
  };

  // ============================================================
  // Render
  // ============================================================

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ======================================================
          Vehicle Image
      ======================================================= */}

      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={vehicle?.name || "Vehicle"}
          loading="lazy"
          onError={handleImageError}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* ==================================================
            Status Badge
        =================================================== */}

        {vehicle?.status && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm ${
              isAvailable ? "bg-emerald-500" : "bg-amber-600"
            }`}
          >
            {vehicle.status}
          </span>
        )}

        {/* ==================================================
            Favorite Button
        =================================================== */}

        {user && (
          <button
            onClick={toggleFavorite}
            type="button"
            disabled={favoriteLoading}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95 ${
              favoriteLoading ? "cursor-not-allowed opacity-60" : ""
            }`}
          >
            <Heart
              size={18}
              className={
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-slate-600 transition-colors hover:text-red-500"
              }
            />
          </button>
        )}
      </div>

      {/* ======================================================
          Card Details
      ======================================================= */}

      <div className="flex flex-1 flex-col p-5">
        {/* ==================================================
            Brand & Name
        =================================================== */}

        <div className="mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {vehicle?.brand || "Vehicle"}
          </span>

          <h3 className="line-clamp-1 text-lg font-bold text-slate-800">
            {vehicle?.name || "Unnamed Vehicle"}
          </h3>
        </div>

        {/* ==================================================
            Vehicle Specifications
        =================================================== */}

        <div className="mb-5 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
          {/* Year */}
          <div className="flex items-center gap-1.5">
            <Calendar size={15} className="text-slate-400" />

            <span>{vehicle?.year || "N/A"}</span>
          </div>

          {/* Fuel */}
          <div className="flex items-center gap-1.5">
            <Fuel size={15} className="text-slate-400" />

            <span>{vehicle?.fuelType || "N/A"}</span>
          </div>

          {/* Transmission */}
          <div className="flex items-center gap-1.5">
            <Settings size={15} className="text-slate-400" />

            <span>{vehicle?.transmission || "N/A"}</span>
          </div>
        </div>

        {/* ==================================================
            Price & Details
        =================================================== */}

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-2">
          {/* Price */}

          <div>
            <span className="block text-xs text-gray-600">Price</span>

            <span className="text-2xl font-extrabold text-red-600">
              $
              {typeof vehicle?.price === "number"
                ? vehicle.price.toLocaleString()
                : Number(vehicle?.price || 0).toLocaleString()}
            </span>
          </div>

          {/* Details Button */}

          <Link
            to={`/vehicles/${vehicle.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
          >
            <span>Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

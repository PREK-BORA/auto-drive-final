import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle,
  CalendarDays,
  Fuel,
  Settings,
  Car,
  Phone,
  Heart,
  ArrowLeft,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getVehicleById,
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/firestoreService";
import { useAuth } from "../context/AuthContext";

function getImageUrl(image) {
  if (typeof image === "string") return image;
  if (image && typeof image === "object") return image.url || "";
  return "";
}

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        setVehicle(data);

        if (user) {
          const favorites = await getFavorites(user.uid);
          setIsFavorite(
            favorites.some((favorite) => favorite.vehicleId === id)
          );
        }
      } catch (error) {
        console.error("Error loading vehicle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, user]);

  const toggleFavorite = async () => {
    if (!user) return;

    try {
      if (isFavorite) {
        await removeFavorite(user.uid, id);
        setIsFavorite(false);
      } else {
        await addFavorite(user.uid, id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Favorite error:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading vehicle details..." />;
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20 text-center">
        <h2 className="mb-6 text-2xl font-bold text-slate-600">
          Vehicle not found.
        </h2>

        <Link
          to="/vehicles"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft size={20} />
          Back to Vehicles
        </Link>
      </div>
    );
  }

  const images = vehicle.images || [];

  const fallbackImage =
    "https://images.pexels.com/photos/170782/pexels-photo-170782.jpeg?auto=compress&cs=tinysrgb&w=1200";

  const mainImage = getImageUrl(images[selectedImage]) || fallbackImage;

  const specs = [
    {
      icon: <CalendarDays size={24} />,
      label: "Year",
      value: vehicle.year,
    },
    {
      icon: <Car size={24} />,
      label: "Model",
      value: vehicle.model,
    },
    {
      icon: <Fuel size={24} />,
      label: "Fuel",
      value: vehicle.fuelType,
    },
    {
      icon: <Settings size={24} />,
      label: "Transmission",
      value: vehicle.transmission,
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">

        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800"
          >
            Home
          </Link>

          <span className="text-slate-400">/</span>

          <Link
            to="/vehicles"
            className="text-blue-600 hover:text-blue-800"
          >
            Vehicles
          </Link>

          <span className="text-slate-400">/</span>

          <span className="text-slate-600">
            {vehicle.name}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">

          <div className="md:col-span-7">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img
                src={mainImage}
                alt={vehicle.name}
                className="h-[300px] w-full object-cover sm:h-[400px] md:h-[450px]"
              />
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                      selectedImage === index
                        ? "border-blue-700"
                        : "border-slate-200"
                    }`}
                  >
                    <img
                      src={getImageUrl(image) || fallbackImage}
                      alt={`${vehicle.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          <div className="md:col-span-5">

            <div className="mb-4 flex items-start justify-between gap-4">

              <div>
                <p className="mb-1 text-sm font-bold uppercase tracking-wide text-blue-600">
                  {vehicle.brand}
                </p>

                <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                  {vehicle.name}
                </h1>
              </div>

              {user && (
                <button
                  type="button"
                  onClick={toggleFavorite}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${
                    isFavorite
                      ? "border-red-300 text-red-500"
                      : "border-slate-300 text-slate-600"
                  } hover:bg-slate-50`}
                >
                  <Heart
                    size={22}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
              )}

            </div>

            <div className="mb-6 text-4xl font-extrabold text-blue-600">
              ${vehicle.price?.toLocaleString()}
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">

              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"
                >
                  <div className="mb-2 flex justify-center text-blue-600">
                    {spec.icon}
                  </div>

                  <p className="text-xs text-slate-500">
                    {spec.label}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {spec.value}
                  </p>
                </div>
              ))}

            </div>

            {vehicle.status && (
              <div className="mb-6">
                <span
                  className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                    vehicle.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {vehicle.status === "available"
                    ? "Available"
                    : vehicle.status}
                </span>
              </div>
            )}

            <Link
              to="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Contact About This Vehicle
            </Link>

          </div>

        </div>

        <div className="my-10 border-t border-slate-200"></div>

        <section className="mb-10">

          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Description
          </h2>

          <p className="max-w-4xl leading-8 text-slate-600">
            {vehicle.description}
          </p>

        </section>

        <section className="pb-10">

          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            Features
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

            {(vehicle.features || []).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4"
              >
                <CheckCircle
                  size={20}
                  className="shrink-0 text-green-600"
                />

                <span className="text-sm text-slate-700">
                  {feature}
                </span>
              </div>
            ))}

          </div>

        </section>

      </div>

    </div>
  );
}

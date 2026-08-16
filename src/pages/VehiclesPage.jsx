import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import VehicleCard from "../components/VehicleCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { getVehicles } from "../services/firestoreService";

const VEHICLES_PER_PAGE = 6;

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $40,000", min: 0, max: 40000 },
  { label: "$40,000 - $60,000", min: 40000, max: 60000 },
  { label: "$60,000 - $80,000", min: 60000, max: 80000 },
  { label: "Over $80,000", min: 80000, max: Infinity },
];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Error loading vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const brands = useMemo(() => {
    const uniqueBrands = [
      ...new Set(vehicles.map((vehicle) => vehicle.brand)),
    ];

    return ["All", ...uniqueBrands];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        !searchQuery ||
        vehicle.name?.toLowerCase().includes(search) ||
        vehicle.brand?.toLowerCase().includes(search);

      const matchesBrand =
        selectedBrand === "All" ||
        vehicle.brand === selectedBrand;

      const range = PRICE_RANGES[selectedPriceRange];

      const matchesPrice =
        vehicle.price >= range.min &&
        vehicle.price <= range.max;

      return matchesSearch && matchesBrand && matchesPrice;
    });
  }, [
    vehicles,
    searchQuery,
    selectedBrand,
    selectedPriceRange,
  ]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedBrand, selectedPriceRange]);

  const paginatedVehicles = useMemo(() => {
    const start = (page - 1) * VEHICLES_PER_PAGE;

    return filteredVehicles.slice(
      start,
      start + VEHICLES_PER_PAGE
    );
  }, [filteredVehicles, page]);

  const totalPages = Math.ceil(
    filteredVehicles.length / VEHICLES_PER_PAGE
  );

  if (loading) {
    return <LoadingSpinner message="Loading vehicles..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-blue-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="mb-3 text-4xl font-extrabold text-white md:text-5xl">
            Our Vehicles
          </h1>
          <p className="text-lg text-white/85">
            Explore our full collection of premium vehicles
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-30 bg-white py-3 pl-11 pr-4 outline-none transition  focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Brand */}
          <div>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand === "All" ? "All Brands" : brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <select
              value={selectedPriceRange}
              onChange={(e) =>
                setSelectedPriceRange(Number(e.target.value))
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {PRICE_RANGES.map((range, index) => (
                <option key={index} value={index}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count */}
        <div className="mt-5">
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {filteredVehicles.length} vehicles found
          </span>
        </div>
      </section>

      {/* Vehicles */}
      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        {paginatedVehicles.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="mb-2 text-xl font-semibold text-slate-700">
              No vehicles found
            </h2>
            <p className="text-slate-500">
              No vehicles match your search. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`h-10 w-10 rounded-lg font-semibold transition ${
                    page === pageNumber
                      ? "bg-blue-600 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={page === totalPages}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
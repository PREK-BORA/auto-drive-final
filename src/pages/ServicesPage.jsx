import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { getServices } from "../services/firestoreService";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading services..." />;
  }

  return (
    <div className="min-h-screen bg-white">

      <section className="bg-blue-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="mb-3 text-4xl font-extrabold text-white md:text-5xl">
            Our Services
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-white/85">
            We offer a comprehensive range of automotive services to meet all
            your needs, from buying a car to maintaining it for years to come.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {services.length === 0 ? (
          <div className="rounded-xl bg-slate-100 p-10 text-center">
            <p className="text-slate-500">
              No services available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-60 w-full object-cover"
                />

                <div className="p-6">
                  <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Service
                  </span>

                  <h2 className="mb-2 text-xl font-bold text-slate-900">
                    {service.title}
                  </h2>

                  <p className="leading-7 text-slate-500">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Tag,
  Headphones,
  Car,
  Star,
} from "lucide-react";

import VehicleCard from "../components/VehicleCard";
import LoadingSpinner from "../components/LoadingSpinner";

import { getVehicles, getServices } from "../services/firestoreService";

import HeroImage from "../assets/image/Luxury Car Business Car Real Shooting Car Background, Car, Car Poster, Sports Car Background Image And Wallpaper for Free Download.jpg";

export default function HomePage() {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehicleData, serviceData] = await Promise.all([
          getVehicles(),
          getServices(),
        ]);

        setVehicles(vehicleData);
        setServices(serviceData);
      } catch (error) {
        console.error("Error loading homepage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading homepage..." />;
  }

  const featuredVehicles = vehicles.slice(0, 3);
  const latestVehicles = vehicles.slice(0, 4);

  const features = [
    {
      icon: <BadgeCheck size={45} />,
      title: "Certified Quality",
      description:
        "Every vehicle undergoes a rigorous 150-point inspection by our certified technicians.",
    },
    {
      icon: <Tag size={45} />,
      title: "Best Prices",
      description:
        "Transparent, competitive pricing with no hidden fees. We match competitor prices.",
    },
    {
      icon: <Headphones size={45} />,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available around the clock to assist you.",
    },
    {
      icon: <Car size={45} />,
      title: "Wide Selection",
      description:
        "Hundreds of new and pre-owned vehicles from all major brands in one place.",
    },
  ];

  const testimonials = [
    {
      name: "Mr Pisal",
      role: "BMW M4 Owner",
      text: "The team at AutoDrive made buying my dream car effortless. The financing was quick and the service was outstanding!",
    },
    {
      name: "Mr Piseth",
      role: "Ford Raptor F-150",
      text: "I was nervous about buying an electric car, but their team explained everything. Best car purchase experience I have had.",
    },
    {
      name: "Mr Bora",
      role: "Audi Q7 Owner",
      text: "From test drive to delivery, everything was seamless. The trade-in value they offered was the best I found anywhere.",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* 1. HERO SECTION */}
      <section
        className="relative flex min-h-[580px] items-center bg-slate-950 bg-cover bg-center sm:min-h-[550px] md:min-h-[650px]"
        style={{
          backgroundImage: `url("${HeroImage}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-blue-950/85 sm:bg-gradient-to-r sm:from-slate-950/90 sm:via-slate-950/70 sm:to-slate-950/35" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-block rounded-full border border-yellow-300/40 bg-slate-950/50 px-4 py-2 text-sm font-semibold text-yellow-300 backdrop-blur-sm">
              Premium Car Dealership
            </div>

            <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              Find Your Dream Car at AutoDrive
            </h1>

            <p className="mb-8 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
              Discover an exclusive collection of premium vehicles. From luxury
              sedans to powerful SUVs, we have the perfect car waiting for you.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                to="/vehicles"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-700"
              >
                Browse Vehicles
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-slate-900"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED VEHICLES */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Featured Vehicles
          </h2>
          <p className="text-slate-500">
            Handpicked cars that represent the best of our collection
          </p>
        </div>

        {featuredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-slate-100 p-10 text-center">
            <p className="text-slate-500">No featured vehicles available.</p>
          </div>
        )}
      </section>

      {/* 3. OUR SERVICES */}
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Our Services
            </h2>
            <p className="text-slate-500">
              Everything you need for a complete car ownership experience
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((service) => (
                <div
                  key={service.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-52 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="leading-7 text-slate-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-500">
              No services available.
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              View All Services
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Why Choose Us
          </h2>
          <p className="text-slate-500">
            We are committed to making your car buying experience exceptional
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl p-5 text-center transition duration-300 hover:-translate-y-1"
            >
              <div className="mb-5 flex justify-center text-blue-600">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-7 text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="bg-blue-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-white md:text-4xl">
              Customer Testimonials
            </h2>
            <p className="text-white/70">
              What our customers say about their experience with AutoDrive
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm"
              >
                <div className="mb-5 flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} fill="currentColor" />
                  ))}
                </div>

                <p className="mb-6 italic leading-7 text-white/90">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <Star
                      size={22}
                      className="text-blue-600"
                      fill="currentColor"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST VEHICLES */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Latest Vehicles
          </h2>
          <p className="text-slate-500">The newest additions to our showroom</p>
        </div>

        {latestVehicles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500">
            No vehicles available.
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View All Vehicles
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

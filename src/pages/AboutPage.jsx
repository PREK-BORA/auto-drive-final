import developer from "../assets/image/developer.jpg";

const developerInfo = {
  name: "PREK BORA",
  role: "Lead Web Developer",
  tagline: "Creator & Engineer of AutoDrive Platform",
  image: developer,

  bio: "I’m Prek Bora, a passionate web developer and software engineering student who enjoys creating modern, responsive, and user-friendly web applications. I focus mainly on React.js, JavaScript, Tailwind CSS, Firebase, and UI/UX design. For the AutoDrive Car Dealership Management System, I designed and developed the website to provide users with a simple and attractive way to explore vehicles, view vehicle information, and interact with the dealership platform.",

  skills: [
    "React.js",
    "Tailwind CSS",
    "Material UI (MUI)",
    "JavaScript (ES6+)",
    "Responsive Web Design",
    "Firebase",
    "REST API",
    "UI/UX Design Systems",
    "Performance Optimization",
  ],

  highlights: [
    {
      title: "Full Responsive Architecture",
      desc: "Engineered clean, mobile-first layouts with smooth UI transitions and accessible controls.",
    },
    {
      title: "Interactive Inventory UI",
      desc: "Designed modern showcase features allowing users to easily browse and view vehicle details.",
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="fade-in bg-slate-50">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section
        className="relative flex min-h-[300px] items-center bg-cover bg-center md:min-h-[400px]"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/06/12/db/0612dbd62816d607955d466de97e8b69.jpg)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
          <h1 className="mb-2 text-4xl font-extrabold text-white md:text-5xl">
            About AutoDrive
          </h1>

          <p className="max-w-2xl text-base leading-7 text-slate-100 md:text-lg">
            Your trusted car dealership for over 15 years, committed to quality
            and customer satisfaction.
          </p>
        </div>
      </section>

      {/* =====================================================
          COMPANY INTRODUCTION
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">

        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* Left */}
          <div className="space-y-4">

            <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Who We Are
            </span>

            <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
              A Legacy of Excellence in Automotive Sales
            </h2>

            <p className="mb-2 text-base leading-8 text-slate-600">
              AutoDrive was founded in 2009 with a simple mission: to make car
              buying transparent, enjoyable, and accessible for everyone. What
              started as a small showroom with just ten vehicles has grown into
              one of the region's most trusted dealerships.
            </p>

            <p className="text-base leading-8 text-slate-600">
              Today, we offer over 500 new and pre-owned vehicles from all major
              brands. Our certified technicians, financing experts, and
              dedicated sales team work together to ensure every customer drives
              away satisfied.
            </p>

          </div>

          {/* Right */}
          <div>
            <img
              src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="AutoDrive showroom"
              className="w-full rounded-3xl border border-slate-200 object-cover shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* =====================================================
          MISSION / VISION / HISTORY
      ====================================================== */}
      <section className="bg-slate-100 py-12">

        <div className="mx-auto max-w-6xl px-4 md:px-6">

          <div className="grid gap-4 md:grid-cols-3">

            {/* Mission */}
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900">
                  Our Mission
                </h3>

              </div>

              <p className="leading-7 text-slate-600">
                To provide every customer with a transparent, stress-free car
                buying experience. We believe in honesty, quality, and
                building long-term relationships with our customers, not just
                making a sale.
              </p>

            </div>

            {/* Vision */}
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900">
                  Our Vision
                </h3>

              </div>

              <p className="leading-7 text-slate-600">
                To be the most trusted and innovative car dealership in the
                country, leading the transition to electric vehicles while
                maintaining our commitment to customer satisfaction and
                community engagement.
              </p>

            </div>

            {/* History */}
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900">
                  Our History
                </h3>

              </div>

              <p className="leading-7 text-slate-600">
                Founded in 2009, AutoDrive began as a family business. Over 15
                years, we have expanded to three locations, served over 25,000
                customers, and earned numerous awards for excellence in
                automotive sales and service.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          DEVELOPER SECTION
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">

        {/* Header */}
        <div className="mb-10 text-center">

          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            Behind The Project
          </span>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Meet The Developer
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-center text-slate-600">
            The software engineer who designed and built the AutoDrive web
            experience.
          </p>

        </div>

        {/* Main Developer Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl">

          <div className="grid md:grid-cols-5">

            {/* =================================================
                DEVELOPER LEFT SIDE
            ================================================== */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-900 p-8 text-center text-white md:col-span-2">

              {/* Glow */}
              <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-indigo-600/20 blur-3xl" />

              <div className="relative z-10 flex flex-col items-center">

                {/* Image */}
                <div className="mb-6 rounded-2xl bg-gradient-to-tr from-gray-500 to-gray-500 p-1 shadow-xl">

                  <img
                    src={developerInfo.image}
                    alt={developerInfo.name}
                    className="h-60 w-60 rounded-xl object-cover md:h-64 md:w-64"
                  />

                </div>

                {/* Name */}
                <h3 className="text-2xl font-extrabold tracking-wide text-white">
                  {developerInfo.name}
                </h3>

                {/* Role */}
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-blue-400">
                  {developerInfo.role}
                </p>

                {/* Tagline */}
                <p className="mt-2 text-xs text-slate-400">
                  {developerInfo.tagline}
                </p>

                {/* Badges */}
                <div className="mt-5 flex flex-wrap justify-center gap-2">

                  <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-1 text-xs text-white">
                    Lead Developer
                  </span>

                  <span className="rounded-full border border-yellow-500 bg-yellow-500 px-3 py-1 text-xs text-white">
                    UI/UX Specialist
                  </span>

                </div>

              </div>
            </div>

            {/* =================================================
                DEVELOPER RIGHT SIDE
            ================================================== */}
            <div className="flex flex-col justify-between bg-white p-6 md:col-span-3 md:p-10">

              <div>

                {/* About */}
                <div>

                  <h3 className="mb-2 text-2xl font-bold text-slate-900">
                    About Prek Bora
                  </h3>

                  <p className="text-base leading-relaxed text-slate-600">
                    {developerInfo.bio}
                  </p>

                </div>

                {/* Divider */}
                <div className="my-6 border-t border-slate-100" />

                {/* Skills */}
                <div>

                  <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
                    <span className="text-xl text-blue-600">
                      &lt;/&gt;
                    </span>

                    Key Skills & Technologies
                  </h4>

                  <div className="flex flex-wrap gap-2">

                    {developerInfo.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}

                  </div>

                </div>

                {/* Contributions */}
                <div className="mt-6">

                  <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-900">


                    Key Contributions
                  </h4>

                  <div className="grid gap-4 sm:grid-cols-2">

                    {developerInfo.highlights.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                      >

                        <h5 className="font-bold text-slate-800">
                          {item.title}
                        </h5>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          {item.desc}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>

              </div>

              {/* =================================================
                  FOOTER / SOCIAL
              ================================================== */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">

                <p className="text-sm font-medium text-gray-500">
                  Built with React & Tailwind CSS for AutoDrive
                </p> 
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
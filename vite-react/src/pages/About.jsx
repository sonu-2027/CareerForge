import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import aboutImg from "../assets/About.webp"; // using your existing image

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#dc6b43]">
      {/* Navbar */}
      <Navbar />

      {/* ================= MISSION ================= */}
      <section className="h-159 pt-18 px-6 md:px-16 bg-[#dc6b43]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-gray-800 font-semibold mb-4 tracking-wide">
              — OUR MISSION
            </p>

            <h1 className="text-6xl font-bold text-gray-900 leading-tight">
              Simplifying the{" "}
              <span className="text-shadow-indigo-200">Job Search</span> for
              Everyone
            </h1>

            <p className="text-[#fcfcfd] text-lg w-180 mt-10 leading-relaxed">
              Millions of opportunities exist across hundreds of company
              portals. Yet job seekers lose hours jumping between sites, filling
              the same filters, and losing track of applications.
            </p>

            <p className="text-[#fcfcfd] text-lg w-180 mt-4 leading-relaxed">
              CareerForge aggregates everything into one clean, searchable hub
              giving direct access to apply through official company portals. No
              clutter. No confusion. Just clarity.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-end">
            <img
              src={aboutImg}
              alt="CareerForge"
              className="w-130 h-100 rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section className="bg-[#fff3e5] text-white py-18 px-6 md:px-16 text-center">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#dc6b43] mb-4 font-semibold tracking-wide">
            — OUR VISION
          </p>

          <h2 className="text-4xl text-[#1e293b] md:text-5xl font-bold leading-tight">
            A World Where Every Person <br />
            Finds a <span className="text-[#dc6b43]">Career They Love</span>
          </h2>

          <p className="text-gray-900 mt-6">
            CareerForge aims to become an AI-powered career companion
            understanding your skills, goals, and growth path to recommend the
            best opportunities tailored just for you.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 text-left">
            <div className="bg-[#1e293b] p-6 rounded-xl">
              <span className="bg-[#dc6b43] text-xs px-3 py-1 rounded-full">
                Today
              </span>
              <h3 className="text-lg font-semibold mt-4">
                Unified Job Discovery
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Search jobs across multiple portals in one place.
              </p>
            </div>

            <div className="bg-[#1e293b] p-6 rounded-xl">
              <span className="bg-[#dc6b43] text-xs px-3 py-1 rounded-full">
                Next
              </span>
              <h3 className="text-lg font-semibold mt-4">
                AI Resume Tailoring
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Optimize resumes based on job descriptions.
              </p>
            </div>

            <div className="bg-[#1e293b] p-6 rounded-xl">
              <span className="bg-[#dc6b43] text-xs px-3 py-1 rounded-full">
                Future
              </span>
              <h3 className="text-lg font-semibold mt-4">
                Smart Recommendations
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Personalized job matches using AI insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="bg-[#dc6b43] text-white py-24 px-6 md:px-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">
            Numbers That Tell Our Story
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
            <div className="bg-white/10 p-8 rounded-xl">
              <h3 className="text-3xl font-bold">500K+</h3>
              <p className="text-sm mt-2">Jobs Aggregated</p>
            </div>

            <div className="bg-white/10 p-8 rounded-xl">
              <h3 className="text-3xl font-bold">120+</h3>
              <p className="text-sm mt-2">Company Portals</p>
            </div>

            <div className="bg-white/10 p-8 rounded-xl">
              <h3 className="text-3xl font-bold">85K+</h3>
              <p className="text-sm mt-2">Active Users</p>
            </div>

            <div className="bg-white/10 p-8 rounded-xl">
              <h3 className="text-3xl font-bold">4.8★</h3>
              <p className="text-sm mt-2">User Satisfaction</p>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-16 bg-white/10 p-10 rounded-2xl max-w-3xl mx-auto">
            <p className="text-lg font-medium">
              "We believe every job seeker deserves a fair shot at finding work
              that matters."
            </p>
            <p className="text-sm mt-3 opacity-80">— CareerForge Team</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;

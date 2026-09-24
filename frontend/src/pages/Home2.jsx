import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bgImage from "../assets/Job_Hunt.webp";

function Home2() {
  return (
    <div className=" min-h-screen h-screen flex flex-col bg-[#dc6b43]">
      <Navbar />

      <section className="grid grid-row-2 justify-items-center gap-0 mt-10">
        <div className="justify-items-center">
          <div className="text-md rounded-full bg-[#fff3e5] border-2 text-[#dc6b43] font-bold px-5 py-1 mb-6 w-66 ">
            • 12,400+ new jobs this week
          </div>

          <h1 className="flex flex-col text-7xl font-bold font-['Fraunces'] text-center">
            <span>Find Your</span>
            <span className="text-white italic">Dream</span>
            <span>Job Today.</span>
          </h1>

          {/* <div className="w-100">
            <p className="text-md text-gray-700 ">
              Stop scrolling endlessly !Lookout scans thousands of top companies
              and surfaces the roles that actually match you. Smart filters,
              real salaries, zero noise.
            </p>
          </div> */}
        </div>

        <div className="w-full h-screen overflow-hidden relative">
          <img
            src={bgImage}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home2;

import bgImage from "../assets/contact.webp";
import Navbar from "../components/Navbar";

function Contact() {
  return (
    <div className="min-h-screen h-screen bg-[#dc6b43]">
      <Navbar />
      <div className=" flex items-center justify-center mt-3">
        <div className="bg-white flex flex-row min-h-150 rounded-2xl mx-15 overflow-hidden shadow-xl">
          {/* Left: Phone Image */}
          <div className=" relative overflow-hidden">
            <img
              src={bgImage}
              alt="Support"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Form */}
          <div className="w-200 flex flex-col justify-center px-8 py-10">
            <h1 className="text-[#e34c38] text-3xl font-bold mb-1">
              Need support?
            </h1>
            <p className="text-[#dc958a] text-md mb-6">
              Contact us if you need further assistance.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Name and surname
                </label>
                <input
                  type="text"
                  className="w-full bg-[#f5eeec] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#e8603a]/30"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-[#f5eeec] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#e8603a]/30"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Please enter the details of your request.
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-[#f5eeec] rounded-md px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-[#e8603a]/30"
                />
              </div>

              <div className="flex justify-end">
                <button className="bg-[#b81e17] hover:bg-[#e34c38] text-white text-sm font-semibold px-6 py-2 rounded-md tracking-wide transition-colors">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

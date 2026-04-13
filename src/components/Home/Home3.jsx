import home3 from "../../assets/home3.jpg";
import { useNavigate } from "react-router-dom";
export default function Home3() {
  const navigate = useNavigate();
  return (
    <section className=" py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Card Container */}
        <div className="bg-[#EFECEA] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            <span className="inline-block border bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              Supporting 5,000+ Homemakers
            </span>

            <h2 className="mt-6 text-5xl font-extrabold text-gray-900 leading-tight">
              Empowering Kitchens,
              <br />
              Enriching Lives.
            </h2>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
              MayBhojan isn't just a delivery app. We're a platform for talented
              homemakers to share their culinary heritage and gain financial
              independence while providing you with food that's made with love.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Start Eating
              </button>

              <button
                onClick={() => navigate("/login")}
                className="border border-orange-300 text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition"
              >
                Start Cooking
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center">
            <img
              src={home3}
              alt="Homemaker cooking"
              className="rounded-2xl shadow-md w-full max-w-md max-h-[420px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

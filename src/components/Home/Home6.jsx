import u1 from "../../assets/u1.jpg";
import u2 from "../../assets/u2.jpg";
import u3 from "../../assets/u3.jpg";
import u4 from "../../assets/u4.jpg";
import u5 from "../../assets/u5.jpg";

export default function Home6() {
  const reviews = [
    {
      id: 1,
      text: "Being away from my mother's cooking was the hardest part of moving to a new city. MayBhojan found me a kitchen just two blocks away that tastes exactly like home.",
      name: "Rahul Mehra",
      role: "IT Professional",
      img: u2,
    },
    {
      id: 2,
      text: "I was tired of oily takeouts. Now I get a healthy, balanced lunch subscription from Lakshmi Aunty. It's affordable and my health has never been better!",
      name: "Ananya Iyer",
      role: "PhD Student",
      img: u1,
    },
    {
      id: 3,
      text: "This platform gave me the confidence to turn my passion for cooking into a sustainable income.",
      name: "Priya Das",
      role: "Kitchen Partner",
      img: u3,
    },
    {
      id: 4,
      text: "The quality is unbelievable. Every meal feels homemade and fresh.",
      name: "Karan Singh",
      role: "Software Engineer",
      img: u4,
    },
    {
      id: 5,
      text: "Affordable, tasty, and healthy — exactly what students need.",
      name: "Neha Gupta",
      role: "College Student",
      img: u5,
    },
  ];

  return (
    <>
      {/* ORANGE STATS BAR */}
      <section className="bg-orange-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h3 className="text-4xl font-extrabold">50k+</h3>
            <p className="mt-2 tracking-wide">MEALS DELIVERED</p>
          </div>

          <div>
            <h3 className="text-4xl font-extrabold">5k+</h3>
            <p className="mt-2 tracking-wide">ACTIVE KITCHENS</p>
          </div>

          <div>
            <h3 className="text-4xl font-extrabold">1.2k+</h3>
            <p className="mt-2 tracking-wide">STUDENT RIDERS</p>
          </div>

          <div>
            <h3 className="text-4xl font-extrabold">4.9/5</h3>
            <p className="mt-2 tracking-wide">AVERAGE RATING</p>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-gray-900">
            Love from Our Community
          </h2>

          <p className="text-gray-600 mt-2">
            Real stories from people who found a home away from home.
          </p>

          <div className="mt-10 flex gap-8 overflow-x-auto scrollbar-hide pb-4">

            {reviews.map((r) => (
              <div
                key={r.id}
                className="min-w-[320px] bg-[#F3F3F3] rounded-2xl p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="text-gray-400 mb-4">★★★★★</div>

                <p className="text-gray-700 leading-relaxed">
                  "{r.text}"
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-gray-500">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}

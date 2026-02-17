import { useState } from "react";
import { meals } from "../../data/Meals";

export default function Home1() {
  const [language] = useState("en");
  const [query, setQuery] = useState("");
  const [ setResults] = useState(meals);

  const handleSearch = () => {
    const filtered = meals.filter((meal) =>
      meal[language].toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  const handleTagClick = (name) => {
    setQuery(name);
    setResults(meals.filter((m) => m[language] === name));
  };

  return (
    <>
      {/* HERO */}
      <section
        className="
        w-full
        py-16 sm:py-20 md:py-28
        bg-gradient-to-br
        from-[#F6E6DC]
        via-[#F1DCD1]
        to-[#E9CFC2]
      "
      >
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">

          {/* Badge */}
          <span className="
            inline-block border border-orange-200 bg-orange-50
            text-orange-500 font-semibold
            px-4 py-2 rounded-full text-xs sm:text-sm
          ">
            #1 Homemade Food Platform
          </span>

          {/* Heading */}
          <h1 className="
            mt-6 sm:mt-8
            text-3xl sm:text-5xl md:text-6xl
            font-extrabold text-[#1E1E1E]
            leading-tight
          ">
            Find Food That
            <br />
            <span className="text-orange-500 italic font-black">
              Feels Like Home
            </span>
          </h1>

          {/* Subtitle */}
          <p className="
            mt-4 sm:mt-6
            text-gray-700
            text-base sm:text-lg
            max-w-2xl mx-auto
            leading-relaxed
          ">
            Skip the restaurant oil and preservatives. Enjoy fresh,
            healthy meals cooked by talented homemakers in your neighborhood.
          </p>

          {/* Search */}
          <div
            className="
            mt-8 sm:mt-10
            bg-white rounded-2xl sm:rounded-full
            shadow-xl
            flex flex-col sm:flex-row
            overflow-hidden
            max-w-3xl mx-auto
          "
          >

            {/* Location */}
            <div className="
              flex items-center gap-2
              px-4 sm:px-6
              text-gray-500
              w-full sm:w-1/2
            ">
              📍
              <input
                type="text"
                placeholder="Enter your delivery area..."
                className="w-full py-3 sm:py-4 outline-none text-sm sm:text-base"
              />
            </div>

            {/* Divider (hidden on mobile) */}
            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            {/* Search */}
            <div className="
              flex items-center gap-2
              px-4 sm:px-6
              text-gray-500
              w-full
            ">
              🔍
              <input
                type="text"
                placeholder="Search meals or kitchens..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-3 sm:py-4 outline-none text-sm sm:text-base"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleSearch}
              className="
                bg-orange-500 text-white
                px-6 sm:px-10
                py-3 sm:py-4
                font-semibold
                rounded-xl sm:rounded-full
                m-2
                hover:opacity-90
                text-sm sm:text-base
              "
            >
              Search
            </button>
          </div>

          {/* Popular */}
          <div className="
            mt-6
            text-gray-700 text-sm
            flex flex-wrap
            justify-center gap-3 sm:gap-4
          ">
            <span className="font-medium">Popular:</span>

            {meals.slice(0, 3).map((meal) => (
              <button
                key={meal.id}
                onClick={() => handleTagClick(meal[language])}
                className="hover:text-orange-500"
              >
                {meal[language]}
              </button>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

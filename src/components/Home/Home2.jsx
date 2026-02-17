import { useState } from "react";

export default function Home2() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: 1, label: "Comfort", emoji: "🍜", color: "bg-[#E7D5C9]" },
    { id: 2, label: "Spicy", emoji: "🌶️", color: "bg-[#E4D3D6]" },
    { id: 3, label: "Homesick", emoji: "🏠", color: "bg-[#E7DDCC]" },
    { id: 4, label: "Healthy", emoji: "🥦", color: "bg-[#E1D8CE]" },
    { id: 5, label: "Festival", emoji: "🪔", color: "bg-[#E6DCCF]" },
  ];

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    console.log("Selected mood:", mood);
    // Later you can connect filtering / API here
  };

  return (
    <section className="  py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900">
          How are you feeling today?
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Pick a mood, and we'll find the perfect home-cooked meal for you.
        </p>

        {/* Mood Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-8">

          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood.label)}
              className={`
                ${mood.color}
                rounded-3xl p-10
                flex flex-col items-center justify-center
                shadow-sm transition transform hover:scale-105
                ${selectedMood === mood.label ? "ring-2 ring-orange-500" : ""}
              `}
            >
              <span className="text-5xl">{mood.emoji}</span>
              <span className="mt-4 font-semibold text-lg">
                {mood.label}
              </span>
            </button>
          ))}

        </div>
      </div>
    </section>
  );
}

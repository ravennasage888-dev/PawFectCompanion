import React, { useState } from "react";

const BREED_DATA = [
  {
    name: "Golden Retriever",
    emoji: "🦮",
    origin: "🇺🇸 Popular · Scotland Origin",
    size: "Large: 55–75 lbs",
    lifespan: "10–12 years",
    temperament: ["Friendly", "Devoted", "Intelligent"],
    exercise: "High — 60+ min/day",
    grooming: "Moderate to High",
    goodWith: ["Kids", "Families", "Other Pets"],
    climate: "Best for: Midwest, Temperate",
    price: "$1,000 – $2,500",
    color: "#f59e0b",
  },
  {
    name: "English Bulldog",
    emoji: "🐕",
    origin: "🇬🇧 British Heritage",
    size: "Medium: 40–50 lbs",
    lifespan: "8–10 years",
    temperament: ["Docile", "Friendly", "Gregarious"],
    exercise: "Low — 20–30 min/day",
    grooming: "Low (wrinkle care needed)",
    goodWith: ["Kids", "Apartment Living"],
    climate: "Best for: UK, Cooler climates",
    price: "$2,500 – $4,500",
    color: "#dc2626",
  },
  {
    name: "Siberian Husky",
    emoji: "🐺",
    origin: "🇨🇦 Winter-Tough",
    size: "Medium: 35–60 lbs",
    lifespan: "12–14 years",
    temperament: ["Loyal", "Outgoing", "Mischievous"],
    exercise: "Very High — 90+ min/day",
    grooming: "High (heavy shedder)",
    goodWith: ["Active Families", "Outdoors"],
    climate: "Best for: Canada, Cold climates",
    price: "$1,200 – $2,500",
    color: "#475569",
  },
  {
    name: "Beagle",
    emoji: "🐩",
    origin: "🇬🇧 Classic British",
    size: "Small-Med: 20–30 lbs",
    lifespan: "12–15 years",
    temperament: ["Happy", "Brave", "Smart"],
    exercise: "Moderate — 45 min/day",
    grooming: "Low",
    goodWith: ["Kids", "Families", "Seniors"],
    climate: "Best for: UK, Versatile",
    price: "$800 – $1,500",
    color: "#78350f",
  },
  {
    name: "French Bulldog",
    emoji: "🐶",
    origin: "🇺🇸 Popular · French Roots",
    size: "Small: 16–28 lbs",
    lifespan: "10–12 years",
    temperament: ["Playful", "Smart", "Adaptable"],
    exercise: "Low — 20 min/day",
    grooming: "Low",
    goodWith: ["Apartments", "Seniors", "Singles"],
    climate: "Best for: Southern US (air-conditioned!)",
    price: "$2,500 – $5,000+",
    color: "#7c3aed",
  },
  {
    name: "Labrador Retriever",
    emoji: "🐕‍🦺",
    origin: "🇺🇸 #1 Family Dog",
    size: "Large: 55–80 lbs",
    lifespan: "10–12 years",
    temperament: ["Active", "Friendly", "Outgoing"],
    exercise: "High — 60+ min/day",
    grooming: "Moderate",
    goodWith: ["Kids", "Families", "Service Work"],
    climate: "Best for: Midwest, All-around",
    price: "$800 – $2,000",
    color: "#1f2937",
  },
  {
    name: "Alaskan Malamute",
    emoji: "🐕",
    origin: "🇨🇦 Arctic-Bred",
    size: "Large: 75–100 lbs",
    lifespan: "10–14 years",
    temperament: ["Affectionate", "Loyal", "Playful"],
    exercise: "Very High — 2+ hrs/day",
    grooming: "Very High",
    goodWith: ["Active Families", "Cold Climates"],
    climate: "Best for: Northern Canada",
    price: "$1,500 – $3,000",
    color: "#78716c",
  },
  {
    name: "Welsh Terrier",
    emoji: "🐩",
    origin: "🇬🇧 Welsh Pedigree",
    size: "Small: 20–22 lbs",
    lifespan: "12–15 years",
    temperament: ["Spirited", "Alert", "Friendly"],
    exercise: "Moderate — 45 min/day",
    grooming: "Moderate (hand-stripping)",
    goodWith: ["Families", "Rural/Urban"],
    climate: "Best for: UK, Temperate",
    price: "$1,000 – $1,800",
    color: "#0369a1",
  },
];

export function BlogHeader() {
  const [active, setActive] = useState(0);
  const breed = BREED_DATA[active];

  return (
    <div className="my-12">
      <div className="text-center mb-10">
        <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "#ea580c" }}>✦ Breed Encyclopedia ✦</div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Find Your <em style={{ color: "#ea580c" }}>Perfect</em> Match</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Every breed is unique. Explore detailed profiles to find the temperament, energy level, and size that fits your lifestyle.</p>
      </div>

      {/* Breed Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {BREED_DATA.map((b, i) => (
          <button
            key={b.name}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 ${
              active === i 
                ? "text-white shadow-lg scale-105" 
                : "bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:bg-orange-50"
            }`}
            style={active === i ? { background: `linear-gradient(135deg,${b.color},${b.color}dd)` } : {}}
          >
            <span className="text-lg">{b.emoji}</span> {b.name}
          </button>
        ))}
      </div>

      {/* Breed Detail Card */}
      <div className="rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-5"
           style={{ background: `linear-gradient(135deg, ${breed.color}15, ${breed.color}08)` }}>
        <div className="md:col-span-2 flex items-center justify-center p-10"
             style={{ background: `linear-gradient(135deg, ${breed.color}, ${breed.color}dd)` }}>
          <div className="text-center">
            <div className="text-[140px] mb-3 drop-shadow-2xl">{breed.emoji}</div>
            <div className="text-white/90 text-sm font-bold tracking-wider uppercase">{breed.origin}</div>
          </div>
        </div>
        <div className="md:col-span-3 p-8 bg-white/80 backdrop-blur">
          <h3 className="text-4xl font-extrabold mb-1" style={{ color: breed.color }}>{breed.name}</h3>
          <p className="text-gray-500 mb-5 font-medium">{breed.size} · {breed.lifespan}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">Temperament</div>
              <div className="font-bold text-gray-800">{breed.temperament.join(" · ")}</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Exercise Needs</div>
              <div className="font-bold text-gray-800">{breed.exercise}</div>
            </div>
            <div className="p-4 rounded-xl bg-pink-50 border border-pink-100">
              <div className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-1">Best With</div>
              <div className="font-bold text-gray-800">{breed.goodWith.join(", ")}</div>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <div className="text-xs font-bold uppercase tracking-wider text-green-600 mb-1">Price Range</div>
              <div className="font-bold text-gray-800">{breed.price}</div>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 mb-6">
            <div className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Grooming</div>
              <div className="font-bold text-gray-800">{breed.grooming}</div>
            </div>
            <div className="flex-1 border-l border-gray-300 pl-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Ideal Climate</div>
              <div className="font-bold text-gray-800 text-sm">{breed.climate}</div>
            </div>
          </div>

          <button 
            className="w-full py-4 rounded-xl text-white font-black text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            style={{ background: `linear-gradient(135deg, ${breed.color}, ${breed.color}dd)` }}
          >
            🐾 View Available {breed.name} Puppies →
          </button>
        </div>
      </div>
    </div>
  );
}
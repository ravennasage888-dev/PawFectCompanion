import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks";

interface Puppy {
  id: number;
  name: string;
  breed: string;
  age: string;
  gender: "Male" | "Female";
  price: number;
  image: string;
  location: string;
  market: "us" | "uk" | "ca";
  tags: string[];
  personality: string[];
  available: boolean;
}

const PUPPIES: Puppy[] = [
  { id: 1, name: "Max", breed: "Golden Retriever", age: "8 weeks", gender: "Male", price: 1250, image: "🐕", location: "Atlanta, GA", market: "us", tags: ["Vet Checked", "Vaccinated", "AKC Reg"], personality: ["Friendly", "Playful", "Smart"], available: true },
  { id: 2, name: "Bella", breed: "French Bulldog", age: "10 weeks", gender: "Female", price: 2800, image: "🐶", location: "Dallas, TX", market: "us", tags: ["Vet Checked", "Microchipped"], personality: ["Calm", "Loving", "Cuddly"], available: true },
  { id: 3, name: "Charlie", breed: "Labrador", age: "7 weeks", gender: "Male", price: 950, image: "🦮", location: "Chicago, IL", market: "us", tags: ["Vet Checked", "Vaccinated"], personality: ["Energetic", "Loyal", "Great with Kids"], available: true },
  { id: 4, name: "Winston", breed: "English Bulldog", age: "9 weeks", gender: "Male", price: 3500, image: "🐕‍🦺", location: "London, UK", market: "uk", tags: ["KC Reg", "Vet Checked", "5 Gen Pedigree"], personality: ["Dignified", "Gentle", "Courageous"], available: true },
  { id: 5, name: "Daisy", breed: "Beagle", age: "8 weeks", gender: "Female", price: 1100, image: "🐩", location: "Manchester, UK", market: "uk", tags: ["KC Reg", "Vaccinated"], personality: ["Cheerful", "Determined", "Friendly"], available: true },
  { id: 6, name: "Archie", breed: "Welsh Terrier", age: "10 weeks", gender: "Male", price: 1450, image: "🐕", location: "Edinburgh, UK", market: "uk", tags: ["KC Reg", "Vet Checked"], personality: ["Spirited", "Alert", "Loyal"], available: false },
  { id: 7, name: "Luna", breed: "Siberian Husky", age: "9 weeks", gender: "Female", price: 1650, image: "🐺", location: "Toronto, ON", market: "ca", tags: ["CKC Reg", "Winter-Coat", "Vet Checked"], personality: ["Adventurous", "Smart", "Playful"], available: true },
  { id: 8, name: "Thor", breed: "Alaskan Malamute", age: "8 weeks", gender: "Male", price: 1900, image: "🐕", location: "Calgary, AB", market: "ca", tags: ["CKC Reg", "Winter-Tough"], personality: ["Strong", "Loyal", "Affectionate"], available: true },
  { id: 9, name: "Nanook", breed: "Newfoundland", age: "10 weeks", gender: "Female", price: 2100, image: "🐻", location: "Vancouver, BC", market: "ca", tags: ["CKC Reg", "Water-Resistant Coat"], personality: ["Gentle Giant", "Patient", "Loving"], available: true },
];

const BREEDS = ["All Breeds", "Golden Retriever", "French Bulldog", "Labrador", "Bulldog", "Beagle", "Terrier", "Husky", "Malamute", "Newfoundland"];
const MARKETS_ALL = [{ id: "all", name: "All Countries", flag: "🌍" }, { id: "us", name: "USA", flag: "🇺🇸" }, { id: "uk", name: "UK", flag: "🇬🇧" }, { id: "ca", name: "Canada", flag: "🇨🇦" }];

export function BlogPreviewSection() {
  const [search, setSearch] = useState("");
  const [breed, setBreed] = useState("All Breeds");
  const [market, setMarket] = useState("all");
  const [maxPrice, setMaxPrice] = useState(5000);
  const debounced = useDebounce(search, 300);
  const [filtered, setFiltered] = useState(PUPPIES);

  useEffect(() => {
    let result = [...PUPPIES];
    if (market !== "all") result = result.filter(p => p.market === market);
    if (breed !== "All Breeds") result = result.filter(p => p.breed.toLowerCase().includes(breed.toLowerCase()));
    if (debounced) result = result.filter(p => 
      p.name.toLowerCase().includes(debounced.toLowerCase()) || 
      p.breed.toLowerCase().includes(debounced.toLowerCase())
    );
    result = result.filter(p => p.price <= maxPrice);
    setFiltered(result);
  }, [debounced, breed, market, maxPrice]);

  return (
    <div className="py-6">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "#ea580c" }}>✦ Available Now ✦</div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Meet Our Adorable Puppies</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Each puppy is raised with love, socialized from day one, and ready to become your new best friend.</p>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 mb-8 border border-orange-100">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 block">Search</label>
            <input 
              type="text" 
              placeholder="Search name or breed..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:ring-0 outline-none font-medium bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 block">Breed</label>
            <select 
              value={breed} 
              onChange={e => setBreed(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 outline-none font-medium bg-white"
            >
              {BREEDS.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 block">Country</label>
            <div className="flex gap-1 p-1 bg-white rounded-xl border-2 border-orange-200">
              {MARKETS_ALL.map(m => (
                <button 
                  key={m.id} 
                  onClick={() => setMarket(m.id)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    market === m.id ? "bg-orange-600 text-white shadow" : "text-gray-600 hover:bg-orange-50"
                  }`}
                >
                  {m.flag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 block">
              Max Price: <span className="text-orange-600">${maxPrice.toLocaleString()}</span>
            </label>
            <input 
              type="range" 
              min="500" 
              max="5000" 
              step="100" 
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-600 mt-3"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 font-medium">
          <span className="text-2xl font-black text-orange-600">{filtered.length}</span> puppy{filtered.length !== 1 ? "ies" : ""} available
        </p>
        <select className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium bg-white">
          <option>Sort: Featured</option>
          <option>Price: Low → High</option>
          <option>Price: High → Low</option>
          <option>Newest First</option>
        </select>
      </div>

      {/* Puppy Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="relative h-52 flex items-center justify-center text-8xl overflow-hidden"
                   style={{ background: `linear-gradient(135deg, ${p.gender === 'Male' ? '#dbeafe,#bfdbfe' : '#fce7f3,#fbcfe8'})` }}>
                <span className="group-hover:scale-110 transition-transform duration-500">{p.image}</span>
                {!p.available && (
                  <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                    <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-black text-lg transform -rotate-6">ON HOLD ❤️</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow">
                  {p.gender === 'Male' ? '♂️ Male' : '♀️ Female'}
                </div>
                <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-black shadow-lg">
                  ${p.price.toLocaleString()}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-2xl font-extrabold text-gray-900">{p.name}</h3>
                  <span className="text-xs">📍 {p.location}</span>
                </div>
                <p className="text-sm font-semibold mb-3" style={{ color: "#ea580c" }}>{p.breed} · {p.age}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.tags.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ {t}</span>
                  ))}
                </div>
                <div className="flex gap-1.5 mb-4">
                  {p.personality.map((t, i) => (
                    <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <button 
                  disabled={!p.available}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    p.available 
                      ? "text-white shadow-md hover:shadow-lg hover:brightness-110" 
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  style={p.available ? { background: "linear-gradient(135deg,#f97316,#ea580c)" } : {}}
                >
                  {p.available ? "❤️ Reserve " + p.name : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-orange-50 rounded-2xl">
          <div className="text-7xl mb-4">🐾</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No puppies match your filters</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or join our waitlist!</p>
          <button className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700">Join Waitlist</button>
        </div>
      )}
    </div>
  );
}
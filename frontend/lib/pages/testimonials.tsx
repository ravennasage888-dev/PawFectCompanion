import React from "react";

const ALL = [
  { name: "Sarah & Michael T.", loc: "Austin, TX 🇺🇸", puppy: "Cooper (Golden)", text: "From first email to pickup day, the team was incredible. Cooper came with his vet folder, food, blanket, and even a favorite toy. He's now 8 months, 55 lbs of pure joy, and our 3-year-old's best friend. Worth every penny.", rating: 5, days: "2 weeks ago" },
  { name: "Harrisons", loc: "London 🇬🇧", puppy: "Biscuit (English Bulldog)", text: "As first-time owners we were terrified. Pawfect educated us on EVERYTHING — diet, training, pet insurance, even Bulldog-specific wrinkle care. Biscuit is thriving and our whole family is obsessed. KC papers arrived promptly.", rating: 5, days: "1 month ago" },
  { name: "James & Élodie R.", loc: "Montréal 🇨🇦", puppy: "Nanook (Husky)", text: "We needed a winter-tough adventure buddy for our backcountry trips. Nanook was PERFECTLY matched. Pulled the kids on skis all winter, gentle as can be indoors. The Canadian team really understands northern climate needs.", rating: 5, days: "3 months ago" },
  { name: "Priya K.", loc: "Chicago 🇺🇸", puppy: "Lola (Frenchie)", text: "Apartment-living, single, first dog — I had so many concerns. They matched me with Lola, a calm blue fawn Frenchie who's the talk of my building. Flight nanny service was seamless; she was in my arms 3 hours after leaving the breeder.", rating: 5, days: "1 month ago" },
  { name: "Dr. Raj Patel", loc: "Manchester 🇬🇧", puppy: "Archie (Welsh Terrier)", text: "Medical professional here — I scrutinized their health guarantee and vet records line by line. IMPRESSIVE. Every vaccine, every deworming, every weight logged. Archie is robust, energetic, and his 12-month checkup was flawless.", rating: 5, days: "5 months ago" },
  { name: "The Okafor Family", loc: "Toronto 🇨🇦", puppy: "Maple (Lab)", text: "Maple joined our family of 5 in January. The temperament testing they do is REAL — she's patient with our toddler, playful with our teen, and calm with our senior cat. This isn't luck; it's science. Thank you Pawfect!", rating: 5, days: "7 months ago" },
];

export default function TestimonialsPage() {
  return (
    <div className="py-6">
      <div className="text-center mb-12">
        <div className="text-sm font-black tracking-[0.3em] uppercase mb-2" style={{ color: "#ea580c" }}>✦ Don't Take Our Word ✦</div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          <span style={{ color: "#ea580c" }}>5,000+</span> Happy Families & Counting
        </h1>
        <div className="flex justify-center items-center gap-2 text-2xl mb-2">
          {"⭐⭐⭐⭐⭐".split("").map((s, i) => <span key={i}>{s}</span>)}
          <span className="text-gray-700 font-bold ml-2 text-lg">4.9 / 5 · 1,247 verified reviews</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ALL.map((t, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col">
            <div className="text-yellow-400 mb-3">{"⭐".repeat(t.rating)}</div>
            <p className="text-gray-700 leading-relaxed flex-1 italic">"{t.text}"</p>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl"
                   style={{ background: i % 2 ? "#fed7aa" : "#fce7f3" }}>
                {["👩‍❤️‍👨","👨‍👩‍👧‍👦","🧑‍🤝‍🧑","👩","🧑🏾‍⚕️","👨‍👩‍👧‍👦"][i]}
              </div>
              <div className="flex-1">
                <div className="font-black text-gray-900 text-sm">{t.name}</div>
                <div className="text-xs text-gray-500">{t.loc} · 🐾 {t.puppy}</div>
              </div>
              <div className="text-[10px] text-gray-400">{t.days}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl p-10 text-center relative overflow-hidden"
           style={{ background: "linear-gradient(135deg,#1f2937,#111827)" }}>
        <div className="absolute inset-0 text-[200px] opacity-5 flex items-center justify-center select-none">🐾</div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3 relative z-10">Ready to write <em style={{ color: "#fb923c" }}>your</em> happy ending?</h2>
        <p className="text-gray-300 mb-6 relative z-10">Your perfect puppy is just a few clicks away.</p>
        <button className="px-10 py-4 text-white font-black text-lg rounded-2xl shadow-2xl relative z-10 hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
          🐶 Browse Available Puppies Now
        </button>
      </div>
    </div>
  );
}
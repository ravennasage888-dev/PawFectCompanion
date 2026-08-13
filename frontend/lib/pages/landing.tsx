import React, { Fragment } from "react";
import { GettingStartedSection } from "../components/getting-started-section";
import { BlogPreviewSection } from "../components/blog-preview-section";
import { BlogHeader } from "../components/blog-header";

const TESTIMONIALS = [
  {
    name: "Sarah & Michael T.",
    location: "Austin, Texas 🇺🇸",
    puppy: "Cooper (Golden Retriever)",
    text: "Bringing Cooper home was the best decision we ever made! The team at Pawfect Companions was there every step — from our first inquiry to pick-up day. He's healthy, happy, and the absolute center of our world. 10/10 would recommend to anyone!",
    rating: 5,
    photo: "👩‍❤️‍👨",
    date: "2 weeks ago",
  },
  {
    name: "The Harrison Family",
    location: "London, UK 🇬🇧",
    puppy: "Biscuit (English Bulldog)",
    text: "As first-time dog owners, we were nervous. Pawfect Companions educated us on everything Bulldog — from diet to exercise to those adorable wrinkles! Biscuit is thriving and our kids absolutely adore him. KC papers, vet records, everything perfect.",
    rating: 5,
    photo: "👨‍👩‍👧‍👦",
    date: "1 month ago",
  },
  {
    name: "James & Élodie R.",
    location: "Montréal, Canada 🇨🇦",
    puppy: "Nanuk (Siberian Husky)",
    text: "We needed a winter-tough companion for our outdoor adventures. Nanuk has exceeded every expectation! He pulled our kids on sleds all winter and is gentle as can be. The Canadian breeding program is outstanding — thank you Pawfect!",
    rating: 5,
    photo: "🧑‍🤝‍🧑",
    date: "3 months ago",
  },
  {
    name: "Priya K.",
    location: "Chicago, Illinois 🇺🇸",
    puppy: "Lola (French Bulldog)",
    text: "Lola is my first baby and I couldn't be happier! The virtual meet-and-greet was so personal, I felt connected before she even arrived. She flew in safe and sound, and has been the light of my life. Apartment living perfection!",
    rating: 5,
    photo: "👩",
    date: "1 month ago",
  },
];

const STEPS = [
  { num: "01", title: "Browse & Fall in Love", desc: "Explore our available puppies and find the one that tugs at your heartstrings.", icon: "🔍" },
  { num: "02", title: "Reserve Your Puppy", desc: "Submit an application, pay your deposit, and schedule your virtual or in-person visit.", icon: "📝" },
  { num: "03", title: "We Prepare Them", desc: "Final vet check, vaccinations, microchip, and plenty of love from our socialization team.", icon: "💉" },
  { num: "04", title: "Welcome Home!", desc: "Pick up at our facility or use our safe door-to-door flight nanny service. Forever starts now!", icon: "🏠❤️" },
];

function LandingPage() {
  return (
    <Fragment>
      {/* HERO */}
      <GettingStartedSection siteHasPublications={true} />

      {/* HOW IT WORKS */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "#ea580c" }}>✦ Simple 4-Step Process ✦</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Your Journey to <span style={{ color: "#ea580c" }}>Puppy Parenthood</span></h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <div key={s.num} className="relative p-6 rounded-2xl bg-white border-2 border-orange-100 hover:border-orange-400 hover:shadow-xl transition-all group">
              <div className="absolute -top-4 left-6 text-5xl font-black opacity-10 group-hover:opacity-20 transition-opacity" style={{ color: "#ea580c" }}>{s.num}</div>
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 text-2xl text-orange-300 font-bold">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PUPPIES GRID */}
      <BlogPreviewSection />

      {/* BREED INFO */}
      <BlogHeader />

      {/* TESTIMONIALS */}
      <section className="my-16 py-14 rounded-3xl relative overflow-hidden"
               style={{ background: "linear-gradient(135deg,#fff7ed,#ffedd5)" }}>
        <div className="absolute top-5 right-10 text-8xl opacity-10">💬</div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "#ea580c" }}>✦ Happy Families ✦</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">Real Stories. <span style={{ color: "#ea580c" }}>Real Love.</span></h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">Don't just take our word for it — hear from families whose lives changed forever.</p>
            <div className="flex justify-center gap-1 mt-4 text-3xl">
              {"⭐⭐⭐⭐⭐".split("").map((s, i) => <span key={i}>{s}</span>)}
              <span className="ml-3 text-gray-700 font-bold self-center text-lg">4.9/5 from 1,247 families</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition-all border border-orange-100">
                <div className="text-yellow-400 text-xl mb-3">{"⭐".repeat(t.rating)}</div>
                <p className="text-gray-700 leading-relaxed mb-5 text-lg italic">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-3xl">{t.photo}</div>
                  <div className="flex-1">
                    <div className="font-extrabold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.location}</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: "#ea580c" }}>🐾 {t.puppy}</div>
                  </div>
                  <div className="text-xs text-gray-400">{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mb-10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
               style={{ background: "linear-gradient(135deg,#1f2937,#111827)" }}>
        <div className="absolute inset-0 opacity-10 text-[200px] flex items-center justify-center select-none">🐾</div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Find Your <span style={{ color: "#fb923c" }}>New Best Friend?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Your perfect companion is just a click away. Our team is standing by to help match you with the puppy of your dreams.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-10 py-4 text-white font-black text-lg rounded-2xl shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 transition-all"
                    style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
              🐶 Start My Puppy Search
            </button>
            <button className="px-10 py-4 bg-white/10 backdrop-blur border-2 border-white/30 text-white font-black text-lg rounded-2xl hover:bg-white/20 transition-all">
              📧 Email Us: hello@pawfectcompanions.com
            </button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-10 text-sm text-gray-400">
            <span>📞 +1 (555) PAW-FECT</span>
            <span>🇺🇸 US · 🇬🇧 UK · 🇨🇦 CA Shipping</span>
            <span>⏰ 7 Days / Week Support</span>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export { LandingPage as default };
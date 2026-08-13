import React from "react";
import { Card } from "flowbite-react";

export default function AboutPage() {
  const values = [
    { icon: "❤️", title: "Ethical Breeding", desc: "We partner only with vetted, USDA-licensed breeders who meet our strict welfare standards." },
    { icon: "🏥", title: "Health First", desc: "Every puppy gets 3 vet exams, vaccinations, deworming, microchip & 10-yr genetic guarantee." },
    { icon: "👨‍👩‍👧‍👦", title: "Family-Matched", desc: "We screen every family to ensure each puppy goes to the PERFECT forever home." },
    { icon: "🌍", title: "3-Country Reach", desc: "Trusted local teams in the US, UK, and Canada — never ships cargo hold." },
    { icon: "📞", title: "Lifetime Support", desc: "Our vets & trainers are just a call away — for the entire life of your dog." },
    { icon: "🔒", title: "100% Transparent", desc: "See parent photos, health clearances, pedigree, and breeder info BEFORE you pay." },
  ];
  const team = [
    { name: "Dr. Sarah Chen", role: "Chief Veterinary Officer", photo: "👩‍⚕️" },
    { name: "Marcus Williams", role: "Head of Breeder Relations", photo: "🧑🏾" },
    { name: "Emma Thompson", role: "Adoption Counselor Lead", photo: "👩🏼" },
    { name: "You / CEO", role: "Founder & Visionary", photo: "👑" },
  ];
  return (
    <div className="py-6">
      <div className="rounded-3xl p-10 md:p-16 mb-10 text-center relative overflow-hidden"
           style={{ background: "linear-gradient(135deg,#fff7ed,#ffedd5)" }}>
        <div className="absolute top-6 right-10 text-8xl opacity-15">🐾</div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Our Mission: <span style={{ color: "#ea580c" }}>Every Tail, a Home</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Founded on the belief that every puppy deserves a loving, responsible forever family — 
          and every family deserves a healthy, well-socialized companion. We're not just selling dogs; 
          we're <strong>matching souls</strong>.
        </p>
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-center mb-8">Our <span style={{ color: "#ea580c" }}>Core Values</span></h2>
      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {values.map(v => (
          <Card key={v.title} className="border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 p-6">
            <div className="text-4xl mb-3">{v.icon}</div>
            <h3 className="text-xl font-black text-gray-900 mb-2">{v.title}</h3>
            <p className="text-gray-600 leading-relaxed">{v.desc}</p>
          </Card>
        ))}
      </div>

      <div className="bg-gray-900 text-white rounded-3xl p-10 md:p-14 mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-10">Meet the <span style={{ color: "#fb923c" }}>Pawfect Team</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map(t => (
            <div key={t.name} className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-white/10 flex items-center justify-center text-5xl mb-3 border-2 border-orange-500/30">{t.photo}</div>
              <div className="font-black">{t.name}</div>
              <div className="text-orange-400 text-sm font-semibold">{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 text-center">
        {[
          { n: "5,000+", l: "Puppies Placed" },
          { n: "98%", l: "5-Star Reviews" },
          { n: "3", l: "Countries Served" },
          { n: "10 yrs", l: "Health Guarantee" },
        ].map(s => (
          <div key={s.l} className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
            <div className="text-4xl font-black mb-1" style={{ color: "#ea580c" }}>{s.n}</div>
            <div className="text-sm font-semibold text-gray-700">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Badge, Label, TextInput, Textarea } from "flowbite-react";
import { useApi } from "../api";
import { FullScreenLoading } from "../components/full-screen-loading";

function PuppyDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getPublication } = useApi();
  const [loading, setLoading] = useState(true);
  const [puppy, setPuppy] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // In production: fetch from /api/puppies/{slug}
    setTimeout(() => {
      setPuppy({
        name: "Max", breed: "Golden Retriever", age: "8 weeks", gender: "Male",
        price: 1250, location: "Atlanta, GA", market: "🇺🇸 USA",
        personality: ["Friendly", "Playful", "Smart", "Great with Kids"],
        tags: ["Vet Checked ✓", "Vaccinated ✓", "Dewormed ✓", "Microchipped ✓", "AKC Registered"],
        description: "Max is the sweetest boy with a gorgeous golden coat and soulful eyes. He loves belly rubs, chasing balls, and napping at your feet. Raised in our home with our 3 kids, he's perfectly socialized and ready to bond with his forever family. Max will come with his first vet check, 3 rounds of vaccines, microchip, health guarantee, and a puppy pack with food, blanket, and toys.",
        health: { vaccinated: true, vet_checked: true, dewormed: true, microchipped: true, guarantee: "10-year genetic health guarantee" },
        parents: { mom: "Luna — 65 lbs, OFA certified hips", dad: "Rusty — 72 lbs, show champion lineage" },
      });
      setLoading(false);
    }, 400);
  }, [slug]);

  const submitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    // POST to /api/inquiries/
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  if (loading) return <FullScreenLoading />;
  if (!puppy) return <div className="text-center py-20">Puppy not found 😢</div>;

  return (
    <main className="py-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-orange-600 font-bold hover:underline">← Back to all puppies</button>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* LEFT: Photo + Info */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="h-96 flex items-center justify-center text-[200px] relative"
                 style={{ background: "linear-gradient(135deg,#fde68a,#fed7aa)" }}>
              🐕
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-sm font-black shadow">
                {puppy.market}
              </div>
              <div className="absolute top-5 right-5 bg-orange-600 text-white px-5 py-2 rounded-full text-xl font-black shadow-lg">
                ${puppy.price.toLocaleString()}
              </div>
            </div>
          </Card>

          <div className="bg-white rounded-2xl shadow p-6 md:p-8 border border-gray-100">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                {puppy.gender === "Male" ? "♂ Male" : "♀ Female"}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">{puppy.age}</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">{puppy.breed}</span>
              <span className="text-gray-500 text-sm">📍 {puppy.location}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Meet {puppy.name} 🥰</h1>
            <p className="text-gray-700 leading-relaxed text-lg">{puppy.description}</p>
          </div>

          {/* Personality */}
          <div className="bg-white rounded-2xl shadow p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-black mb-4">Personality Traits</h2>
            <div className="flex flex-wrap gap-2">
              {puppy.personality.map((t: string) => (
                <span key={t} className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-bold">{t}</span>
              ))}
            </div>
          </div>

          {/* Health */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border border-green-100">
            <h2 className="text-2xl font-black mb-5 text-green-800">🏥 Health & Vaccinations</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(puppy.health).map(([k, v]) => (
                <div key={k} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="capitalize font-semibold text-gray-800 text-sm">
                    {k.replace("_", " ")}: <span className="text-gray-600 font-normal">{String(v)}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Inquiry Form STICKY */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24 space-y-5">
            <Card className="shadow-xl border-0 p-6">
              <div className="text-center mb-5">
                <div className="text-4xl mb-1">❤️</div>
                <h2 className="text-2xl font-black text-gray-900">Inquire About {puppy.name}</h2>
                <p className="text-sm text-gray-500">Serious inquiries only. We respond within 24 hours.</p>
              </div>

              {submitted ? (
                <div className="bg-green-100 border border-green-300 text-green-800 p-5 rounded-xl text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <div className="font-black text-lg">Application Sent!</div>
                  <p className="text-sm mt-1">We'll email you within 24 hours about {puppy.name}.</p>
                </div>
              ) : (
                <form onSubmit={submitInquiry} className="space-y-4">
                  <div>
                    <Label htmlFor="name" value="Your Full Name" className="mb-1 block" />
                    <TextInput id="name" sizing="lg" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <Label htmlFor="email" value="Email Address" className="mb-1 block" />
                    <TextInput id="email" type="email" sizing="lg" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone" value="Phone Number" className="mb-1 block" />
                    <TextInput id="phone" type="tel" sizing="lg" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="msg" value="Tell us about your home" className="mb-1 block" />
                    <Textarea id="msg" rows={4} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Do you own a home? Have kids or other pets? Previous dog experience? Why do you want this puppy?" />
                  </div>
                  <Button type="submit" size="lg" className="w-full font-black text-white py-3 text-base"
                          style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", border: "none" }}>
                    ❤️ Apply to Adopt {puppy.name}
                  </Button>
                  <p className="text-[11px] text-center text-gray-500">
                    Submitting does not guarantee adoption. We screen all families to ensure perfect matches.
                  </p>
                </form>
              )}
            </Card>

            <div className="bg-white rounded-2xl p-5 shadow border border-gray-100 text-sm space-y-2">
              <div className="font-black text-gray-900 mb-2">📦 What's Included:</div>
              <div>✓ First vet exam & health certificate</div>
              <div>✓ Up-to-date vaccinations & deworming</div>
              <div>✓ Microchip with lifetime registration</div>
              <div>✓ AKC / KC / CKC registration papers</div>
              <div>✓ 10-year genetic health guarantee</div>
              <div>✓ Puppy starter pack (food, toys, blanket)</div>
              <div>✓ Lifetime breeder support</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export { PuppyDetailPage as default };
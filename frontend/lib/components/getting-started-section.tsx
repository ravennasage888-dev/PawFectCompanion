import React, { useState } from "react";
import { Button, Card } from "flowbite-react";

interface Props {
  siteHasPublications: boolean;
}

const MARKETS = [
  { id: "us", name: "United States", flag: "🇺🇸", tagline: "Midwest Mutts · Southern Pups", breeds: "Golden Retrievers, Labs, French Bulldogs" },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", tagline: "Pedigree & British Heritage", breeds: "Beagles, Bulldogs, Terriers, Corgis" },
  { id: "ca", name: "Canada", flag: "🇨🇦", tagline: "Winter-Tough & Adventure Ready", breeds: "Huskies, Malamutes, Newfoundlands" },
];

export function GettingStartedSection(props: Props) {
  const [activeMarket, setActiveMarket] = useState("us");
  const market = MARKETS.find(m => m.id === activeMarket)!;

  return (
    <div className="relative overflow-hidden rounded-3xl mb-10 shadow-xl">
      {/* Background with dog overlay */}
      <div className="absolute inset-0" style={{ 
        background: "linear-gradient(135deg,#fff7ed 0%,#ffedd5 40%,#fed7aa 100%)" 
      }}>
        <div className="absolute -right-10 -bottom-10 text-[280px] opacity-20 select-none">🐕</div>
        <div className="absolute right-40 top-10 text-7xl opacity-30 animate-bounce">🦴</div>
        <div className="absolute left-10 bottom-20 text-5xl opacity-25">🐾</div>
      </div>

      <div className="relative z-10 p-8 md:p-14 grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-3">
          {/* Market Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {MARKETS.map(m => (
              <button
                key={m.id}
                onClick={() => setActiveMarket(m.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeMarket === m.id 
                    ? "bg-orange-600 text-white shadow-lg scale-105" 
                    : "bg-white/70 text-gray-700 hover:bg-white border border-orange-200"
                }`}
              >
                {m.flag} {m.name}
              </button>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-5">
            Find Your <span className="relative">
              <span className="relative z-10" style={{ color: "#ea580c" }}>Perfect</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/60 -z-0 rounded"></span>
            </span><br/>
            Furry Friend <span className="text-5xl md:text-6xl">🐶</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-3 font-medium">
            {market.tagline}
          </p>
          <p className="text-gray-600 mb-8 max-w-xl leading-relaxed">
            Healthy, happy, and ethically-raised puppies waiting to meet their forever families. 
            <strong className="text-orange-700"> Every puppy comes vet-checked, vaccinated, and with a lifetime of love.</strong>
          </p>

          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg"
              className="text-white font-bold px-8 py-4 text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all rounded-xl"
              style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", border: "none" }}
            >
              🐾 Browse Available Puppies
            </Button>
            <Button 
              size="lg" 
              color="gray"
              className="font-bold px-8 py-4 text-base bg-white border-2 border-orange-300 text-orange-700 hover:bg-orange-50 rounded-xl"
            >
              ▶️ How It Works
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-10 pt-6 border-t border-orange-200/50">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600 text-xl">✓</span>
              <span className="font-semibold">Vet Checked</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600 text-xl">✓</span>
              <span className="font-semibold">10-Year Health Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600 text-xl">✓</span>
              <span className="font-semibold">{market.name} Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600 text-xl">✓</span>
              <span className="font-semibold">AKC / KC Registered</span>
            </div>
          </div>
        </div>

        {/* Featured Puppy Card */}
        <div className="md:col-span-2">
          <Card className="shadow-2xl border-0 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="h-56 flex items-center justify-center text-9xl relative"
                 style={{ background: "linear-gradient(135deg,#fde68a,#fcd34d)" }}>
              <span className="animate-pulse">🐕</span>
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                NEW!
              </div>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-700">
                {market.flag} {market.name}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-extrabold text-gray-900">Meet Max</h3>
                <span className="text-2xl font-black" style={{ color: "#ea580c" }}>$1,250</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">Golden Retriever · Male · 8 weeks</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Vet Checked ✓</span>
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Vaccinated</span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Dewormed</span>
              </div>
              <Button className="w-full font-bold text-white rounded-lg"
                      style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", border: "none" }}>
                ❤️ Inquire About Max
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
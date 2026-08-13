import React, { useEffect, useState } from "react";
import { BlogPreviewSection } from "../components/blog-preview-section";
import { BlogHeader } from "../components/blog-header";

function PuppiesPage() {
  return (
    <div className="py-4">
      {/* Hero banner */}
      <div className="rounded-3xl p-8 md:p-12 mb-8 text-center relative overflow-hidden"
           style={{ background: "linear-gradient(135deg,#fff7ed,#ffedd5)" }}>
        <div className="absolute top-4 right-8 text-7xl opacity-20">🐕</div>
        <div className="absolute bottom-4 left-8 text-5xl opacity-20">🐾</div>
        <div className="relative z-10">
          <div className="text-xs font-black tracking-[0.3em] uppercase mb-2" style={{ color: "#ea580c" }}>✦ All Our Puppies ✦</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Every Puppy <span style={{ color: "#ea580c" }}>Loved & Ready</span></h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Vet-checked, vaccinated, microchipped, and socialized with children and other pets. Your new best friend is waiting.
          </p>
        </div>
      </div>

      <BlogPreviewSection />
      <BlogHeader />
    </div>
  );
}
export { PuppiesPage as default };
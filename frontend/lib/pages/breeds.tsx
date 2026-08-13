import React from "react";
import { BlogHeader } from "../components/blog-header";
export default function BreedsPage() {
  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Breed <span style={{ color: "#ea580c" }}>Encyclopedia</span> 📚
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          From tiny apartment companions to large adventure partners. Learn temperaments, exercise needs, grooming, and which breed fits YOUR lifestyle.
        </p>
      </div>
      <BlogHeader />
    </div>
  );
}
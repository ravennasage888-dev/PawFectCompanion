import React, { useState } from "react";
import { Button, Label, TextInput, Textarea, Select, Alert } from "flowbite-react";
import { useApi } from "../api";

export default function ContactPage() {
  const { submitInquiry } = useApi();
  const [f, setF] = useState({ name: "", email: "", phone: "", market: "US", subject: "General", message: "" });
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitInquiry(f);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setF({ ...f, name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="py-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Let's Find Your <span style={{ color: "#ea580c" }}>Pawfect Match</span> 🐾
        </h1>
        <p className="text-gray-600 text-lg">Questions about a puppy? Want a custom recommendation? Real humans answer — usually within hours.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {sent && <Alert color="success" className="mb-5">🎉 Message sent! We'll reply within 24 hours.</Alert>}
          <form onSubmit={submit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Full Name *</Label><TextInput required value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Jane Smith" /></div>
              <div><Label>Email *</Label><TextInput type="email" required value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Phone</Label><TextInput value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} placeholder="+1 (555) 123-4567" /></div>
              <div><Label>Your Country *</Label>
                <Select required value={f.market} onChange={e => setF({ ...f, market: e.target.value })}>
                  <option value="US">🇺🇸 United States</option>
                  <option value="UK">🇬🇧 United Kingdom</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="OTHER">🌍 Other</option>
                </Select>
              </div>
            </div>
            <div><Label>How can we help?</Label>
              <Select value={f.subject} onChange={e => setF({ ...f, subject: e.target.value })}>
                <option>General Question</option>
                <option>Puppy Availability</option>
                <option>Breed Recommendation</option>
                <option>Shipping / Delivery</option>
                <option>Pricing / Payment Plans</option>
                <option>Breeder Partnership</option>
                <option>Press / Media</option>
              </Select>
            </div>
            <div><Label>Your Message *</Label>
              <Textarea rows={5} required value={f.message} onChange={e => setF({ ...f, message: e.target.value })}
                placeholder="Tell us about your lifestyle, family, experience with dogs, and what you're looking for in a companion..." />
            </div>
            <Button type="submit" size="lg" className="w-full font-black py-3 text-white text-base"
                    style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", border: "none" }}>
              📤 Send My Message
            </Button>
          </form>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-xl">
            <div className="text-3xl mb-2">📞</div>
            <div className="font-black text-lg">Call Us</div>
            <div className="text-orange-100 text-sm mb-3">Mon–Sat, 9am–8pm local</div>
            <div className="font-bold">🇺🇸 +1 (555) PAW-FECT</div>
            <div className="font-bold">🇬🇧 +44 20 PAW-FECT</div>
            <div className="font-bold">🇨🇦 +1 (416) PAW-FECT</div>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow border border-gray-100">
            <div className="text-3xl mb-2">✉️</div>
            <div className="font-black text-lg text-gray-900">Email</div>
            <div className="text-orange-600 font-bold">hello@pawfectcompanions.com</div>
            <div className="text-xs text-gray-500 mt-2">Avg reply: <strong>4 hours</strong></div>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow border border-gray-100">
            <div className="text-3xl mb-2">📍</div>
            <div className="font-black text-lg text-gray-900">Headquarters</div>
            <div className="text-gray-600 text-sm">123 Puppy Lane<br/>Atlanta, GA 30303<br/>🇺🇸 United States</div>
          </div>
        </div>
      </div>
    </div>
  );
}
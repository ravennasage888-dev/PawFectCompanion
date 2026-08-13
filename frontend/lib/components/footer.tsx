import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

const MARKETS = [
  { flag: "🇺🇸", name: "United States", href: "/puppies?market=US" },
  { flag: "🇬🇧", name: "United Kingdom", href: "/puppies?market=UK" },
  { flag: "🇨🇦", name: "Canada", href: "/puppies?market=CA" },
];

const COMPANY = [
  { label: "About Us", to: ROUTES.ABOUT },
  { label: "Our Breeds", to: ROUTES.BREEDS },
  { label: "Testimonials", to: ROUTES.TESTIMONIALS },
  { label: "Contact", to: ROUTES.CONTACT },
];

const LEGAL = [
  { label: "Privacy Policy", to: "/legal/privacy" },
  { label: "Terms of Service", to: "/legal/terms" },
  { label: "Refund Policy", to: "/legal/refund" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-16 border-t border-gray-200"
      style={{ background: "linear-gradient(180deg,#fff7ed 0%,#fff 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to={ROUTES.LANDING_PAGE} className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-xl text-white shadow-md"
                style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}
              >
                🐾
              </span>
              <span className="text-xl font-black tracking-tight text-gray-900">
                Pawfect <span style={{ color: "#ea580c" }}>Companions</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed mb-5">
              Find your perfect furry friend. Healthy, ethically-raised puppies with
              10-year health guarantees, lifetime breeder support, and loving homes
              guaranteed across the US, UK, and Canada.
            </p>
            <div className="flex gap-3">
              {["📘","📷","🐦","📺"].map((i, k) => (
                <a
                  key={k}
                  href="#"
                  className="h-9 w-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 transition"
                  aria-label="social"
                >
                  {i}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.15em] text-gray-500 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {COMPANY.map(c => (
                <li key={c.to}>
                  <Link
                    to={c.to}
                    className="text-sm text-gray-700 hover:text-orange-600 font-medium transition"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.15em] text-gray-500 mb-4">
              Our Markets
            </h4>
            <ul className="space-y-2">
              {MARKETS.map(m => (
                <li key={m.href}>
                  <a
                    href={m.href}
                    className="text-sm text-gray-700 hover:text-orange-600 font-medium transition flex items-center gap-2"
                  >
                    <span>{m.flag}</span> {m.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.15em] text-gray-500 mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {LEGAL.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-700 hover:text-orange-600 font-medium transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={ROUTES.LOGIN}
                  className="text-sm text-gray-500 hover:text-orange-600 font-medium transition"
                >
                  🔐 Staff Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            {[
              "🏥 AKC / KC / CKC Registered",
              "✅ 10-Year Health Guarantee",
              "✈️ Nanny Flight Service",
              "🔒 Secure Payments",
              "💳 PCI DSS Compliant",
            ].map(b => (
              <span
                key={b}
                className="px-3 py-1.5 rounded-full bg-white border border-gray-200 font-semibold"
              >
                {b}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            © {year} Pawfect Companions. All rights reserved. Made with ❤️ for dogs everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}

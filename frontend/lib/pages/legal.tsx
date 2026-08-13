import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ROUTES } from "../routes";

type LegalType = "privacy" | "terms" | "refund";

const CONTENT: Record<
  LegalType,
  { eyebrow: string; title: string; intro: string; sections: { h: string; p: string }[] }
> = {
  privacy: {
    eyebrow: "🔒 Legal",
    title: "Privacy Policy",
    intro:
      "Pawfect Companions is committed to protecting your privacy. This policy explains what personal data we collect, how we use it, and your rights over it.",
    sections: [
      {
        h: "Information we collect",
        p: "When you submit a puppy inquiry or newsletter signup we collect your name, email address, phone number, country, city, and any lifestyle information you voluntarily provide in your message (home type, pets, children, prior dog experience). Payment data is processed by Stripe — we never see or store full card numbers.",
      },
      {
        h: "How we use your information",
        p: "To process and evaluate your adoption application, communicate with you about available puppies, send new-puppy alerts if you subscribed, comply with legal obligations, and improve our service. We do not sell your data to third parties.",
      },
      {
        h: "Data sharing",
        p: "Your inquiry details are shared only with the assigned breeder facilitating your adoption and our CEO for quality assurance. Aggregated anonymized statistics may be used internally.",
      },
      {
        h: "Your rights",
        p: "Under GDPR (UK/EU), CCPA/CPRA (California), and PIPEDA (Canada) you may request access, correction, deletion, or export of your personal data. Email privacy@pawfectcompanions.com — we respond within 30 days.",
      },
      {
        h: "Cookies & analytics",
        p: "We use only essential session cookies plus optional Google Analytics 4 for anonymized traffic measurement. You can disable analytics via your browser's Do Not Track setting.",
      },
      {
        h: "Retention",
        p: "Inquiry records are retained for 7 years for consumer-protection compliance. Subscribers remain on the list until they unsubscribe via the one-click link in every alert email.",
      },
    ],
  },
  terms: {
    eyebrow: "📜 Legal",
    title: "Terms of Service",
    intro:
      "These terms govern your use of pawfectcompanions.com and any puppy adoption facilitated through the site. By submitting an inquiry you agree to be bound by them.",
    sections: [
      {
        h: "Adoption contract",
        p: "Placing a deposit creates a binding adoption agreement. Puppies remain the exclusive property of Pawfect Companions and our partner breeders until 100% of the purchase price is paid and pickup / handoff is complete.",
      },
      {
        h: "Pricing & payments",
        p: "Prices published on the site at the moment your deposit is received are honored. Deposits are typically 30–40% of the total price and are deducted from the final balance. The CEO reserves the right to adjust prices for unpublished puppies.",
      },
      {
        h: "Health guarantee",
        p: "Every puppy is covered by a 10-year genetic health guarantee against hip dysplasia, elbow dysplasia, and over 30 other heritable conditions. Full terms are provided in the individual adoption contract and vary slightly by breed.",
      },
      {
        h: "Deposits",
        p: "Deposits are non-refundable to compensate the breeder for taking the puppy off the market. They are, however, transferable one time to any other available puppy within 12 months should your circumstances change.",
      },
      {
        h: "Shipping & delivery",
        p: "US customers: ground transport or flight nanny. UK: personal collection or approved pet courier. Canada: same. We never ship puppies in the cargo hold — every puppy travels accompanied.",
      },
      {
        h: "Governing law",
        p: "US customers: State of Georgia. UK customers: England & Wales. Canadian customers: Province of Ontario. Disputes will first be attempted via mediation before any court filing.",
      },
    ],
  },
  refund: {
    eyebrow: "💰 Legal",
    title: "Refund & Return Policy",
    intro:
      "Because every puppy is a living, sentient being, our policy is different from ordinary e-commerce. Here is exactly what is covered.",
    sections: [
      {
        h: "72-hour vet guarantee",
        p: "Take your new puppy to any licensed veterinarian within 72 hours of pickup. If the vet diagnoses a life-threatening congenital condition, you may return the puppy for a full 100% refund OR accept a replacement puppy of equivalent value — your choice.",
      },
      {
        h: "10-year genetic guarantee",
        p: "If a covered hereditary condition is diagnosed by a board-certified veterinary specialist in years 1–10, we issue a 100% credit toward a future companion puppy. Cash refunds are not available under this clause.",
      },
      {
        h: "Deposits",
        p: "Deposits are non-refundable once the puppy is marked Reserved in our system. They are transferable once to another puppy within 12 months. No exceptions — reserving a puppy turns away other qualified families.",
      },
      {
        h: "Circumstance-based returns",
        p: "If within 14 days of adoption a genuine, documented medical or housing emergency makes keeping the puppy impossible, we will accept return and issue a 70% credit toward a future puppy (30% covers our re-homing costs).",
      },
      {
        h: "Our commitment to every puppy",
        p: "At any point in the dog's life, for any reason, if you cannot keep them, we require you to contact us first. We will always take a Pawfect puppy back — no judgment, no questions asked. This is our lifetime breeder guarantee.",
      },
      {
        h: "How to request",
        p: "Email refunds@pawfectcompanions.com with your full name, puppy name, adoption date, and reason. We acknowledge every request within 48 hours and resolve within 14 business days.",
      },
    ],
  },
};

export default function LegalPage() {
  const { type } = useParams<{ type: string }>();
  const data = CONTENT[type as LegalType];
  if (!data) return <Navigate to={ROUTES.LANDING_PAGE} replace />;

  return (
    <div className="py-6 max-w-3xl mx-auto">
      <Link
        to={ROUTES.LANDING_PAGE}
        className="inline-flex items-center gap-1 text-sm font-bold mb-6 hover:underline"
        style={{ color: "#ea580c" }}
      >
        ← Back to home
      </Link>

      <div className="text-xs font-black tracking-[0.25em] uppercase mb-2" style={{ color: "#ea580c" }}>
        {data.eyebrow}
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
        {data.title}
      </h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: January 1, 2026</p>

      <p className="text-lg text-gray-700 leading-relaxed mb-10">{data.intro}</p>

      <div className="space-y-10">
        {data.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-black text-gray-900 mb-3 flex items-center gap-3">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm text-white font-bold"
                style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}
              >
                {i + 1}
              </span>
              {s.h}
            </h2>
            <p className="text-gray-700 leading-relaxed pl-11">{s.p}</p>
          </section>
        ))}
      </div>

      <div className="mt-14 p-6 rounded-2xl border border-orange-200 bg-orange-50">
        <p className="text-sm text-gray-700">
          <strong>Questions about these terms?</strong> Email{" "}
          <a href="mailto:legal@pawfectcompanions.com" className="font-bold" style={{ color: "#ea580c" }}>
            legal@pawfectcompanions.com
          </a>{" "}
          — a real human replies, usually within one business day.
        </p>
      </div>
    </div>
  );
}

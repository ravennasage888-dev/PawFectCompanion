# 🐾 Pawfect Companions

> **Find Your Perfect Furry Friend**

A premium, multi-country (US/UK/CA) puppy marketplace built with **Django 5 + React 18 + TypeScript**. Connects loving families with ethically-raised, healthy puppies from responsible breeders.

## ✨ Key Features

### For Customers (Public)
- 🐶 **Browse Puppies** — Filter by breed, price, age, gender, country, personality
- 🔍 **Smart Search** — Debounced search across name, breed, location
- 📚 **Breed Encyclopedia** — Detailed profiles with temperament, exercise, grooming, climate match
- 💌 **Submit Inquiries** — Application form with lifestyle questionnaire per puppy
- 📰 **Puppy Alerts** — Newsletter subscription by country
- ⭐ **Happy Families** — Verified testimonials from US/UK/CA
- 🇺🇸 🇬🇧 🇨🇦 **Market-Specific Experiences** — Each country gets tailored breeds & content

### For Admin / CEO / Creator (🔐 Role-Based Access)
- 🎛️ **Full Admin Dashboard** — KPIs, revenue, inquiry volume at a glance
- ➕ **Puppy CRUD** — Add/edit/delete puppies with photos, health records, pricing
- 💰 **Price Control** — ONLY CEO can change prices (staff see read-only)
- 📋 **Inquiry Pipeline** — Status flow: New → Contacted → Interviewed → Approved → Completed
- 👥 **User Management** — Assign inquiries to staff; staff see only their assigned leads
- 📊 **CSV Export** — Export inquiries/subscribers for marketing
- 🔒 **Field-Level Permissions** — Staff can't see `admin_notes` or change status without CEO role
- 🗑️ **Delete Protection** — Only superuser can permanently delete records

## 🛠️ Stack
**Frontend**: React 18 · TypeScript · Webpack 5 · Tailwind 3 · Flowbite React  
**Backend**: Django 5 · DRF · Poetry · PostgreSQL  
**Media**: Cloudinary CDN  
**DevOps**: Docker · GitHub Actions (5 deploy workflows)  
**Auth**: Token-based (DRF authtoken) + Django Permissions Framework

## 🚀 Quick Start
```bash
pnpm run bootstrap       # Install all deps
pnpm dev:full            # DB + Backend (:8000) + Frontend (:4000)
# Default CEO Admin: admin@pawfectcompanions.com / changeme
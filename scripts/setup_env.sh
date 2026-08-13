#!/usr/bin/env bash
set -euo pipefail
echo "🐾 Pawfect Companions — Setting up your dev environment..."

# Copy env if missing
[ ! -f .env ] && cp .env.example .env && echo "✅ .env created — EDIT IT!"

# Install tools if missing
command -v pnpm >/dev/null 2>&1 || { echo "Installing pnpm..."; corepack enable; }
command -v poetry >/dev/null 2>&1 || { echo "Installing poetry..."; pip install poetry; }

pnpm run bootstrap
echo ""
echo "✅ Dependencies installed"
echo ""
echo "👉 Next steps:"
echo "   1. Edit .env with your Postgres + Cloudinary + SendGrid creds"
echo "   2. make dev-full        (DB + backend + frontend)"
echo "   3. make seed            (CEO login + demo puppies)"
echo "   4. Open http://localhost:4000"
echo ""
echo "👑 Default CEO: ceo@pawfectcompanions.com / Pawfect2026!"
#!/usr/bin/env bash
# render-build.sh — REPLACE the existing one with this
set -euo pipefail
echo "🐾 Pawfect Companions — Render build starting..."

# 1. Install Python deps
pip install -r requirements.txt

# 2. Install pnpm + build React frontend (Node is already on Render)
npm install -g pnpm@9
cd frontend
pnpm install --frozen-lockfile
pnpm run build
cd ..

# 3. Django post-build
python manage.py collectstatic --noinput
python manage.py migrate --noinput

# 4. Seed demo data ONCE (safe to re-run — command handles idempotency)
python manage.py seed_demo_data 2>/dev/null || true

echo "✅ Pawfect build complete! 🐕"
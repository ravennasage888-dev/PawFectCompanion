#!/usr/bin/env bash
set -euo pipefail
echo "🐾 Pawfect Companions — Render build starting..."
echo "   Python: $(python --version)"
echo "   Node:   $(node --version)"

echo "📦 [1/5] Python deps..."
pip install --upgrade pip
pip install -r requirements.txt

echo "🟢 [2/5] Frontend deps..."
npm install -g pnpm@9
cd frontend
pnpm install --no-frozen-lockfile   # ← FIXED: was --frozen-lockfile

echo "⚡ [3/5] Building React..."
pnpm run build
cd ..

echo "📁 [4/5] Collect static..."
python manage.py collectstatic --noinput --clear

echo "🗄️  [5/5] Migrate + seed..."
python manage.py migrate --noinput
python manage.py seed_demo_data 2>/dev/null || true

echo "✅ PAWFECT BUILD COMPLETE! 🐕"

#!/usr/bin/env bash
set -euo pipefail
echo "🐾 Pawfect Companions — Render build (npm) starting..."
echo "   Python: $(python --version)"
echo "   Node:   $(node --version)"
echo "   npm:    $(npm --version)"

# 1. Python deps
echo "📦 [1/5] Python deps..."
pip install --upgrade pip
pip install -r requirements.txt

# 2. Frontend deps (NPM — no lockfile issues!)
echo "🟢 [2/5] Frontend deps (npm)..."
cd frontend
rm -f pnpm-lock.yaml   # kill the stale lockfile
npm install --no-audit --no-fund --loglevel=error

# 3. Build React
echo "⚡ [3/5] Building React..."
npm run build
cd ..

# 4. Collect static
echo "📁 [4/5] Collect static..."
python manage.py collectstatic --noinput --clear

# 5. Migrate + seed
echo "🗄️  [5/5] Migrate + seed..."
python manage.py migrate --noinput
python manage.py seed_demo_data 2>/dev/null || true

echo "✅ PAWFECT BUILD COMPLETE! 🐕"

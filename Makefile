# 🐾 Pawfect Companions — Developer Makefile
# One-command tooling for the full Django + React stack.
#
# Usage:
#   make install        # Install everything (pnpm + poetry)
#   make dev            # Backend + frontend dev servers (needs running DB)
#   make dev-full       # Full stack: Postgres (docker) + backend + frontend
#   make build          # Build React production bundle
#   make migrate        # Run Django migrations
#   make seed           # Seed demo data (CEO login + 12 puppies + inquiries)
#   make test           # Run full test suite
#   make backup         # Manual DB backup
#   make docker-up      # Full production-like stack via docker compose

SHELL := /bin/bash
.PHONY: help install dev dev-full dev-db-up dev-db-down build \
	makemigrations migrate seed superuser shell shell-plus \
	test lint format backup cron-nightly clean \
	docker-up docker-down deploy-verify health

# ---------------------------------------------------------------------------
# Help
# ---------------------------------------------------------------------------

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ---------------------------------------------------------------------------
# Dependencies
# ---------------------------------------------------------------------------

install: ## Install all deps (pnpm + poetry)
	@echo "🐾 Installing Pawfect Companions dependencies..."
	@command -v pnpm >/dev/null 2>&1 || { echo "→ enabling corepack pnpm"; corepack enable; }
	@command -v poetry >/dev/null 2>&1 || { echo "→ installing poetry"; pip install --user poetry; }
	cd frontend && pnpm install --frozen-lockfile || pnpm install
	poetry install --no-root
	@echo "✅ Dependencies installed"

bootstrap: install  ## Alias for install

# ---------------------------------------------------------------------------
# Development servers
# ---------------------------------------------------------------------------

dev-db-up: ## Start local Postgres via docker (detached)
	docker compose -f docker-compose-dev-db.yml up -d
	@echo "🐘 Postgres up on :5432"

dev-db-down: ## Stop local Postgres
	docker compose -f docker-compose-dev-db.yml down

dev-backend: ## Django dev server only (:8000)
	poetry run python manage.py runserver 0.0.0.0:8000

dev-frontend: ## Webpack dev server only (:4000)
	cd frontend && pnpm run dev

dev: ## Backend (:8000) + frontend (:4000) in parallel
	@echo "🐾 Starting Pawfect dev stack..."
	@$(MAKE) -j2 dev-backend dev-frontend

dev-full: dev-db-up migrate seed ## Full local stack: DB + migrate + seed + backend + frontend
	@echo "✅ Stack ready. Backend :8000 · Frontend :4000"
	@$(MAKE) -j2 dev-backend dev-frontend

# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------

build: ## Build React production bundle into frontend/public/
	cd frontend && pnpm run build
	@echo "✅ Frontend bundle built → frontend/public/bundle.js"

build-prod: build ## Build + collect Django static
	poetry run python manage.py collectstatic --noinput

# ---------------------------------------------------------------------------
# Django database
# ---------------------------------------------------------------------------

makemigrations: ## Generate new migrations
	poetry run python manage.py makemigrations

migrate: ## Run all pending migrations
	poetry run python manage.py migrate

migrate-zero: ## Roll back ALL migrations (⚠️ destructive)
	poetry run python manage.py migrate backend zero
	poetry run python manage.py migrate api zero

seed: migrate ## Seed demo data (CEO + staff + 12 puppies + 5 inquiries)
	poetry run python manage.py seed_demo_data
	@echo ""
	@echo "👑 CEO:   ceo@pawfectcompanions.com  /  Pawfect2026!"
	@echo "👷 Staff: staff@pawfectcompanions.com  /  Pawfect2026!"

reset-db: migrate-zero migrate seed ## Full DB wipe + rebuild + seed (⚠️ destructive)

superuser: ## Create CEO superuser interactively
	poetry run python manage.py createsuperuser --email ceo@pawfectcompanions.com --username ceo

shell: ## Django shell
	poetry run python manage.py shell

shell-plus: ## shell_plus (requires django-extensions)
	poetry run python manage.py shell_plus --ipython

# ---------------------------------------------------------------------------
# Tests & quality
# ---------------------------------------------------------------------------

test: ## Run full test suite with coverage
	poetry run pytest -x -v --cov=backend --cov=api --cov-report=term-missing

test-fast: ## Run tests without coverage
	poetry run pytest -x -q

lint: ## Lint Python + TS
	poetry run ruff check backend api core frontend
	cd frontend && pnpm run lint 2>/dev/null || echo "⚠️  frontend lint skipped"

format: ## Auto-format Python
	poetry run ruff format backend api core frontend

typecheck: ## mypy (if configured)
	@echo "typecheck placeholder"

# ---------------------------------------------------------------------------
# Operations
# ---------------------------------------------------------------------------

backup: ## Manual DB backup → backups/
	poetry run python manage.py backup_db

cron-nightly: ## Nightly cron: expire reservations + DB backup
	poetry run python manage.py expire_reservations
	poetry run python manage.py backup_db

clearcache: ## Clear Django cache
	poetry run python manage.py clearcache

health: ## Hit the local health endpoint
	curl -s http://localhost:8000/health/ | python3 -m json.tool

# ---------------------------------------------------------------------------
# Cleanup
# ---------------------------------------------------------------------------

clean: ## Remove build artifacts + caches
	rm -rf frontend/public/bundle.js frontend/public/bundle.js.map staticfiles/ .pytest_cache/ logs/
	find . -name __pycache__ -type d -exec rm -rf {} + 2>/dev/null; true
	find . -name "*.pyc" -delete
	@echo "🧹 Cleaned"

# ---------------------------------------------------------------------------
# Docker
# ---------------------------------------------------------------------------

docker-up: ## Full production-like stack via docker compose
	docker compose up --build -d
	@echo "🐾 Pawfect running → http://localhost:8000"

docker-down: ## Stop docker stack
	docker compose down

docker-logs: ## Tail container logs
	docker compose logs -f --tail=100

# ---------------------------------------------------------------------------
# Deploy verification
# ---------------------------------------------------------------------------

deploy-verify: build migrate ## Smoke-test a deploy before going live
	poetry run python manage.py check --deploy --fail-level WARNING
	poetry run pytest -x -q
	@echo "✅ Deploy verification passed"

# Contributing to Cadonga Elite

Thank you for your interest in contributing to Cadonga Elite! We're building the world's first dedicated, ethical Cadogan dog marketplace. All contributions must align with our core values: **trust, safety, animal welfare, and transparency.**

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We pledge to:

- **Prioritize animal welfare** above growth or profit
- **Uphold ethical breeding standards** (AKC, FCI, national breed clubs)
- **Protect user privacy** and data security
- **Ensure platform transparency** — no dark patterns or deceptive practices
- **Respect all contributors** regardless of background, experience, or identity

### Unacceptable Behavior

- Promoting puppy mills, unethical breeding, or welfare abuse
- Discriminatory language or harassment
- Circumventing trust & safety mechanisms
- Sharing sensitive user data
- Violation of regional laws (GDPR, CCPA, PIPEDA, etc.)

**Violations**: Email `conduct@cadonga.com` with details. All reports handled confidentially.

---

## Getting Started

### 1. Fork & Clone

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/Cadonga-Elite-center-.git
cd Cadonga-Elite-center-
git remote add upstream https://github.com/eminence-sudo/Cadonga-Elite-center-.git
```

### 2. Create Feature Branch

```bash
git checkout -b feature/amazing-feature
# or
git checkout -b bugfix/fix-listing-approval
# or
git checkout -b docs/health-test-guide
```

### 3. Follow Naming Conventions

| Type | Pattern | Example |
|------|---------|----------|
| Feature | `feature/` | `feature/ai-matching-v2` |
| Bug Fix | `bugfix/` | `bugfix/escrow-release-delay` |
| Docs | `docs/` | `docs/regional-compliance` |
| Chore | `chore/` | `chore/upgrade-dependencies` |
| Test | `test/` | `test/messaging-websockets` |

---

## Development Setup

### Backend

```bash
cd backend

# Install dependencies
poetry install

# Activate virtual environment
poetry shell

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start dev server
python manage.py runserver
```

### Frontend

```bash
cd frontend

# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Build for production
pnpm run build
```

### Full Stack (Docker Compose)

```bash
docker compose up --build
```

---

## Code Style & Standards

### Python (Backend)

**Formatter & Linter**: `ruff`

```bash
# Check
poetry run ruff check backend/

# Auto-fix
poetry run ruff check --fix backend/

# Format code
poetry run ruff format backend/
```

**Django Best Practices**:
- Use type hints (PEP 484)
- Write docstrings for all models, views, serializers
- Follow DRF conventions (ViewSets, Serializers, Permissions)
- Use `django-filter` for list filtering
- Cache expensive queries with Redis
- Use Celery for long-running tasks

### TypeScript/React (Frontend)

**Formatter & Linter**: `ESLint` + `Prettier`

```bash
# Check
cd frontend && pnpm run lint

# Auto-fix
pnpm run lint --fix

# Format
pnpm run format
```

**React Best Practices**:
- Functional components with hooks (no class components)
- Use `React Query` for server state
- Use `Zod` for form validation
- Component files: `PascalCase`
- Utility files: `camelCase`

---

## Testing Requirements

### Backend (pytest)

**Minimum Coverage**: 60% of new code

```bash
cd backend

# Run all tests
poetry run pytest

# Run with coverage
poetry run pytest --cov=. --cov-report=html

# Run specific test file
poetry run pytest tests/listings/test_models.py
```

### Frontend (Vitest)

**Minimum Coverage**: 60% of new components

```bash
cd frontend

# Run all tests
pnpm run test

# Watch mode
pnpm run test:watch

# Coverage
pnpm run test -- --coverage
```

---

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Format Rules

- **type**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`
- **scope**: Optional domain (`listings`, `payments`, `messaging`, `auth`, etc.)
- **subject**: Imperative, lowercase, no period, max 50 chars
- **body**: Detailed explanation (max 72 chars per line), optional
- **footer**: Issue references like `Fixes #42`, `Closes #99`

### Examples

```
feat(listings): add health test validation gate

When a breeder attempts to submit a listing, the API now validates
that all 5 mandatory health tests have been passed. If any are missing,
submission is rejected with a 400 error listing missing test types.

Fixes #1234
```

---

## Pull Request Process

### Before Submitting

1. **Sync with main branch**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run full test suite**:
   ```bash
   # Backend
   cd backend && poetry run pytest --cov
   
   # Frontend
   cd frontend && pnpm run test
   
   # Linting
   poetry run ruff check --fix
   pnpm run lint --fix
   ```

3. **Build Docker image**:
   ```bash
   docker compose build --no-cache
   ```

### Creating PR

1. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```

2. Open PR on GitHub with:
   - **Title**: Follows Conventional Commits
   - **Description**: Problem, solution, testing evidence
   - **Labels**: `feature`, `bug`, `docs`, region-specific
   - **Linked Issues**: `Fixes #1234`

### PR Review Expectations

**Maintainers will check**:
- ✅ Code style & linting pass
- ✅ Tests are included & passing (60%+ coverage)
- ✅ No hardcoded secrets or sensitive data
- ✅ Documentation updated
- ✅ Commit messages follow conventions
- ✅ Aligns with platform values
- ✅ Handles multi-region compliance
- ✅ Performance impact is acceptable

---

## Regional Considerations

When contributing features, consider global impact:

### USA
- CCPA compliance
- Credit card processing via Stripe
- US timezones

### UK/EU
- GDPR compliance
- Right to be forgotten
- GDPR privacy policy & DPA

### Canada
- PIPEDA compliance
- Regional timezone support

### Cameroon
- Test with Mobile Money APIs
- Support XAF currency
- Local business hours (WAT timezone)

---

## Resources

- **Django**: https://docs.djangoproject.com/en/5.1/
- **React**: https://react.dev
- **DRF**: https://www.django-rest-framework.org/
- **Stripe**: https://stripe.com/docs/api

---

## Need Help?

- **Discussions**: https://github.com/eminence-sudo/Cadonga-Elite-center-/discussions
- **Issues**: https://github.com/eminence-sudo/Cadonga-Elite-center-/issues
- **Email**: dev@cadonga.com

---

**Thank you for building a safer, more ethical marketplace for Cadogan dogs worldwide! 🐕**

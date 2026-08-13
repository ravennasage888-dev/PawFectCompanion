import os
import sys
from pathlib import Path
import environ

env = environ.Env(DEBUG=(bool, True))
BASE_DIR = Path(__file__).resolve().parent.parent.parent
environ.Env.read_env(BASE_DIR / ".env")

ENV_NAME = env("ENV_NAME", default="local")
APP_VERSION = "2.0.0"
DEBUG = env("DEBUG")
SECRET_KEY = env("SECRET_KEY", default="dev-secret-key-change-me-please-2026-pawfect")
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["*"])
SITE_URL = env("SITE_URL", default="http://localhost:8000")
SITE_NAME = "Pawfect Companions"
SITE_TAGLINE = "Find Your Perfect Furry Friend"
SITE_ID = 1

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "django.contrib.sitemaps",
    "rest_framework",
    "rest_framework.authtoken",
    "django_filters",
    "corsheaders",
    "cloudinary",
    "django_better_admin_arrayfield",
    "backend.apps.BackendConfig",
    "api.apps.ApiConfig",
    "frontend.apps.FrontendConfig",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "core.middleware.SecurityHeadersMiddleware",
    "core.middleware.PriceChangeAuditMiddleware",
]

ROOT_URLCONF = "core.urls"
WSGI_APPLICATION = "core.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "backend" / "templates", BASE_DIR / "frontend" / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

DATABASES = {
    "default": env.db("DATABASE_URL", default="postgres://pawfect:pawfect2026@localhost:5432/pawfect")
}
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "frontend" / "public"]
STORAGES = {
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
    "default": {"BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage"},
}

CLOUDINARY = {
    "cloud_name": env("CLOUDINARY_CLOUD_NAME", default=""),
    "api_key": env("CLOUDINARY_API_KEY", default=""),
    "api_secret": env("CLOUDINARY_API_SECRET", default=""),
    "secure": True,
}
CLOUDINARY_STORAGE = CLOUDINARY  # alias for django-cloudinary-storage

try:
    EMAIL_CONFIG = env.email_url("EMAIL_URL", default="smtp://apikey:@smtp.sendgrid.net:587")
    vars().update(EMAIL_CONFIG)
except Exception:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL", default="Pawfect Companions <hello@pawfectcompanions.com>")
CEO_EMAIL = env("CEO_EMAIL", default="ceo@pawfectcompanions.com")
ADMINS = [("Pawfect CEO", CEO_EMAIL)]
MANAGERS = ADMINS

CORS_ALLOW_ALL_ORIGINS = env.bool("CORS_ALLOW_ALL", default=DEBUG)
CORS_ALLOWED_ORIGINS = env.list("CORS_ORIGINS", default=["http://localhost:4000", "http://localhost:8000"])
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = CORS_ALLOWED_ORIGINS

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator", "OPTIONS": {"min_length": 8}},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 24,
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "60/minute",
        "user": "1000/minute",
        "inquiry_burst": "3/hour",
        "inquiry_daily": "10/day",
    },
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "pawfect": {"format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"},
    },
    "handlers": {
        "console": {"class": "logging.StreamHandler", "formatter": "pawfect"},
        "mail_admins": {"level": "ERROR", "class": "django.utils.log.AdminEmailHandler"},
    },
    "loggers": {
        "pawfect.audit": {"handlers": ["console"], "level": "WARNING", "propagate": False},
        "django.request": {"handlers": ["mail_admins", "console"], "level": "ERROR", "propagate": True},
        "django.security": {"handlers": ["mail_admins", "console"], "level": "WARNING", "propagate": True},
    },
}

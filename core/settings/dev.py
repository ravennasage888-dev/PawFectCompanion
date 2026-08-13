from .base import *

DEBUG = True
ENV_NAME = "development"
ALLOWED_HOSTS = ["*"]
CORS_ALLOW_ALL_ORIGINS = True
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"  # Prints to terminal
INSTALLED_APPS += ["django_extensions"]  # Optional: `pip install django-extensions`
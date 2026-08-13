import os
from django.conf import settings
from django.shortcuts import render
from django.http import JsonResponse
from backend.utils import Strings


def index(request, **kwargs):
    """
    Serves the React SPA. All non-API routes fall through to this view
    so React Router can handle them client-side.
    """
    return render(
        request,
        "frontend/index.html",
        {
            "SITE_NAME": Strings.SITE_NAME,
            "SITE_TAGLINE": Strings.SITE_TAGLINE,
            "SITE_URL": getattr(settings, "SITE_URL", ""),
            "ENV": settings.ENV_NAME if hasattr(settings, "ENV_NAME") else "production",
        },
    )


def health_check(request):
    """Kubernetes / Docker health check endpoint"""
    return JsonResponse({
        "status": "ok",
        "site": Strings.SITE_NAME,
        "version": getattr(settings, "APP_VERSION", "2.0.0"),
    })
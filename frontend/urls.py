from django.urls import path, re_path
from . import views

# IMPORTANT: The catch-all MUST be last so API routes above take precedence
urlpatterns = [
    path("health/", views.health_check, name="health_check"),
    # Let React Router handle ALL client-side routes
    re_path(r"^.*$", views.index, name="frontend-index"),
]
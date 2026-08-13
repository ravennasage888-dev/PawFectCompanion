from django.contrib import admin
from django.urls import path, include, re_path
from django.contrib.sitemaps import GenericSitemap, Sitemap
from django.contrib.sitemaps.views import sitemap
from django.http import HttpResponse
from backend.models.publications import Puppy, Publication
from django.shortcuts import render

admin.site.site_header = "🐾 Pawfect Companions — CEO / Admin Portal"
admin.site.site_title = "Pawfect Admin"
admin.site.index_title = "🐶 Welcome, Creator! Manage puppies, prices & inquiries"
admin.site.site_url = "/"


class StaticSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return ["/", "/puppies", "/breeds", "/about", "/testimonials", "/contact"]

    def location(self, obj):
        return obj


sitemaps = {
    "static": StaticSitemap,
    "puppies": GenericSitemap(
        {"queryset": Puppy.objects.filter(status="AVAILABLE"), "date_field": "updated_at"},
        priority=0.9,
    ),
    "breeds": GenericSitemap(
        {"queryset": Publication.objects.filter(published=True)},
        priority=0.6,
    ),
}


def custom_404(request, exception=None):
    return render(request, "frontend/index.html", status=404)


def custom_500(request):
    return render(request, "frontend/index.html", status=500)


handler404 = "core.urls.custom_404"
handler500 = "core.urls.custom_500"


def robots_txt(request):
    return HttpResponse(
        "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/admin/\n"
        "Sitemap: https://pawfectcompanions.com/sitemap.xml\n",
        content_type="text/plain",
    )


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="sitemap"),
    path("robots.txt", robots_txt),
    re_path(r"^.*$", include("frontend.urls")),
]

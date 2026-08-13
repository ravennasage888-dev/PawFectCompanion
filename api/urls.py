from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views.publications import PuppyViewSet, PuppyAdminViewSet, BreedArticleViewSet
from api.views.subscribers import PuppyInquiryViewSet, SubscriberViewSet

router = DefaultRouter()

# Public — read only
router.register(r"puppies", PuppyViewSet, basename="puppies")
router.register(r"breeds", BreedArticleViewSet, basename="breeds")

# Public — write allowed (rate-limited)
router.register(r"inquiries", PuppyInquiryViewSet, basename="inquiries")
router.register(r"subscribe", SubscriberViewSet, basename="subscribe")

# Admin only — full CRUD
router.register(r"admin/puppies", PuppyAdminViewSet, basename="admin-puppies")

urlpatterns = [
    path("", include(router.urls)),
]

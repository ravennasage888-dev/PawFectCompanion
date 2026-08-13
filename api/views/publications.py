from rest_framework import viewsets, filters, permissions
from rest_framework.response import Response
from backend.models.publications import Puppy, Publication
from api.serializers.publications import PuppySerializer, BreedArticleSerializer, PuppyAdminSerializer
from api.filters.publications import PuppyFilter
import django_filters

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True  # Anyone can view puppies
        return request.user.is_superuser  # Only CEO/Admin can write

class PuppyViewSet(viewsets.ReadOnlyModelViewSet):
    """Public API: browse & filter puppies — everyone can read"""
    queryset = Puppy.objects.filter(status="AVAILABLE").order_by("-created_at")
    serializer_class = PuppySerializer
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ["name", "breed", "description", "personality", "location"]
    filterset_class = PuppyFilter
    ordering_fields = ["price", "age_weeks", "created_at"]
    ordering = ["-created_at"]

class PuppyAdminViewSet(viewsets.ModelViewSet):
    """Admin-only full CRUD — create/edit/delete puppies, update prices"""
    permission_classes = [permissions.IsAdminUser]
    queryset = Puppy.objects.all().order_by("-created_at")
    serializer_class = PuppyAdminSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "breed"]

class BreedArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = BreedArticleSerializer
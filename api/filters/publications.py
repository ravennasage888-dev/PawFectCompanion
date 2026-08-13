import django_filters
from backend.models.publications import Puppy

class PuppyFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    min_age = django_filters.NumberFilter(field_name="age_weeks", lookup_expr="gte")
    max_age = django_filters.NumberFilter(field_name="age_weeks", lookup_expr="lte")
    breed = django_filters.CharFilter(field_name="breed", lookup_expr="icontains")
    personality = django_filters.CharFilter(field_name="personality", lookup_expr="icontains")
    
    class Meta:
        model = Puppy
        fields = ["market", "gender", "breed", "vaccinated", "vet_checked", "microchipped"]
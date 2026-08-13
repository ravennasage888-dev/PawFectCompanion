from rest_framework import serializers
from backend.models.publications import Puppy, Publication

class PuppySerializer(serializers.ModelSerializer):
    gender_display = serializers.CharField(source="get_gender_display", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    market_display = serializers.CharField(source="get_market_display", read_only=True)
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Puppy
        fields = ["id","name","breed","age_weeks","gender","gender_display","price",
                  "photo_url","photo_caption","description","personality","tags",
                  "vaccinated","vet_checked","microchipped","dewormed","health_guarantee","pedigree",
                  "market","market_display","location","status","status_display","slug","created_at"]
        read_only_fields = fields  # Public API: read-only

    def get_photo_url(self, obj):
        return obj.photo.url if obj.photo else None

class PuppyAdminSerializer(serializers.ModelSerializer):
    """Full write-access serializer — ONLY for admin users"""
    class Meta:
        model = Puppy
        fields = "__all__"

class BreedArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ["id","title","description","body","tag","breed_group","origin_country","slug","image","created_at"]
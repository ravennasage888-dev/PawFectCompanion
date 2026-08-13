from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField
from cloudinary.models import CloudinaryField
from backend.utils import Strings
from .base import TextBlock

class Gender(models.TextChoices):
    MALE = "M", "♂ Male"
    FEMALE = "F", "♀ Female"

class Market(models.TextChoices):
    US = "US", "🇺🇸 United States"
    UK = "UK", "🇬🇧 United Kingdom"
    CA = "CA", "🇨🇦 Canada"

class PuppyStatus(models.TextChoices):
    AVAILABLE = "AVAILABLE", "🟢 Available"
    RESERVED = "RESERVED", "🟡 Reserved"
    PENDING = "PENDING", "🟠 Deposit Paid"
    SOLD = "SOLD", "🔴 Adopted"

class Publication(TextBlock):
    """Renamed concept: now represents BREED INFORMATION ARTICLES"""
    image = CloudinaryField(Strings.IMAGE, null=True)
    image_description = models.TextField(max_length=500, blank=True, verbose_name=Strings.IMAGE_DESCRIPTION)
    tag = ArrayField(models.CharField(max_length=200), null=True, verbose_name="Tags")
    slug = models.SlugField(max_length=250, unique=True, null=True)
    breed_group = models.CharField(max_length=100, blank=True, help_text="e.g. Sporting, Hound, Working")
    origin_country = models.CharField(max_length=50, blank=True)

    class Meta:
        verbose_name = "Breed Article"
        verbose_name_plural = "Breed Articles"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

class Puppy(models.Model):
    """Core model — every puppy listed on the site"""
    name = models.CharField(max_length=100, verbose_name=Strings.NAME)
    breed = models.CharField(max_length=100, verbose_name=Strings.BREED)
    age_weeks = models.PositiveIntegerField(verbose_name=Strings.AGE)
    gender = models.CharField(max_length=1, choices=Gender.choices, verbose_name=Strings.GENDER)
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name=Strings.PRICE)
    photo = CloudinaryField(Strings.IMAGE, null=True, blank=True)
    photo_caption = models.CharField(max_length=200, blank=True)
    description = models.TextField(verbose_name=Strings.DESCRIPTION, help_text="Personality, quirks, why they're special")
    personality = ArrayField(models.CharField(max_length=50), blank=True, null=True, verbose_name=Strings.PERSONALITY,
                              help_text="Comma-separated: Friendly, Playful, Calm...")
    tags = ArrayField(models.CharField(max_length=50), blank=True, null=True, verbose_name=Strings.TAGS,
                      help_text="Vet Checked, Vaccinated, Microchipped, AKC Reg, etc.")
    
    # Medical
    vaccinated = models.BooleanField(default=True, verbose_name=Strings.VACCINATED)
    vet_checked = models.BooleanField(default=True, verbose_name=Strings.VET_CHECKED)
    microchipped = models.BooleanField(default=True, verbose_name=Strings.MICROCHIPPED)
    dewormed = models.BooleanField(default=True)
    health_guarantee = models.BooleanField(default=True, verbose_name="10-yr Health Guarantee")
    pedigree = models.CharField(max_length=200, blank=True, verbose_name=Strings.PEDIGREE,
                                 help_text="AKC, UKC, KC, CKC registration #")
    
    # Location / Market
    market = models.CharField(max_length=2, choices=Market.choices, default=Market.US, verbose_name=Strings.MARKET)
    location = models.CharField(max_length=100, verbose_name=Strings.LOCATION, help_text="e.g. Atlanta, GA")
    
    # Status
    status = models.CharField(max_length=20, choices=PuppyStatus.choices, default=PuppyStatus.AVAILABLE, verbose_name=Strings.STATUS)
    birth_date = models.DateField(null=True, blank=True)
    available_date = models.DateField(null=True, blank=True)
    
    # SEO
    slug = models.SlugField(max_length=250, unique=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey("auth.User", on_delete=models.SET_NULL, null=True, related_name="puppies_created")

    class Meta:
        verbose_name = Strings.PUPPY
        verbose_name_plural = Strings.PUPPIES
        ordering = ["-created_at"]
        permissions = [
            ("can_manage_puppies", "Can add/edit/delete puppies"),
            ("can_change_prices", "Can update puppy pricing"),
            ("can_view_inquiries", "Can view customer inquiries"),
            ("can_manage_users", "Can manage site users"),
        ]

    def __str__(self):
        return f"{self.name} — {self.breed} ({self.get_gender_display()}) · ${self.price:,.0f}"

    def save(self, *args, **kwargs):
        from backend.utils import unique_slug_generator
        if not self.slug:
            self.slug = unique_slug_generator(self)
        super().save(*args, **kwargs)
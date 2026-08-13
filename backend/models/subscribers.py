from django.db import models
from backend.utils import Strings

class InquiryStatus(models.TextChoices):
    NEW = "NEW", "🔵 New"
    CONTACTED = "CONTACTED", "🟡 Contacted"
    INTERVIEWED = "INTERVIEWED", "🟢 Interview Scheduled"
    APPROVED = "APPROVED", "✅ Approved — Deposit Due"
    COMPLETED = "COMPLETED", "🎉 Puppy Going Home"
    REJECTED = "REJECTED", "❌ Not a Match"
    ARCHIVED = "ARCHIVED", "📦 Archived"

class Subscriber(models.Model):
    """Newsletter subscribers — unchanged but rebranded"""
    class ContactMethod(models.TextChoices):
        EMAIL = "EMAIL", "E-mail"
        WHATSAPP = "WHATSAPP", "WhatsApp"
        SMS = "SMS", "Text Message"
    name = models.CharField(max_length=100, verbose_name=Strings.NAME)
    contact_method = models.CharField(max_length=20, choices=ContactMethod.choices, default=ContactMethod.EMAIL)
    contact_info = models.CharField(max_length=300, verbose_name="Contact Info")
    market = models.CharField(max_length=2, default="US", help_text="US/UK/CA")
    interested_breeds = models.TextField(blank=True, help_text="Breeds they're interested in")
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name
    class Meta: verbose_name = "Newsletter Subscriber"; verbose_name_plural = "Newsletter Subscribers"

class PuppyInquiry(models.Model):
    """Customer inquiries about specific puppies — core business model"""
    puppy = models.ForeignKey(Puppy, on_delete=models.CASCADE, related_name="inquiries", null=True, blank=True)
    customer_name = models.CharField(max_length=150, verbose_name=Strings.CUSTOMER_NAME)
    customer_email = models.EmailField(verbose_name=Strings.CUSTOMER_EMAIL)
    customer_phone = models.CharField(max_length=30, blank=True, verbose_name=Strings.CUSTOMER_PHONE)
    market = models.CharField(max_length=2, default="US", help_text="Customer's country")
    city = models.CharField(max_length=100, blank=True)
    message = models.TextField(verbose_name=Strings.MESSAGE, help_text="Tell us about your home, lifestyle, experience...")
    has_owned_dog = models.BooleanField(default=False, verbose_name="Previous dog owner?")
    household_kids = models.CharField(max_length=50, blank=True, verbose_name="Children in home?")
    household_pets = models.CharField(max_length=100, blank=True, verbose_name="Other pets?")
    housing_type = models.CharField(max_length=50, blank=True, help_text="House/Apt/Condo with yard?")
    status = models.CharField(max_length=20, choices=InquiryStatus.choices, default=InquiryStatus.NEW, verbose_name=Strings.INQUIRY_STATUS)
    assigned_to = models.ForeignKey("auth.User", on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_inquiries", limit_choices_to={"is_staff": True})
    admin_notes = models.TextField(blank=True, help_text="PRIVATE — Internal admin notes only")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = Strings.INQUIRY
        verbose_name_plural = Strings.INQUIRIES
        ordering = ["-created_at"]
        permissions = [
            ("can_view_sensitive", "Can view full inquiry details (phone/notes)"),
            ("can_export_inquiries", "Can export inquiries to CSV"),
        ]

    def __str__(self):
        return f"{self.customer_name} → {self.puppy.name if self.puppy else 'General Inquiry'} [{self.status}]"
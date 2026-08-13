from django.contrib import admin
from django.utils.html import format_html
from backend.models.publications import Publication, Puppy
from backend.utils import Strings
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin


class PublicationAdmin(admin.ModelAdmin, DynamicArrayMixin):
    list_display = ("title", "breed_group", "origin_country", "created_at")
    list_filter = ("breed_group", "created_at")
    search_fields = ("title", "body")
    prepopulated_fields = {"slug": ("title",)}


class PuppyAdmin(admin.ModelAdmin, DynamicArrayMixin):
    # ROLE-BASED: Staff see limited fields; CEO/Admin sees ALL
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        # Superuser / CEO sees all; staff can be scoped if needed
        return qs

    def get_list_display(self, request):
        base = ["thumbnail", "name", "breed", "gender", "age_weeks", "price_fmt", "market", "location", "status_badge", "created_at"]
        if request.user.is_superuser:
            return base + ["inquiry_count"]
        return base

    def get_list_filter(self, request):
        return ["status", "market", "breed", "gender", "vaccinated", "vet_checked", "created_at"]

    def get_search_fields(self, request):
        return ["name", "breed", "location", "description", "personality"]

    def get_readonly_fields(self, request, obj=None):
        # Non-superuser staff CANNOT change price or status
        if not request.user.is_superuser:
            return ["price", "status", "slug", "created_at", "updated_at", "created_by"]
        return ["slug", "created_at", "updated_at"]

    def get_fieldsets(self, request, obj=None):
        common = (
            ("🐾 Puppy Identity", {"fields": ("name", "breed", "gender", "age_weeks", "birth_date", "available_date")}),
            ("💰 Pricing & Status — CEO ONLY can edit price/status", {"fields": ("price", "status")}),
            ("📸 Media", {"fields": ("photo", "photo_caption")}),
            ("❤️ Personality & Story", {"fields": ("description", "personality", "tags")}),
            ("🏥 Health & Papers", {"fields": ("vaccinated", "vet_checked", "dewormed", "microchipped", "health_guarantee", "pedigree")}),
            ("📍 Location", {"fields": ("market", "location")}),
            ("🔗 SEO", {"fields": ("slug",), "classes": ("collapse",)}),
        )
        if request.user.is_superuser:
            return common + (("👤 Admin Only", {"fields": ("created_by",), "classes": ("collapse",)}),)
        return common

    def save_model(self, request, obj, form, change):
        if not change:  # creating new
            obj.created_by = request.user
        super().save_model(request, obj, form, change)

    def has_delete_permission(self, request, obj=None):
        # ONLY superuser (CEO / Creator) can delete puppies
        return request.user.is_superuser

    # ===== Custom display columns =====
    def thumbnail(self, obj):
        if obj.photo:
            return format_html(f'<img src="{obj.photo.url}" width="60" height="60" style="border-radius:8px;object-fit:cover;" />')
        return format_html('<div style="width:60px;height:60px;border-radius:8px;background:#fed7aa;display:flex;align-items:center;justify-content:center;font-size:28px;">🐕</div>')
    thumbnail.short_description = "Photo"

    def price_fmt(self, obj):
        return format_html(f'<strong style="color:#ea580c;font-size:16px;">${obj.price:,.0f}</strong>')
    price_fmt.short_description = "Price"
    price_fmt.admin_order_field = "price"

    def status_badge(self, obj):
        colors = {
            "AVAILABLE": "background:#16a34a;color:white;",
            "RESERVED": "background:#ca8a04;color:white;",
            "PENDING": "background:#ea580c;color:white;",
            "SOLD": "background:#dc2626;color:white;",
        }
        return format_html(f'<span style="padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;{colors.get(obj.status,"")}">{obj.get_status_display()}</span>')
    status_badge.short_description = "Status"

    def inquiry_count(self, obj):
        n = obj.inquiries.count()
        if n == 0: return "—"
        return format_html(f'<a href="/admin/backend/puppyinquiry/?puppy__id__exact={obj.id}" style="color:#2563eb;font-weight:700;">{n} inquiry{"s" if n>1 else""}</a>')
    inquiry_count.short_description = "Interested"

    # Bulk actions
    actions = ["mark_available", "mark_reserved", "mark_sold", "bulk_price_update"]

    def mark_available(self, request, queryset):
        if not request.user.is_superuser:
            self.message_user(request, "❌ Only CEO/Admin can change statuses.", level="ERROR")
            return
        queryset.update(status="AVAILABLE")
        self.message_user(request, f"✅ {queryset.count()} puppies marked Available")
    mark_available.short_description = "🟢 Mark selected as Available"

    def mark_reserved(self, request, queryset):
        if not request.user.is_superuser:
            self.message_user(request, "❌ Only CEO/Admin can change statuses.", level="ERROR")
            return
        queryset.update(status="RESERVED")
    mark_reserved.short_description = "🟡 Mark selected as Reserved"

    def mark_sold(self, request, queryset):
        if not request.user.is_superuser:
            self.message_user(request, "❌ Only CEO/Admin can change statuses.", level="ERROR")
            return
        queryset.update(status="SOLD")
    mark_sold.short_description = "🔴 Mark selected as Sold/Adopted"

    def bulk_price_update(self, request, queryset):
        # Only superuser
        pass
    bulk_price_update.short_description = "💰 Bulk Price Change (CEO only)"
from django.contrib import admin
from django.utils.html import format_html
from backend.models.subscribers import Subscriber, PuppyInquiry
from backend.utils import Strings
import csv
from django.http import HttpResponse


class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("name", "contact_method", "contact_info", "market", "created_at")
    list_filter = ("contact_method", "market", "created_at")
    search_fields = ("name", "contact_info")
    actions = ["export_csv"]
    def export_csv(self, r, q): pass


class PuppyInquiryAdmin(admin.ModelAdmin):
    # ===== ROLE-BASED PERMISSIONS =====
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs  # CEO sees ALL
        # Staff see only inquiries assigned to them OR unassigned
        return qs.filter(assigned_to=request.user) | qs.filter(assigned_to__isnull=True)

    def get_list_display(self, request):
        base = ["created_at", "customer_name", "email_link", "puppy", "market", "status_colored"]
        if request.user.is_superuser:
            return base + ["assigned_to", "customer_phone"]
        return base

    def get_list_filter(self, request):
        f = ["status", "market", "has_owned_dog", "created_at"]
        if request.user.is_superuser:
            f += ["assigned_to"]
        return f

    def get_search_fields(self, request):
        return ["customer_name", "customer_email", "message", "city"]

    def get_fieldsets(self, request, obj=None):
        customer_section = ("👤 Customer Info", {
            "fields": ("customer_name", "customer_email", "customer_phone", "market", "city")
        })
        puppy_section = ("🐶 Puppy Interested In", {"fields": ("puppy",)})
        lifestyle = ("🏠 Lifestyle Questionnaire", {
            "fields": ("has_owned_dog", "household_kids", "household_pets", "housing_type", "message"),
            "classes": ("wide",)
        })
        
        if request.user.is_superuser:
            return [
                customer_section, puppy_section, lifestyle,
                ("⚙️ Processing — ADMIN ONLY", {
                    "fields": ("status", "assigned_to", "admin_notes"),
                    "description": "Only CEO/Admin can reassign or change status"
                }),
            ]
        # Staff: can update status but NOT reassign or see admin_notes
        return [
            customer_section, puppy_section, lifestyle,
            ("⚙️ Update Status", {"fields": ("status",)}),
        ]

    def has_change_permission(self, request, obj=None):
        if not obj: return True
        if request.user.is_superuser: return True
        return obj.assigned_to == request.user or obj.assigned_to is None

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser  # ONLY CEO can delete inquiries

    # ===== Custom columns =====
    def email_link(self, obj):
        return format_html(f'<a href="mailto:{obj.customer_email}" style="color:#2563eb;font-weight:600;">{obj.customer_email}</a>')
    email_link.short_description = "Email"

    def status_colored(self, obj):
        cmap = {
            "NEW": "#2563eb", "CONTACTED": "#ca8a04", "INTERVIEWED": "#7c3aed",
            "APPROVED": "#16a34a", "COMPLETED": "#0ea5e9", "REJECTED": "#dc2626", "ARCHIVED": "#64748b"
        }
        return format_html(f'<span style="padding:3px 10px;border-radius:20px;font-size:11px;font-weight:800;color:white;background:{cmap.get(obj.status,"#666")}">{obj.get_status_display()}</span>')
    status_colored.short_description = "Status"

    actions = ["export_selected_csv", "mark_contacted", "mark_completed"]

    def export_selected_csv(self, request, queryset):
        if not request.user.has_perm("backend.can_export_inquiries") and not request.user.is_superuser:
            self.message_user(request, "❌ Export permission required", level="ERROR")
            return
        resp = HttpResponse(content_type="text/csv")
        resp["Content-Disposition"] = 'attachment; filename="puppy-inquiries.csv"'
        w = csv.writer(resp)
        w.writerow(["Date","Name","Email","Phone","Puppy","Breed","Price","Market","City","Status","Message"])
        for i in queryset:
            w.writerow([i.created_at.strftime("%Y-%m-%d"),i.customer_name,i.customer_email,i.customer_phone,
                        i.puppy.name if i.puppy else "",i.puppy.breed if i.puppy else "",
                        f"${i.puppy.price:,.0f}" if i.puppy else "",i.market,i.city,i.status,i.message[:300]])
        return resp
    export_selected_csv.short_description = "📊 Export selected to CSV (Admin)"

    def mark_contacted(self, r, q): q.update(status="CONTACTED"); self.message_user(r, f"✅ {q.count()} marked Contacted")
    def mark_completed(self, r, q): 
        if not r.user.is_superuser: self.message_user(r,"❌ CEO only","ERROR"); return
        q.update(status="COMPLETED")
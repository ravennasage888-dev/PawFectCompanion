"""Pawfect Companions — Django admin registration.

All ModelAdmins are defined in backend/admin/*.py and imported here.
We do NOT use @admin.register decorators in the individual files — we
register everything here in one place to avoid double-registration races.
"""
from django.contrib import admin

from backend.admin.publications import PublicationAdmin, PuppyAdmin
from backend.admin.subscribers import SubscriberAdmin, PuppyInquiryAdmin
from backend.models.publications import Publication, Puppy
from backend.models.subscribers import Subscriber, PuppyInquiry

admin.site.register(Publication, PublicationAdmin)
admin.site.register(Puppy, PuppyAdmin)
admin.site.register(Subscriber, SubscriberAdmin)
admin.site.register(PuppyInquiry, PuppyInquiryAdmin)

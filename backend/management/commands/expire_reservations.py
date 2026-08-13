from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from backend.models.publications import Puppy
from backend.models.subscribers import PuppyInquiry


class Command(BaseCommand):
    help = "Auto-release puppies reserved > 7 days without deposit; auto-archive old inquiries"

    def handle(self, *args, **opts):
        cutoff = timezone.now() - timedelta(days=7)

        # 1. PENDING → AVAILABLE if older than 7 days
        expired = Puppy.objects.filter(status="PENDING", updated_at__lt=cutoff)
        n = expired.update(status="AVAILABLE")
        if n: self.stdout.write(self.style.WARNING(f"🔄 Released {n} expired puppy reservations"))

        # 2. Completed/Rejected inquiries > 30 days → ARCHIVED
        old = timezone.now() - timedelta(days=30)
        arc = PuppyInquiry.objects.filter(
            status__in=["COMPLETED", "REJECTED"], updated_at__lt=old
        ).update(status="ARCHIVED")
        if arc: self.stdout.write(self.style.SUCCESS(f"📦 Archived {arc} old inquiries"))

        # 3. NEW inquiries > 3 days untouched → nag CEO
        nag = PuppyInquiry.objects.filter(status="NEW", created_at__lt=timezone.now() - timedelta(days=3)).count()
        if nag:
            self.stdout.write(self.style.ERROR(f"⚠️  {nag} NEW inquiries untouched for 3+ days — FOLLOW UP!"))

        self.stdout.write(self.style.SUCCESS("✅ Reservation cleanup complete"))
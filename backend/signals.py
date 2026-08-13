from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from backend.models.subscribers import PuppyInquiry, Subscriber
from backend.models.publications import Puppy

@receiver(post_save, sender=PuppyInquiry)
def notify_on_new_inquiry(sender, instance, created, **kwargs):
    """When a customer submits an inquiry → email CEO + assigned staff"""
    if not created: return
    ctx = {
        "customer": instance.customer_name, "email": instance.customer_email,
        "phone": instance.customer_phone, "puppy": instance.puppy,
        "market": instance.market, "message": instance.message,
        "admin_url": f"{settings.SITE_URL}/admin/backend/puppyinquiry/{instance.id}/change/",
    }
    # Email CEO
    subject = f"🐾 NEW INQUIRY: {instance.customer_name} → {instance.puppy.name if instance.puppy else 'General'}"
    html = render_to_string("backend/email.html", ctx)
    msg = EmailMultiAlternatives(subject, subject, settings.DEFAULT_FROM_EMAIL, [settings.CEO_EMAIL])
    msg.attach_alternative(html, "text/html")
    msg.send(fail_silently=True)
    # Confirmation to customer
    try:
        send_mail(
            subject=f"We got your inquiry, {instance.customer_name}! 🐶",
            message=f"Hi {instance.customer_name},\n\nThank you for reaching out about {instance.puppy.name if instance.puppy else 'our puppies'}! Our team reviews every application personally and will get back to you within 24 hours.\n\nWith wagging tails,\nThe Pawfect Companions Team",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[instance.customer_email],
            fail_silently=True,
        )
    except: pass

@receiver(post_save, sender=Puppy)
def notify_subscribers_new_puppy(sender, instance, created, **kwargs):
    """When CEO adds a new AVAILABLE puppy → alert matching subscribers"""
    if not created or instance.status != "AVAILABLE": return
    matching = Subscriber.objects.filter(
        market=instance.market,
        interested_breeds__icontains=instance.breed
    )
    for sub in matching[:50]:  # throttle
        try:
            send_mail(
                subject=f"🐶 New {instance.breed} puppy available in {instance.market}!",
                message=f"Hi {sub.name}!\n\n{instance.name} — a {instance.get_gender_display()} {instance.breed}, {instance.age_weeks} weeks old, ${instance.price:,.0f}.\n\nView here: {settings.SITE_URL}/puppies/{instance.slug}\n\n— Pawfect Companions",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[sub.contact_info],
                fail_silently=True,
            )
        except: pass
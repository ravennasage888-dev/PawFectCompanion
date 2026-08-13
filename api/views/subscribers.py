from rest_framework import viewsets, permissions, status, throttling
from rest_framework.response import Response
from backend.models.subscribers import PuppyInquiry, Subscriber
from api.serializers.subscribers import PuppyInquiryCreateSerializer, SubscriberSerializer
from api.utils import InquiryBurstThrottle, InquirySustainedThrottle, looks_like_spam


class PuppyInquiryViewSet(viewsets.GenericViewSet):
    """
    POST: Anyone can submit a puppy adoption inquiry (rate-limited, spam-checked).
    GET/PATCH: Only admin users can list / update inquiries.
    """

    queryset = PuppyInquiry.objects.all().select_related("puppy", "assigned_to")
    serializer_class = PuppyInquiryCreateSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get_throttles(self):
        if self.action == "create":
            return [InquiryBurstThrottle(), InquirySustainedThrottle()]
        return super().get_throttles()

    def get_serializer_class(self):
        if self.action == "create":
            return PuppyInquiryCreateSerializer
        return PuppyInquiryCreateSerializer

    def list(self, request, *args, **kwargs):
        """Admin list — staff see only their own + unassigned; CEO sees everything."""
        qs = self.filter_queryset(self.get_queryset())
        if not request.user.is_superuser:
            qs = qs.filter(assigned_to=request.user) | qs.filter(assigned_to__isnull=True)
        page = self.paginate_queryset(qs.order_by("-created_at"))
        data = [
            {
                "id": i.id,
                "customer_name": i.customer_name,
                "customer_email": i.customer_email,
                "customer_phone": i.customer_phone,
                "puppy": {"id": i.puppy.id, "name": i.puppy.name, "breed": i.puppy.breed} if i.puppy else None,
                "market": i.market,
                "city": i.city,
                "message": i.message,
                "status": i.status,
                "has_owned_dog": i.has_owned_dog,
                "assigned_to": i.assigned_to.email if i.assigned_to else None,
                "created_at": i.created_at.isoformat(),
            }
            for i in (page or qs)
        ]
        return self.get_paginated_response(data) if page else Response(data)

    def create(self, request, *args, **kwargs):
        s = self.get_serializer(data=request.data)
        s.is_valid(raise_exception=True)

        # 🛡️ Spam filter — silently reject bad actors without tipping them off
        msg = (s.validated_data.get("message") or "").strip()
        email = (s.validated_data.get("customer_email") or "").strip()
        if looks_like_spam(msg, email):
            inquiry = s.save(status="REJECTED")
            return Response(
                {
                    "success": True,
                    "message": "Thank you! We'll be in touch within 24 hours.",
                    "inquiry_id": inquiry.id,
                },
                status=status.HTTP_201_CREATED,
            )

        inquiry = s.save()
        puppy_ref = f" {inquiry.puppy.name}" if inquiry.puppy else ""
        return Response(
            {
                "success": True,
                "message": (
                    f"Thank you {inquiry.customer_name}! We received your inquiry about{puppy_ref}. "
                    f"A real human will personally review your application and reply within 24 hours 🐾"
                ),
                "inquiry_id": inquiry.id,
            },
            status=status.HTTP_201_CREATED,
        )

    def partial_update(self, request, *args, **kwargs):
        """Admin: update inquiry status / assignment. CEO can reassign; staff only their own."""
        inquiry = self.get_object()
        if not request.user.is_superuser and inquiry.assigned_to != request.user and inquiry.assigned_to is not None:
            return Response({"detail": "Not authorized to update this inquiry."}, status=403)
        data = request.data
        if not request.user.is_superuser and "assigned_to" in data:
            del data["assigned_to"]  # Staff cannot reassign
        serializer = self.get_serializer(inquiry, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class SubscriberViewSet(viewsets.GenericViewSet):
    """Newsletter / puppy-alert subscription. Public write, admin read."""

    queryset = Subscriber.objects.all().order_by("-created_at")
    serializer_class = SubscriberSerializer
    throttle_classes = [throttling.AnonRateThrottle]

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def create(self, request, *args, **kwargs):
        s = self.get_serializer(data=request.data)
        s.is_valid(raise_exception=True)
        sub = s.save()
        breeds = sub.interested_breeds.strip() if sub.interested_breeds else "new puppies"
        return Response(
            {
                "success": True,
                "message": (
                    f"Welcome to the pack, {sub.name}! 🐶 You're on the priority list for "
                    f"{breeds} in {sub.market}. We'll email the second a matching puppy is listed."
                ),
            },
            status=status.HTTP_201_CREATED,
        )

    def list(self, request, *args, **kwargs):
        qs = self.filter_queryset(self.get_queryset())
        return Response([
            {"id": s.id, "name": s.name, "contact": s.contact_info, "method": s.contact_method,
             "market": s.market, "breeds": s.interested_breeds, "created_at": s.created_at.isoformat()}
            for s in qs
        ])

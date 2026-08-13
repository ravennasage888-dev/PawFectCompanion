import logging
from django.utils.deprecation import MiddlewareMixin
from django.utils.timezone import now

logger = logging.getLogger("pawfect.audit")


class SecurityHeadersMiddleware(MiddlewareMixin):
    """Hardened response headers for production"""
    def process_response(self, request, response):
        response["X-Content-Type-Options"] = "nosniff"
        response["X-Frame-Options"] = "DENY"
        response["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload"
        return response


class PriceChangeAuditMiddleware(MiddlewareMixin):
    """CEO price-change audit trail — logs every price edit"""
    def process_response(self, request, response):
        if request.method in ("PATCH", "PUT", "POST") and request.user.is_superuser:
            if "/admin/puppies" in request.path or "price" in (request.body or b"").decode().lower():
                logger.warning(
                    "PRICE_CHANGE user=%s ip=%s path=%s status=%s time=%s",
                    request.user.email,
                    request.META.get("HTTP_X_FORWARDED_FOR", request.META.get("REMOTE_ADDR")),
                    request.path,
                    response.status_code,
                    now().isoformat(),
                )
        return response
import re
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle


class InquiryBurstThrottle(AnonRateThrottle):
    """Prevent spam: max 3 inquiries / hour per IP"""
    scope = "inquiry_burst"
    rate = "3/hour"


class InquirySustainedThrottle(AnonRateThrottle):
    """Max 10 inquiries / day per IP"""
    scope = "inquiry_daily"
    rate = "10/day"


EMAIL_RE = re.compile(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$")
SPAM_WORDS = ["crypto", "bitcoin", "free money", "click here", "http://", "https://", "seo", "ranking"]


def looks_like_spam(text: str, email: str = "") -> bool:
    """Naive spam filter — returns True if message smells fishy"""
    if not text: return False
    low = text.lower()
    # Too many URLs
    if low.count("http") >= 2: return True
    # Spam keywords
    if any(w in low for w in SPAM_WORDS): return True
    # All caps shouting
    if len(text) > 30 and sum(1 for c in text if c.isupper()) / len(text) > 0.6: return True
    # Gibberish: no spaces in long text
    if len(text) > 80 and " " not in text: return True
    return False
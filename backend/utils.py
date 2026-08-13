import sys
from io import BytesIO
from PIL import Image
from django.utils.text import slugify
from django.core.files.uploadedfile import InMemoryUploadedFile


class Strings:
    SITE_NAME = "Pawfect Companions"
    SITE_TAGLINE = "Find Your Perfect Furry Friend"

    # Puppy model
    PUPPY = "Puppy"
    PUPPIES = "Puppies"
    NAME = "Puppy Name"
    BREED = "Breed"
    AGE = "Age (weeks)"
    GENDER = "Gender"
    PRICE = "Price ($)"
    IMAGE = "Photo"
    IMAGE_DESCRIPTION = "Photo description (SEO + accessibility)"
    DESCRIPTION = "Personality & Story"
    VACCINATED = "Vaccinated"
    VET_CHECKED = "Vet Checked"
    MICROCHIPPED = "Microchipped"
    PEDIGREE = "Pedigree / Registration"
    MARKET = "Country / Market"
    LOCATION = "Location (City, State)"
    STATUS = "Availability Status"
    TAGS = "Special Traits"
    PERSONALITY = "Personality Traits"

    # Inquiry model
    INQUIRY = "Puppy Inquiry"
    INQUIRIES = "Puppy Inquiries"
    CUSTOMER_NAME = "Customer Name"
    CUSTOMER_EMAIL = "Email"
    CUSTOMER_PHONE = "Phone"
    MESSAGE = "Customer Message"
    INQUIRY_STATUS = "Status"

    # Generic
    TITLE = "Title"
    BODY = "Content"
    CREATED_AT = "Created"
    UPDATED_AT = "Updated"
    PUBLISHED = "Published"


# ---------------------------------------------------------------------------
# Helpers used by models
# ---------------------------------------------------------------------------

def unique_slug_generator(model_instance) -> str:
    """Build a URL-safe slug from the instance's title/name, appending -N on collision."""
    source = getattr(model_instance, "title", None) or getattr(model_instance, "name", "") or "untitled"
    slug = slugify(source) or "puppy"
    model_class = model_instance.__class__
    qs = model_class._default_manager
    n = 1
    candidate = slug
    while qs.filter(slug=candidate).exclude(pk=getattr(model_instance, "pk", None)).exists():
        n += 1
        candidate = f"{slug}-{n}"
    return candidate


def compress_image(image, quality: int = 72) -> InMemoryUploadedFile:
    """Re-encode an uploaded image as JPEG at the given quality to shrink payloads."""
    if not image or not hasattr(image, "name"):
        return image
    try:
        img = Image.open(image)
    except Exception:
        return image
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    # Resize if excessively large (max 2000px on the long edge)
    max_side = 2000
    if max(img.size) > max_side:
        ratio = max_side / max(img.size)
        img = img.resize((int(img.size[0] * ratio), int(img.size[1] * ratio)), Image.LANCZOS)
    buf = BytesIO()
    img.save(buf, format="JPEG", quality=quality, optimize=True, progressive=True)
    buf.seek(0)
    base = image.name.rsplit(".", 1)[0] if "." in image.name else "image"
    return InMemoryUploadedFile(
        buf,
        "CloudinaryField",
        f"{base}.jpg",
        "image/jpeg",
        sys.getsizeof(buf),
        None,
    )


def smart_truncate(content: str, length: int = 160, suffix: str = "...") -> str:
    """Cleanly truncate text to roughly `length` chars without splitting a word."""
    if not content:
        return ""
    if len(content) <= length:
        return content
    truncated = content[: length + 1]
    last_space = truncated.rfind(" ")
    if last_space > length // 2:
        truncated = truncated[:last_space]
    return truncated.rstrip() + suffix

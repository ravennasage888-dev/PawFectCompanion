from django.db import models
from backend.utils import Strings, unique_slug_generator
from django.utils import timezone


class Timestamped(models.Model):
    """Every model gets created/updated timestamps."""
    created_at = models.DateTimeField(default=timezone.now, verbose_name=Strings.CREATED_AT)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]


class TextBlock(Timestamped):
    """Base for anything with title+body (articles, breed pages, etc.)"""
    title = models.CharField(max_length=300, verbose_name=Strings.TITLE)
    subtitle = models.CharField(max_length=500, blank=True, verbose_name=Strings.SUBTITLE)
    description = models.TextField(blank=True, verbose_name=Strings.DESCRIPTION,
                                   help_text=Strings.DESCRIPTION_HELPER)
    body = models.TextField(verbose_name=Strings.BODY)
    published = models.BooleanField(default=True, verbose_name=Strings.PUBLISHED)
    slug = models.SlugField(max_length=250, unique=True, null=True, blank=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug and self.title:
            self.slug = unique_slug_generator(self)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
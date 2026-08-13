LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "pawfect": {"format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"},
    },
    "handlers": {
        "console": {"class": "logging.StreamHandler", "formatter": "pawfect"},
        "audit_file": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": "logs/audit.log",
            "maxBytes": 10_000_000, "backupCount": 10,
            "formatter": "pawfect",
        },
        "mail_admins": {"level": "ERROR", "class": "django.utils.log.AdminEmailHandler"},
    },
    "loggers": {
        "pawfect.audit": {"handlers": ["audit_file", "console"], "level": "WARNING", "propagate": False},
        "django.request": {"handlers": ["mail_admins", "console"], "level": "ERROR", "propagate": True},
        "django.security": {"handlers": ["mail_admins"], "level": "WARNING", "propagate": True},
    },
}
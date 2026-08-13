from django.apps import AppConfig

class BackendConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend"
    verbose_name = "🐾 Pawfect Companions — Core"

    def ready(self):
        import backend.signals  # noqas
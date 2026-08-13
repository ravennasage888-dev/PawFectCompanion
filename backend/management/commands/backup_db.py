from django.core.management.base import BaseCommand
from django.conf import settings
from datetime import datetime
import subprocess, os


class Command(BaseCommand):
    help = "pg_dump database to backups/ directory (runs nightly via cron)"

    def handle(self, *args, **opts):
        db = settings.DATABASES["default"]
        stamp = datetime.now().strftime("%Y%m%d-%H%M")
        os.makedirs("backups", exist_ok=True)
        fname = f"backups/pawfect-db-{stamp}.sql.gz"
        env = {**os.environ, "PGPASSWORD": db["PASSWORD"]}
        cmd = f"pg_dump -h {db['HOST']} -U {db['USER']} {db['NAME']} | gzip > {fname}"
        subprocess.run(cmd, shell=True, env=env, check=True)
        # Keep only last 14 backups
        files = sorted(os.listdir("backups"))
        for old in files[:-14]:
            os.remove(f"backups/{old}")
        self.stdout.write(self.style.SUCCESS(f"💾 DB backed up → {fname} ({len(files)} kept)"))
import json
import os
from django.conf import settings
from django.core.management.base import BaseCommand
from insights.models import Insight

class Command(BaseCommand):
    help = "Imports data from jsondata.json without duplicates"

    def handle(self, *args, **kwargs):
        # 1. Use an absolute path so Render doesn't get lost
        file_path = os.path.join(settings.BASE_DIR, "jsondata.json")
        
        if not os.path.exists(file_path):
            self.stderr.write(f"File not found at {file_path}")
            return

        with open(file_path, encoding="utf-8") as file:
            data = json.load(file)

        # 2. Check if data already exists to prevent duplicates
        if Insight.objects.exists():
            self.stdout.write(self.style.WARNING("Data already exists in database. Skipping import to avoid duplicates."))
            return

        objects = []
        for item in data:
            # 3. Clean numeric fields (Intensity/Likelihood can sometimes be empty strings in JSON)
            def clean_int(val):
                try:
                    return int(val) if val else None
                except (ValueError, TypeError):
                    return None

            objects.append(
                Insight(
                    title=item.get("title"),
                    insight=item.get("insight"),
                    url=item.get("url"),
                    source=item.get("source"),
                    country=item.get("country"),
                    region=item.get("region"),
                    city=item.get("city"),
                    sector=item.get("sector"),
                    topic=item.get("topic") or item.get("topics"), # Handle both field names
                    pestle=item.get("pestle") or item.get("pest"),
                    swot=item.get("swot"),
                    intensity=clean_int(item.get("intensity")),
                    likelihood=clean_int(item.get("likelihood")),
                    relevance=clean_int(item.get("relevance")),
                    impact=item.get("impact"),
                    start_year=item.get("start_year"),
                    end_year=item.get("end_year"),
                    year=clean_int(item.get("year")),
                    added=item.get("added"),
                    published=item.get("published"),
                )
            )

        # 4. Use bulk_create for speed
        Insight.objects.bulk_create(objects)
        self.stdout.write(self.style.SUCCESS(f"Successfully imported {len(objects)} insights!"))
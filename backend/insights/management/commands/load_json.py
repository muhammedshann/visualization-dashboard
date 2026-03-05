import json
import os
from django.conf import settings
from django.core.management.base import BaseCommand
from insights.models import Insight

class Command(BaseCommand):
    help = "Imports data from jsondata.json without duplicates"

    def handle(self, *args, **kwargs):
        # Use absolute path for Render
        file_path = os.path.join(settings.BASE_DIR, "jsondata.json")

        with open(file_path, encoding="utf-8") as file:
            data = json.load(file)

        if Insight.objects.exists():
            self.stdout.write("Data already exists. Skipping.")
            return

        objects = []
        for item in data:
            # Helper to handle empty strings in numeric fields
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
                    # FIX: Use 'topics' to match your model
                    topics=item.get("topic") or item.get("topics"), 
                    # FIX: Use 'pest' to match your model
                    pest=item.get("pestle") or item.get("pest"),
                    swot=item.get("swot"),
                    intensity=clean_int(item.get("intensity")),
                    likelihood=clean_int(item.get("likelihood")),
                    relevance=clean_int(item.get("relevance")),
                    impact=item.get("impact"),
                    start_year=clean_int(item.get("start_year")),
                    end_year=clean_int(item.get("end_year")),
                    year=clean_int(item.get("year")),
                    # Note: Ensure your JSON date format matches YYYY-MM-DD
                    added=item.get("added")[:10] if item.get("added") else None,
                    published=item.get("published")[:10] if item.get("published") else None,
                )
            )

        Insight.objects.bulk_create(objects)
        self.stdout.write(self.style.SUCCESS(f"Imported {len(objects)} insights!"))